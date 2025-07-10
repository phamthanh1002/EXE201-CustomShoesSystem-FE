// hooks/useOrder.js
import { useDispatch, useSelector } from 'react-redux';
import {
  createOrder,
  getAllMyOrder,
  getAllOrder,
  getOrderDetail,
  pendingShipOrder,
  resetOrderState,
  startProcessingOrder,
} from '../store/slices/orderSlice';

const useOrder = () => {
  const dispatch = useDispatch();

  const {
    allOrders,
    orders,
    orderDetailData,
    orderData,
    paymentUrl,
    message,
    success,

    allOrderLoading,
    allOrderError,

    createOrderLoading,
    createOrderError,

    myOrdersLoading,
    myOrdersError,

    orderDetailLoading,
    orderDetailError,

    startProcessingLoading,
    startProcessingError,

    pendingShipLoading,
    pendingShipError,
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

  const fetchAllOrders = () => {
    return dispatch(getAllOrder());
  };

  const updateStartProcessingStatus = (orderID) => {
    return dispatch(startProcessingOrder(orderID));
  };

  const updatePendingShipStatus = (orderID) => {
    return dispatch(pendingShipOrder(orderID));
  };

  return {
    // Actions
    submitOrder,
    fetchMyOrders,
    resetOrder,
    fetchOrderDetail,
    fetchAllOrders,
    updateStartProcessingStatus,
    updatePendingShipStatus,

    // Create Order State
    createOrderLoading,
    createOrderError,
    success,
    orderData,
    paymentUrl,
    message,

    //All Orders State
    allOrders,
    allOrderLoading,
    allOrderError,

    // My Orders State
    orders,
    myOrdersLoading,
    myOrdersError,

    // Order Detail State
    orderDetailData,
    orderDetailLoading,
    orderDetailError,

    // Start Processing
    startProcessingLoading,
    startProcessingError,

    // Pending Ship
    pendingShipLoading,
    pendingShipError,
  };
};

export default useOrder;
