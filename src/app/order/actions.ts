'use server'

import { getClient } from "@/utils/pgsql";
import { getProducts } from "../products/actions";

export const processOrder = async (items: OrderItem[]): Promise<number> => {
  const orderValid = await validateOrder(items);
  if(orderValid){
    //save order
    return 1;//TODO return order number
  }
  return -1
}

const validateOrder = async (items: OrderItem[]): Promise<boolean> => {
  const unavailableProducts = await getProducts(false);

  if(items.some(item => unavailableProducts.some(product => product.productId === item.product.productId))){
    //order invalid, product sold out
    return false;
  }
  
  return true;
}

const saveOrder = async (items: OrderItem[]): Promise<number> => {
    const client = await getClient();
    const orderInsert = 'INSERT INTO orders(name, paid) VALUES($1, $2) RETURNING *'
    const values = ['brianc', 'brian.m.carlson@gmail.com']
     
    const res = await client.query(orderInsert, values)
    return res.rows[0].order_id
}