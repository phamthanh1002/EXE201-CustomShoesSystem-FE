import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../axiosClient';
import { API_CHANGE_ACCOUNT_STATUS, API_CREATE_NEW_STAFF, API_GET_ALL_USER } from '../../constant';

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

export const changeAccountStatus = createAsyncThunk(
  'user/change-status',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(API_CHANGE_ACCOUNT_STATUS.replace(':email', email));
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Thay đổi status user thất bại !',
      );
    }
  },
);

export const createNewStaff = createAsyncThunk(
  'user/new-staff',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(API_CREATE_NEW_STAFF, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Tạo staff thất bại !',
      );
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    newStaff: null,
    loading: false,
    error: null,

    loadingChangeStatus: false,
    errorChangeStatus: null,

    loadingCreateStaff: false,
    errorCreateStaff: null,
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
      })

      // Change Status
      .addCase(changeAccountStatus.pending, (state) => {
        state.loadingChangeStatus = true;
        state.errorChangeStatus = null;
      })
      .addCase(changeAccountStatus.fulfilled, (state) => {
        state.loadingChangeStatus = false;
      })
      .addCase(changeAccountStatus.rejected, (state, action) => {
        state.loadingChangeStatus = false;
        state.errorChangeStatus = action.payload;
      })

      // Create Staff
      .addCase(createNewStaff.pending, (state) => {
        state.loadingCreateStaff = true;
        state.errorCreateStaff = null;
      })
      .addCase(createNewStaff.fulfilled, (state, action) => {
        state.loadingCreateStaff = false;
        state.newStaff = action.payload;
      })
      .addCase(createNewStaff.rejected, (state, action) => {
        state.loadingCreateStaff = false;
        state.errorCreateStaff = action.payload;
      });
  },
});

export default userSlice.reducer;
