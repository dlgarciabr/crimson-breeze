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
