import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser as getAllUserThunk } from '../store/slices/userSlice';

export default function useUser() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);

  const getAllUser = useCallback(() => {
    dispatch(getAllUserThunk());
  }, [dispatch]);

  return {
    getAllUser,
    users,
    loading,
    error,
  };
}
