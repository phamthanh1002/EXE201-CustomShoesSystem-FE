import React, { useState } from 'react';
import { Steps, Form, Input, Button, message } from 'antd';
import { MailOutlined, NumberOutlined, LockOutlined, RollbackOutlined } from '@ant-design/icons';
import { ReloadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const { Step } = Steps;

export default function ForgotPassPage() {
  const [current, setCurrent] = useState(0);
  const [sending, setSending] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [email, setEmail] = useState('');
  const [formEmail] = Form.useForm();
  const [formReset] = Form.useForm();
  const { forgotPassword, resetPassword } = useAuth();
  const navigate = useNavigate();

  /* ──────────────────────────────────────────
     1) Gửi email để nhận OTP
  ────────────────────────────────────────── */
  const handleSendOTP = async (values) => {
    setSending(true);
    try {
      // Gọi API gửi OTP
      await forgotPassword({
        email: values.email,
      });
      setEmail(values.email);
      toast.success('OTP đã được gửi, vui lòng kiểm tra email!');
      setCurrent(1);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gửi OTP thất bại, thử lại sau.');
    } finally {
      setSending(false);
    }
  };

  /* ──────────────────────────────────────────
     2) Xác thực OTP & đặt mật khẩu mới
  ────────────────────────────────────────── */
  const handleResetPassword = async (values) => {
    setResetting(true);
    try {
      await resetPassword({
        email,
        otp: values.otp,
        newPassword: values.password,
        confirmNewPassword: values.confirm,
      });
      toast.success('Đổi mật khẩu thành công! Hãy đăng nhập lại.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Đổi mật khẩu thất bại, thử lại.');
    } finally {
      setResetting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f5f5f5',
        padding: 24,
      }}
    >
      <div
        style={{
          width: 420,
          background: '#fff',
          borderRadius: 12,
          padding: 32,
          boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
        }}
      >
        <Steps current={current} size="small" style={{ marginBottom: 40 }}>
          <Step title="Xác nhận email" />
          <Step title="Đặt mật khẩu mới" />
        </Steps>

        {/* ───────── BƯỚC 1 ───────── */}
        {current === 0 && (
          <Form form={formEmail} layout="vertical" onFinish={handleSendOTP} requiredMark={false}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Bạn chưa nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Nhập email của bạn" />
            </Form.Item>

            <Form.Item>
              <Button
                style={{ backgroundColor: 'black', color: 'white' }}
                block
                htmlType="submit"
                loading={sending}
              >
                Gửi OTP
              </Button>
            </Form.Item>

            <Button
              type="dashed"
              block
              icon={<RollbackOutlined />}
              onClick={() => navigate('/login')}
            >
              Quay lại
            </Button>
          </Form>
        )}

        {/* ───────── BƯỚC 2 ───────── */}
        {current === 1 && (
          <Form
            form={formReset}
            layout="vertical"
            onFinish={handleResetPassword}
            requiredMark={false}
          >
            <Form.Item
              label="OTP"
              name="otp"
              rules={[{ required: true, message: 'Vui lòng nhập OTP!' }]}
            >
              <Input
                prefix={<NumberOutlined />}
                placeholder="Nhập mã OTP"
                maxLength={6}
                suffix={
                  <ReloadOutlined
                    style={{ color: 'black', cursor: sending ? 'not-allowed' : 'pointer' }}
                    spin={sending}
                    onClick={async () => {
                      if (sending) return;
                      setSending(true);
                      try {
                        await forgotPassword({ email });
                        toast.success('Đã gửi lại OTP, vui lòng kiểm tra email.');
                      } catch (err) {
                        toast.error(err.response?.data?.message || 'Gửi lại OTP thất bại!');
                      } finally {
                        setSending(false);
                      }
                    }}
                  />
                }
              />
            </Form.Item>

            <Form.Item
              label="Mật khẩu mới"
              name="password"
              rules={[
                { required: true, message: 'Chưa nhập mật khẩu!' },
                { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự!' },
              ]}
              hasFeedback
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu mới" />
            </Form.Item>

            <Form.Item
              label="Xác nhận mật khẩu"
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: 'Hãy xác nhận mật khẩu!' },
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
              <Input.Password prefix={<LockOutlined />} placeholder="Nhập lại mật khẩu" />
            </Form.Item>

            <Form.Item>
              <Button
                style={{ backgroundColor: 'black', color: 'white' }}
                block
                htmlType="submit"
                loading={resetting}
              >
                Đặt lại mật khẩu
              </Button>
            </Form.Item>

            <Button type="dashed" block icon={<RollbackOutlined />} onClick={() => setCurrent(0)}>
              Quay về nhập email
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
}
