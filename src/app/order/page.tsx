"use client";
import Link from 'next/link';
import { useStore } from '../page';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { calcQuantity, calcTotalPrice } from '@/utils/cart';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Cart() {
  const { items, removeItem } = useStore();
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={8}>
        <Item>
          VOSSO PEDIDO
        </Item>
      </Grid>
      <Grid item xs={6} md={4}>
        <Item>
          <Link href="/products">products</Link>
        </Item>
      </Grid>
      <Grid item xs={6} md={4}>
        <table>
          <tr>
            <th>item</th>
            <th>preço</th>
            <th>quantidade</th>
            <th>total</th>
            <th></th>
          </tr>
          {
            items.map(cartItem => (
              <tr key={cartItem.tempId}>
                <td>{cartItem.product.description}</td>
                <td>{cartItem.product.price}</td>
                <td>{cartItem.quantity}</td>
                <td>{cartItem.quantity * cartItem.product.price}</td>
                <td onClick={() => removeItem(cartItem.product.product_id)}>X</td>
              </tr>
            ))
          }
        </table>
        <Grid item xs={6} md={4}>
          <Item>
            {calcQuantity(items)} items
            Total: {calcTotalPrice(items)}€
          </Item>
      </Grid>
      </Grid>
    </Grid>
  )
}
