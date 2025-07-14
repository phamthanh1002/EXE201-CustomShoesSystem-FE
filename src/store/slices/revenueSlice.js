import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../axiosClient';
import { API_GET_MONTHLY_REVENUE } from '../../constant';

export const getMonthlyRevenue = createAsyncThunk(
  'revenue/monthly',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(API_GET_MONTHLY_REVENUE, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Load doanh thu thất bại !',
      );
    }
  },
);

const revenueSlice = createSlice({
  name: 'revenue',
  initialState: {
    revenues: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Get Monthly Revenue
      .addCase(getMonthlyRevenue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMonthlyRevenue.fulfilled, (state, action) => {
        state.loading = false;
        state.revenues = action.payload;
      })
      .addCase(getMonthlyRevenue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default revenueSlice.reducer;
