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
  removeAllItems: (productId) => set((state) => ({ 
    order: {
      customerName: state.order.customerName,
      items: removeAllItems(state.order.items, productId)
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

export const getItem = (cartItems: OrderItem[], productId: number) => (
  cartItems.find(item => item.product.productId === productId)
);

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
  const modifiedCartItems = (cartItems as OrderItem[] | undefined[]).map(item => {
    if(item?.product.productId === productId){
      if(item.quantity > 0){
        item.quantity--;
      }else{
        item = undefined;
      }
    }
    return item;
  });
  return modifiedCartItems.filter(item => item !== undefined) as OrderItem[];
};

const removeAllItems = (cartItems: OrderItem[], productId: number): OrderItem[] => {
  return cartItems.filter(item => item.product.productId !== productId);
};