import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import { useEffect, useState, lazy } from 'react';

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

// Staff & Admin
const StaffHome = lazy(() => import('./pages/staff/StaffHome'));
const AdminHome = lazy(() => import('./pages/admin/AdminHome'));

function App() {
  const [loading, setLoading] = useState(() => !sessionStorage.getItem('hasLoaded'));

  useEffect(() => {
    if (loading) {
      sessionStorage.setItem('hasLoaded', 'true');
      setLoading(false);
    }
  }, [loading]);

  if (loading) return <LoadingScreen onFinish={() => setLoading(false)} />;

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
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

      <BrowserRouter>
        <Routes>
          {/* Auth */}
          <Route path="/login" element={LazyWrapper(LoginPage)} />
          <Route path="/register" element={LazyWrapper(RegisterPage)} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/oauth-success" element={LazyWrapper(OAuthSuccess)} />

          {/* Customer */}
          <Route path="/" element={LazyWrapper(CustomerLayout)}>
            <Route index element={LazyWrapper(HomePage)} />
            <Route path="custom" element={LazyWrapper(ShoeCustomPage)} />
            <Route path="cleaning" element={LazyWrapper(ShoeCleaningPage)} />
            <Route path="accessories" element={LazyWrapper(ShoeAccessoriesPage)} />
            <Route path="cart" element={LazyWrapper(CartPage)} />
            <Route path="payment-success" element={LazyWrapper(PaymentSuccess)} />
            <Route path="payment-failure" element={LazyWrapper(PaymentFailure)} />
            <Route path="profile" element={LazyWrapper(ProfilePage)} />
            <Route path="search" element={LazyWrapper(SearchResultPage)} />
            <Route path="order-create-success" element={LazyWrapper(OrderCreateSuccess)} />
          </Route>

          {/* Staff */}
          <Route element={<ProtectedRoute allowedRoles={['Staff']} />}>
            <Route path="/staff" element={LazyWrapper(StaffHome)} />
          </Route>

          {/* Admin */}
          <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
            <Route path="/admin" element={LazyWrapper(AdminHome)} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
