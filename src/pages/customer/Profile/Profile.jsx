import {
  ClockCircleOutlined,
  CreditCardOutlined,
  DeleteOutlined,
  EditOutlined,
  EnvironmentOutlined,
  ExclamationCircleOutlined,
  HeartOutlined,
  MailOutlined,
  PhoneOutlined,
  ShoppingOutlined,
  StarOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  Layout,
  List,
  Menu,
  Modal,
  Rate,
  Row,
  Space,
  Statistic,
  Switch,
  Table,
  Tabs,
  Tag,
  Typography,
  message,
} from 'antd';
import { useState } from 'react';
import SideBarProfile from './SideBarProfile';
import ProfileTabs from './ProfileTabs';
import useAuth from '../../../hooks/useAuth';
const { TabPane } = Tabs;
const { Title, Text } = Typography;

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('1');
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const { user } = useAuth();

  console.log(user);

  // Sample data
  const orderData = [
    {
      key: '1',
      orderId: '#DH001',
      date: '2025-06-15',
      status: 'delivered',
      total: '1,200,000',
      items: 2,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
    },
    {
      key: '2',
      orderId: '#DH002',
      date: '2025-06-10',
      status: 'shipping',
      total: '2,400,000',
      items: 1,
      image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=400',
    },
    {
      key: '3',
      orderId: '#DH003',
      date: '2025-06-05',
      status: 'cancelled',
      total: '800,000',
      items: 1,
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400',
    },
  ];

  const wishlistData = [
    {
      id: 1,
      name: 'Nike Air Force 1 Custom',
      price: '1,500,000',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
      inStock: true,
    },
    {
      id: 2,
      name: 'Adidas Ultraboost 22',
      price: '2,200,000',
      image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=400',
      inStock: false,
    },
    {
      id: 3,
      name: 'Jordan 1 Retro High',
      price: '3,500,000',
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400',
      inStock: true,
    },
  ];

  const getStatusTag = (status) => {
    const statusConfig = {
      delivered: { color: 'green', text: 'Đã giao' },
      shipping: { color: 'blue', text: 'Đang giao' },
      cancelled: { color: 'red', text: 'Đã hủy' },
      pending: { color: 'orange', text: 'Chờ xử lý' },
    };
    const config = statusConfig[status] || { color: 'default', text: status };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const orderColumns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'image',
      key: 'image',
      render: (image, record) => (
        <Space>
          <Image width={50} height={50} src={image} style={{ borderRadius: '8px' }} />
          <div>
            <Text strong>{record.orderId}</Text>
            <br />
            <Text type="secondary">{record.items} sản phẩm</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'date',
      key: 'date',
      render: (date) => (
        <Space>
          <ClockCircleOutlined />
          {date}
        </Space>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
      key: 'total',
      render: (total) => <Text strong>{total} VND</Text>,
    },
  ];

  return (
    <Layout style={{ padding: '24px', background: '#f0f2f5' }}>
      <Row gutter={24}>
        <SideBarProfile activeTab={activeTab} setActiveTab={setActiveTab} user={user} />
        <ProfileTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          orderColumns={orderColumns}
          wishlistData={wishlistData}
          orderData={orderData}
          isEditing={isEditing}
          form={form}
          user={user}
        />
      </Row>
    </Layout>
  );
}
