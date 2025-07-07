// src/hooks/useBookmark.js
import { useDispatch, useSelector } from 'react-redux';
import { toggleBookmark, clearBookmarks } from '../store/slices/bookmarkSlice';

const useBookmark = () => {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmark.bookmarks);

  const isBookmarked = (id) => bookmarks.some((item) => item.productID === id);
  const toggle = (product) => dispatch(toggleBookmark(product));
  const clear = () => dispatch(clearBookmarks());

  return {
    bookmarks,
    isBookmarked,
    toggle,
    clear,
  };
};

export default useBookmark;
