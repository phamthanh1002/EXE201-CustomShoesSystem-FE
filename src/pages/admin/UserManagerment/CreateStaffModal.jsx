import React, { useState } from 'react';
import { Modal, Form, Input, Row, Col, Card, message } from 'antd';
import { UserAddOutlined, PlusOutlined } from '@ant-design/icons';
import useUser from '../../../hooks/useUser';
import { toast } from 'react-toastify';

export default function CreateStaffModal({ open, onClose, onCreate }) {
  const { createNewStaff } = useUser();
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);

      await createNewStaff(values); // gọi API

      toast.success('Tạo nhân viên thành công!');

      form.resetFields();
      onClose();
      onCreate();
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.error(error);
        toast.error('Tạo nhân viên thất bại!');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      title={
        <span>
          <UserAddOutlined style={{ marginRight: 8, color: '#1677ff' }} />
          Tạo nhân viên mới
        </span>
      }
      open={open}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      onOk={handleSubmit}
      okText={
        <span>
          <PlusOutlined /> Tạo
        </span>
      }
      cancelText="Hủy"
      confirmLoading={submitting}
      width={600}
    >
      <Card bordered={false} bodyStyle={{ padding: 0 }}>
        <Form form={form} layout="vertical" style={{ marginTop: 12 }}>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label="Họ và tên"
                name="name"
                rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
              >
                <Input placeholder="Nhập tên nhân viên" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Vui lòng nhập email' },
                  { type: 'email', message: 'Email không hợp lệ' },
                ]}
              >
                <Input placeholder="Nhập email" />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  { required: true, message: 'Vui lòng nhập mật khẩu' },
                  {
                    pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:"<>?[\]\\;',./~`]).{6,}$/,
                    message: 'Mật khẩu cần ít nhất 6 ký tự, gồm chữ hoa, số và ký tự đặc biệt',
                  },
                ]}
              >
                <Input.Password placeholder="Nhập mật khẩu" />
              </Form.Item>

              <Form.Item
                label="Số điện thoại"
                name="phoneNumber"
                rules={[
                  { required: true, message: 'Vui lòng nhập số điện thoại' },
                  {
                    pattern: /^[0-9]{10,11}$/,
                    message: 'Số điện thoại không hợp lệ',
                  },
                ]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </Modal>
  );
}
