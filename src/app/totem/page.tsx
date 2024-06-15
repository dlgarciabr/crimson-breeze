"use client";

import Button from '@mui/material/Button';
import Link from 'next/link';
import Image from 'next/image';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const showMenu = () => {
    router.push('/totem/products');
  }
  return (
    <>
      <Grid container spacing={2} justifyContent='center' style={{position: 'absolute', top: '15%'}}>
        <Grid item xs={12} md={12}>
          <Image
            src="/logo_arraial.jpeg"
            alt="Arraial"
            width="800"
            height="800"
            onClick={() => showMenu()}
          />
        </Grid>
      </Grid>
      <footer style={{position: "fixed", bottom: 0, width: '100%', paddingBottom: '10px'}}>
        <Grid container spacing={2} style={{backgroundColor: 'white'}}>
          <Grid item  xs={12} md={12} alignItems='center' style={{paddingTop: '8px', paddingLeft: '22px', paddingRight: '8px', paddingBottom: '8px'}}>
            <Button variant="contained" size="large" fullWidth style={{color: '#ffffff!important'}} onClick={() => showMenu()}>
              NOSSO MENU
            </Button>
          </Grid>
        </Grid>
      </footer>
    </>
  );
}
