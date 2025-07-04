import { useSelector, useDispatch } from 'react-redux';
import { loginUser, logout, registerUser, getMyAddress } from '../store/slices/authSlice';

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
