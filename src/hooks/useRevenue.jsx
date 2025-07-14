import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMonthlyRevenue as getMonthlyRevenueThunk } from '../store/slices/revenueSlice';

export default function useRevenue() {
  const dispatch = useDispatch();
  const { revenues, loading, error } = useSelector((state) => state.revenue);

  const getMonthlyRevenue = useCallback(
    (formData) => {
      dispatch(getMonthlyRevenueThunk(formData));
    },
    [dispatch],
  );

  return {
    getMonthlyRevenue,
    revenues,
    loading,
    error,
  };
}
