import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Steps } from 'antd';
import { toast } from 'react-toastify';
import useOrder from '../../../hooks/useOrder';
import useDelivery from '../../../hooks/useDelivery';

const { Step } = Steps;

export default function ShipModal({ open, order, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const { fetchAllOrders } = useOrder();
  const { createDelivery, startDelivery, completeDelivery, getDeliveryByOrderID, fetchedDelivery } =
    useDelivery();

  useEffect(() => {
    if (!open || !order) return;

    // Lấy delivery từ backend khi mở modal
    if (order.orderID) {
      getDeliveryByOrderID(order.orderID);
    }

    // Thiết lập bước hiện tại
    if (order.status === 'Đang giao hàng') {
      setCurrentStep(1);
    } else {
      setCurrentStep(0);
    }
  }, [open, order]);

  const handleCreateDelivery = async () => {
    try {
      const values = await form.validateFields();
      const formData = {
        orderID: order.orderID,
        ...values,
      };

      const created = await createDelivery(formData).unwrap();
      await startDelivery(created.deliveryID).unwrap();

      toast.success('Tạo và bắt đầu giao hàng thành công!');
      await fetchAllOrders();
      setCurrentStep(1);
    } catch (err) {
      toast.error(err?.message || 'Tạo đơn giao hàng thất bại!');
    }
  };

  const handleCompleteDelivery = async () => {
    try {
      const deliveryID = order.delivery?.deliveryID || fetchedDelivery?.deliveryID;

      if (!deliveryID) {
        toast.error('Không tìm thấy deliveryID!');
        return;
      }

      await completeDelivery(deliveryID).unwrap();

      toast.success('Đơn hàng đã được hoàn thành!');
      await fetchAllOrders();
      onClose();
    } catch (err) {
      toast.error(err?.message || 'Hoàn tất đơn hàng thất bại!');
    }
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} title="Phiếu giao hàng">
      <Steps
        direction="vertical"
        current={currentStep}
        items={[{ title: 'Tạo đơn giao hàng' }, { title: 'Hoàn thành đơn hàng' }]}
        style={{ marginBottom: 24 }}
      />

      {currentStep === 0 && (
        <Form form={form} layout="vertical" initialValues={{ note: '' }}>
          <Form.Item
            label="Tên người giao hàng"
            name="shipperName"
            rules={[{ required: true, message: 'Vui lòng nhập tên người giao hàng' }]}
          >
            <Input placeholder="Nguyễn Văn A" />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="shipperPhone"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại' },
              {
                pattern: /^0\d{9}$/,
                message: 'Số điện thoại không hợp lệ',
              },
            ]}
          >
            <Input placeholder="09xxxxxxxx" />
          </Form.Item>
          <Form.Item label="Ghi chú" name="note">
            <Input.TextArea rows={3} placeholder="Giao trước 6h, gọi trước khi tới..." />
          </Form.Item>

          <Button type="primary" onClick={handleCreateDelivery} block>
            Tạo đơn giao hàng
          </Button>
        </Form>
      )}

      {currentStep === 1 && (
        <div style={{ textAlign: 'center' }}>
          <p>Xác nhận hoàn thành đơn hàng?</p>
          <Button type="primary" onClick={handleCompleteDelivery}>
            Hoàn thành đơn hàng
          </Button>
        </div>
      )}
    </Modal>
  );
}
