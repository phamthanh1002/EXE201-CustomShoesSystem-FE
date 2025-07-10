import React, { useEffect, useState } from 'react';
import { Modal, Steps, Input, Form, Button, message } from 'antd';
import usePickup from '../../../hooks/usePickup';
import { toast } from 'react-toastify';
import useOrder from '../../../hooks/useOrder';

const { Step } = Steps;

export default function PickupModal({ open, order, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const { pickup, createShipper, updatePickingUp, updatePickupDone } = usePickup();
  const { fetchAllOrders } = useOrder();

  const relatedPickup = pickup.find((p) => p.orderID === order?.orderID);
  const pickupID = relatedPickup?.pickupID;

  useEffect(() => {
    if (!open || !order) return;

    if (order.status === 'Đang đến lấy hàng') {
      setCurrentStep(1);
    } else {
      setCurrentStep(0);
    }
  }, [open, order]);

  const handleCreateShipper = async () => {
    if (!pickupID) {
      toast.error('Không tìm thấy pickupID tương ứng với đơn hàng');
      return;
    }

    try {
      const values = await form.validateFields();
      await createShipper(pickupID, {
        shipperName: values.shipperName,
        shipperPhone: values.shipperPhone,
      });

      await updatePickingUp(pickupID);

      await fetchAllOrders();

      toast.success('Tạo shipper thành công!');
      setCurrentStep(1);
    } catch (error) {
      toast.error('Tạo shipper thất bại!');
    }
  };

  const handleConfirmPickup = async () => {
    try {
      await updatePickupDone(pickupID);

      await fetchAllOrders();

      toast.success('Đã cập nhật trạng thái: Đã lấy hàng');
      onClose();
    } catch (error) {
      toast.error('Cập nhật trạng thái thất bại');
    }
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} title="Lấy hàng">
      <Steps
        direction="vertical"
        current={currentStep}
        items={[{ title: 'Tạo shipper' }, { title: 'Lấy hàng' }]}
        style={{ marginBottom: 24 }}
      />

      {currentStep === 0 && (
        <Form form={form} layout="vertical">
          <Form.Item
            required
            label="Tên shipper"
            name="shipperName"
            rules={[{ required: true, message: 'Vui lòng nhập tên shipper' }]}
          >
            <Input placeholder="Nhập tên shipper" />
          </Form.Item>

          <Form.Item
            required
            label="SĐT shipper"
            name="shipperPhone"
            rules={[{ required: true, message: 'Vui lòng nhập SĐT' }]}
          >
            <Input placeholder="Nhập SĐT shipper" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={handleCreateShipper}>
              Xác nhận & Tiếp tục
            </Button>
          </Form.Item>
        </Form>
      )}

      {currentStep === 1 && (
        <div>
          <p>Bạn đã chắc chắn đã lấy hàng từ khách?</p>
          <Button type="primary" onClick={handleConfirmPickup}>
            Xác nhận đã lấy hàng
          </Button>
        </div>
      )}
    </Modal>
  );
}
