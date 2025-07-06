// hooks/useOrder.js
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, getAllMyOrder, resetOrderState } from '../store/slices/orderSlice';

const useOrder = () => {
  const dispatch = useDispatch();

  const {
    orders,
    orderData,
    paymentUrl,
    message,
    success,

    createOrderLoading,
    createOrderError,

    myOrdersLoading,
    myOrdersError,
  } = useSelector((state) => state.order);

  const submitOrder = (formData) => {
    return dispatch(createOrder(formData));
  };

  const fetchMyOrders = (userId) => {
    return dispatch(getAllMyOrder(userId));
  };

  const resetOrder = () => {
    dispatch(resetOrderState());
  };

  return {
    // Actions
    submitOrder,
    fetchMyOrders,
    resetOrder,

    // Create Order State
    createOrderLoading,
    createOrderError,
    success,
    orderData,
    paymentUrl,
    message,

    // My Orders State
    orders,
    myOrdersLoading,
    myOrdersError,
  };
};

export default useOrder;
