import React from 'react';
import { Form, Input, Button, Divider } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import img1 from '../../assets/Login/img1.jpg';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { loginUser, loginWithGoogle } from '../../store/slices/authSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

// Animation config
const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 30 },
};

const pageTransition = {
  duration: 0.5,
  ease: 'easeInOut',
};

const imagePanelVariants = {
  left: {
    x: 0,
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
};

const formVariants = {
  initial: { opacity: 0, x: 20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay: 0.2 },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.3 },
  },
};

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const onFinish = async ({ email, password }) => {
    const resultAction = await login(email, password);

    if (loginUser.fulfilled.match(resultAction)) {
      const { user } = resultAction.payload;

      toast.success('Đăng nhập thành công!');

      switch (user.roleName) {
        case 'Admin':
          navigate('/admin');
          break;
        case 'Staff':
          navigate('/staff');
          break;
        case 'Customer':
        default:
          navigate('/');
          break;
      }
    } else {
      toast.error(resultAction.payload || 'Đăng nhập thất bại');
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
    } catch (error) {
      console.error(error);
      toast.error('Lỗi khi đăng nhập bằng Google');
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
        style={{
          display: 'flex',
          width: '80%',
          maxWidth: '1000px',
          height: '600px',
          border: '2px solid black',
          borderRadius: '14px',
          overflow: 'hidden',
          fontFamily: "'Inter', sans-serif",
          boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
          position: 'relative',
        }}
      >
        <motion.div
          variants={imagePanelVariants}
          animate="left"
          style={{
            position: 'absolute',
            width: '50%',
            height: '100%',
            backgroundImage: `url(${img1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: '#fff',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            zIndex: 2,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              backgroundColor: 'rgba(0,0,0,0.4)',
              borderRadius: 12,
              padding: 20,
            }}
          >
            <p style={{ fontSize: 16, fontStyle: 'italic', color: '#fff' }}>
              "A shoe is not only a design, but it's a part of your body language..."
            </p>
            <p style={{ fontWeight: 'bold', marginTop: 10, color: '#fff' }}>Christian Louboutin</p>
          </motion.div>
        </motion.div>

        <div style={{ flex: 1, backgroundColor: 'transparent' }} />

        <div
          style={{
            flex: 1,
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 40,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key="login-form"
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{ width: '100%', maxWidth: 400 }}
            >
              <h2 style={{ fontSize: '28px', fontWeight: 600, marginBottom: 24 }}>
                Đăng nhập vào tài khoản
              </h2>

              <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                  name="email"
                  rules={[{ required: true, message: 'Please input your email!' }]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={loading}
                    style={{ backgroundColor: '#000', border: 'none' }}
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>
              </Form>

              <Button
                type="default"
                block
                onClick={() => navigate('/')}
                style={{ marginBottom: 16 }}
              >
                ← Quay về trang chủ
              </Button>

              <Divider plain>or</Divider>

              <div style={{ textAlign: 'center', marginBottom: 12 }}>
                Chưa có tài khoản?{' '}
                <span
                  style={{
                    color: 'red',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                  onClick={() => navigate('/register')}
                >
                  Tạo tài khoản
                </span>
              </div>

              <Button
                icon={<GoogleOutlined />}
                block
                style={{
                  backgroundColor: '#fff',
                  color: '#000',
                  border: '1px solid #ccc',
                  marginTop: 8,
                }}
                onClick={() => {
                  window.location.href =
                    'https://localhost:7256/api/auth/login-google-oauth-redirect';
                }}
              >
                Đăng nhập với Google
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
