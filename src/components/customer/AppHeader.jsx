import React from "react";
import { Layout, Input, Button, Space, Badge, Tabs, Image } from "antd";
import "./AppHeader.css";
import {
  SearchOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const { Header } = Layout;

const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { key: "/", label: "Trang chủ" },
    { key: "/custom", label: "Custom" },
    { key: "/cleaning", label: "Vệ sinh" },
    { key: "/accessories", label: "Phụ kiện" },
  ];

  return (
    <Header
      style={{
        background: "#fff",
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* LEFT: LOGO */}
      <Space align="center" size="large">
        <div
          onClick={() => navigate("/")}
          style={{
            fontSize: 24,
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Image
            src="src\assets\logo.jpg"
            alt="Logo"
            style={{ width: 45, height: 45 }}
            preview={false}
          />
          DesignMyKicks
        </div>

        {/* Tabs */}
        <Tabs
          items={items}
          activeKey={location.pathname}
          size="small"
          onChange={(key) => navigate(key)}
          tabBarStyle={{ margin: 0 }}
          style={{ marginBottom: 0 }}
        />
      </Space>

      {/* RIGHT */}
      <Space size="middle">
        {/* Search Bar */}
        <Input
          placeholder="Search products..."
          prefix={<SearchOutlined />}
          style={{ width: 200 }}
        />

        {/* Favorite */}
        <Badge count={2} size="small">
          <HeartOutlined style={{ fontSize: 20 }} />
        </Badge>

        {/* Cart */}
        <Badge count={3} size="small">
          <ShoppingCartOutlined style={{ fontSize: 20 }} />
        </Badge>

        {/* Login */}
        <Button icon={<UserOutlined />} type="default">
          Đăng nhập
        </Button>

        {/* Menu Button */}
        <Button icon={<MenuOutlined />} type="text" />
      </Space>
    </Header>
  );
};

export default AppHeader;
