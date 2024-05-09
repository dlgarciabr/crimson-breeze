"use client";

import { useEffect, useState } from "react";
import { getProducts } from '@/app/products/actions'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import { useStore } from "../page";
import Badge from '@mui/material/Badge';
import { calcQuantity } from "@/utils/cart";

export default function Products() {

  const [products, setProducts] = useState<Product[]>([]);
  const { addItem, items } = useStore();

  useEffect(() => {
    (async ()=>{
      const result = await getProducts();
      setProducts(result);
    })();
  },[])

  const renderProductCard = (product: Product) => {
    return (
      <Paper elevation={3} key={product.product_id} onClick={() => addItem(product)}>
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
        {products.map(renderProductCard)}
      </Box>
    </Box>
  )
}
