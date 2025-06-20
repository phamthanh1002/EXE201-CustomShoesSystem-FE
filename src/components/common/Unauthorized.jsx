import React from "react";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { FrownOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff", 
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        fontFamily: "'Montserrat', sans-serif",
        textAlign: "center",
      }}
    >
      <div>
        <FrownOutlined style={{ fontSize: "64px", color: "#000" }} />
        <Title level={2} style={{ color: "#000", marginTop: 16 }}>
          403 – Không được phép truy cập
        </Title>
        <Paragraph style={{ fontSize: 16, color: "#000", maxWidth: 600 }}>
          Bạn đang cố truy cập một trang mà bạn không có quyền. Hãy kiểm tra lại
          vai trò của bạn hoặc quay lại trang chủ.
        </Paragraph>
        <Button
          type="primary"
          size="large"
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "#ff4d4f",
            border: "none",
            padding: "6px 24px",
            marginTop: 24,
            fontWeight: "bold",
          }}
        >
          Về trang chủ
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
