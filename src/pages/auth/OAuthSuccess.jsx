import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setGoogleLoginSuccess } from '../../store/slices/authSlice';
import { toast } from 'react-toastify';

export default function OAuthSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const token = params.get('accessToken');
    const refreshToken = params.get('refreshToken');
    const userID = params.get('userId');
    const name = params.get('userName');
    const email = params.get('userEmail');
    const roleName = params.get('userRole');
    const phoneNumber = '';

    const allValid = token && refreshToken && userID && email && name && roleName;

    if (!allValid) {
      toast.error('Dữ liệu đăng nhập không hợp lệ');
      navigate('/login');
      return;
    }

    const user = {
      userID,
      name: decodeURIComponent(name || ''),
      email,
      roleName,
      phoneNumber,
    };

    dispatch(setGoogleLoginSuccess({ user, token, refreshToken }));

    sessionStorage.setItem('googleLoginSuccess', 'true');
    navigate('/');
  }, [location, navigate, dispatch]);

  return <p>Đang xử lý đăng nhập...</p>;
}
