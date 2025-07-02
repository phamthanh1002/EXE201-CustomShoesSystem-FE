import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllAccessoryProduct,
  getAllCustomProduct,
  topAccessoryProduct,
  topCustomProduct,
} from '../store/slices/productSlice';

const useProducts = () => {
  const dispatch = useDispatch();

  const {
    customProducts,
    accessoryProducts,
    topCustomProducts,
    topAccessoryProducts,

    loadingTopCustom,
    loadingTopAccessory,
    loadingAllCustom,
    loadingAllAccessory,

    errorTopCustom,
    errorTopAccessory,
    errorAllCustom,
    errorAllAccessory,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(topCustomProduct());
    dispatch(topAccessoryProduct());
    dispatch(getAllCustomProduct());
    dispatch(getAllAccessoryProduct());
  }, [dispatch]);

  return {
    customProducts,
    accessoryProducts,
    topCustomProducts,
    topAccessoryProducts,

    loadingTopCustom,
    loadingTopAccessory,
    loadingAllCustom,
    loadingAllAccessory,

    errorTopCustom,
    errorTopAccessory,
    errorAllCustom,
    errorAllAccessory,
  };
};

export default useProducts;
