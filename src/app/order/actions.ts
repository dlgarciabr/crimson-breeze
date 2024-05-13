'use server'

import { getProducts } from "../products/actions";

export const validateOrder = async (items: CartItem[]): Promise<boolean> => {
  const unavailableProducts = await getProducts(false);

  if(items.some(item => unavailableProducts.some(product => product.productId === item.product.productId))){
    //order invalid, product sold out
    return false;
  }
  
  return true;
}

export const processOrder = async (items: CartItem[]): Promise<number> => {
  const orderValid = await validateOrder(items);
  if(orderValid){
    //save order
    return 1;//TODO return order number
  }
  return -1
}