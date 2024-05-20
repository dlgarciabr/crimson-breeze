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
import { calcQuantity, useStore } from "@/utils/order";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { ToastType, showToast } from "@/components/Toast";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Products() {

  const [products, setProducts] = useState<Product[]>([]);
  const { addItem, order } = useStore();

  useEffect(() => {
    (async ()=>{
      const result = await getProducts();
      setProducts(result);
    })();
  },[])

  const addToOrder = (product: Product) => {
    addItem(product);
    showToast(ToastType.SUCCESS, `${product.description} adicionado ao pedido!`);
  }

  const renderProductCard = (product: Product) => {
    return (
      <Paper elevation={3} key={product.productId} onClick={() => addToOrder(product)}
        style={{paddingTop: '20px', textAlign: 'center'}}>
        <Typography variant="h5" component="div">
          {product.description}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          {product.price.toString().replace('.',',')} €
        </Typography>
      </Paper>
    );
  }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <header style={{ position: "fixed", top: 0, width: '100%'}}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Agrupamento 549 Ovar
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
      <Box
        sx={{
          marginTop: '60px',
          marginBottom: '60px',
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: '45%',
            height: 128,
          },
        }}
      >
        {products.filter(product => product.available && product.visible).map(renderProductCard)}
      </Box>
      <footer style={{position: "fixed", bottom: 0, width: '100%'}}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Item>
              <Link href="/order">
                <Button variant="contained" size="large" fullWidth disabled={order.items.length === 0}>
                  Ver meu pedido
                </Button>
              </Link>
            </Item>
          </Grid>
        </Grid>
      </footer>
    </Box>
  )
}
