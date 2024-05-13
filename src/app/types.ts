interface OrderState {
  order: Order;
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

interface OrderItem {
  tempId: number;
  product: Product;
  quantity: number;
}

interface Order {
  customerName: string;
  items: OrderItem[];
}