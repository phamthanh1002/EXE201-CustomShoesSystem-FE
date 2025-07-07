// hooks/useOrder.js
import { useDispatch, useSelector } from 'react-redux';
import {
  createOrder,
  getAllMyOrder,
  getOrderDetail,
  resetOrderState,
} from '../store/slices/orderSlice';

const useOrder = () => {
  const dispatch = useDispatch();

  const {
    orders,
    orderDetailData,
    orderData,
    paymentUrl,
    message,
    success,

    createOrderLoading,
    createOrderError,

    myOrdersLoading,
    myOrdersError,

    orderDetailLoading,
    orderDetailError,
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

  const fetchOrderDetail = (orderID) => {
    return dispatch(getOrderDetail(orderID));
  };

  return {
    // Actions
    submitOrder,
    fetchMyOrders,
    resetOrder,
    fetchOrderDetail,

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

    // Order Detail State
    orderDetailData,
    orderDetailLoading,
    orderDetailError,
  };
};

export default useOrder;
