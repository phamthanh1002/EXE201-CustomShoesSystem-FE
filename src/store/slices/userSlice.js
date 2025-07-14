import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../axiosClient';
import { API_GET_ALL_USER } from '../../constant';

export const getAllUser = createAsyncThunk('user/get-all', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosClient.get(API_GET_ALL_USER);
    return response.data;
  } catch (error) {
    return rejectWithValue(
      error?.response?.data?.message || error?.message || 'Load user thất bại !',
    );
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Get all user
      .addCase(getAllUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
