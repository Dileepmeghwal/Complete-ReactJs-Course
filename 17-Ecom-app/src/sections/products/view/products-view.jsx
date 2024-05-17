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
import { useGlobalContext } from 'src/hooks/searchContext';
import { BaseUrl } from 'src/utils/Utils';
import { Pagination } from '@mui/material';

// ----------------------------------------------------------------------

export default function ProductsDetail() {
  const [openFilter, setOpenFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [products, setProducts] = useState([]);
  const { getValue, setValue } = useGlobalContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [categories, setCategories] = useState([]);
  // const { product, isLoading } = useSearch();

  const indexOflastProduct = currentPage * productsPerPage;
  const indexOfFirstPage = indexOflastProduct - productsPerPage;
  const currentProducts = getValue.slice(indexOfFirstPage, indexOflastProduct);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  useEffect(() => {
    getProducts();
  }, [currentPage]);

  const getProducts = () => {
    setIsLoading(true);
    axios
      .get(`${BaseUrl}/products`)
      .then((res) => {
        console.log('products', res);
        if (res.status !== 200) {
          throw new Error('Something went wrong with fetching products.');
        }
        setValue(res.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message);
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  };

  const getCategories = async () => {
    try {
      const res = axios.get(`${BaseUrl}/categories`);
      const data = (await res).data;
      console.log(data);
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  if (isLoading) return <MoonLoader loading={isLoading} />;

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
            data={categories}
          />
          <ProductSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {currentProducts?.map((product) => (
          <Grid key={product.id} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={Math.ceil(getValue.length / productsPerPage)}
        page={currentPage}
        onChange={handleChangePage}
        color="primary"
        size="large"
      />

      <ProductCartWidget />
    </Container>
  );
}
