import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { topAccessoryProduct } from '../store/slices/productSlice';

const useTopAccessoryProducts = () => {
  const dispatch = useDispatch();
  const { topAccessoryProducts, loadingTopAccessory, errorTopAccessory } = useSelector(
    (state) => ({
      topAccessoryProducts: state.products.topAccessoryProducts,
      loadingTopAccessory: state.products.loadingTopAccessory,
      errorTopAccessory: state.products.errorTopAccessory,
    })
  );

  useEffect(() => {
    dispatch(topAccessoryProduct());
  }, [dispatch]);

  return { topAccessoryProducts, loadingTopAccessory, errorTopAccessory };
};

export default useTopAccessoryProducts;
