"use client";
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
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
    if(!customerName){
      return;
    }
    setShowConfirmModal(false);
    order.customerName = customerName;
    const orderNumber = await processOrder(order);
    if(orderNumber === -1){
      alert('ORDER INVALID'); //TODO improve
    }else {
      // alert('ORDER NUMBER ' + ret); //TODO improve
      setOrderNumber(orderNumber);
      setShowSuccessModal(true);
      clearOrder();
    }
    //save order if everything is OK
    //show message if anything is NOK
  }
  
  const renderSuccessDialog = () => {
    return (
      <Dialog 
        open={showSuccessModal}
        disableEscapeKeyDown={true}
        TransitionComponent={Transition}>
        <DialogTitle>Vosso pedido foi registrado com sucesso!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Typography variant="h6" component="div">
              pedido nº
            </Typography>
            <Typography variant="h1" component="div">
              {orderNumber}
            </Typography>
            <Typography variant="h6" component="div" style={{color: "red"}}>
              Por favor grave este número para ser usado posteriormente!
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
        <DialogTitle>Confirmação</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Typography variant="h6" component="div">
              Insira o vosso nome e confirme o pedido?
            </Typography>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Nome"
              type="text"
              fullWidth
              variant="outlined"
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
    router.push('/');
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Item>
          DETALHES DO PEDIDO
        </Item>
      </Grid>
      <Grid item xs={6} md={4}>
        <table>
          <tbody>
            <tr>
              <th>item</th>
              <th>preço</th>
              <th>quantidade</th>
              <th>total</th>
              <th></th>
            </tr>
            {
              order.items.map(cartItem => (
                <tr key={cartItem.tempId}>
                  <td>{cartItem.product.description}</td>
                  <td>{cartItem.product.price}</td>
                  <td>{cartItem.quantity}</td>
                  <td>{cartItem.quantity * cartItem.product.price}</td>
                  <td onClick={() => removeItem(cartItem.product.productId)}>X</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </Grid>
      <Grid item xs={12} md={12}>
        <Item>
          {calcQuantity(order.items)} items
          Total: {calcTotalPrice(order.items)}€
        </Item>
      </Grid>
      <Grid item xs={6} md={6}>
        <Link href="/products">
          <Button variant="outlined" size="large" fullWidth>
            VOLTAR AO MENU
          </Button>
        </Link>
      </Grid>
      <Grid item xs={6} md={6}>
        <Button variant="contained" size="large" fullWidth onClick={() => setShowConfirmModal(true)}>
          FINALIZAR PEDIDO
        </Button>
      </Grid>
      {renderSuccessDialog()}
      {renderConfirmationModal()}
    </Grid>
  )
}
