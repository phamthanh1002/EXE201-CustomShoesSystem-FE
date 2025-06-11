import React, { useEffect } from "react";
import { Form, Input, Button, Divider, message } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import img1 from "../../assets/Login/img1.jpg";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { loginUser } from "../../store/slices/authSlice";
import { toast } from "react-toastify";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading, error, user } = useAuth();

  const onFinish = async (values) => {
    const { email, password } = values;
    const resultAction = await login(email, password);

    if (loginUser.fulfilled.match(resultAction)) {
      toast.success("Đăng nhập thành công!");
      navigate("/");
    } else {
      toast.error(resultAction.payload || "Đăng nhập thất bại");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "80%",
          maxWidth: "1000px",
          height: "600px",
          border: "2px solid black",
          borderRadius: "14px",
          overflow: "hidden",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Left - Image + quote */}
        <div
          style={{
            flex: 1,
            backgroundImage: `url(${img1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "#fff",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.4)",
              borderRadius: 12,
              padding: 20,
            }}
          >
            <p style={{ fontSize: 16, fontStyle: "italic", color: "#fff" }}>
              “A shoe is not only a design, but it's a part of your body
              language...”
            </p>
            <p style={{ fontWeight: "bold", marginTop: 10, color: "#fff" }}>
              Christian Louboutin
            </p>
          </div>
        </div>

        {/* Right - Login Form */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 40,
          }}
        >
          <div style={{ width: "100%", maxWidth: 400 }}>
            <h2 style={{ fontSize: "28px", fontWeight: 600, marginBottom: 24 }}>
              Login to your account
            </h2>

            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                  style={{ backgroundColor: "#000", border: "none" }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>

            <Button
              type="default"
              block
              onClick={() => navigate(-1)}
              style={{ marginBottom: 16 }}
            >
              ← Quay về trang trước
            </Button>

            <Divider plain>or</Divider>

            <div style={{ textAlign: "center", marginBottom: 12 }}>
              Don't have an account? <a href="/register">Create one</a>
            </div>

            <Button icon={<GoogleOutlined />} block style={{ marginBottom: 8 }}>
              Continue with Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
