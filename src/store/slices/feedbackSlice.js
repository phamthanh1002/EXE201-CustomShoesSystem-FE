import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../axiosClient';
import {
  API_CREATE_FEEDBACK_ACCESSORY,
  API_CREATE_FEEDBACK_CLEANING,
  API_CREATE_FEEDBACK_CUSTOM,
  API_DELETE_FEEDBACK,
  API_GET_ALL_FEEDBACK,
} from '../../constant';

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

export const feedbackCustom = createAsyncThunk(
  'feedback/custom',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(API_CREATE_FEEDBACK_CUSTOM, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Tạo feedback custom thất bại !',
      );
    }
  },
);

export const feedbackAccessory = createAsyncThunk(
  'feedback/accessory',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(API_CREATE_FEEDBACK_ACCESSORY, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Tạo feedback accessory thất bại !',
      );
    }
  },
);

export const feedbackCleaning = createAsyncThunk(
  'feedback/cleaning',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(API_CREATE_FEEDBACK_CLEANING, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Tạo feedback cleaning thất bại !',
      );
    }
  },
);

export const deleteFeedback = createAsyncThunk(
  'feedback/delete',
  async (feedbackID, { rejectWithValue }) => {
    try {
      const response = await axiosClient.delete(API_DELETE_FEEDBACK.replace(':id', feedbackID));
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Xóa feedback thất bại !',
      );
    }
  },
);

const feedbackSlice = createSlice({
  name: 'feedbacks',
  initialState: {
    feedbacks: [],
    // get all
    loading: false,
    error: null,

    // create custom
    customFeedbackLoading: false,
    customFeedbackError: null,

    // create accessory
    accessoryFeedbackLoading: false,
    accessoryFeedbackError: null,

    // create cleaning
    cleaningFeedbackLoading: false,
    cleaningFeedbackError: null,

    // delete feedback
    deleteFeedbackLoading: false,
    deleteFeedbackError: null,
  },
  reducers: {
    resetFeedbackErrors: (state) => {
      state.error = null;
      state.customFeedbackError = null;
      state.accessoryFeedbackError = null;
      state.cleaningFeedbackError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // get all feedback
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
      })

      // create feedback custom
      .addCase(feedbackCustom.pending, (state) => {
        state.customFeedbackLoading = true;
        state.customFeedbackError = null;
      })
      .addCase(feedbackCustom.fulfilled, (state) => {
        state.customFeedbackLoading = false;
      })
      .addCase(feedbackCustom.rejected, (state, action) => {
        state.customFeedbackLoading = false;
        state.customFeedbackError = action.payload;
      })

      // create feedback accessory
      .addCase(feedbackAccessory.pending, (state) => {
        state.accessoryFeedbackLoading = true;
        state.accessoryFeedbackError = null;
      })
      .addCase(feedbackAccessory.fulfilled, (state) => {
        state.accessoryFeedbackLoading = false;
      })
      .addCase(feedbackAccessory.rejected, (state, action) => {
        state.accessoryFeedbackLoading = false;
        state.accessoryFeedbackError = action.payload;
      })

      // create feedback cleaning
      .addCase(feedbackCleaning.pending, (state) => {
        state.cleaningFeedbackLoading = true;
        state.cleaningFeedbackError = null;
      })
      .addCase(feedbackCleaning.fulfilled, (state) => {
        state.cleaningFeedbackLoading = false;
      })
      .addCase(feedbackCleaning.rejected, (state, action) => {
        state.cleaningFeedbackLoading = false;
        state.cleaningFeedbackError = action.payload;
      })

      // delete feedback
      .addCase(deleteFeedback.pending, (state) => {
        state.deleteFeedbackLoading = true;
        state.deleteFeedbackError = null;
      })
      .addCase(deleteFeedback.fulfilled, (state) => {
        state.deleteFeedbackLoading = false;
      })
      .addCase(deleteFeedback.rejected, (state, action) => {
        state.deleteFeedbackLoading = false;
        state.deleteFeedbackError = action.payload;
      });
  },
});

export const { resetFeedbackErrors } = feedbackSlice.actions;
export default feedbackSlice.reducer;
