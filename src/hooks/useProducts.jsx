// src/hooks/useTopCustomProducts.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { topAccessoryProduct, topCustomProduct } from '../store/slices/productSlice';

const useProducts = () => {
  const dispatch = useDispatch();

  const { topCustomProducts, topAccessoryProducts, loading, error } = useSelector(
    (state) => state.products,
  );

  useEffect(() => {
    dispatch(topCustomProduct());
    dispatch(topAccessoryProduct());
  }, [dispatch]);

  return {
    topCustomProducts,
    topAccessoryProducts,
    loading,
    error,
  };
};

export default useProducts;
