import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../axiosClient';
import { API_GET_MY_ADDRESS, API_LOGIN, API_REGISTER } from '../../constant';

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
  'auth/register',
  async ({ formData }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(API_REGISTER, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Đăng ký thất bại');
    }
  },
);

export const getMyAddress = createAsyncThunk('myAddress/get', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosClient.get(API_GET_MY_ADDRESS);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message || 'Load địa chỉ thất bại');
  }
});

const storedUser = localStorage.getItem('user');
const storedToken = localStorage.getItem('token');
const storedRefreshToken = localStorage.getItem('refreshToken');

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
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //get my address
      .addCase(getMyAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyAddress.fulfilled, (state, action) => {
        if (state.user) {
          state.user.address = action.payload;
          localStorage.setItem('user', JSON.stringify(state.user));
        }
      })
      .addCase(getMyAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setGoogleLoginSuccess } = authSlice.actions;
export default authSlice.reducer;
