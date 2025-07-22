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
    const hasPassword = params.get('hasPassword') === 'true'; 
    const phoneNumber = params.get('PhoneNumber') || '';

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

    // Lưu thông tin đăng nhập
    dispatch(setGoogleLoginSuccess({ user, token, refreshToken }));

    if (hasPassword) {
      sessionStorage.setItem('googleLoginSuccess', 'true');
      navigate('/');
    } else {
      navigate('/create-password');
    }
  }, [location, navigate, dispatch]);

  return <p>Đang xử lý đăng nhập...</p>;
}
