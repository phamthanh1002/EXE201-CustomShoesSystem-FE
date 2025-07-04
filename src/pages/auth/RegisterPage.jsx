import React from 'react';
import { Form, Input, Button, Divider, Row, Col } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import img1 from '../../assets/Register/img1.webp';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../../hooks/useAuth';

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
  right: {
    x: '100%',
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
};

const formVariants = {
  initial: { opacity: 0, x: 100 },
  animate: {
    opacity: 1,
    x: 0, // vào giữa
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: { duration: 0.3 },
  },
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    try {
      const { confirm, ...dataToSend } = values;
      register(dataToSend);
      toast.success('Đăng ký thành công!');
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Đăng nhập thất bại');
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
        {/* Image Panel */}
        <motion.div
          variants={imagePanelVariants}
          animate="right"
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
        />

        {/* Form container */}
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
              key="register-form"
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{ width: '100%', maxWidth: 400 }}
            >
              <h2 style={{ fontSize: '28px', fontWeight: 600, marginBottom: 24 }}>
                Tạo tài khoản mới
              </h2>

              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="name"
                      rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                    >
                      <Input placeholder="Họ và tên" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="phoneNumber"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập số điện thoại!',
                        },
                        {
                          pattern: /^[0-9]{10,11}$/,
                          message: 'Số điện thoại không hợp lệ!',
                        },
                      ]}
                    >
                      <Input placeholder="Số điện thoại" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="email"
                  rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                  hasFeedback
                >
                  <Input.Password placeholder="Mật khẩu" />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Xác nhận mật khẩu" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    style={{ backgroundColor: '#000', border: 'none' }}
                  >
                    Đăng ký
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

              <Divider plain>hoặc</Divider>

              <div style={{ textAlign: 'center', marginBottom: 12 }}>
                Đã có tài khoản?{' '}
                <span
                  style={{
                    color: 'red',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                  onClick={() => navigate('/login')}
                >
                  Đăng nhập
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Empty right area just to balance layout */}
        <div style={{ flex: 1, backgroundColor: 'transparent' }} />
      </motion.div>
    </div>
  );
}
