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
import { useState } from 'react';
const { TabPane } = Tabs;
const { Title, Text } = Typography;

function ProfileTabs({activeTab, 
    setActiveTab, 
    handleEditProfile, 
    handleSaveProfile,
    handleDeleteAccount,
    orderColumns,
    wishlistData,
    orderData,
    isEditing,
    form}) {
    return (  
    <Col xs={24} lg={18}>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane tab="Tổng quan & Cài đặt" key="1">
            {/* Statistics Section */}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                <Col xs={24} sm={8}>
                <Card>
                    <Statistic
                    title="Tổng đơn hàng"
                    value={24}
                    prefix={<ShoppingOutlined />}
                    valueStyle={{ color: '#1890ff' }}
                    />
                </Card>
                </Col>
                <Col xs={24} sm={8}>
                <Card>
                    <Statistic
                    title="Tổng chi tiêu"
                    value="15.6M"
                    prefix={<CreditCardOutlined />}
                    valueStyle={{ color: '#52c41a' }}
                    suffix="VND"
                    />
                </Card>
                </Col>
                <Col xs={24} sm={8}>
                <Card>
                    <Statistic
                    title="Điểm tích lũy"
                    value={2450}
                    prefix={<StarOutlined />}
                    valueStyle={{ color: '#722ed1' }}
                    />
                </Card>
                </Col>
            </Row>

            {/* Personal Information Section */}
            <Card
                title="Thông tin cá nhân"
                extra={
                <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={handleEditProfile}
                >
                    {isEditing ? 'Hủy' : 'Chỉnh sửa'}
                </Button>
                }
                style={{ marginBottom: '24px' }}
            >
                {isEditing ? (
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSaveProfile}
                    initialValues={{
                    name: 'Phạm Công Thành',
                    email: 'pthanh123@gmail.com',
                    phone: '0123456789',
                    address: '123 Nguyễn Trãi, Hà Nội'
                    }}
                >
                    <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Họ và tên" name="name">
                        <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Email" name="email">
                        <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Số điện thoại" name="phone">
                        <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Địa chỉ" name="address">
                        <Input />
                        </Form.Item>
                    </Col>
                    </Row>
                    <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit">
                        Lưu thay đổi
                        </Button>
                        <Button onClick={() => setIsEditing(false)}>
                        Hủy
                        </Button>
                    </Space>
                    </Form.Item>
                </Form>
                ) : (
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                    <Text strong>Họ và tên:</Text>
                    <br />
                    <Text>Phạm Công Thành</Text>
                    </Col>
                    <Col xs={24} sm={12}>
                    <Text strong>Email:</Text>
                    <br />
                    <Space>
                        <MailOutlined />
                        <Text>pthanh123@gmail.com</Text>
                    </Space>
                    </Col>
                    <Col xs={24} sm={12}>
                    <Text strong>Số điện thoại:</Text>
                    <br />
                    <Space>
                        <PhoneOutlined />
                        <Text>0123456789</Text>
                    </Space>
                    </Col>
                    <Col xs={24} sm={12}>
                    <Text strong>Địa chỉ:</Text>
                    <br />
                    <Space>
                        <EnvironmentOutlined />
                        <Text>123 Nguyễn Trãi, Hà Nội</Text>
                    </Space>
                    </Col>
                </Row>
                )}
            </Card>

            {/* Settings Section */}
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Card title="Bảo mật">
                <List>
                    <List.Item
                    actions={[
                        <Button type="link" icon={<EditOutlined />}>
                        Thay đổi
                        </Button>
                    ]}
                    >
                    <List.Item.Meta
                        title="Đổi mật khẩu"
                        description="Cập nhật mật khẩu của bạn"
                    />
                    </List.Item>
                    <List.Item
                    actions={[
                        <Switch defaultChecked={false} />
                    ]}
                    >
                    <List.Item.Meta
                        title="Xác thực 2 bước"
                        description="Tăng cường bảo mật cho tài khoản"
                    />
                    </List.Item>
                </List>
                </Card>

                <Card title="Thông báo">
                <List>
                    <List.Item
                    actions={[
                        <Switch defaultChecked={true} />
                    ]}
                    >
                    <List.Item.Meta
                        title="Email thông báo đơn hàng"
                        description="Nhận email khi có cập nhật đơn hàng"
                    />
                    </List.Item>
                    <List.Item
                    actions={[
                        <Switch defaultChecked={true} />
                    ]}
                    >
                    <List.Item.Meta
                        title="SMS xác nhận"
                        description="Nhận SMS xác nhận giao dịch"
                    />
                    </List.Item>
                </List>
                </Card>

                <Card title="Khác">
                <List>
                    <List.Item
                    actions={[
                        <Button
                        type="primary"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={handleDeleteAccount}
                        >
                        Xóa tài khoản
                        </Button>
                    ]}
                    >
                    <List.Item.Meta
                        title="Xóa tài khoản"
                        description="Xóa vĩnh viễn tài khoản và tất cả dữ liệu"
                    />
                    </List.Item>
                </List>
                </Card>
            </Space>
            </TabPane>

            {/* Orders Tab */}
            <TabPane tab="Đơn hàng" key="2">
            <Card title="Lịch sử đơn hàng">
                <Table
                columns={orderColumns}
                dataSource={orderData}
                pagination={{ pageSize: 10 }}
                />
            </Card>
            </TabPane>

            {/* Wishlist Tab */}
            <TabPane tab="Yêu thích" key="3">
            <Card title="Danh sách yêu thích">
                <Row gutter={[16, 16]}>
                {wishlistData.map((item) => (
                    <Col xs={24} sm={12} lg={8} key={item.id}>
                    <Card
                        hoverable
                        cover={
                        <Image
                            height={200}
                            src={item.image}
                            style={{ objectFit: 'cover' }}
                        />
                        }
                        actions={[
                        <HeartOutlined key="heart" style={{ color: '#ff4d4f' }} />,
                        <Button
                            type={item.inStock ? 'primary' : 'default'}
                            disabled={!item.inStock}
                            size="small"
                        >
                            {item.inStock ? 'Thêm vào giỏ' : 'Hết hàng'}
                        </Button>
                        ]}
                    >
                        <Card.Meta
                        title={item.name}
                        description={
                            <Space direction="vertical" size="small">
                            <Text strong style={{ color: '#1890ff' }}>
                                {item.price} VND
                            </Text>
                            <Tag color={item.inStock ? 'green' : 'red'}>
                                {item.inStock ? 'Còn hàng' : 'Hết hàng'}
                            </Tag>
                            </Space>
                        }
                        />
                    </Card>
                    </Col>
                ))}
                </Row>
            </Card>
            </TabPane>
        </Tabs>
    </Col> 
    );
}

export default ProfileTabs;