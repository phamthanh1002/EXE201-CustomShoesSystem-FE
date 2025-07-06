import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
  createAddress,
  getMyAddress,
  setDefaultAddress,
  deleteAddress as deleteAddressThunk, // đổi tên để tránh xung đột
  updateAddress as updateAddressThunk,
} from '../store/slices/customerAddressSlice';

const useCustomerAddress = () => {
  const dispatch = useDispatch();

  const { addresses, loading, error } = useSelector((state) => state.address);

  const defaultAddress = Array.isArray(addresses)
    ? addresses.find((addr) => addr && addr.isDefault)
    : null;

  const createAddresses = useCallback(
    (formData) => {
      return dispatch(createAddress(formData));
    },
    [dispatch],
  );

  const fetchAddresses = useCallback(() => {
    dispatch(getMyAddress());
  }, [dispatch]);

  const makeDefaultAddress = useCallback(
    (addressId) => {
      dispatch(setDefaultAddress(addressId));
    },
    [dispatch],
  );

  const removeAddress = useCallback(
    (addressId) => {
      dispatch(deleteAddressThunk(addressId));
    },
    [dispatch],
  );

  const updateAddresses = useCallback(
    (addressId, data) => {
      return dispatch(updateAddressThunk({ addressId, data }));
    },
    [dispatch],
  );

  return {
    addresses,
    defaultAddress,
    loading,
    error,
    createAddresses,
    fetchAddresses,
    makeDefaultAddress,
    removeAddress,
    updateAddresses,
  };
};

export default useCustomerAddress;
