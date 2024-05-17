import axios from 'axios';
import { useEffect, useState } from 'react';
import { BaseUrl } from 'src/utils/Utils';

export function useSearch(query) {
  const [product, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getProducts = () => {
      setIsLoading(true);
      axios
        .get(`${BaseUrl}/products`)
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
    getProducts();
  }, []);

  return { product, setProducts, isLoading, setIsLoading };
}
