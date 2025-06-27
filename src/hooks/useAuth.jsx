import { useSelector, useDispatch } from 'react-redux';
import { loginUser, logout, registerUser } from '../store/slices/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, refreshToken, message, loading, error } = useSelector((state) => state.auth);

  const login = (email, password) => {
    return dispatch(loginUser({ email, password }));
  };

  const register = (formData) => {
    return dispatch(registerUser({ formData }));
  };

  const logoutUser = () => {
    dispatch(logout());
  };

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
  };
};

export default useAuth;
