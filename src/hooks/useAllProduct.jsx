import { useDispatch, useSelector } from 'react-redux';
import {
  createAccessoryProduct as createAccessoryThunk,
  createCustomProduct as createCustomThunk,
  deleteProduct as deleteProductThunk,
  updateProduct as updateProductThunk,
  changeActiveProduct as changeActiveProductThunk,
  getAllProduct,
} from '../store/slices/productSlice';

const useAllProduct = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const fetchAllProduct = () => {
    return dispatch(getAllProduct()).unwrap();
  };

  const deleteProduct = (productID) => {
    return dispatch(deleteProductThunk(productID)).unwrap();
  };

  const createCustomProduct = (formData) => {
    return dispatch(createCustomThunk(formData)).unwrap();
  };

  const createAccessoryProduct = (formData) => {
    return dispatch(createAccessoryThunk(formData)).unwrap();
  };

  const updateProduct = (productID, formData) => {
    return dispatch(updateProductThunk({ productID, formData })).unwrap();
  };

  const changeActiveProduct = (productID) => {
    return dispatch(changeActiveProductThunk(productID)).unwrap();
  };

  return {
    fetchAllProduct,
    createCustomProduct,
    createAccessoryProduct,
    deleteProduct,
    updateProduct,
    changeActiveProduct,
    products,
    loading,
    error,
  };
};

export default useAllProduct;
