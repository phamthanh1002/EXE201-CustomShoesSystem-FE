import React, { useEffect, useRef } from 'react';
import { Form, Input, Button, Typography, Card, Space } from 'antd';
import { LockOutlined, PhoneOutlined, NumberOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../store/slices/authSlice';
import { values } from 'lodash';

const { Title } = Typography;

export default function CreatePassPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const calledRef = useRef(false);
  const { updateProfile, resetPassword, logout, user } = useAuth();

  const email = user?.email;
  const name = user?.name;

  useEffect(() => {
    if (!email || calledRef.current) return;
    calledRef.current = true;
    const fetchOTP = async () => {
      try {
        await dispatch(forgotPassword({ email }));
        toast.success('Mã OTP đã được gửi về email của bạn!');
      } catch (error) {
        toast.error(error?.message || 'Đã xảy ra lỗi khi gửi mã OTP.');
      }
    };

    fetchOTP();
  }, [email]);

  const createPhoneNumber = async (values) => {
    const { phoneNumber } = values;
    const formData = {
      name,
      phoneNumber,
    };

    const action = await updateProfile(email, formData);

    // Kiểm tra đúng định dạng Redux Toolkit
    if (action.type.endsWith('rejected')) {
      throw new Error(action?.error?.message || 'Cập nhật số điện thoại thất bại!');
    }
  };

  const createPassword = async (values) => {
    const res = await resetPassword({
      email,
      otp: values.otp,
      newPassword: values.newPassword,
      confirmNewPassword: values.confirmNewPassword,
    });
    if (res.type.endsWith('rejected')) {
      throw new Error(res?.error?.message || 'Tạo mật khẩu thất bại!');
    }
  };

  const onFinish = async (values) => {
    try {
      await createPhoneNumber(values);
      await createPassword(values);

      // Lấy lại dữ liệu user hiện tại từ localStorage
      const oldUser = JSON.parse(localStorage.getItem('user') || '{}');

      const updatedUser = {
        ...oldUser,
        phoneNumber: values.phoneNumber,
        // Thêm các trường khác nếu cần
      };

      // Cập nhật lại localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));

      toast.success('Tạo mật khẩu thành công!');
      navigate('/');
    } catch (error) {
      toast.error(error?.message || 'Đã xảy ra lỗi!');
    }
  };
  
  const handleCancel = () => {
    logout();
    navigate('/login');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f0f2f5',
        padding: '20px',
      }}
    >
      <Card
        bordered={false}
        style={{
          width: '100%',
          maxWidth: 400,
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <Title level={3} style={{ marginBottom: 8 }}>
            Tạo Mật Khẩu Mới
          </Title>
          <Typography.Paragraph type="secondary" style={{ fontSize: 14 }}>
            Việc tạo mật khẩu sẽ giúp bạn đồng bộ với tài khoản Google và đăng nhập dễ dàng hơn về
            sau.
          </Typography.Paragraph>
        </div>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="phoneNumber"
            label="Số điện thoại"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại!' },
              { pattern: /^0\d{9}$/, message: 'Số điện thoại không hợp lệ!' },
            ]}
          >
            <Input size="large" prefix={<PhoneOutlined />} placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item
            name="otp"
            label="Mã xác nhận (OTP)"
            rules={[{ required: true, message: 'Vui lòng nhập mã OTP!' }]}
          >
            <Input size="large" prefix={<NumberOutlined />} placeholder="Nhập mã OTP" />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="Mật khẩu"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu !' },
              { min: 6, message: 'Mật khẩu ít nhất 6 ký tự!' },
            ]}
            hasFeedback
          >
            <Input.Password size="large" prefix={<LockOutlined />} placeholder="Mật khẩu " />
          </Form.Item>

          <Form.Item
            name="confirmNewPassword"
            label="Xác nhận mật khẩu"
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Xác nhận mật khẩu"
            />
          </Form.Item>

          <Form.Item>
            <Space style={{ width: '100%', marginTop: 5 }} direction="vertical">
              <Button style={{ backgroundColor: 'black', color: 'white' }} htmlType="submit" block>
                Tạo Mật Khẩu
              </Button>
              <Button type="default" onClick={handleCancel} block>
                ← Quay về trang đăng nhập
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
