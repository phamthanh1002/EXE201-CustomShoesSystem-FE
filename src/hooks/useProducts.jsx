import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllAccessoryProduct,
  getAllCustomProduct,
} from '../store/slices/productSlice';

const useProducts = () => {
  const dispatch = useDispatch();

  const {
    customProducts,
    accessoryProducts,

    loadingAllCustom,
    loadingAllAccessory,

    errorAllCustom,
    errorAllAccessory,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllCustomProduct());
    dispatch(getAllAccessoryProduct());
  }, [dispatch]);

  return {
    customProducts,
    accessoryProducts,

    loadingAllCustom,
    loadingAllAccessory,

    errorAllCustom,
    errorAllAccessory,
  };
};

export default useProducts;
