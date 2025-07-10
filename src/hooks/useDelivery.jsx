import { useDispatch, useSelector } from 'react-redux';
import {
  createDelivery,
  startDelivery,
  completeDelivery,
  getDeliveryByOrderID,
  resetDeliveryState,
} from '../store/slices/deliverySlice';

const useDelivery = () => {
  const dispatch = useDispatch();

  const { createdDelivery, fetchedDelivery, loading, error } = useSelector(
    (state) => state.delivery,
  );

  // Actions
  const handleCreateDelivery = (formData) => {
    return dispatch(createDelivery(formData));
  };

  const handleStartDelivery = (deliveryID) => {
    return dispatch(startDelivery(deliveryID));
  };

  const handleCompleteDelivery = (deliveryID) => {
    return dispatch(completeDelivery(deliveryID));
  };

  const handleGetDeliveryByOrderID = (orderID) => {
    return dispatch(getDeliveryByOrderID(orderID));
  };

  const handleResetDelivery = () => {
    dispatch(resetDeliveryState());
  };

  return {
    createdDelivery,
    fetchedDelivery,
    loading,
    error,
    createDelivery: handleCreateDelivery,
    startDelivery: handleStartDelivery,
    completeDelivery: handleCompleteDelivery,
    getDeliveryByOrderID: handleGetDeliveryByOrderID,
    resetDelivery: handleResetDelivery,
  };
};

export default useDelivery;
