import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer, Slide, toast } from 'react-toastify';
import { useEffect, useState, lazy } from 'react';
import { useSelector } from 'react-redux';

import ScrollToTopButton from './components/common/ScrollToTopButton';
import LoadingScreen from './components/common/LoadingScreen';
import Unauthorized from './components/common/Unauthorized';
import ProtectedRoute from './components/common/ProtectedRoute';
import LazyWrapper from './utils/LazyWrapper';

// Layouts
const CustomerLayout = lazy(() => import('./layouts/CustomerLayout'));

// Auth
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const OAuthSuccess = lazy(() => import('./pages/auth/OAuthSuccess'));
const ForgotPassPage = lazy(() => import('./pages/auth/ForgotPassPage'));
const CreatePassPage = lazy(() => import('./pages/auth/CreatePassPage'));

// Customer Pages
const HomePage = lazy(() => import('./pages/customer/Home/HomePage'));
const ShoeCustomPage = lazy(() => import('./pages/customer/ShoeCustomization/ShoeCustomPage'));
const ShoeCleaningPage = lazy(() => import('./pages/customer/ShoeCleaning/ShoeCleaningPage'));
const ShoeAccessoriesPage = lazy(() =>
  import('./pages/customer/ShoeAccessories/ShoeAccessoriesPage'),
);
const CartPage = lazy(() => import('./pages/customer/Cart/CartPage'));
const PaymentSuccess = lazy(() => import('./pages/customer/Payment/PaymentSuccess'));
const PaymentFailure = lazy(() => import('./pages/customer/Payment/PaymentFailure'));
const ProfilePage = lazy(() => import('./pages/customer/Profile/Profile'));
const SearchResultPage = lazy(() => import('./pages/customer/Search/SearchResultPage'));
const OrderCreateSuccess = lazy(() => import('./pages/customer/Order/OrderCreateSuccess'));

// Staff
const StaffLayout = lazy(() => import('./layouts/StaffLayout'));
const StaffHome = lazy(() => import('./pages/staff/StaffHome'));

//Admin
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const AdminHome = lazy(() => import('./pages/admin/AdminHome'));

function App() {
  const [loading, setLoading] = useState(() => !sessionStorage.getItem('hasLoaded'));
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    if (loading) {
      sessionStorage.setItem('hasLoaded', 'true');
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    const isGoogleLogin = sessionStorage.getItem('googleLoginSuccess');

    if (user && isGoogleLogin) {
      const currentPath = location.pathname;

      if (currentPath !== '/create-password') {
        toast.success('Đăng nhập thành công!');
      }

      sessionStorage.removeItem('googleLoginSuccess');
    }
  }, [user, location]);

  if (loading) return <LoadingScreen onFinish={() => setLoading(false)} />;

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
      <ScrollToTopButton />

      <Routes>
        {/* Auth */}
        <Route path="/login" element={LazyWrapper(LoginPage)} />
        <Route path="/register" element={LazyWrapper(RegisterPage)} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/oauth-success" element={LazyWrapper(OAuthSuccess)} />
        <Route path="/forgot-password" element={LazyWrapper(ForgotPassPage)} />
        <Route path="/create-password" element={LazyWrapper(CreatePassPage)} />

        {/* Customer */}
        <Route path="/" element={LazyWrapper(CustomerLayout)}>
          <Route index element={LazyWrapper(HomePage)} />
          <Route path="custom" element={LazyWrapper(ShoeCustomPage)} />
          <Route path="cleaning" element={LazyWrapper(ShoeCleaningPage)} />
          <Route path="accessories" element={LazyWrapper(ShoeAccessoriesPage)} />
          <Route path="search" element={LazyWrapper(SearchResultPage)} />
          <Route path="cart" element={LazyWrapper(CartPage)} />

          <Route element={<ProtectedRoute allowedRoles={['Customer']} />}>
            <Route path="profile" element={LazyWrapper(ProfilePage)} />
            <Route path="payment-success" element={LazyWrapper(PaymentSuccess)} />
            <Route path="payment-failure" element={LazyWrapper(PaymentFailure)} />
            <Route path="order-create-success" element={LazyWrapper(OrderCreateSuccess)} />
          </Route>
        </Route>

        {/* Staff */}
        <Route element={<ProtectedRoute allowedRoles={['Staff']} />}>
          <Route path="/staff" element={LazyWrapper(StaffLayout)}>
            <Route index element={LazyWrapper(StaffHome)} />
          </Route>
        </Route>

        {/* Admin */}
        <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
          <Route path="/admin" element={LazyWrapper(AdminLayout)}>
            <Route index element={LazyWrapper(AdminHome)} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
