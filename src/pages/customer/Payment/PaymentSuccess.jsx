import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Result
        status="success"
        title="Thanh toán thành công!"
        subTitle="Cảm ơn bạn đã mua hàng. Chúng tôi sẽ xử lý đơn hàng của bạn sớm nhất."
        extra={[
          <Button
            style={{ backgroundColor: "black", color: "white" }}
            key="home"
            onClick={() => navigate("/")}
          >
            Về trang chủ
          </Button>,
          <Button key="order" onClick={() => navigate("/profile")}>
            Xem đơn hàng
          </Button>,
        ]}
      />
    </div>
  );
};

export default PaymentSuccess;
