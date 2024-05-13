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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Products() {

  const [products, setProducts] = useState<Product[]>([]);
  const { addItem, order: {items} } = useStore();

  useEffect(() => {
    (async ()=>{
      const result = await getProducts();
      setProducts(result);
    })();
  },[])

  const renderProductCard = (product: Product) => {
    return (
      <Paper elevation={3} key={product.productId} onClick={() => addItem(product)}>
        {product.description}{product.price}
      </Paper>
    );
  }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Agrupamento 549 Ovar
          </Typography>
            <div>
              <Link href="/order">
                <Badge badgeContent={calcQuantity(items)} color="secondary">
                  <ShoppingCart/>
                </Badge>
              </Link>
            </div>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 128,
            height: 128,
          },
        }}
      >
        {products.filter(product => product.available && product.visible).map(renderProductCard)}
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Item>
            <Link href="/order">
              <Button variant="contained" size="large" fullWidth>
                Ver meu pedido
              </Button>
            </Link>
          </Item>
        </Grid>
      </Grid>
    </Box>
  )
}
