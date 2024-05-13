interface CartState {
  items: CartItem[]
  addItem: (item: Product) => void
  removeItem: (productId: number) => void
}

interface Product {
  productId: number;
  description: string;
  price: number;
  available: boolean;
  visible: boolean;
}

interface CartItem {
  tempId: number;
  product: Product;
  quantity: number;
}
