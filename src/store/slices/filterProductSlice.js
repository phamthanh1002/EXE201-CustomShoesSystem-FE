import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../axiosClient';
import { API_SEARCH_PRODUCT } from '../../constant';

export const fetchFilteredProducts = createAsyncThunk(
  'filterProduct/fetchFilteredProducts',
  async (filters, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          params.append(key, value);
        }
      });

      const response = await axiosClient.get(`${API_SEARCH_PRODUCT}${params.toString()}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Lỗi khi tải sản phẩm');
    }
  },
);

const initialFilters = {
  ProductName: '',
  Size: '',
  Color: '',
  MinPrice: '',
  MaxPrice: '',
  ProductType: '',
};

const filterProductSlice = createSlice({
  name: 'filterProduct',
  initialState: {
    products: [],
    filters: { ...initialFilters },
    loading: false,
    error: null,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setFilterValue: (state, action) => {
      const { key, value } = action.payload;
      state.filters[key] = value;
    },
    clearFilters: (state) => {
      const persistentKeys = ['ProductType'];
      const currentFilters = state.filters;

      // Reset everything to default, except persistent keys
      const newFilters = { ...initialFilters };
      persistentKeys.forEach((key) => {
        newFilters[key] = currentFilters[key];
      });

      state.filters = newFilters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, setFilterValue, clearFilters } = filterProductSlice.actions;
export default filterProductSlice.reducer;
