import React from 'react';
import { Layout, Button, Space, Dropdown, Menu, Image, Typography } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../../assets/logo.png';
import useAuth from '../../hooks/useAuth';

const { Header } = Layout;
const { Text } = Typography;

const AdminHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Bạn đã đăng xuất thành công!');
    navigate('/');
  };

  const menu = (
    <Menu>
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined />}
        onClick={handleLogout}
        style={{ color: 'red' }}
      >
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        background: '#fff',
        padding: '0 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* Logo + Title */}
      <div
        onClick={() => navigate('/')}
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <Image src={logo} alt="Logo" style={{ width: 45, height: 45 }} preview={false} />
        DesignMyKicks
      </div>

      {/* User Info */}
      <Space>
        <Text style={{ fontWeight: 500, color: '#555' }}>Chào {user?.name}!</Text>
        <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
          <Button shape="circle" icon={<UserOutlined />} />
        </Dropdown>
      </Space>
    </Header>
  );
};

export default AdminHeader;
