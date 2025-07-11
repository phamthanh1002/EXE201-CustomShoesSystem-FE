import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllPickup,
  createShipper,
  updatePickingUp,
  updatePickupDone,
} from '../store/slices/pickupSlice';

export default function usePickup({ autoFetch = false } = {}) {
  const dispatch = useDispatch();

  const { pickup, loading, error } = useSelector((state) => state.pickup);

  const fetchPickup = useCallback(() => {
    return dispatch(getAllPickup());
  }, [dispatch]);

  const handleCreateShipper = useCallback(
    (pickupID, formData) => {
      return dispatch(createShipper({ pickupID, formData }));
    },
    [dispatch],
  );

  const handleUpdatePickingUp = useCallback(
    (pickupID) => {
      return dispatch(updatePickingUp({ pickupID }));
    },
    [dispatch],
  );

  const handlePickupDone = useCallback(
    (pickupID) => {
      return dispatch(updatePickupDone({ pickupID }));
    },
    [dispatch],
  );

  useEffect(() => {
    if (autoFetch) {
      fetchPickup();
    }
  }, [autoFetch, fetchPickup]);

  return {
    pickup,
    loading,
    error,
    fetchPickup,
    createShipper: handleCreateShipper,
    updatePickingUp: handleUpdatePickingUp,
    updatePickupDone: handlePickupDone,
  };
}
