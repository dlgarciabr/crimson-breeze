'use server'

import { getClient } from "@/utils/pgsql";
import { getProducts } from "../products/actions";

export const processOrder = async (order: Order): Promise<number> => {
  const orderValid = await validateOrder(order.items);
  if(orderValid){
    //save order
    return await saveOrder(order);
    //return 1;//TODO return order number
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

const saveOrder = async (order: Order): Promise<number> => {
  const client = await getClient();
  try {
    await client.query('BEGIN');
    const orderInsert = 'INSERT INTO orders(name, paid) VALUES($1, \'f\') RETURNING *'
    const values = [order.customerName];
     
    const orderQueryResponse = await client.query(orderInsert, values)

    const itemsInsert = 'INSERT INTO order_products(order_id, product_id, quantity) VALUES ($1, $2, $3)';

    for(let i = 0; i < order.items.length; i++){
      const orderItem = order.items[i];
      const insertPhotoValues = [
        orderQueryResponse.rows[0].order_id, 
        orderItem.product.productId,
        orderItem.quantity
      ];
      await client.query(itemsInsert, insertPhotoValues)
    }
    
    await client.query('COMMIT');
    return orderQueryResponse.rows[0].order_id
  } catch (e) {
    await client.query('ROLLBACK');
    throw e
  } finally {
    //client.release();
  }
}