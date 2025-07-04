import { useSelector, useDispatch } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  clearCart,
  updateCartQuantity, // 👈 THÊM DÒNG NÀY
} from '../store/slices/cartSlice';

export default function useCart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateCartQuantity({ id, quantity }));
  };

  return {
    ...cart,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    clearCart: handleClearCart,
    updateQuantity: handleUpdateQuantity, 
  };
}
