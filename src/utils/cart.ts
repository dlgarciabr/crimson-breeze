import { create } from 'zustand';

export const useStore = create<CartState>((set) => ({
  items: [],
  addItem: (product) => set((state) => ({ items: addItem(state.items, product)})),
  removeItem: (productId) => set((state) => ({ items: removeItem(state.items, productId)})),
}))

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
  const addedCartItem = cartItems.find(item => item.product.productId === product.productId);
  if(addedCartItem){
    addedCartItem.quantity++;
  }else{
    cartItems.push({ tempId: Math.random(), product, quantity: 1 })
  }
  return cartItems;
}

export const removeItem = (cartItems: CartItem[], productId: number): CartItem[] => {
  return cartItems.filter(item => item.product.productId !== productId);
}