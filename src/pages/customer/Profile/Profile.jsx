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
import useOrder from '../../../hooks/useOrder';
const { TabPane } = Tabs;
const { Title, Text } = Typography;

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('1');
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const { user } = useAuth();

  return (
    <Layout style={{ padding: '24px', background: '#f0f2f5' }}>
      <Row gutter={24}>
        <SideBarProfile activeTab={activeTab} setActiveTab={setActiveTab} user={user} />
        <ProfileTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isEditing={isEditing}
          form={form}
          user={user}
        />
      </Row>
    </Layout>
  );
}
