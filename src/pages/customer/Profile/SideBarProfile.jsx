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
    UserOutlined
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
    message
} from 'antd';
const { Title, Text } = Typography;


function SideBarProfile({activeTab, setActiveTab}) {
    return ( <>
        <Col xs={24} lg={6}>
            <Card style={{ textAlign: 'center', marginBottom: '24px' }}>
                <Avatar
                size={80}
                style={{
                    background: 'linear-gradient(45deg, #1890ff, #722ed1)',
                    marginBottom: '16px'
                }}
                icon={<UserOutlined />}
                />
                <Title level={4} style={{ marginBottom: '8px' }}>Phạm Công Thành</Title>
                <Text type="secondary">Member since 2023</Text>
                <div style={{ marginTop: '8px' }}>
                <Rate disabled defaultValue={5} style={{ fontSize: '16px' }} />
                <br />
                <Tag color="gold" style={{ marginTop: '8px' }}>VIP Customer</Tag>
                </div>
            </Card>
            <Menu
                mode="vertical"
                selectedKeys={[activeTab]}
                style={{ background: '#fff', borderRadius: '8px' }}
                items={[
                {
                    key: '1',
                    icon: <UserOutlined />,
                    label: 'Tổng quan & Cài đặt',
                    onClick: () => setActiveTab('1')
                },
                {
                    key: '2',
                    icon: <ShoppingOutlined />,
                    label: 'Đơn hàng',
                    onClick: () => setActiveTab('2')
                },
                {
                    key: '3',
                    icon: <HeartOutlined />,
                    label: 'Yêu thích',
                    onClick: () => setActiveTab('3')
                }
                ]}
            />
        </Col>
    </> );
}

export default SideBarProfile;