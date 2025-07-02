import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../axiosClient';
import { API_GET_ALL_FEEDBACK } from '../../constant';

export const getAllFeedback = createAsyncThunk(
  'feedback/get-all',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(API_GET_ALL_FEEDBACK);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Load feedback thất bại !',
      );
    }
  },
);

const feedbackSlice = createSlice({
  name: 'feedbacks',
  initialState: {
    feedbacks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload;
      })
      .addCase(getAllFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default feedbackSlice.reducer;
