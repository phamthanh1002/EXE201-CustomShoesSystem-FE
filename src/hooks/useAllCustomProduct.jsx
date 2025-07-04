import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCustomProduct } from '../store/slices/productSlice';

const useAllCustomProducts = () => {
  const dispatch = useDispatch();
  const { customProducts, loadingAllCustom, errorAllCustom } = useSelector(
    (state) => ({
      customProducts: state.products.customProducts,
      loadingAllCustom: state.products.loadingAllCustom,
      errorAllCustom: state.products.errorAllCustom,
    })
  );

  useEffect(() => {
    dispatch(getAllCustomProduct());
  }, [dispatch]);

  return { customProducts, loadingAllCustom, errorAllCustom };
};

export default useAllCustomProducts;
