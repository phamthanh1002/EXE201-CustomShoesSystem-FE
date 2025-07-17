import React, { useEffect, useState } from 'react';
import { Modal, Steps, Button, Checkbox, Space, Typography } from 'antd';
import useOrder from '../../../hooks/useOrder';
import { toast } from 'react-toastify';

const { Step } = Steps;
const { Text } = Typography;

export default function PrepareModal({ open, order, checkedItems = [], onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const { updateStartProcessingStatus, updatePendingShipStatus, fetchAllOrders } = useOrder();
  const detail = order?.orderDetails || []; // Truyền sẵn từ OrderManager
  const [hasInitializedStep, setHasInitializedStep] = useState(false);

  const orderID = order?.orderID;

  // console.log(orderID);

  useEffect(() => {
    if (!open || !order || hasInitializedStep) return;

    setCurrentStep(order.status === 'Đang thực hiện' ? 1 : 0);
    setHasInitializedStep(true);
  }, [open, order, hasInitializedStep]);

  // Reset flag khi đóng modal
  useEffect(() => {
    if (!open) {
      setHasInitializedStep(false);
    }
  }, [open]);

  const handleStartProcessingStatus = async () => {
    try {
      await updateStartProcessingStatus(orderID);
      await fetchAllOrders();
      toast.success('Trạng thái đơn hàng: Đang thực hiện!');
      setCurrentStep(1);
    } catch (error) {
      toast.error('Cập nhật trạng thái đơn hàng thất bại');
    }
  };

  const handlePendingShipStatus = async () => {
    if (detail.length === 0 || checkedItems.length !== detail.length) {
      toast.info('Vui lòng chọn đầy đủ các sản phẩm!');
      return;
    }

    try {
      await updatePendingShipStatus(orderID);
      await fetchAllOrders();
      toast.success('Trạng thái đơn hàng: Chờ vận chuyển!');
      onClose();
    } catch (error) {
      toast.error('Cập nhật trạng thái đơn hàng thất bại');
    }
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} title="Chuẩn bị đơn hàng">
      <Steps
        direction="vertical"
        current={currentStep}
        items={[{ title: 'Đang thực hiện đơn hàng' }, { title: 'Chờ vận chuyển' }]}
        style={{ marginBottom: 24 }}
      />

      {currentStep === 0 && (
        <div>
          <p>Bạn có muốn bắt đầu chuẩn bị đơn hàng?</p>
          <Button type="primary" onClick={handleStartProcessingStatus}>
            Xác nhận chuẩn bị đơn hàng
          </Button>
        </div>
      )}

      {currentStep === 1 && (
        <div>
          <p>Bạn đã chuẩn bị đủ các sản phẩm?</p>
          <Button type="primary" style={{ marginTop: 16 }} onClick={handlePendingShipStatus}>
            Xác nhận chờ vận chuyển
          </Button>
        </div>
      )}
    </Modal>
  );
}
