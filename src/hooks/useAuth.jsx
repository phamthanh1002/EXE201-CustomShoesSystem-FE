import { useSelector, useDispatch } from "react-redux";
import { loginUser, logout } from "../store/slices/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, refreshToken, message, loading, error } = useSelector(
    (state) => state.auth
  );

  const login = (email, password) => {
    return dispatch(loginUser({ email, password }));
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
    logout: logoutUser,
  };
};

export default useAuth;
