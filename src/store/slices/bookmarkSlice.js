// src/store/slices/bookmarkSlice.js
import { createSlice } from '@reduxjs/toolkit';

const localKey = 'bookmarkedProducts';

const initialState = {
  bookmarks: JSON.parse(localStorage.getItem(localKey)) || [],
};

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    toggleBookmark: (state, action) => {
      const product = action.payload;
      const existingIndex = state.bookmarks.findIndex(
        (item) => item.productID === product.productID,
      );

      if (existingIndex !== -1) {
        state.bookmarks.splice(existingIndex, 1);
      } else {
        state.bookmarks.push(product);
      }

      localStorage.setItem(localKey, JSON.stringify(state.bookmarks));
    },

    clearBookmarks: (state) => {
      state.bookmarks = [];
      localStorage.removeItem(localKey);
    },
  },
});

export const { toggleBookmark, clearBookmarks } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
