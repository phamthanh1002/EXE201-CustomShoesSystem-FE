import {
  CreditCardOutlined,
  EditOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  ReloadOutlined,
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
  Pagination,
} from 'antd';
import { useEffect, useState } from 'react';
import useCustomerAddress from '../../../hooks/useCustomerAddress';
import AddAddressModal from '../../../components/common/AddAddressModal';
import { toast } from 'react-toastify';
import EditAddressModal from '../../../components/common/EditAddressModal';
import useOrder from '../../../hooks/useOrder';
import useAuth from '../../../hooks/useAuth';
import FeedbackFormModal from '../../../components/common/FeedbackFormModal';
import useFeedback from '../../../hooks/useFeedback';
import useBookmark from '../../../hooks/useBookmark';
import ProductCard from '../../../components/common/ProductCard';
const { TabPane } = Tabs;
const { Title, Text } = Typography;

function ProfileTabs({ activeTab, setActiveTab, form, user }) {
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
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedInfo, setSortedInfo] = useState({
    columnKey: 'orderDate',
    order: 'descend',
  });
  const pageSize = 6;
  const [addForm] = Form.useForm();
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);
  const [currentFeedbackItem, setCurrentFeedbackItem] = useState(null);
  const { orders, orderDetailData, fetchMyOrders, fetchOrderDetail } = useOrder();
  const { updateProfile, token, refreshToken } = useAuth();
  const {
    submitCustomFeedback,
    submitAccessoryFeedback,
    submitCleaningFeedback,
    customFeedbackLoading,
    accessoryFeedbackLoading,
    cleaningFeedbackLoading,
  } = useFeedback();
  const { bookmarks, toggle } = useBookmark();

  const openFeedbackModal = (item) => {
    setCurrentFeedbackItem(item);
    setFeedbackModalVisible(true);
  };

  const handleSubmitFeedback = (formValues) => {
    const type = currentFeedbackItem.productType || 'Cleaning';

    let payload;

    if (type === 'Custom' || type === 'Accessory') {
      payload = {
        ...formValues,
        productID: currentFeedbackItem.productID,
      };
    } else {
      payload = {
        ...formValues,
        packageID: currentFeedbackItem.packageID,
      };
    }

    const actionMap = {
      Custom: submitCustomFeedback,
      Accessory: submitAccessoryFeedback,
      Cleaning: submitCleaningFeedback,
    };

    const submitFn = actionMap[type];

    submitFn(payload)
      .unwrap()
      .then(() => {
        toast.success('Gửi feedback thành công!');

        setCurrentFeedbackItem((prev) => ({
          ...prev,
          feedbackGiven: true,
        }));
      })
      .catch((err) => toast.error('Lỗi: ' + err))
      .finally(() => {
        setFeedbackModalVisible(false);
      });
  };

  const reloadTable = async () => {
    await fetchMyOrders(user.userID);
  };

  const orderColumns = [
    {
      title: 'STT',
      key: 'index',
      render: (text, record, index) => `#${index + 1}`,
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'orderDate',
      key: 'orderDate',
      sorter: (a, b) => new Date(a.orderDate) - new Date(b.orderDate),
      sortOrder: sortedInfo.columnKey === 'orderDate' && sortedInfo.order,
      defaultSortOrder: 'descend',
      render: (date) => new Date(date).toLocaleString('vi-VN'),
    },
    {
      title: 'Địa chỉ giao hàng',
      dataIndex: 'deliveryAddress',
      key: 'deliveryAddress',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount) => (
        <Text strong style={{ color: '#52c41a' }}>
          {amount.toLocaleString('vi-VN')} VND
        </Text>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'default';

        switch (status) {
          case 'Đã đặt hàng':
            color = 'blue';
            break;
          case 'Đang đến lấy hàng':
          case 'Đã lấy hàng':
            color = 'cyan';
            break;
          case 'Đang thực hiện':
          case 'Chờ vận chuyển':
          case 'Đang giao hàng':
            color = 'orange';
            break;
          case 'Đã giao đơn hàng':
            color = 'green';
            break;
          default:
            color = 'red';
        }

        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  useEffect(() => {
    fetchMyOrders(user.userID);
  }, []);

  const totalOrder = orders.filter((ord) => ord.status !== 'Failed');

  console.log('total', totalOrder);

  const totalMoneySpend = totalOrder.reduce((acc, ord) => acc + ord.totalAmount, 0);

  const pointEarned = totalMoneySpend / 1000;

  const handleSaveProfile = async (values) => {
    const { name, phone } = values;

    const formData = {
      name,
      phoneNumber: phone,
    };

    const result = await updateProfile(user.email, formData);

    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Cập nhật thông tin thành công!');
      setIsEditing(false);
    } else {
      toast.error('Cập nhật thông tin thất bại: ' + result.payload);
    }
  };

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
              <Button type="link" icon={<EditOutlined />} onClick={() => setIsEditing(!isEditing)}>
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
                    <Form.Item
                      label="Email"
                      name="email"
                      help={<span style={{ color: '#FBCB66' }}>* Không thể chỉnh sửa email</span>}
                    >
                      <Input disabled />
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
                    <Button style={{ backgroundColor: 'black', color: 'white' }} htmlType="submit">
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
            <Button
              style={{ color: 'black', borderColor: 'black', float: 'right', marginBottom: 10 }}
              onClick={reloadTable}
            >
              <ReloadOutlined />
            </Button>
            <Table
              columns={orderColumns}
              dataSource={totalOrder}
              rowKey="orderID"
              pagination={{ pageSize: 10 }}
              onChange={(pagination, filters, sorter) => {
                setSortedInfo(sorter || {});
              }}
              expandable={{
                expandedRowRender: (record) => {
                  const detail = orderDetailData?.[record.orderID];

                  if (!detail) return <Text type="secondary">Đang tải chi tiết đơn hàng...</Text>;

                  return (
                    <Card
                      title={
                        <Text style={{ color: '#F5F5F5', fontSize: 18, fontWeight: 600 }}>
                          Chi tiết đơn hàng
                        </Text>
                      }
                      bordered={false}
                      style={{
                        backgroundColor: '#1A1D24',
                        borderRadius: '12px',
                        padding: '8px',
                      }}
                      headStyle={{ borderBottom: '1px solid #2A2D33' }}
                    >
                      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        {detail.map((item) => {
                          const isFeedbackGiven = item.rating != null;

                          return (
                            <div
                              key={item.orderDetailID}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '16px',
                                backgroundColor: '#2A2D33',
                                borderRadius: '8px',
                                transition: 'all 0.3s ease',
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = '#3A3F4B';
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = '#2A2D33';
                              }}
                            >
                              {/* Trái: Tên & SL */}
                              <div>
                                <Text
                                  strong
                                  style={{
                                    fontSize: 16,
                                    color: '#F5F5F5',
                                    display: 'block',
                                    marginBottom: 4,
                                  }}
                                >
                                  {item.productName || item.packageName}
                                </Text>
                                <Text style={{ color: '#BFBFBF' }}>SL: {item.quantity}</Text>
                              </div>

                              {/* Phải: Tổng tiền & Feedback */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                                <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: 600 }}>
                                  {item.total.toLocaleString('vi-VN')} VND
                                </Text>

                                {record.status === 'Đã giao đơn hàng' && !isFeedbackGiven && (
                                  <Button
                                    size="small"
                                    icon={<StarOutlined />}
                                    onClick={() => openFeedbackModal(item)}
                                    style={{
                                      borderColor: 'yellowgreen',
                                      color: '#FFFFFF',
                                      background: 'transparent',
                                    }}
                                  >
                                    Feedback
                                  </Button>
                                )}

                                {isFeedbackGiven && (
                                  <Tag color="green" icon={<StarOutlined />}>
                                    Đã feedback
                                  </Tag>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </Space>
                    </Card>
                  );
                },
                onExpand: (expanded, record) => {
                  if (expanded && !orderDetailData?.[record.orderID]) {
                    fetchOrderDetail(record.orderID);
                  }
                },
              }}
            />
          </Card>
          {currentFeedbackItem && (
            <FeedbackFormModal
              visible={feedbackModalVisible}
              onCancel={() => setFeedbackModalVisible(false)}
              onSubmit={handleSubmitFeedback}
              productID={currentFeedbackItem.productID}
              loading={customFeedbackLoading || accessoryFeedbackLoading || cleaningFeedbackLoading}
            />
          )}
        </TabPane>

        {/* Wishlist Tab */}
        <TabPane tab="Yêu thích" key="3">
          <Card title="Danh sách sản phẩm đã yêu thích">
            {bookmarks.length === 0 ? (
              <Text type="secondary">Bạn chưa có sản phẩm yêu thích nào.</Text>
            ) : (
              <>
                <Row gutter={[16, 16]}>
                  {bookmarks
                    .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                    .map((item) => (
                      <Col xs={24} sm={12} lg={8} key={item.productID}>
                        <ProductCard product={item} />
                      </Col>
                    ))}
                </Row>

                <div style={{ textAlign: 'center', marginTop: 24 }}>
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={bookmarks.length}
                    onChange={(page) => setCurrentPage(page)}
                    showSizeChanger={false}
                  />
                </div>
              </>
            )}
          </Card>
        </TabPane>
      </Tabs>
    </Col>
  );
}

export default ProfileTabs;
