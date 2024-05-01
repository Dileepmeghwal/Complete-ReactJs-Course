import { useEffect, useState } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { products } from 'src/_mock/products';

import ProductCard from '../product-card';
import ProductSort from '../product-sort';
import ProductFilters from '../product-filters';
import ProductCartWidget from '../product-cart-widget';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { MoonLoader } from 'react-spinners';

// ----------------------------------------------------------------------

export default function ProductsView() {
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    setIsLoading(true);
    axios
      .get(`https://api.escuelajs.co/api/v1/products`)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error('data not found!');
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  };

  const handleKeyDown = (event) => {
    console.log('A key was pressed', event.keyCode);
  };

  useEffect(() => {
    window.addEventListener('click', handleKeyDown);
    return window.removeEventListener('click', handleKeyDown);
  }, []);

  const override = {
    display: 'flex',
    posittion: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%)',
  };
  if (isLoading) return <MoonLoader cssOverride={override} loading={isLoading} />;

  return (
    <Container>
      <Toaster />
      <Typography variant="h4" sx={{ mb: 5 }}>
        Products
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

          <ProductSort />
        </Stack>
      </Stack>
      {isLoading && 'loading..'}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      <ProductCartWidget />
    </Container>
  );
}
