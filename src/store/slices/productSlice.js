import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../axiosClient';
import { API_GET_TOP_8_ACCESSORY, API_GET_TOP_8_CUSTOM_PRODUCT } from '../../constant';

export const topCustomProduct = createAsyncThunk(
  'custom/hot-product',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(API_GET_TOP_8_CUSTOM_PRODUCT);
      return response.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error?.message || 'Load sản phẩm thất bại !';
      return rejectWithValue(errorMessage);
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
      const errorMessage =
        error?.response?.data?.message || error?.message || 'Load sản phẩm thất bại !';
      return rejectWithValue(errorMessage);
    }
  },
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    topCustomProducts: [],
    topAccessoryProducts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Top Custom Product
      .addCase(topCustomProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(topCustomProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.topCustomProducts = action.payload;
      })
      .addCase(topCustomProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Top Accessory
      .addCase(topAccessoryProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(topAccessoryProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.topAccessoryProducts = action.payload;
      })
      .addCase(topAccessoryProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
