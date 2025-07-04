import { useDispatch, useSelector } from 'react-redux';
import { createOrder, resetOrderState } from '../store/slices/orderSlice';

const useOrder = () => {
  const dispatch = useDispatch();
  const { loading, success, error, orderData, paymentUrl, message } = useSelector(
    (state) => state.order,
  );

  const submitOrder = (formData) => {
    return dispatch(createOrder(formData));
  };

  const resetOrder = () => {
    dispatch(resetOrderState());
  };

  return {
    loading,
    success,
    error,
    orderData,
    paymentUrl,
    message,
    submitOrder,
    resetOrder,
  };
};

export default useOrder;
