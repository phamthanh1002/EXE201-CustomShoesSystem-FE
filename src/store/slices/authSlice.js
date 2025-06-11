import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../axiosClient";
import { API_LOGIN } from "../../constant";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(API_LOGIN, { email, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Đăng nhập thất bại"
      );
    }
  }
);

const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");
const storedRefreshToken = localStorage.getItem("refreshToken");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
    refreshToken: storedRefreshToken || null,
    message: "",
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      localStorage.clear();
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

        // Lưu vào localStorage
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
