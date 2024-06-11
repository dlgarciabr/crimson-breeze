import Button from '@mui/material/Button';
import Link from 'next/link';
import Image from 'next/image';
import Grid from '@mui/material/Grid';

export default function Home() {
  return (
    <>
      <Grid container spacing={2} justifyContent='center' style={{position: 'absolute', top: '15%'}}>
        <Grid item xs={12} md={12}>
          <Link href="/products">
            <Image
              src="/logo_arraial.jpeg"
              alt="Arraial"
              width="500"
              height="500"
            />
          </Link>
        </Grid>
      </Grid>
      <footer style={{position: "fixed", bottom: 0, width: '100%'}}>
        <Grid container spacing={2} style={{backgroundColor: 'white'}}>
          <Grid item  xs={12} md={12} alignItems='center' style={{paddingTop: '8px', paddingLeft: '22px', paddingRight: '8px', paddingBottom: '8px'}}>
            <Link href="/products">
              <Button variant="contained" size="large" fullWidth style={{color: '#ffffff!important'}}>
                NOSSO MENU
              </Button>
            </Link>
          </Grid>
        </Grid>
      </footer>
    </>
  );
}
