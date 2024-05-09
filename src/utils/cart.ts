export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce(
    (accumulator, cartItem) => accumulator + cartItem.product.price * cartItem.quantity,
    0,
  );
}

export const calcQuantity = (items: CartItem[]) => {
  return items.reduce(
    (accumulator, cartItem) => accumulator + cartItem.quantity,
    0,
  );
}

export const addItem = (cartItems: CartItem[], product: Product): CartItem[] => {
  const addedCartItem = cartItems.find(item => item.product.product_id === product.product_id);
  if(addedCartItem){
    addedCartItem.quantity++;
  }else{
    cartItems.push({ tempId: Math.random(), product, quantity: 1 })
  }
  return cartItems;
}