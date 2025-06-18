import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="error"
      title="Thanh toán thất bại"
      subTitle="Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại hoặc liên hệ hỗ trợ."
      extra={[
        <Button
          style={{ backgroundColor: "black", color: "white" }}
          key="retry"
          onClick={() => navigate("/checkout")}
        >
          Thử lại
        </Button>,
        <Button key="support" onClick={() => navigate("/support")}>
          Liên hệ hỗ trợ
        </Button>,
      ]}
    />
  );
};

export default PaymentFailure;
