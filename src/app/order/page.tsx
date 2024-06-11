"use client";
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import { styled, useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { calcQuantity, calcTotalPrice, useStore } from '@/utils/order';
import Button from '@mui/material/Button';
import { processOrder } from './actions';
import { forwardRef, useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import { formatValue } from '@/utils/format';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Cart() {
  const theme = useTheme();
  const { order, removeItem, clearOrder } = useStore();
  const [ showSuccessModal, setShowSuccessModal ] = useState<boolean>(false);
  const [ showConfirmModal, setShowConfirmModal ] = useState<boolean>(false);
  const [ orderNumber, setOrderNumber ] = useState<number | undefined>();
  const router = useRouter();
  const [customerName, setCustomerName] = useState<string>('');

  const handleChangeCustomerName = (e: { target: { value: any; }; }) => {
    setCustomerName(e.target.value);
  }

  const registerOrder = async () => {
    setShowConfirmModal(false);
    order.customerName = customerName;
    const orderNumber = await processOrder(order);
    if(orderNumber === -1){
      alert('ORDER INVALID'); //TODO improve
    }else {
      setOrderNumber(orderNumber);
      setShowSuccessModal(true);
    }
  }
  
  const renderSuccessDialog = () => {
    return (
      <Dialog 
        open={showSuccessModal}
        disableEscapeKeyDown={true}
        TransitionComponent={Transition}>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Typography variant="h6" component="div" align='center'>
              Escolha registada!
            </Typography>
            <Typography variant="h1" component="div" align='center'>
              {orderNumber}
            </Typography>
            <Typography variant="h6" component="div" style={{color: "red"}} align='center'>
              Por favor, apresente este número na caixa para efetuar o pagamento!
            </Typography>
            <Typography variant="h4" component="div" style={{color: "blue"}} align='center'>
              Valor a pagar {formatValue(calcTotalPrice(order.items), true)}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessDialog}>FECHAR</Button>
        </DialogActions>
      </Dialog>
    );
  };

  const renderConfirmationModal = () => {
    return (
      <Dialog 
        open={showConfirmModal}
        maxWidth="xs"
        disableEscapeKeyDown={true}
        TransitionComponent={Transition}>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Typography variant="h6" component="div">
              Confirme a vossa escolha.
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="email"
              label="vosso nome"
              type="text"
              fullWidth
              variant="outlined"
              autoComplete='off'
              onChange={handleChangeCustomerName}
              value={customerName}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setShowConfirmModal(false)}>
            Cancelar
          </Button>
          <Button onClick={registerOrder}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  const handleCloseSuccessDialog = () => {
    setShowSuccessModal(false);
    clearOrder();
    router.push('/');
  };

  return (
    <>
      <header style={{ position: "fixed", top: 0, width: '100%'}}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Arraial Santos Populares
            </Typography>
          </Toolbar>
        </AppBar>
      </header>
      <Grid container spacing={2} style={{ paddingBottom: '1000px', marginTop: '60px'}}>
        <Grid item xs={12} md={12}>
          <p style={{color:'#090f96', textAlign: 'center', fontSize: '1.25rem', fontWeight: '500'}}>RESUMO DA VOSSA ESCOLHA</p>
        </Grid>
        <Grid item xs={12} md={12}>
          <table style={{width: '100%', backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff', color: '#000000'}}>
            <tbody>
              <tr style={{height: '40px'}}>
                <th>ITEM</th>
                <th>PREÇO</th>
                <th>QTD</th>
                <th>TOTAL</th>
                <th></th>
              </tr>
              {
                order.items.map(cartItem => (
                  <tr key={cartItem.tempId} style={{borderStyle: 'solid', borderWidth: '1px', borderColor: '#ac9f9f', height: '60px'}}>
                    <td>{cartItem.product.description}</td>
                    <td align='center'>{formatValue(cartItem.product.price, false)}</td>
                    <td align='center'>{cartItem.quantity}</td>
                    <td align='center'>{(formatValue(cartItem.quantity * cartItem.product.price, false))}</td>
                    <td onClick={() => removeItem(cartItem.product.productId)}>
                      <IconButton aria-label="delete" size="medium">
                        <DeleteIcon fontSize="inherit" style={{color: '#000000'}} />
                      </IconButton>
                    </td>
                  </tr>
                ))
              }
              <tr style={{height: '40px'}}>
                <th colSpan={2} style={{color: 'red', fontSize: 18}}>{calcQuantity(order.items)} item(s)</th>
                <th colSpan={1} style={{color: 'red', fontSize: 18}}>Total:</th>
                <th colSpan={1} style={{color: 'red', fontSize: 18}}>{formatValue(calcTotalPrice(order.items), true)}</th>
              </tr>
            </tbody>
          </table>
        </Grid>
        {renderSuccessDialog()}
        {renderConfirmationModal()}
      </Grid>
      <footer style={{position: "fixed", bottom: 0, width: '100%'}}>
        <Grid container spacing={2} style={{backgroundColor: 'white', paddingBottom: '7px'}}>
          <Grid item  xs={6} md={6} alignItems='center' style={{paddingTop: '8px', paddingLeft: '22px'}}>
            <Link href="/products">
              <Button variant="outlined" size="large" fullWidth>
                VOLTAR AO MENU
              </Button>
            </Link>
          </Grid>
          <Grid item xs={6} md={6}  style={{paddingTop: '8px', paddingRight: '8px'}}>
            <Button variant="contained" size="large" 
              onClick={() => setShowConfirmModal(true)} fullWidth style={{padding: '8 10'}}
              disabled={order.items.length === 0}>
              CONFIRMAR
            </Button>
          </Grid>
        </Grid>
      </footer>
    </>
  )
}
