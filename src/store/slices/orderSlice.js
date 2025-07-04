import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../axiosClient';
import { API_CREATE_ORDER } from '../../constant';

export const createOrder = createAsyncThunk(
  'order/create',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(API_CREATE_ORDER, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Tạo đơn hàng thất bại!',
      );
    }
  },
);

// 🧊 Initial State
const initialState = {
  loading: false,
  success: false,
  error: null,
  orderData: null,
  paymentUrl: null,
  message: '',
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderState(state) {
      state.success = false;
      state.error = null;
      state.orderData = null;
      state.paymentUrl = null;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.orderData = action.payload.orderData;
        state.paymentUrl = action.payload.paymentUrl;
        state.message = action.payload.message;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrderState } = orderSlice.actions;

export default orderSlice.reducer;
