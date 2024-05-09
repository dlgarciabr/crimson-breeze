import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';

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
