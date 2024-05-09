import { addItem, removeItem } from "@/utils/cart";
import { create } from 'zustand'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';

export const useStore = create<CartState>((set) => ({
  items: [],
  addItem: (product) => set((state) => ({ items: addItem(state.items, product)})),
  removeItem: (productId) => set((state) => ({ items: removeItem(state.items, productId)})),
}))

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Typography variant="h4" component="h4">
        Agrupamento 549 Ovar
      </Typography>
      Bem vindo!

      <Link href="/products">
        <Button variant="contained" size="large">
          Faça seu pedido
        </Button>
      </Link>
    </main>
  );
}
