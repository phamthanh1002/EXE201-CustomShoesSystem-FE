import { useSelector, useDispatch } from 'react-redux';
import { editProfile, loginUser, logout, registerUser } from '../store/slices/authSlice';
import { getMyAddress } from '../store/slices/customerAddressSlice';
import useBookmark from './useBookmark';

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, refreshToken, message, loading, error } = useSelector((state) => state.auth);
  const { clear } = useBookmark();

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

  const logoutUser = () => {
    dispatch(logout());
    clear();
  };

  const updateProfile = (email, formData) => dispatch(editProfile({ email, formData }));

  return {
    user,
    token,
    refreshToken,
    message,
    loading,
    error,
    login,
    register,
    logout: logoutUser,
    updateProfile,
  };
};

export default useAuth;
