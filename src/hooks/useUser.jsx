import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeAccountStatus,
  getAllUser as getAllUserThunk,
  createNewStaff as createNewStaffThunk,
} from '../store/slices/userSlice';

export default function useUser() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);

  const getAllUser = useCallback(() => {
    dispatch(getAllUserThunk());
  }, [dispatch]);

  const changeUserStatus = useCallback(
    (email) => {
      dispatch(changeAccountStatus(email));
    },
    [dispatch],
  );

  const createNewStaff = useCallback(
    (formData) => {
      dispatch(createNewStaffThunk(formData));
    },
    [dispatch],
  );

  return {
    getAllUser,
    changeUserStatus,
    createNewStaff,
    users,
    loading,
    error,
  };
}
