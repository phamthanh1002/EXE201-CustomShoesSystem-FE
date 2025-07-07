import React, { useEffect } from 'react';
import { Modal, Form, Input, Rate, Button } from 'antd';

function FeedbackFormModal({ visible, onCancel, onSubmit, loading, productID }) {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSubmit({
      ...values,
      productID,
    });
  };

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        rating: 0,
        comment: '',
      });
    }
  }, [visible]);

  return (
    <Modal title="Gửi đánh giá sản phẩm" open={visible} onCancel={onCancel} footer={null}>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="rating"
          label="Đánh giá"
          rules={[{ required: true, message: 'Vui lòng chọn số sao' }]}
        >
          <Rate />
        </Form.Item>

        <Form.Item
          name="comment"
          label="Bình luận"
          rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary" block loading={loading}>
            Gửi Feedback
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default FeedbackFormModal;
