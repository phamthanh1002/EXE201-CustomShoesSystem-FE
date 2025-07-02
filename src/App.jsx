import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';

//Customer
import CustomerLayout from './layouts/CustomerLayout';
import HomePage from './pages/customer/Home/HomePage';
import ShoeCustomPage from './pages/customer/ShoeCustomization/ShoeCustomPage';
import ShoeCleaningPage from './pages/customer/ShoeCleaning/ShoeCleaningPage';
import ShoeAccessoriesPage from './pages/customer/ShoeAccessories/ShoeAccessoriesPage';
import CartPage from './pages/customer/Cart/CartPage';
import ScrollToTopButton from './components/common/ScrollToTopButton';
import LoadingScreen from './components/common/LoadingScreen';
import { useState, useEffect } from 'react';
import LoginPage from './pages/auth/LoginPage';
import PaymentSuccess from './pages/customer/Payment/PaymentSuccess';
import PaymentFailure from './pages/customer/Payment/PaymentFailure';
import RegisterPage from './pages/auth/RegisterPage';
import ProfilePage from './pages/customer/Profile/Profile';
import Unauthorized from './components/common/Unauthorized';
import ProtectedRoute from './components/common/ProtectedRoute';
import SearchResultPage from './pages/customer/Search/SearchResultPage';

// Staff
import StaffHome from './pages/staff/StaffHome';

//Admin
import AdminHome from './pages/admin/AdminHome';
import OAuthSuccess from './pages/auth/OAuthSuccess';

function App() {
  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem('hasLoaded');
  });

  const handleLoadingFinish = () => {
    sessionStorage.setItem('hasLoaded', 'true');
    setLoading(false);
  };

  if (loading) {
    return <LoadingScreen onFinish={handleLoadingFinish} />;
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
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
      {/* <CustomCursor /> */}
      <ScrollToTopButton />

      <BrowserRouter>
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />

          {/* Customer */}
          <Route path="/" element={<CustomerLayout />}>
            <Route index element={<HomePage />} />
            <Route path="custom" element={<ShoeCustomPage />} />
            <Route path="cleaning" element={<ShoeCleaningPage />} />
            <Route path="accessories" element={<ShoeAccessoriesPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="payment-success" element={<PaymentSuccess />} />
            <Route path="payment-failure" element={<PaymentFailure />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="search" element={<SearchResultPage />} />
          </Route>

          {/* Staff */}
          <Route element={<ProtectedRoute allowedRoles={['Staff']} />}>
            <Route path="/staff" element={<StaffHome />}></Route>
          </Route>

          {/* Admin */}
          <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
            <Route path="/admin" element={<AdminHome />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
