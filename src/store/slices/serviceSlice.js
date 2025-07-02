import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../axiosClient';
import { API_GET_ALL_SERVICE } from '../../constant';

export const getAllServicePackage = createAsyncThunk(
  'service/get-all',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(API_GET_ALL_SERVICE);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Load service thất bại !',
      );
    }
  },
);

const serviceSlice = createSlice({
  name: 'services',
  initialState: {
    services: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllServicePackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllServicePackage.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(getAllServicePackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default serviceSlice.reducer;
