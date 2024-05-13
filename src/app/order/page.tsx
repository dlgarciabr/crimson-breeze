"use client";
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { calcQuantity, calcTotalPrice, useStore } from '@/utils/order';
import Button from '@mui/material/Button';
import { processOrder } from './actions';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Cart() {
  const { order: {items}, removeItem } = useStore();

  const registerOrder = async () => {
    const ret = await processOrder(items);
    if(ret === -1){
      alert('ORDER INVALID'); //TODO improve
    }else {
      alert('ORDER NUMBER ' + ret); //TODO improve
    }
    //save order if everything is OK
    //show message if anything is NOK
  }
  
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
              items.map(cartItem => (
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
          {calcQuantity(items)} items
          Total: {calcTotalPrice(items)}€
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
        <Button variant="contained" size="large" fullWidth onClick={registerOrder}>
          FINALIZAR PEDIDO
        </Button>
      </Grid>
    </Grid>
  )
}
