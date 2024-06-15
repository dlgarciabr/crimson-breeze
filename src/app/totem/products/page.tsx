"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { getProducts } from '@/app/products/actions'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { calcQuantity, useStore, getItem } from "@/utils/order";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { ToastType, showToast } from "@/components/Toast";
import { formatValue } from "@/utils/format";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from 'next/navigation';
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton/IconButton";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Dialog from "@mui/material/Dialog";
import { DialogContent, DialogContentText, DialogActions, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Products() {

  const [products, setProducts] = useState<Product[]>([]);
  const { addItem, order, removeItem, clearOrder } = useStore();
  const router = useRouter();
  const [ showCancelConfirmModal, setShowCancelConfirmModal ] = useState<boolean>(false);
  const timeoutId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    (async ()=>{
      const result = await getProducts();
      setProducts(result);
    })();
  },[])

  useEffect(()=>{
    clearTimeout(timeoutId.current);
    const newTimeoutId = setTimeout(()=>{
      cancelOrder();
    }, 180000);
    timeoutId.current = newTimeoutId;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[order.lastUpdate]);

  const addToOrder = (product: Product) => {
    if(!product.available){
      return;
    }
    addItem(product);
    showToast(ToastType.SUCCESS, `${product.description} adicionado ao pedido!`);
  }

  const removeFromOrder = (product: Product) => {
    removeItem(product.productId)
    showToast(ToastType.WARNING, `${product.description} removido do pedido!`);
  }

  const showOrderSummary = () => {
    if(order.items.length > 0){
      clearTimeout(timeoutId.current);
      router.push('/totem/order');
    }
  }

  const getName = (title: string) => title.split('(')[0];

  const getDescription = (title: string) => { 
    const tempDesc = title.split('(')[1];
    return tempDesc ? tempDesc.substring(0, tempDesc.length - 1) : '';
  };

  const renderProductCard = (product: Product) => {
    const productQuantityInOrder = getItem(order.items, product.productId)?.quantity || 0;
    return (
      <Paper elevation={3} key={product.productId}
        style={{paddingTop: '10px', textAlign: 'center'}}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} style={product.available ? { height: getDescription(product.description) ? '55px': '75px' } : {color: 'grey', height: getDescription(product.description) ? '55px': '75px'}}>
            <Typography variant="h5">{getName(product.description)}</Typography>
          </Box>
        {
          getDescription(product.description) && 
          <Typography variant="subtitle1" component="div" style={product.available ? { height: '20px', lineHeight: '1.25' } : {color: 'grey', height: '20px', lineHeight: '1.25'}}>
            {getDescription(product.description)}
          </Typography>
        }
        <Typography variant="h5" color="text.secondary" style={product.available ? {} : {color: 'grey'}}>
          {formatValue(product.price, true)}
        </Typography>
        {product.available ?
          <>
            <IconButton aria-label="delete" size="medium" onClick={() => removeFromOrder(product)} 
              disabled={!(productQuantityInOrder > 0)}>
              <RemoveCircleOutlineIcon fontSize="inherit" />
            </IconButton>
              <TextField id="outlined-basic" variant="outlined" size="small" 
                sx={{ 
                  width: '40%',
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#00b531",
                    fontWeight: "bold",
                  },
                }}  
                inputProps={{style: {textAlign: 'center'}}} 
                value={productQuantityInOrder} disabled/>
            <IconButton aria-label="delete" size="medium" onClick={() => addToOrder(product)}>
              <AddCircleOutlineIcon fontSize="inherit" />
            </IconButton>
          </> :
          <Typography variant="h6" color="red">
            indisponível
          </Typography>
        }
      </Paper>
    );
  }

  const renderCancelConfirmationModal = () => {
    return (
      <Dialog 
        open={showCancelConfirmModal}
        maxWidth="xs"
        disableEscapeKeyDown={true}
        TransitionComponent={Transition}>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Typography variant="h6" component="div" align='center'>
              Deseja realmente cancelar a escolha?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setShowCancelConfirmModal(false)}>
            VOLTAR
          </Button>
          <Button onClick={cancelOrder}>
            CONFIRMAR
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  const cancelOrder = () => {
    clearOrder();
    router.push('/totem');
  }
  
  return (
    <Box sx={{ flexGrow: 1, paddingTop: '30px', paddingBottom: '80px' }}>
      <header style={{ position: "fixed", top: 0, width: '100%', zIndex: '100', paddingTop: '15px'}}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Arraial Santos Populares
            </Typography>
              <div onClick={() => showOrderSummary()}>
                <Badge badgeContent={calcQuantity(order.items)} color="secondary">
                  <ShoppingCart/>
                </Badge>
              </div>
          </Toolbar>
        </AppBar>
      </header>
      {
        products.length === 0 ?
        <div style={{position: 'absolute', height: '1000px', top: '47%', left: '46%'}}>
          <CircularProgress />
        </div>
         : 
        (
          <>
            <p style={{color: '#000000', textAlign: 'center', fontSize: '1.5rem',  marginTop: '60px'}}>COMIDAS</p>
            <Box
              sx={{
                display: 'ruby',
                flexWrap: 'wrap',
                '& > :not(style)': {
                  m: 1,
                  width: '45%',
                  height: 165,
                },
              }}
            >
              {products.filter(product => product.visible && product.type === 1).sort((a,b)=> a.order < b.order ? -1 : 1).map(renderProductCard)}
            </Box>
            <p style={{color: '#000000', textAlign: 'center', fontSize: '1.5rem'}}>BEBIDAS</p>
            <Box
              sx={{
                marginBottom: '60px',
                display: 'ruby',
                flexWrap: 'wrap',
                '& > :not(style)': {
                  m: 1,
                  width: '45%',
                  height: 165,
                },
              }}
            >
              {products.filter(product => product.visible && product.type === 2).sort((a,b)=> a.order < b.order ? -1 : 1).map(renderProductCard)}
            </Box>
          </>
        )
      }
      {/* <footer style={{position: "fixed", bottom: 0, width: '100%', paddingBottom: '20px'}}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Item>
              <Button variant="contained" size="large" fullWidth disabled={order.items.length === 0} style={{color: '#ffffff!important'}} onClick={() => showOrderSummary()}>
                FINALIZAR ESCOLHA
              </Button>
            </Item>
          </Grid>
        </Grid>
      </footer>
    */}
      <footer style={{position: "fixed", bottom: 0, width: '100%', paddingBottom: '15px'}}>
        <Grid container spacing={2} style={{backgroundColor: 'white', paddingBottom: '7px'}}>
          <Grid item  xs={6} md={6} alignItems='center' style={{paddingTop: '8px', paddingLeft: '22px'}}>
            <Button variant="outlined" size="large" fullWidth onClick={()=> setShowCancelConfirmModal(true)}>
              CANCELAR
            </Button>
          </Grid>
          <Grid item xs={6} md={6}  style={{paddingTop: '8px', paddingRight: '8px'}}>
            <Button variant="contained" size="large" 
               onClick={() => showOrderSummary()} fullWidth style={{padding: '8 10'}}
              disabled={order.items.length === 0}>
              FINALIZAR ESCOLHA
            </Button>
          </Grid>
        </Grid>
      </footer>
      {renderCancelConfirmationModal()}
    </Box> 
  )
}
