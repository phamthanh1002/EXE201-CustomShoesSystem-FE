import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../axiosClient';
import {
  API_COMPLETE_DELIVERY,
  API_CREATE_DELIVERY,
  API_GET_DELIVERY_BY_ORDERID,
  API_START_DELIVERY,
} from '../../constant';

// === THUNKS ===
export const getDeliveryByOrderID = createAsyncThunk(
  'delivery/get-by-orderID',
  async (orderID, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(API_GET_DELIVERY_BY_ORDERID.replace(':id', orderID));
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Load giao hàng thất bại!',
      );
    }
  },
);

export const createDelivery = createAsyncThunk(
  'delivery/create',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(API_CREATE_DELIVERY, formData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Tạo giao hàng thất bại!',
      );
    }
  },
);

export const startDelivery = createAsyncThunk(
  'delivery/start',
  async (deliveryID, { rejectWithValue }) => {
    try {
      const response = await axiosClient.patch(API_START_DELIVERY.replace(':id', deliveryID));
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          'Cập nhật trạng thái đơn hàng thất bại!',
      );
    }
  },
);

export const completeDelivery = createAsyncThunk(
  'delivery/complete',
  async (deliveryID, { rejectWithValue }) => {
    try {
      const response = await axiosClient.patch(API_COMPLETE_DELIVERY.replace(':id', deliveryID));
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          'Cập nhật trạng thái đơn hàng thất bại!',
      );
    }
  },
);

// === SLICE ===
const deliverySlice = createSlice({
  name: 'delivery',
  initialState: {
    createdDelivery: null,
    fetchedDelivery: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetDeliveryState: (state) => {
      state.error = null;
      state.createdDelivery = null;
      state.fetchedDelivery = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- GET DELIVERY BY ORDER ID ---
      .addCase(getDeliveryByOrderID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDeliveryByOrderID.fulfilled, (state, action) => {
        state.loading = false;
        state.fetchedDelivery = action.payload;
      })
      .addCase(getDeliveryByOrderID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- CREATE DELIVERY ---
      .addCase(createDelivery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDelivery.fulfilled, (state, action) => {
        state.loading = false;
        state.createdDelivery = action.payload;
      })
      .addCase(createDelivery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- START DELIVERY ---
      .addCase(startDelivery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startDelivery.fulfilled, (state, action) => {
        state.loading = false;
        state.fetchedDelivery = action.payload;
      })
      .addCase(startDelivery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- COMPLETE DELIVERY ---
      .addCase(completeDelivery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeDelivery.fulfilled, (state, action) => {
        state.loading = false;
        state.fetchedDelivery = action.payload;
      })
      .addCase(completeDelivery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetDeliveryState } = deliverySlice.actions;
export default deliverySlice.reducer;
