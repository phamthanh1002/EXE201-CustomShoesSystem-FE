import { useSelector, useDispatch } from 'react-redux';
import {
  editProfile,
  loginUser,
  logout as logoutAction,
  registerUser,
  forgotPassword as forgotPasswordThunk,
  resetPassword as resetPasswordThunk,
} from '../store/slices/authSlice';
import { clearCart } from '../store/slices/cartSlice';
import { clearBookmarks } from '../store/slices/bookmarkSlice';
import { getMyAddress } from '../store/slices/customerAddressSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, refreshToken, message, loading, error } = useSelector((state) => state.auth);

  const login = async (email, password) => {
    const action = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(action)) {
      await dispatch(getMyAddress());
    }
    return action;
  };

  const register = (formData) => {
    return dispatch(registerUser({ formData }));
  };

  const logout = () => {
    dispatch(logoutAction());
    dispatch(clearCart());
    dispatch(clearBookmarks());
  };

  const updateProfile = (email, formData) => dispatch(editProfile({ email, formData }));

  const forgotPassword = (email) => dispatch(forgotPasswordThunk(email));

  const resetPassword = (formData) => dispatch(resetPasswordThunk(formData));

  return {
    user,
    token,
    refreshToken,
    message,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    forgotPassword,
    resetPassword,
  };
};

export default useAuth;
