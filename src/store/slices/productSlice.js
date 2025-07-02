import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../axiosClient';
import {
  API_GET_ALL_ACCESSORY,
  API_GET_ALL_PRODUCT,
  API_GET_TOP_8_ACCESSORY,
  API_GET_TOP_8_CUSTOM_PRODUCT,
} from '../../constant';

// Async thunks
export const topCustomProduct = createAsyncThunk(
  'custom/hot-product',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(API_GET_TOP_8_CUSTOM_PRODUCT);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Load sản phẩm thất bại !',
      );
    }
  },
);

export const topAccessoryProduct = createAsyncThunk(
  'accessory/hot-product',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(API_GET_TOP_8_ACCESSORY);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Load sản phẩm thất bại !',
      );
    }
  },
);

export const getAllCustomProduct = createAsyncThunk(
  'custom/all-product',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(API_GET_ALL_PRODUCT);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Load sản phẩm custom thất bại !',
      );
    }
  },
);

export const getAllAccessoryProduct = createAsyncThunk(
  'accessory/all-product',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(API_GET_ALL_ACCESSORY);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Load phụ kiện thất bại !',
      );
    }
  },
);

// Slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    topCustomProducts: [],
    topAccessoryProducts: [],
    customProducts: [],
    accessoryProducts: [],

    loadingTopCustom: false,
    loadingTopAccessory: false,
    loadingAllCustom: false,
    loadingAllAccessory: false,

    errorTopCustom: null,
    errorTopAccessory: null,
    errorAllCustom: null,
    errorAllAccessory: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // topCustomProduct
      .addCase(topCustomProduct.pending, (state) => {
        state.loadingTopCustom = true;
        state.errorTopCustom = null;
      })
      .addCase(topCustomProduct.fulfilled, (state, action) => {
        state.loadingTopCustom = false;
        state.topCustomProducts = action.payload;
      })
      .addCase(topCustomProduct.rejected, (state, action) => {
        state.loadingTopCustom = false;
        state.errorTopCustom = action.payload;
      })

      // topAccessoryProduct
      .addCase(topAccessoryProduct.pending, (state) => {
        state.loadingTopAccessory = true;
        state.errorTopAccessory = null;
      })
      .addCase(topAccessoryProduct.fulfilled, (state, action) => {
        state.loadingTopAccessory = false;
        state.topAccessoryProducts = action.payload;
      })
      .addCase(topAccessoryProduct.rejected, (state, action) => {
        state.loadingTopAccessory = false;
        state.errorTopAccessory = action.payload;
      })

      // getAllCustomProduct
      .addCase(getAllCustomProduct.pending, (state) => {
        state.loadingAllCustom = true;
        state.errorAllCustom = null;
      })
      .addCase(getAllCustomProduct.fulfilled, (state, action) => {
        state.loadingAllCustom = false;
        state.customProducts = action.payload;
      })
      .addCase(getAllCustomProduct.rejected, (state, action) => {
        state.loadingAllCustom = false;
        state.errorAllCustom = action.payload;
      })

      // getAllAccessoryProduct
      .addCase(getAllAccessoryProduct.pending, (state) => {
        state.loadingAllAccessory = true;
        state.errorAllAccessory = null;
      })
      .addCase(getAllAccessoryProduct.fulfilled, (state, action) => {
        state.loadingAllAccessory = false;
        state.accessoryProducts = action.payload;
      })
      .addCase(getAllAccessoryProduct.rejected, (state, action) => {
        state.loadingAllAccessory = false;
        state.errorAllAccessory = action.payload;
      });
  },
});

export default productSlice.reducer;
