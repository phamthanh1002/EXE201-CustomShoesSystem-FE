import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { topCustomProduct } from '../store/slices/productSlice';

const useTopCustomProducts = () => {
  const dispatch = useDispatch();
  const { topCustomProducts, loadingTopCustom, errorTopCustom } = useSelector(
    (state) => ({
      topCustomProducts: state.products.topCustomProducts,
      loadingTopCustom: state.products.loadingTopCustom,
      errorTopCustom: state.products.errorTopCustom,
    })
  );

  useEffect(() => {
    dispatch(topCustomProduct());
  }, [dispatch]);

  return { topCustomProducts, loadingTopCustom, errorTopCustom };
};

export default useTopCustomProducts;
