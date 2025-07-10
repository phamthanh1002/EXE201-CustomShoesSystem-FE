import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../axiosClient';
import {
  API_GET_ALL_PICKUP,
  API_UPDATE_PICKING_UP,
  API_UPDATE_PICKING_UP_DONE,
  API_UPDATE_SHIPPER,
} from '../../constant';

// Thunk: Lấy tất cả pickup
export const getAllPickup = createAsyncThunk('pickup/get-all', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosClient.get(API_GET_ALL_PICKUP);
    return response.data;
  } catch (error) {
    return rejectWithValue(
      error?.response?.data?.message || error?.message || 'Load pick up thất bại!',
    );
  }
});

// Thunk: Cập nhật shipper cho pickup
export const createShipper = createAsyncThunk(
  'pickup/create-shipper',
  async ({ pickupID, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(
        API_UPDATE_SHIPPER.replace(':id', pickupID),
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Tạo shipper thất bại!',
      );
    }
  },
);

// Thunk: Cập nhật trạng thái đang đến lấy hàng
export const updatePickingUp = createAsyncThunk(
  'pickup/picking-up',
  async ({ pickupID }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(API_UPDATE_PICKING_UP.replace(':id', pickupID));
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Cập nhật đang đến lấy hàng thất bại!',
      );
    }
  },
);

// Thunk: Cập nhật trạng thái đã lấy hàng
export const updatePickupDone = createAsyncThunk(
  'pickup/pick-up-done',
  async ({ pickupID }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(API_UPDATE_PICKING_UP_DONE.replace(':id', pickupID));
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Cập nhật đã lấy hàng thất bại!',
      );
    }
  },
);

// Slice
const pickupSlice = createSlice({
  name: 'pickup',
  initialState: {
    pickup: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getAllPickup
      .addCase(getAllPickup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPickup.fulfilled, (state, action) => {
        state.loading = false;
        state.pickup = action.payload;
      })
      .addCase(getAllPickup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // createShipper
      .addCase(createShipper.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createShipper.fulfilled, (state, action) => {
        state.loading = false;
        // Optional: Cập nhật lại pickup list nếu cần
      })
      .addCase(createShipper.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updatePickingUp
      .addCase(updatePickingUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePickingUp.fulfilled, (state, action) => {
        state.loading = false;
        // Optional: cập nhật lại item tương ứng trong pickup nếu cần
      })
      .addCase(updatePickingUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updatePickupDone
      .addCase(updatePickupDone.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePickupDone.fulfilled, (state, action) => {
        state.loading = false;
        // Optional: cập nhật lại item tương ứng trong pickup nếu cần
      })
      .addCase(updatePickupDone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default pickupSlice.reducer;
