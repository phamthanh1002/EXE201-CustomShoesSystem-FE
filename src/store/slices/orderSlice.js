import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../axiosClient';
import { API_CREATE_ORDER, API_GET_ALL_MY_ORDER, API_GET_ORDER_DETAIL } from '../../constant';

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

export const getAllMyOrder = createAsyncThunk(
  'order/get-all',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(API_GET_ALL_MY_ORDER.replace(':id', userId));
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Load đơn hàng thất bại!',
      );
    }
  },
);

export const getOrderDetail = createAsyncThunk(
  'order/order-detail',
  async (orderID, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(API_GET_ORDER_DETAIL.replace(':orderID', orderID));
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Load chi tiết đơn hàng thất bại!',
      );
    }
  },
);

// 🧊 Initial State
const initialState = {
  orders: [],
  orderDetailData: {},
  orderData: null,
  paymentUrl: null,
  message: '',
  success: false,

  createOrderLoading: false,
  createOrderError: null,

  myOrdersLoading: false,
  myOrdersError: null,

  orderDetailLoading: false,
  orderDetailError: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderState(state) {
      state.success = false;
      state.createOrderError = null;
      state.orderData = null;
      state.paymentUrl = null;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE ORDER
      .addCase(createOrder.pending, (state) => {
        state.createOrderLoading = true;
        state.createOrderError = null;
        state.success = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.createOrderLoading = false;
        state.success = true;
        state.orderData = action.payload.orderData;
        state.paymentUrl = action.payload.paymentUrl;
        state.message = action.payload.message;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.createOrderLoading = false;
        state.success = false;
        state.createOrderError = action.payload;
      })

      // GET ALL MY ORDERS
      .addCase(getAllMyOrder.pending, (state) => {
        state.myOrdersLoading = true;
        state.myOrdersError = null;
      })
      .addCase(getAllMyOrder.fulfilled, (state, action) => {
        state.myOrdersLoading = false;
        state.orders = action.payload;
      })
      .addCase(getAllMyOrder.rejected, (state, action) => {
        state.myOrdersLoading = false;
        state.myOrdersError = action.payload;
      })

      // GET ORDER DETAIL
      .addCase(getOrderDetail.pending, (state) => {
        state.orderDetailLoading = true;
        state.orderDetailError = null;
      })
      .addCase(getOrderDetail.fulfilled, (state, action) => {
        state.orderDetailLoading = false;
        const orderID = action.meta.arg; 
        state.orderDetailData[orderID] = action.payload;
      })
      .addCase(getOrderDetail.rejected, (state, action) => {
        state.orderDetailLoading = false;
        state.orderDetailError = action.payload;
      });
  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
