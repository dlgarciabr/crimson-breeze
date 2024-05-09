interface CartState {
  items: CartItem[]
  addItem: (item: Product) => void
  removeItem: (productId: number) => void
}

interface Product {
  product_id: number;
  description: string;
  price: number;
}

interface CartItem {
  tempId: number;
  product: Product;
  quantity: number;
}
