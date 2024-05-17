import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';

import React, { useEffect, useState } from 'react';
import ProductFilters from '../product-filters';
import { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BaseUrl } from 'src/utils/Utils';
import { useRouter } from 'src/routes/hooks';

const ProductDetails = () => {
  const { id } = useParams();
  const [productDetails, setProductsDetails] = useState({});

  useEffect(() => {
    async function getSingleProduct() {
      try {
        const res = await axios.get(`${BaseUrl}/products/${id}`);
        console.log(res);
        setProductsDetails(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    getSingleProduct();
  }, []);

  const router = useRouter();
  const back = () => {
    router.back();
  };

  return (
    <Container>
      <Toaster />
      <Button onClick={back}>Back</Button>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Products Details
      </Typography>

      <Grid container spacing={3}>
        {/* {getValue?.map((product) => (
        <Grid key={product.id} xs={12} sm={6} md={3}>
          <ProductCard product={product} />
        </Grid>
      ))} */}
      </Grid>
      <Box
        sx={{
          display: 'grid',
          gap: 1,
          gridTemplateColumns: 'repeat(2, 1fr)',
        }}
      >
        <Typography component="h2">{productDetails.title}</Typography>
        <img src={productDetails?.images?.length > 0 && productDetails.images[0]} alt="" />
        <Typography component="span">{productDetails.price}</Typography>
      </Box>

      {/* <ProductCartWidget /> */}
    </Container>
  );
};

export default ProductDetails;
