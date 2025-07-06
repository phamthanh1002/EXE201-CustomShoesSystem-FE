import { Modal, Typography } from 'antd';
import React from 'react';

const { Paragraph, Title } = Typography;

export default function TermOfProduct({ visible, onCancel }) {
  return (
    <Modal title="Điều khoản sản phẩm" open={visible} onCancel={onCancel} footer={null}>
      <Typography>
        <Title level={5}>1. Trách nhiệm của người mua</Title>
        <Paragraph>
          Người mua cần kiểm tra kỹ sản phẩm trước khi thanh toán và giữ lại hóa đơn để đối chiếu
          sau này.
        </Paragraph>

        <Title level={5}>2. Chính sách đổi trả</Title>
        <Paragraph>
          Sản phẩm chỉ được đổi trả trong vòng 7 ngày kể từ ngày nhận hàng nếu có lỗi từ nhà cung
          cấp.
        </Paragraph>

        <Title level={5}>3. Hỗ trợ khách hàng</Title>
        <Paragraph>
          Mọi thắc mắc vui lòng liên hệ bộ phận CSKH qua hotline hoặc email được cung cấp trên
          website.
        </Paragraph>
      </Typography>
    </Modal>
  );
}
