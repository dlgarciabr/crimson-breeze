import { create } from 'zustand';

export const useStore = create<OrderState>((set) => ({
  order: {
    customerName: '',
    items: []
  },
  addItem: (product) => set((state) => ({ 
    order: {
      customerName: state.order.customerName,
      items: addItem(state.order.items, product)
    }
  })),
  removeItem: (productId) => set((state) => ({ 
    order: {
      customerName: state.order.customerName,
      items: removeItem(state.order.items, productId)
    }
  })),
  clearOrder: () => set(() => ({
    order: {
      customerName: '',
      items: []
    }
  })),
}))

export const calcTotalPrice = (items: OrderItem[]) => {
  return items.reduce(
    (accumulator, cartItem) => accumulator + cartItem.product.price * cartItem.quantity,
    0,
  );
}

export const calcQuantity = (items: OrderItem[]) => {
  return items.reduce(
    (accumulator, cartItem) => accumulator + cartItem.quantity,
    0,
  );
}

const addItem = (cartItems: OrderItem[], product: Product): OrderItem[] => {
  const addedCartItem = cartItems.find(item => item.product.productId === product.productId);
  if(addedCartItem){
    addedCartItem.quantity++;
  }else{
    cartItems.push({ tempId: Math.random(), product, quantity: 1 })
  }
  return cartItems;
}

const removeItem = (cartItems: OrderItem[], productId: number): OrderItem[] => {
  return cartItems.filter(item => item.product.productId !== productId);
};