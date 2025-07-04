import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAccessoryProduct } from '../store/slices/productSlice';

const useAllAccessoryProducts = () => {
  const dispatch = useDispatch();
  const { accessoryProducts, loadingAllAccessory, errorAllAccessory } = useSelector(
    (state) => ({
      accessoryProducts: state.products.accessoryProducts,
      loadingAllAccessory: state.products.loadingAllAccessory,
      errorAllAccessory: state.products.errorAllAccessory,
    })
  );

  useEffect(() => {
    dispatch(getAllAccessoryProduct());
  }, [dispatch]);

  return { accessoryProducts, loadingAllAccessory, errorAllAccessory };
};

export default useAllAccessoryProducts;
