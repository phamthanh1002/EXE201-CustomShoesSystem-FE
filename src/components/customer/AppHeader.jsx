import React from 'react';
import { Layout, Input, Button, Space, Badge, Tabs, Image, Dropdown, Menu, Grid } from 'antd';
import {
  SearchOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import SearchBar from '../common/SearchBar';
import { useState, useEffect } from 'react';
import useCart from '../../hooks/useCart';

const { useBreakpoint } = Grid;
const { Header } = Layout;

const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint();
  const [searchTerm, setSearchTerm] = useState('');
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const keyword = params.get('keyword');
    if (keyword) {
      setSearchTerm(keyword);
    }
  }, [location.search]);

  // const shouldShowSearchBar = !location.pathname.includes('/search');

  const handleSearch = () => {
    const trimmed = searchTerm.trim();
    if (trimmed === '') {
      navigate('/search');
    } else {
      navigate(`/search?keyword=${encodeURIComponent(trimmed)}`);
    }
  };

  const items = [
    { key: '/', label: 'Trang chủ' },
    { key: '/custom', label: 'Custom' },
    { key: '/cleaning', label: 'Vệ sinh' },
    { key: '/accessories', label: 'Phụ kiện' },
  ];

  const handleLogout = () => {
    logout();
    toast.success('Bạn đã đăng xuất thành công!');
    navigate('/');
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile" onClick={() => navigate('/profile')}>
        Hồ sơ
      </Menu.Item>
      <Menu.Item style={{ color: 'red' }} key="logout" onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        background: '#fff',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* LEFT: LOGO */}
      <Space align="center" size="large">
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

        {/* Tabs or Menu icon */}
        {screens.md ? (
          <Tabs
            items={items}
            activeKey={location.pathname}
            size="small"
            onChange={(key) => navigate(key)}
            tabBarStyle={{ margin: 0 }}
            style={{ marginBottom: 0 }}
          />
        ) : (
          <Dropdown
            overlay={<Menu items={items} onClick={({ key }) => navigate(key)} />}
            trigger={['click']}
          >
            <Button icon={<MenuOutlined />} />
          </Dropdown>
        )}
      </Space>

      <Space size={screens.md ? 'middle' : 'small'}>
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSearch={handleSearch}
        />

        <Badge count={2} size="small">
          <HeartOutlined style={{ fontSize: 20 }} />
        </Badge>

        <Link to="/cart">
          <Badge count={cartItems.length} size="small">
            <ShoppingCartOutlined style={{ fontSize: 20 }} />
          </Badge>
        </Link>

        {user ? (
          <Dropdown overlay={menu} placement="bottomRight">
            <Button icon={<UserOutlined />} type="default">
              {screens.md ? `Chào, ${user.name || 'User'}` : null}
            </Button>
          </Dropdown>
        ) : (
          <Button onClick={() => navigate('/login')} icon={<UserOutlined />} type="default">
            {screens.md ? 'Đăng nhập' : null}
          </Button>
        )}
      </Space>
    </Header>
  );
};

export default AppHeader;
