import { createSlice } from '@reduxjs/toolkit';

// 🚀 Tải từ localStorage (nếu có)
const storedCart = JSON.parse(localStorage.getItem('cart'));

const initialState = storedCart || {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.cartItems.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += product.quantity;
      } else {
        state.cartItems.push({ ...product });
      }
      state.totalQuantity += product.quantity;
      state.totalPrice += product.price * product.quantity;
      saveToLocalStorage(state);
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const item = state.cartItems.find((item) => item.id === id);
      if (item) {
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.price * item.quantity;
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        saveToLocalStorage(state);
      }
    },
    updateCartQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.id === id);
      if (item) {
        // Trừ tổng trước
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.quantity * item.price;

        // Cập nhật mới
        item.quantity = quantity;

        // Cộng lại tổng
        state.totalQuantity += quantity;
        state.totalPrice += quantity * item.price;

        saveToLocalStorage(state);
      }
    },
    clearCart(state) {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      saveToLocalStorage(state);
    },
  },
});

function saveToLocalStorage(state) {
  localStorage.setItem('cart', JSON.stringify(state));
}

export const { addToCart, removeFromCart, clearCart, updateCartQuantity } = cartSlice.actions;
export default cartSlice.reducer;
