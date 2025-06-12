import React from "react";
import {
  Layout,
  Input,
  Button,
  Space,
  Badge,
  Tabs,
  Image,
  Dropdown,
  Menu,
} from "antd";
import {
  SearchOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const { Header } = Layout;

const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth(); 
  console.log(user)

  const items = [
    { key: "/", label: "Trang chủ" },
    { key: "/custom", label: "Custom" },
    { key: "/cleaning", label: "Vệ sinh" },
    { key: "/accessories", label: "Phụ kiện" },
  ];

  const handleLogout = () => {
    logout();
    toast.success("Bạn đã đăng xuất thành công!")
    navigate("/");
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile" onClick={() => navigate("/profile")}>
        Hồ sơ
      </Menu.Item>
      <Menu.Item style={{ color: "red" }} key="logout" onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

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
            src={logo}
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
        <Input
          placeholder="Search products..."
          prefix={<SearchOutlined />}
          style={{ width: 200 }}
        />

        <Badge count={2} size="small">
          <HeartOutlined style={{ fontSize: 20 }} />
        </Badge>

        <Link to="/cart">
          <Badge count={3} size="small">
            <ShoppingCartOutlined style={{ fontSize: 20 }} />
          </Badge>
        </Link>

        {user ? (
          <Dropdown overlay={menu} placement="bottomRight">
            <Button icon={<UserOutlined />} type="default">
              Chào, {user.name || "User"}
            </Button>
          </Dropdown>
        ) : (
          <Button
            onClick={() => navigate("/login")}
            icon={<UserOutlined />}
            type="default"
          >
            Đăng nhập
          </Button>
        )}

        {/* <Button icon={<MenuOutlined />} type="text" /> */}
      </Space>
    </Header>
  );
};

export default AppHeader;
