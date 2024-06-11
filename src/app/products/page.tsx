"use client";

import { useEffect, useState } from "react";
import { getProducts } from '@/app/products/actions'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import Badge from '@mui/material/Badge';
import { calcQuantity, useStore, getItem } from "@/utils/order";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { ThemeProvider, styled } from '@mui/material/styles';
import { ToastType, showToast } from "@/components/Toast";
import { formatValue } from "@/utils/format";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from 'next/navigation';
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton/IconButton";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#fff!important' : '#fff!important',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Products() {

  const [products, setProducts] = useState<Product[]>([]);
  const { addItem, order, removeItem } = useStore();
  const router = useRouter();
  const [isDarkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    (async ()=>{
      const result = await getProducts();
      setProducts(result);
    })();
  },[])

  const addToOrder = (product: Product) => {
    if(!product.available){
      return;
    }
    addItem(product);
    showToast(ToastType.SUCCESS, `1 ${product.description} adicionado ao pedido!`);
  }

  const removeFromOrder = (product: Product) => {
    removeItem(product.productId)
    showToast(ToastType.WARNING, `1 ${product.description} removido do pedido!`);
  }

  const showSummary = () => {
    router.push('/order');
  }

  const renderProductCard = (product: Product) => {
    const productQuantityInOrder = getItem(order.items, product.productId)?.quantity || 0;
    return (
      <Paper elevation={3} key={product.productId}
        style={{paddingTop: '10px', textAlign: 'center'}}>
        <Typography variant="h5" component="div" style={product.available ? { height: '55px' } : {color: 'grey', height: '55px'}}>
          {product.description}
        </Typography>
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
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <header style={{ position: "fixed", top: 0, width: '100%'}}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Arraial Santos Populares
            </Typography>
              <div>
                <Link href="/order">
                  <Badge badgeContent={calcQuantity(order.items)} color="secondary">
                    <ShoppingCart/>
                  </Badge>
                </Link>
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
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                  m: 1,
                  width: '45%',
                  height: 150,
                },
              }}
            >
              {products.filter(product => product.visible && product.type === 1).sort((a,b)=> a.order < b.order ? -1 : 1).map(renderProductCard)}
            </Box>
            <p style={{color: '#000000', textAlign: 'center', fontSize: '1.5rem'}}>BEBIDAS</p>
            <Box
              sx={{
                marginBottom: '60px',
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                  m: 1,
                  width: '45%',
                  height: 150,
                },
              }}
            >
              {products.filter(product => product.visible && product.type === 2).sort((a,b)=> a.order < b.order ? -1 : 1).map(renderProductCard)}
            </Box>
          </>
        )
      }
      <footer style={{position: "fixed", bottom: 0, width: '100%'}}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Item>
              <Button variant="contained" size="large" fullWidth disabled={order.items.length === 0} style={{color: '#ffffff!important'}} onClick={() => showSummary()}>
                FINALIZAR ESCOLHA
              </Button>
            </Item>
          </Grid>
        </Grid>
      </footer>
    </Box>
  )
}
