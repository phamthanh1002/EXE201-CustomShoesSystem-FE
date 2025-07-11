import React, { useState, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  CommentOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Typography } from 'antd';
import dayjs from 'dayjs';
import OrderManager from './OrderManagement/OrderManager';
import ProductManager from './ProductManagement/ProductManager';
import FeedbackManager from './FeedbackManagement/FeedbackManager';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

export default function StaffHome() {
  const [collapsed, setCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [selectedKey, setSelectedKey] = useState('1');

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: '#001529' }}>
        {/* Time Display */}
        <div
          style={{
            height: 64,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: 8,
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            padding: '0 8px',
            textAlign: 'center',
            gap: 6,
          }}
        >
          {!collapsed && (
            <>
              <div>{currentTime.format('HH:mm:ss')}</div>
              <div>{currentTime.format('DD/MM/YYYY')}</div>
            </>
          )}
        </div>

        {/* Menu */}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={(e) => setSelectedKey(e.key)}
          style={{ paddingTop: 12 }}
          items={[
            {
              key: '1',
              icon: <ShoppingCartOutlined />,
              label: 'Quản lý order',
            },
            {
              key: '2',
              icon: <AppstoreOutlined />,
              label: 'Quản lý sản phẩm',
            },
            {
              key: '3',
              icon: <CommentOutlined />,
              label: 'Quản lý feedback',
            },
          ]}
        />
      </Sider>

      {/* Main Layout */}
      <Layout>
        {/* Content */}
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {selectedKey === '1' && <OrderManager />}
          {selectedKey === '2' && <ProductManager />}
          {selectedKey === '3' && <FeedbackManager />}
        </Content>
      </Layout>
    </Layout>
  );
}
