import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../axiosClient';
import {
  API_CREATE_ACCESSORY_PRODUCT,
  API_CREATE_CUSTOM_PRODUCT,
  API_DELETE_PRODUCT,
  API_GET_ALL_ACCESSORY,
  API_GET_ALL_CUSTOM,
  API_GET_ALL_PRODUCT,
  API_GET_TOP_8_ACCESSORY,
  API_GET_TOP_8_CUSTOM_PRODUCT,
  API_UPDATE_PRODUCT,
} from '../../constant';

// Async thunks
export const topCustomProduct = createAsyncThunk(
  'custom/hot-product',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(API_GET_TOP_8_CUSTOM_PRODUCT);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Load sản phẩm thất bại !',
      );
    }
  },
);

export const topAccessoryProduct = createAsyncThunk(
  'accessory/hot-product',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(API_GET_TOP_8_ACCESSORY);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Load sản phẩm thất bại !',
      );
    }
  },
);

export const getAllCustomProduct = createAsyncThunk(
  'custom/all-product',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(API_GET_ALL_CUSTOM);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Load sản phẩm custom thất bại !',
      );
    }
  },
);

export const getAllAccessoryProduct = createAsyncThunk(
  'accessory/all-product',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(API_GET_ALL_ACCESSORY);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Load phụ kiện thất bại !',
      );
    }
  },
);

export const getAllProduct = createAsyncThunk(
  'product/all-product',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(API_GET_ALL_PRODUCT);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Load product thất bại !',
      );
    }
  },
);

export const createCustomProduct = createAsyncThunk(
  'custom/create',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(API_CREATE_CUSTOM_PRODUCT, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Tạo sản phẩm custom thất bại !',
      );
    }
  },
);

export const createAccessoryProduct = createAsyncThunk(
  'accessory/create',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(API_CREATE_ACCESSORY_PRODUCT, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Tạo sản phẩm accessory thất bại !',
      );
    }
  },
);

export const deleteProduct = createAsyncThunk(
  'product/delete',
  async (productID, { rejectWithValue }) => {
    try {
      const response = await axiosClient.delete(API_DELETE_PRODUCT.replace(':id', productID));
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Xóa sản phẩm thất bại !',
      );
    }
  },
);

export const updateProduct = createAsyncThunk(
  'product/update',
  async ({ productID, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(
        API_UPDATE_PRODUCT.replace(':id', productID),
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Sửa sản phẩm thất bại !',
      );
    }
  },
);

// Slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    topCustomProducts: [],
    topAccessoryProducts: [],
    customProducts: [],
    accessoryProducts: [],

    loading: false,
    loadingTopCustom: false,
    loadingTopAccessory: false,
    loadingAllCustom: false,
    loadingAllAccessory: false,
    loadingCreateCustom: false,
    loadingCreateAccessory: false,
    loadingDeleteProduct: false,
    loadingEditProduct: false,

    error: null,
    errorTopCustom: null,
    errorTopAccessory: null,
    errorAllCustom: null,
    errorAllAccessory: null,
    errorCreateCustom: null,
    errorCreateAccessory: null,
    errorDeleteProduct: null,
    errorEditProduct: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // topCustomProduct
      .addCase(topCustomProduct.pending, (state) => {
        state.loadingTopCustom = true;
        state.errorTopCustom = null;
      })
      .addCase(topCustomProduct.fulfilled, (state, action) => {
        state.loadingTopCustom = false;
        state.topCustomProducts = action.payload;
      })
      .addCase(topCustomProduct.rejected, (state, action) => {
        state.loadingTopCustom = false;
        state.errorTopCustom = action.payload;
      })

      // topAccessoryProduct
      .addCase(topAccessoryProduct.pending, (state) => {
        state.loadingTopAccessory = true;
        state.errorTopAccessory = null;
      })
      .addCase(topAccessoryProduct.fulfilled, (state, action) => {
        state.loadingTopAccessory = false;
        state.topAccessoryProducts = action.payload;
      })
      .addCase(topAccessoryProduct.rejected, (state, action) => {
        state.loadingTopAccessory = false;
        state.errorTopAccessory = action.payload;
      })

      // getAllCustomProduct
      .addCase(getAllCustomProduct.pending, (state) => {
        state.loadingAllCustom = true;
        state.errorAllCustom = null;
      })
      .addCase(getAllCustomProduct.fulfilled, (state, action) => {
        state.loadingAllCustom = false;
        state.customProducts = action.payload;
      })
      .addCase(getAllCustomProduct.rejected, (state, action) => {
        state.loadingAllCustom = false;
        state.errorAllCustom = action.payload;
      })

      // getAllAccessoryProduct
      .addCase(getAllAccessoryProduct.pending, (state) => {
        state.loadingAllAccessory = true;
        state.errorAllAccessory = null;
      })
      .addCase(getAllAccessoryProduct.fulfilled, (state, action) => {
        state.loadingAllAccessory = false;
        state.accessoryProducts = action.payload;
      })
      .addCase(getAllAccessoryProduct.rejected, (state, action) => {
        state.loadingAllAccessory = false;
        state.errorAllAccessory = action.payload;
      })

      // get all products
      .addCase(getAllProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // createCustomProduct
      .addCase(createCustomProduct.pending, (state) => {
        state.loadingCreateCustom = true;
        state.errorCreateCustom = null;
      })
      .addCase(createCustomProduct.fulfilled, (state, action) => {
        state.loadingCreateCustom = false;
      })
      .addCase(createCustomProduct.rejected, (state, action) => {
        state.loadingCreateCustom = false;
        state.errorCreateCustom = action.payload;
      })

      // createAccessoryProduct
      .addCase(createAccessoryProduct.pending, (state) => {
        state.loadingCreateAccessory = true;
        state.errorCreateAccessory = null;
      })
      .addCase(createAccessoryProduct.fulfilled, (state, action) => {
        state.loadingCreateAccessory = false;
      })
      .addCase(createAccessoryProduct.rejected, (state, action) => {
        state.loadingCreateAccessory = false;
        state.errorCreateAccessory = action.payload;
      })

      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loadingDeleteProduct = true;
        state.errorDeleteProduct = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loadingDeleteProduct = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loadingDeleteProduct = false;
        state.errorDeleteProduct = action.payload;
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loadingEditProduct = true;
        state.errorEditProduct = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loadingEditProduct = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loadingEditProduct = false;
        state.errorEditProduct = action.payload;
      });
  },
});

export default productSlice.reducer;
