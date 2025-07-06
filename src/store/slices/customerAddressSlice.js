// src/store/slices/customerAddressSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../axiosClient';
import {
  API_CREATE_ADDRESS,
  API_DELETE_ADDRESS,
  API_GET_MY_ADDRESS,
  API_SET_DEFAULT_ADDRESS,
  API_UPDATE_ADDRESS,
} from '../../constant';
import { setUserAddresses } from './authSlice';

// Create Address
export const createAddress = createAsyncThunk(
  'customerAddress/create',
  async (formData, { rejectWithValue }) => {
    try {
      const response = axiosClient.post(API_CREATE_ADDRESS, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || err.message);
    }
  },
);

// GET
export const getMyAddress = createAsyncThunk(
  'customerAddress/getMyAddress',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await axiosClient.get(API_GET_MY_ADDRESS);
      dispatch(setUserAddresses(res.data));
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

// SET DEFAULT
export const setDefaultAddress = createAsyncThunk(
  'customerAddress/setDefault',
  async (addressId, { dispatch, rejectWithValue }) => {
    try {
      const res = await axiosClient.patch(API_SET_DEFAULT_ADDRESS.replace(':id', addressId));
      dispatch(getMyAddress()); // refresh address list
      return { addressId, ...res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

//UPDATE ADDRESS
export const updateAddress = createAsyncThunk(
  'customerAddress/update',
  async ({ addressId, data }, { dispatch, rejectWithValue }) => {
    try {
      const res = await axiosClient.put(API_UPDATE_ADDRESS.replace(':id', addressId), data);
      dispatch(getMyAddress()); 
      return { addressId, ...res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

// DELETE
export const deleteAddress = createAsyncThunk(
  'customerAddress/delete',
  async (addressId, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosClient.delete(API_DELETE_ADDRESS.replace(':id', addressId));
      dispatch(getMyAddress());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const customerAddressSlice = createSlice({
  name: 'customerAddress',
  initialState: {
    addresses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses.push(action.payload);
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET
      .addCase(getMyAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
        state.loading = false;
      })
      .addCase(getMyAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SET DEFAULT
      .addCase(setDefaultAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setDefaultAddress.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(setDefaultAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default customerAddressSlice.reducer;
