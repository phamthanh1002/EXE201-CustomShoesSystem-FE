// src/store/slices/authSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../axiosClient';
import {
  API_EDIT_PROFILE,
  API_FORGOT_PASS,
  API_LOGIN,
  API_REGISTER,
  API_RESET_PASS,
} from '../../constant';

const storedUser = localStorage.getItem('user');
const storedToken = localStorage.getItem('token');
const storedRefreshToken = localStorage.getItem('refreshToken');

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(API_LOGIN, { email, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Đăng nhập thất bại');
    }
  },
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ formData }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(API_REGISTER, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Đăng ký thất bại');
    }
  },
);

export const editProfile = createAsyncThunk(
  'user/edit-profile',
  async ({ email, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(API_EDIT_PROFILE.replace('email', email), formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Cập nhật thông tin cá nhân thất bại!');
    }
  },
);

export const forgotPassword = createAsyncThunk(
  'pass/forgot',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(API_FORGOT_PASS, email);
      console.log('API đã đc gọi');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Gửi otp thất bại!');
    }
  },
);

export const resetPassword = createAsyncThunk(
  'pass/reset',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(API_RESET_PASS, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Tạo lại mật khẩu thất bại!');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
    refreshToken: storedRefreshToken || null,
    message: '',
    loading: false,
    error: null,
    isInitialized: true,

    loadingForgotPass: false,
    loadingResetPass: false,

    errorForgotPass: null,
    errorResetPass: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('cart');
      localStorage.removeItem('bookmarkedProducts');
    },
    setGoogleLoginSuccess(state, action) {
      const { user, token, refreshToken } = action.payload;
      state.user = user;
      state.token = token;
      state.refreshToken = refreshToken;

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
    },
    setUserAddresses(state, action) {
      if (state.user) {
        state.user.address = action.payload;
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user, token, refreshToken, message } = action.payload;
        state.loading = false;
        state.user = user;
        state.token = token;
        state.refreshToken = refreshToken;
        state.message = message;

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // editProfile
      .addCase(editProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          ...state.user,
          ...action.payload,
        };
        localStorage.setItem('user', JSON.stringify(state.user));
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // forgot pass
      .addCase(forgotPassword.pending, (state) => {
        state.loadingForgotPass = true;
        state.errorForgotPass = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loadingForgotPass = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loadingForgotPass = false;
        state.errorForgotPass = action.payload;
      })

      // forgot pass
      .addCase(resetPassword.pending, (state) => {
        state.loadingResetPass = true;
        state.errorResetPass = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loadingResetPass = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loadingResetPass = false;
        state.errorResetPass = action.payload;
      });
  },
});

export const { logout, setGoogleLoginSuccess, setUserAddresses } = authSlice.actions;
export default authSlice.reducer;
