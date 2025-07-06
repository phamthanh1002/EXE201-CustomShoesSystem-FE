import {
  CreditCardOutlined,
  DeleteOutlined,
  EditOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  MailOutlined,
  PhoneOutlined,
  ShoppingOutlined,
  StarOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  List,
  Row,
  Space,
  Statistic,
  Table,
  Tabs,
  Tag,
  Typography,
  Popconfirm,
  Modal,
} from 'antd';
import { useEffect, useState } from 'react';
import useCustomerAddress from '../../../hooks/useCustomerAddress';
import AddAddressModal from '../../../components/common/AddAddressModal';
import { toast } from 'react-toastify';
import EditAddressModal from '../../../components/common/EditAddressModal';
import useOrder from '../../../hooks/useOrder';
const { TabPane } = Tabs;
const { Title, Text } = Typography;

function ProfileTabs({
  activeTab,
  setActiveTab,
  orderColumns,
  wishlistData,
  orderData,
  isEditing,
  form,
  user,
}) {
  const {
    addresses,
    createAddresses,
    fetchAddresses,
    makeDefaultAddress,
    removeAddress,
    updateAddresses,
    loading,
  } = useCustomerAddress();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAddressToEdit, setSelectedAddressToEdit] = useState(null);
  const [addForm] = Form.useForm();
  const { orders, fetchMyOrders } = useOrder();

  useEffect(() => {
    fetchMyOrders(user.userID);
  }, []);

  const totalOrder = orders.filter((ord) => ord.status !== 'Failed');

  const totalMoneySpend = totalOrder.reduce((acc, ord) => acc + ord.totalAmount, 0);

  const pointEarned = totalMoneySpend / 1000;

  const handleEditAddress = (address) => {
    setSelectedAddressToEdit(address);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (values) => {
    updateAddresses(selectedAddressToEdit.addressID, values)
      .unwrap()
      .then(() => {
        toast.success('Cập nhật địa chỉ thành công!');
        setIsEditModalOpen(false);
        fetchAddresses();
      })
      .catch((err) => {
        toast.error('Cập nhật địa chỉ thất bại: ' + err);
      });
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    setSelectedAddressToEdit(null);
  };

  const showAddModal = () => {
    addForm.setFieldsValue({
      fullAddress: '',
      streetAddress: '',
      ward: '',
      district: '',
      city: '',
      isDefault: false,
    });
    setIsAddModalOpen(true);
  };

  const handleAddCancel = () => {
    setIsAddModalOpen(false);
  };

  const handleAddSubmit = () => {
    addForm.validateFields().then((values) => {
      createAddresses(values)
        .unwrap()
        .then(() => {
          toast.success('Thêm địa chỉ thành công!');
          setIsAddModalOpen(false);
          fetchAddresses();
        })
        .catch((err) => {
          toast.error('Thêm địa chỉ thất bại: ' + err);
        });
    });
  };

  useEffect(() => {
    if (activeTab === '1') {
      fetchAddresses();
    }
  }, [activeTab]);

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
                  value={totalOrder.length}
                  prefix={<ShoppingOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Tổng chi tiêu"
                  value={totalMoneySpend}
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
                  value={pointEarned}
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
              <Button type="link" icon={<EditOutlined />}>
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
                  name: user.name,
                  email: user.email,
                  phone: user.phoneNumber,
                  address: '',
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
                </Row>
                <Form.Item>
                  <Space>
                    <Button type="primary" htmlType="submit">
                      Lưu thay đổi
                    </Button>
                    <Button onClick={() => setIsEditing(false)}>Hủy</Button>
                  </Space>
                </Form.Item>
              </Form>
            ) : (
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Text strong>Họ và tên:</Text>
                  <br />
                  <Text>{user.name}</Text>
                </Col>
                <Col xs={24} sm={12}>
                  <Text strong>Email:</Text>
                  <br />
                  <Space>
                    <MailOutlined />
                    <Text>{user.email}</Text>
                  </Space>
                </Col>
                <Col xs={24} sm={12}>
                  <Text strong>Số điện thoại:</Text>
                  <br />
                  <Space>
                    <PhoneOutlined />
                    <Text>{user.phoneNumber}</Text>
                  </Space>
                </Col>
              </Row>
            )}
          </Card>

          {/* Address Section */}
          <Card
            title="Danh sách địa chỉ giao hàng"
            extra={
              <Button style={{ backgroundColor: 'black', color: 'white' }} onClick={showAddModal}>
                + Thêm địa chỉ
              </Button>
            }
          >
            <List
              itemLayout="horizontal"
              dataSource={addresses?.filter(Boolean)}
              loading={loading}
              renderItem={(item) => (
                <List.Item
                  key={item.addressID}
                  actions={[
                    !item.isDefault && (
                      <Button type="link" onClick={() => makeDefaultAddress(item.addressID)}>
                        Đặt mặc định
                      </Button>
                    ),
                    <Button type="link" onClick={() => handleEditAddress(item)}>
                      Sửa
                    </Button>,
                    <Popconfirm
                      title="Bạn có chắc chắn muốn xoá địa chỉ này?"
                      onConfirm={() => removeAddress(item.addressID)}
                      okText="Xoá"
                      cancelText="Huỷ"
                      okButtonProps={{ danger: true }}
                    >
                      <Button danger type="link">
                        Xoá
                      </Button>
                    </Popconfirm>,
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <Space>
                        {item.fullAddress}
                        {item.isDefault && (
                          <Tag color="green" icon={<EnvironmentOutlined />}>
                            Mặc định
                          </Tag>
                        )}
                      </Space>
                    }
                    description={
                      <>
                        {item.ward && <div>Phường: {item.ward}</div>}
                        {item.district && <div>Quận: {item.district}</div>}
                        {item.city && <div>Thành phố: {item.city}</div>}
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>

          <AddAddressModal
            visible={isAddModalOpen}
            onCancel={handleAddCancel}
            onSubmit={(values, resetForm) => {
              createAddresses(values)
                .unwrap()
                .then(() => {
                  toast.success('Thêm địa chỉ thành công!');
                  setIsAddModalOpen(false);
                  fetchAddresses();
                  resetForm();
                })
                .catch((err) => {
                  toast.error('Thêm địa chỉ thất bại: ' + err);
                });
            }}
            loading={loading}
          />
          {selectedAddressToEdit && (
            <EditAddressModal
              visible={isEditModalOpen}
              onCancel={handleEditCancel}
              onSubmit={(values) => handleEditSubmit(values)}
              loading={loading}
              initialValues={selectedAddressToEdit}
              user={user}
            />
          )}
        </TabPane>

        {/* Orders Tab */}
        <TabPane tab="Đơn hàng" key="2">
          <Card title="Lịch sử đơn hàng">
            <Table columns={orderColumns} dataSource={orderData} pagination={{ pageSize: 10 }} />
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
                    cover={<Image height={200} src={item.image} style={{ objectFit: 'cover' }} />}
                    actions={[
                      <HeartOutlined key="heart" style={{ color: '#ff4d4f' }} />,
                      <Button
                        type={item.inStock ? 'primary' : 'default'}
                        disabled={!item.inStock}
                        size="small"
                      >
                        {item.inStock ? 'Thêm vào giỏ' : 'Hết hàng'}
                      </Button>,
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
