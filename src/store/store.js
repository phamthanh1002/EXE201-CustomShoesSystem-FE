import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import filterProductReducer from './slices/filterProductSlice';
import feedbackReducer from './slices/feedbackSlice';
import serviceReducer from './slices/serviceSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import customerAddressReduce from './slices/customerAddressSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    address: customerAddressReduce,
    products: productReducer,
    filterProduct: filterProductReducer,
    feedbacks: feedbackReducer,
    services: serviceReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export default store;
