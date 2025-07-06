import { Form, Input, Modal, Checkbox, Typography } from 'antd';
import { useEffect } from 'react';

const { Text } = Typography;

function AddAddressModal({ visible, onCancel, onSubmit, loading }) {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      // Tự động tạo fullAddress
      const fullAddress = `${values.streetAddress}, ${values.ward}, ${values.district}, TP.Hồ Chí Minh`;
      const finalValues = { ...values, fullAddress };
      onSubmit(finalValues, () => form.resetFields());
    });
  };

  useEffect(() => {
    if (!visible) form.resetFields();
  }, [visible, form]);

  return (
    <Modal
      title="Thêm địa chỉ mới"
      open={visible}
      onOk={handleOk}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      okText="Lưu"
      cancelText="Hủy"
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="streetAddress"
          label="Tên đường"
          rules={[
            { required: true, message: 'Vui lòng nhập tên đường!' },
            {
              pattern: /\d+/,
              message: 'Tên đường phải bao gồm số nhà!',
            },
          ]}
        >
          <Input placeholder="Ví dụ: 123 Đường ABC" />
        </Form.Item>

        <Form.Item
          name="ward"
          label="Phường"
          rules={[{ required: true, message: 'Vui lòng nhập phường!' }]}
        >
          <Input placeholder="Ví dụ: Phường 5" />
        </Form.Item>

        <Form.Item
          name="district"
          label="Quận"
          rules={[{ required: true, message: 'Vui lòng nhập quận!' }]}
        >
          <Input placeholder="Ví dụ: Quận 3" />
        </Form.Item>

        <Form.Item label="Thành phố">
          <Input defaultValue="TP.Hồ Chí Minh" disabled />
        </Form.Item>

        <Form.Item name="isDefault" valuePropName="checked" style={{ marginTop: '16px' }}>
          <Checkbox>
            Đặt địa chỉ này làm mặc định
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              Hệ thống sẽ ưu tiên chọn địa chỉ giao hàng này
            </Text>
          </Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddAddressModal;
