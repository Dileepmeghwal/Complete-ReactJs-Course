import { Helmet } from 'react-helmet-async';
import { ProductsDetails } from 'src/routes/sections';
import { ProductsDetailsView } from 'src/sections/products/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Products | Minimal UI </title>
      </Helmet>

      <ProductsDetailsView />
    </>
  );
}
