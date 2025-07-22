import React, { useRef, useState } from 'react';
import {
  Layout,
  Card,
  Row,
  Col,
  Typography,
  Button,
  InputNumber,
  Divider,
  Space,
  Steps,
  Checkbox,
  message,
  Modal,
  Input,
  Select,
} from 'antd';
import {
  CheckOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import useCart from '../../../hooks/useCart';
import { toast } from 'react-toastify';
import cart_bg from '../../../assets/cart.webp';
import useAuth from '../../../hooks/useAuth';
import useOrder from '../../../hooks/useOrder';
import { formatOrderData } from '../../../utils/orderUtils';
import { useNavigate } from 'react-router-dom';
import AddAddressModal from '../../../components/common/AddAddressModal';
import useCustomerAddress from '../../../hooks/useCustomerAddress';
import TermOfProduct from '../../../components/common/TermOfProduct';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const steps = [
  { title: 'Giỏ Hàng', icon: <ShoppingCartOutlined /> },
  { title: 'Thông Tin Giao Hàng', icon: <UserOutlined /> },
  { title: 'Xác Nhận Đơn', icon: <CheckOutlined /> },
];

const CartPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClearAllModalOpen, setIsClearAllModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const { createAddresses, fetchAddresses } = useCustomerAddress();
  const { submitOrder } = useOrder();
  const navigate = useNavigate();
  const { user } = useAuth();

  const defaultAddress = user?.address?.find((addr) => addr.isDefault);
  const [selectedAddress, setSelectedAddress] = useState(defaultAddress?.fullAddress || '');

  const handleAddAddress = async (values, resetForm) => {
    const result = await createAddresses(values);
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Thêm địa chỉ thành công!');
      fetchAddresses();
      resetForm(); // reset form từ modal
      setIsAddAddressModalOpen(false);
    } else {
      toast.error('Thêm địa chỉ thất bại!');
    }
  };

  const handleCreateOrder = async () => {
    const formData = formatOrderData(cartItems, selectedAddress);

    const actionResult = await submitOrder(formData);
    const { payload } = actionResult;

    if (payload?.isSuccess) {
      toast.success('Đơn hàng đã được tạo! Vui lòng thanh toán');

      clearCart();
      setCurrentStep(0);

      setTimeout(() => {
        window.location.href = payload.paymentUrl;
      }, 1500);
    } else {
      toast.error('Tạo đơn hàng thất bại!');
    }
  };

  const updateQuantityProduct = (id, quantity) => {
    if (quantity === 0) {
      removeFromCart(id);
      message.success('Đã xóa sản phẩm khỏi giỏ hàng');
    } else {
      updateQuantity(id, quantity);
    }
  };

  const removeItem = (id) => {
    setSelectedItemId(id);
    setIsModalOpen(true);
  };

  const handleConfirmRemove = () => {
    removeFromCart(selectedItemId);
    toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
    setIsModalOpen(false);
    setSelectedItemId(null);
  };

  const handleCancelRemove = () => {
    setIsModalOpen(false);
    setSelectedItemId(null);
  };

  const totalAmount = cartItems.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return sum + price * quantity;
  }, 0);

  const totalSavings = cartItems.reduce((sum, item) => {
    const originalPrice = Number(item.originalPrice) || 0;
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return sum + (originalPrice - price) * quantity;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <Layout
        style={{
          minHeight: '100vh',
          backgroundColor: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '60px 20px',
        }}
      >
        {/* 4 góc ảnh */}
        <img
          src={cart_bg}
          alt="corner"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '250px',
            height: 'auto',
            objectFit: 'contain',
            opacity: 1,
            transform: 'scaleY(-1)',
          }}
        />
        <img
          src={cart_bg}
          alt="corner"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '250px',
            height: 'auto',
            objectFit: 'contain',
            opacity: 1,
            transform: 'scale(-1, -1)',
          }}
        />
        <img
          src={cart_bg}
          alt="corner"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '250px',
            height: 'auto',
            objectFit: 'contain',
            opacity: 1,
          }}
        />
        <img
          src={cart_bg}
          alt="corner"
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '250px',
            height: 'auto',
            objectFit: 'contain',
            opacity: 1,
            transform: 'scaleX(-1)',
          }}
        />

        {/* Nội dung chính */}
        <Content
          style={{
            zIndex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          <Card
            style={{
              maxWidth: '480px',
              width: '100%',
              background: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
              padding: '40px 30px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                backgroundColor: '#f0f5ff',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                margin: '0 auto 20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              }}
            >
              <ShoppingCartOutlined style={{ fontSize: '40px', color: '#1890ff' }} />
            </div>

            <Title level={3} style={{ marginBottom: '12px', color: '#1f2d3d' }}>
              Giỏ hàng của bạn đang trống
            </Title>

            <Paragraph style={{ color: '#6c757d', marginBottom: '30px' }}>
              Bạn chưa thêm sản phẩm nào vào giỏ hàng. Hãy khám phá những sản phẩm phù hợp với bạn!
            </Paragraph>

            <Button
              type="primary"
              size="large"
              style={{
                background: 'black',
                borderRadius: '8px',
                padding: '0 40px',
                height: '48px',
                fontWeight: 'bold',
                fontSize: '16px',
              }}
              onClick={() => navigate('/')}
            >
              Tiếp tục mua sắm
            </Button>
          </Card>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Card
            style={{
              marginBottom: '30px',
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '15px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            }}
          >
            <Steps current={currentStep} items={steps} />
          </Card>
          <Row gutter={[30, 30]}>
            <Col xs={24} lg={16}>
              <Card
                title={
                  <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      {' '}
                      <ShoppingCartOutlined /> <span>Sản phẩm đã chọn ({cartItems.length})</span>
                    </div>
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => setIsClearAllModalOpen(true)}
                    >
                      Xóa toàn bộ giỏ hàng
                    </Button>
                  </Space>
                }
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  borderRadius: '15px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                }}
              >
                {cartItems.map((item) => (
                  <Card key={item.id} style={{ marginBottom: '20px', border: '1px solid #f0f0f0' }}>
                    <Row gutter={[20, 20]} align="middle">
                      <Col xs={24} sm={4}>
                        <img
                          src={item.imageUrl}
                          alt={item.name || item.packageName}
                          style={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'cover',
                            borderRadius: '10px',
                            margin: '0 auto',
                            display: 'block',
                            backgroundColor: 'pink',
                          }}
                        />
                      </Col>
                      <Col xs={24} sm={12}>
                        <Title level={4} style={{ marginBottom: '8px' }}>
                          {item.name || item.packageName}
                        </Title>
                        <Text type="secondary" style={{ display: 'block', marginBottom: '10px' }}>
                          {item.description}
                        </Text>
                      </Col>
                      <Col xs={24} sm={8}>
                        <div style={{ textAlign: 'right' }}>
                          {item.originalPrice !== item.price && (
                            <Text delete type="secondary">
                              {item.originalPrice.toLocaleString()}đ
                            </Text>
                          )}

                          <br />
                          <Text strong style={{ fontSize: '18px', color: '#ff4d4f' }}>
                            {item.price.toLocaleString()}đ
                          </Text>
                          <br />
                          <Space>
                            <InputNumber
                              min={1}
                              max={10}
                              value={item.quantity}
                              onChange={(value) => updateQuantityProduct(item.id, value)}
                              style={{ width: '80px' }}
                            />
                            <Button
                              type="text"
                              danger
                              icon={<DeleteOutlined />}
                              onClick={() => removeItem(item.id)}
                            />
                          </Space>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card
                title="Tóm tắt đơn hàng"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  borderRadius: '15px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  position: 'sticky',
                  top: '20px',
                }}
              >
                <div style={{ marginBottom: '20px' }}>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '10px',
                      }}
                    >
                      <Text>
                        {item.name || item.packageName} x{item.quantity}
                      </Text>
                      <Text strong>{(item.price * item.quantity).toLocaleString()}đ</Text>
                    </div>
                  ))}
                </div>

                <Divider />

                <div style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text>Tạm tính:</Text>
                    <Text>{totalAmount.toLocaleString()}đ</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text type="success">Tiết kiệm:</Text>
                    <Text type="success">-{totalSavings.toLocaleString()}đ</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text>Phí vận chuyển:</Text>
                    <Text type="success">Miễn phí</Text>
                  </div>
                </div>

                <Divider />

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: '30px 0px',
                  }}
                >
                  <Title level={4} style={{ margin: 0 }}>
                    Tổng cộng:
                  </Title>
                  <Title level={4} style={{ color: '#ff4d4f', margin: 0 }}>
                    {totalAmount.toLocaleString()}đ
                  </Title>
                </div>

                <div style={{ margin: '15px 0' }}>
                  <Checkbox onChange={(e) => setAgreed(e.target.checked)}>
                    Tôi đồng ý với{' '}
                    <a href="#" style={{ color: '#667eea' }} onClick={() => setShowTerms(true)}>
                      điều khoản sản phẩm
                    </a>
                  </Checkbox>
                  <TermOfProduct visible={showTerms} onCancel={() => setShowTerms(false)} />

                  {currentStep === 0 && (
                    <Button
                      block
                      style={{ marginTop: 20, backgroundColor: 'black', color: 'white' }}
                      onClick={() => {
                        if (!agreed) {
                          toast.info('Bạn phải đồng ý với điều khoản sản phẩm!');
                          return;
                        }
                        if (cartItems.length === 0) {
                          message.warning('Giỏ hàng của bạn đang trống.');
                          return;
                        }
                        setCurrentStep(1);
                      }}
                    >
                      Tiếp tục
                    </Button>
                  )}
                </div>
              </Card>
            </Col>
          </Row>
          {currentStep === 1 && (
            <Card
              title={
                <Title level={4} style={{ margin: 0 }}>
                  📦 Thông Tin Giao Hàng
                </Title>
              }
              style={{
                marginTop: 30,
                background: '#ffffff',
                borderRadius: 12,
                padding: 24,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
              }}
            >
              <Row gutter={24}>
                {/* Bên trái: Thông tin người nhận */}
                <Col xs={24} md={12}>
                  <div style={{ marginBottom: 20 }}>
                    <Text strong>Họ và tên</Text>
                    <Input
                      placeholder="Họ và tên người nhận"
                      defaultValue={user.name}
                      style={{ marginTop: 6, height: 45, borderRadius: 8 }}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <Text strong>Số điện thoại</Text>
                    <Input
                      placeholder="Số điện thoại liên hệ"
                      defaultValue={user.phoneNumber}
                      style={{ marginTop: 6, height: 45, borderRadius: 8 }}
                    />
                  </div>

                  <div style={{ marginBottom: 10 }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Text strong>Địa chỉ giao hàng</Text>

                      <Button
                        type="primary"
                        onClick={() => setIsAddAddressModalOpen(true)}
                        style={{ marginTop: 10, backgroundColor: 'black' }}
                      >
                        + Thêm địa chỉ
                      </Button>
                    </div>
                    {user?.address?.length > 0 ? (
                      <Select
                        showSearch
                        style={{ marginTop: 6, width: '100%' }}
                        placeholder="Chọn địa chỉ"
                        value={selectedAddress}
                        onChange={(value) => setSelectedAddress(value)}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children.toLowerCase().includes(input.toLowerCase())
                        }
                        size="large"
                        dropdownStyle={{ borderRadius: 8 }}
                      >
                        {user.address.map((addr) => (
                          <Option key={addr.addressID} value={addr.fullAddress}>
                            {addr.fullAddress}
                          </Option>
                        ))}
                      </Select>
                    ) : (
                      <Typography.Text type="warning">
                        Bạn chưa có địa chỉ nào. Vui lòng thêm địa chỉ mới.
                      </Typography.Text>
                    )}
                  </div>
                </Col>

                {/* Bên phải: Ghi chú và phương thức */}
                <Col xs={24} md={12}>
                  <div style={{ marginBottom: 20 }}>
                    <Text strong>Ghi chú cho đơn hàng</Text>
                    <Input.TextArea
                      placeholder="Ví dụ: Giao vào buổi sáng, không gọi trước..."
                      autoSize={{ minRows: 3, maxRows: 5 }}
                      style={{ marginTop: 6, borderRadius: 8 }}
                    />
                  </div>

                  <div>
                    <Text strong>Thời gian giao dự kiến</Text>
                    <Paragraph style={{ marginTop: 6, color: '#52c41a' }}>
                      Từ 3 đến 5 ngày làm việc
                    </Paragraph>
                  </div>
                </Col>
              </Row>
              <div style={{ textAlign: 'right', marginTop: 32 }}>
                <Button style={{ marginRight: 12 }} onClick={() => setCurrentStep(0)}>
                  ← Quay lại
                </Button>
                <Button
                  style={{
                    backgroundColor: 'black',
                    color: 'white',
                    borderRadius: 6,
                    padding: '0 24px',
                    height: 40,
                    fontWeight: 'bold',
                  }}
                  onClick={() => setCurrentStep(2)}
                >
                  Tiếp tục →
                </Button>
              </div>
            </Card>
          )}
          {currentStep === 2 && (
            <Card
              title="Xác Nhận Đơn Hàng"
              style={{
                marginTop: 30,
                background: '#fff',
                borderRadius: 10,
                boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
                padding: '24px',
              }}
            >
              <Paragraph style={{ fontSize: 16, marginBottom: 24 }}>
                Vui lòng kiểm tra kỹ thông tin trước khi xác nhận đơn hàng.
              </Paragraph>

              <Row gutter={[24, 24]}>
                {/* Thông tin khách hàng */}
                <Col xs={24} md={12}>
                  <Card
                    type="inner"
                    title="Thông Tin Khách Hàng"
                    style={{ borderRadius: 8, backgroundColor: '#fafafa' }}
                  >
                    <Paragraph>
                      <Text strong>Họ và tên: </Text> {user.name}
                    </Paragraph>
                    <Paragraph>
                      <Text strong>Số điện thoại: </Text> {user.phoneNumber}
                    </Paragraph>
                    <Paragraph>
                      <Text strong>Địa chỉ giao hàng: </Text> {selectedAddress}
                    </Paragraph>
                  </Card>
                </Col>

                {/* Danh sách sản phẩm */}
                <Col xs={24} md={12}>
                  <Card
                    type="inner"
                    title="Sản Phẩm Đã Chọn"
                    style={{ borderRadius: 8, backgroundColor: '#fafafa' }}
                  >
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: 12,
                        }}
                      >
                        <Text>
                          {item.name || item.packageName} x{item.quantity}
                        </Text>
                        <Text strong style={{ color: '#ff4d4f' }}>
                          {(item.price * item.quantity).toLocaleString()}đ
                        </Text>
                      </div>
                    ))}

                    <Divider />

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text strong style={{ fontSize: 16 }}>
                        Tổng cộng:
                      </Text>
                      <Text strong style={{ fontSize: 18, color: '#ff4d4f' }}>
                        {totalAmount.toLocaleString()}đ
                      </Text>
                    </div>
                  </Card>
                </Col>
              </Row>

              <div style={{ textAlign: 'right', marginTop: 30 }}>
                <Button style={{ marginRight: 8 }} onClick={() => setCurrentStep(1)}>
                  Quay lại
                </Button>
                <Button
                  type="primary"
                  style={{ backgroundColor: 'black', color: 'white' }}
                  onClick={handleCreateOrder}
                >
                  Thanh toán
                </Button>
              </div>
            </Card>
          )}
        </div>
      </Content>
      <Modal
        title="Xác nhận xóa sản phẩm"
        open={isModalOpen}
        onOk={handleConfirmRemove}
        onCancel={handleCancelRemove}
        okText="Xóa"
        cancelText="Hủy"
        okType="danger"
      >
        <p>Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?</p>
      </Modal>
      <Modal
        title="Xác nhận xóa toàn bộ giỏ hàng"
        open={isClearAllModalOpen}
        onOk={() => {
          clearCart();
          toast.success('Đã xóa toàn bộ giỏ hàng');
          setIsClearAllModalOpen(false);
        }}
        onCancel={() => setIsClearAllModalOpen(false)}
        okText="Xóa tất cả"
        cancelText="Hủy"
        okType="danger"
      >
        <p>Bạn có chắc chắn muốn xóa toàn bộ sản phẩm khỏi giỏ hàng?</p>
      </Modal>
      <AddAddressModal
        visible={isAddAddressModalOpen}
        onCancel={() => setIsAddAddressModalOpen(false)}
        onSubmit={handleAddAddress}
        loading={false}
      />
    </Layout>
  );
};

export default CartPage;
