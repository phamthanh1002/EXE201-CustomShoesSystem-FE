import { Form, Input, Modal, Checkbox, Typography } from 'antd';
import { useEffect } from 'react';

const { Text } = Typography;

function EditAddressModal({ visible, onCancel, onSubmit, loading, initialValues, user }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && initialValues) {
      form.setFieldsValue({
        streetAddress: initialValues.streetAddress,
        ward: initialValues.ward,
        district: initialValues.district,
        isDefault: initialValues.isDefault,
        contactName: user.name,
        contactPhone: user.phoneNumber,
      });
    }
  }, [visible, initialValues, user, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      const fullAddress = `${values.streetAddress}, ${values.ward}, ${values.district}, TP.Hồ Chí Minh`;
      const finalValues = {
        ...values,
        fullAddress,
        contactName: user?.name || '',
        contactPhone: user?.phoneNumber || '',
      };
      onSubmit(finalValues);
    });
  };

  return (
    <Modal
      title="Chỉnh sửa địa chỉ"
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
        <Form.Item name="contactName" hidden>
          <Input />
        </Form.Item>

        <Form.Item name="contactPhone" hidden>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditAddressModal;
