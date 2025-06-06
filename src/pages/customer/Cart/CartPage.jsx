import React, { useState } from 'react';
import { 
  Layout, Card, Row, Col, Typography, Button, InputNumber, 
  Divider, Space, Badge, Input, Select, 
  Steps, Checkbox, message, Modal 
} from 'antd';
import { 
  DeleteOutlined, ShoppingCartOutlined, CheckCircleOutlined,
  EnvironmentOutlined, PhoneOutlined, UserOutlined,
  CreditCardOutlined, CalendarOutlined, ClockCircleOutlined
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      service: 'Gói Chuyên Nghiệp',
      description: 'Dịch vụ vệ sinh toàn diện và chuyên sâu',
      price: 120000,
      originalPrice: 150000,
      quantity: 1,
      features: ['Vệ sinh sâu toàn bộ', 'Khử mùi và diệt khuẩn', 'Bảo dưỡng da/vải']
    }
  ]);

  const [currentStep, setCurrentStep] = useState(0);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    date: '',
    time: '',
    note: ''
  });

  const updateQuantity = (id, quantity) => {
    if (quantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
      message.success('Đã xóa dịch vụ khỏi giỏ hàng');
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const removeItem = (id) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa dịch vụ này khỏi giỏ hàng?',
      onOk: () => {
        setCartItems(cartItems.filter(item => item.id !== id));
        message.success('Đã xóa dịch vụ khỏi giỏ hàng');
      }
    });
  };

  const handleInputChange = (field, value) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const { name, phone, address, date, time } = customerInfo;
    if (!name || !phone || !address || !date || !time) {
      message.error('Vui lòng điền đầy đủ thông tin bắt buộc!');
      return false;
    }
    return true;
  };

  const handleBooking = () => {
    if (validateForm()) {
      message.success('Đặt lịch thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
      setCurrentStep(2);
    }
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalSavings = cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);

  const steps = [
    {
      title: 'Giỏ Hàng',
      icon: <ShoppingCartOutlined />
    },
    {
      title: 'Thông Tin',
      icon: <UserOutlined />
    },
    {
      title: 'Thanh Toán',
      icon: <CreditCardOutlined />
    }
  ];

  if (cartItems.length === 0) {
    return (
      <Layout style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' }}>
        <Content style={{ padding: '50px', textAlign: 'center' }}>
          <Card style={{ 
            maxWidth: '500px', 
            margin: '0 auto',
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}>
            <ShoppingCartOutlined style={{ fontSize: '80px', color: '#ccc', marginBottom: '20px' }} />
            <Title level={3} style={{ color: '#666' }}>Giỏ hàng trống</Title>
            <Paragraph style={{ color: '#999', marginBottom: '30px' }}>
              Bạn chưa có dịch vụ nào trong giỏ hàng. Hãy chọn gói dịch vụ phù hợp!
            </Paragraph>
            <Button 
              type="primary" 
              size="large"
              style={{
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                border: 'none',
                borderRadius: '6px',
                height: '50px',
                paddingLeft: '30px',
                paddingRight: '30px'
              }}
              onClick={() => window.history.back()}
            >
              Quay lại chọn dịch vụ
            </Button>
          </Card>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh'}}>

      <Content style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Progress Steps */}
          <Card style={{ 
            marginBottom: '30px',
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <Steps current={currentStep} items={steps} />
          </Card>

          <Row gutter={[30, 30]}>
            {/* Left Column - Cart Items */}
            <Col xs={24} lg={16}>
              <Card 
                title={
                  <Space>
                    <ShoppingCartOutlined />
                    <span>Dịch vụ đã chọn ({cartItems.length})</span>
                  </Space>
                }
                style={{ 
                  background: 'rgba(255,255,255,0.95)',
                  borderRadius: '15px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                }}
              >
                {cartItems.map(item => (
                  <Card key={item.id} style={{ marginBottom: '20px', border: '1px solid #f0f0f0' }}>
                    <Row gutter={[20, 20]} align="middle">
                      <Col xs={24} sm={4}>
                        <div style={{ 
                          width: '80px', 
                          height: '80px', 
                          background: 'linear-gradient(45deg, #667eea, #764ba2)',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto'
                        }}>
                          <CheckCircleOutlined style={{ fontSize: '30px', color: 'white' }} />
                        </div>
                      </Col>
                      
                      <Col xs={24} sm={12}>
                        <Title level={4} style={{ marginBottom: '8px' }}>{item.service}</Title>
                        <Text type="secondary" style={{ display: 'block', marginBottom: '10px' }}>
                          {item.description}
                        </Text>
                        <div>
                          {item.features.map((feature, index) => (
                            <Text key={index} style={{ 
                              display: 'block', 
                              fontSize: '12px', 
                              color: '#666',
                              marginBottom: '2px'
                            }}>
                              ✓ {feature}
                            </Text>
                          ))}
                        </div>
                      </Col>
                      
                      <Col xs={24} sm={8}>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ marginBottom: '10px' }}>
                            <Text delete style={{ color: '#999', fontSize: '14px' }}>
                              {item.originalPrice.toLocaleString()}đ
                            </Text>
                            <br />
                            <Text strong style={{ fontSize: '18px', color: '#ff4d4f' }}>
                              {item.price.toLocaleString()}đ
                            </Text>
                          </div>
                          
                          <Space>
                            <InputNumber
                              min={1}
                              max={10}
                              value={item.quantity}
                              onChange={(value) => updateQuantity(item.id, value)}
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

                {/* Customer Info Form */}
                {currentStep >= 1 && (
                  <Card title="Thông tin khách hàng" style={{ marginTop: '20px' }}>
                    <Row gutter={[16, 16]}>
                      <Col xs={24} sm={12}>
                        <div style={{ marginBottom: '16px' }}>
                          <Text style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                            Họ và tên <span style={{ color: 'red' }}>*</span>
                          </Text>
                          <Input 
                            prefix={<UserOutlined />} 
                            placeholder="Nhập họ và tên"
                            value={customerInfo.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col xs={24} sm={12}>
                        <div style={{ marginBottom: '16px' }}>
                          <Text style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                            Số điện thoại <span style={{ color: 'red' }}>*</span>
                          </Text>
                          <Input 
                            prefix={<PhoneOutlined />} 
                            placeholder="Nhập số điện thoại"
                            value={customerInfo.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col xs={24}>
                        <div style={{ marginBottom: '16px' }}>
                          <Text style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                            Địa chỉ <span style={{ color: 'red' }}>*</span>
                          </Text>
                          <Input 
                            prefix={<EnvironmentOutlined />} 
                            placeholder="Nhập địa chỉ nhận giày"
                            value={customerInfo.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col xs={24} sm={12}>
                        <div style={{ marginBottom: '16px' }}>
                          <Text style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                            Ngày hẹn <span style={{ color: 'red' }}>*</span>
                          </Text>
                          <Input 
                            type="date" 
                            prefix={<CalendarOutlined />}
                            value={customerInfo.date}
                            onChange={(e) => handleInputChange('date', e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col xs={24} sm={12}>
                        <div style={{ marginBottom: '16px' }}>
                          <Text style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                            Giờ hẹn <span style={{ color: 'red' }}>*</span>
                          </Text>
                          <Select 
                            placeholder="Chọn giờ" 
                            style={{ width: '100%' }}
                            value={customerInfo.time}
                            onChange={(value) => handleInputChange('time', value)}
                          >
                            <Option value="morning">8:00 - 12:00</Option>
                            <Option value="afternoon">13:00 - 17:00</Option>
                            <Option value="evening">18:00 - 20:00</Option>
                          </Select>
                        </div>
                      </Col>
                      <Col xs={24}>
                        <div style={{ marginBottom: '16px' }}>
                          <Text style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                            Ghi chú thêm
                          </Text>
                          <TextArea 
                            rows={3} 
                            placeholder="Ghi chú đặc biệt về đôi giày của bạn..."
                            value={customerInfo.note}
                            onChange={(e) => handleInputChange('note', e.target.value)}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Card>
                )}
              </Card>
            </Col>

            {/* Right Column - Order Summary */}
            <Col xs={24} lg={8}>
              <Card 
                title="Tóm tắt đơn hàng"
                style={{ 
                  background: 'rgba(255,255,255,0.95)',
                  borderRadius: '15px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  position: 'sticky',
                  top: '20px'
                }}
              >
                <div style={{ marginBottom: '20px' }}>
                  {cartItems.map(item => (
                    <div key={item.id} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginBottom: '10px'
                    }}>
                      <Text>{item.service} x{item.quantity}</Text>
                      <Text strong>{(item.price * item.quantity).toLocaleString()}đ</Text>
                    </div>
                  ))}
                </div>

                <Divider />

                <div style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <Text>Tạm tính:</Text>
                    <Text>{totalAmount.toLocaleString()}đ</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <Text type="success">Tiết kiệm:</Text>
                    <Text type="success">-{totalSavings.toLocaleString()}đ</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                    <Text>Phí vận chuyển:</Text>
                    <Text type="success">Miễn phí</Text>
                  </div>
                </div>

                <Divider />

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <Title level={4}>Tổng cộng:</Title>
                  <Title level={4} style={{ color: '#ff4d4f' }}>
                    {totalAmount.toLocaleString()}đ
                  </Title>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <Checkbox>
                    Tôi đồng ý với <a href="#" style={{ color: '#667eea' }}>điều khoản dịch vụ</a>
                  </Checkbox>
                </div>

                <Space direction="vertical" style={{ width: '100%' }}>
                  {currentStep === 0 && (
                    <Button
                      type="primary"
                      size="large"
                      block
                      onClick={() => setCurrentStep(1)}
                      style={{
                        background: "black",
                        border: 'none',
                        borderRadius: '6px',
                        height: '50px'
                      }}
                    >
                      Tiếp tục
                    </Button>
                  )}
                  
                  {currentStep === 1 && (
                    <Button
                      type="primary"
                      size="large"
                      block
                      onClick={handleBooking}
                      style={{
                        background: '#0958d9',
                        border: 'none',
                        borderRadius: '6px',
                        height: '50px'
                      }}
                    >
                      Đặt lịch ngay
                    </Button>
                  )}

                  {currentStep === 2 && (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                      <CheckCircleOutlined style={{ fontSize: '60px', color: '#52c41a', marginBottom: '15px' }} />
                      <Title level={4} style={{ color: '#52c41a' }}>Đặt lịch thành công!</Title>
                      <Text>Chúng tôi sẽ liên hệ với bạn trong 24h tới.</Text>
                    </div>
                  )}
                </Space>

                <div style={{ 
                  marginTop: '20px', 
                  padding: '15px', 
                  background: '#f6f8ff', 
                  borderRadius: '10px',
                  border: '1px solid #d9e5ff'
                }}>
                  <Text style={{ fontSize: '12px', color: '#666' }}>
                    🔒 Thông tin của bạn được bảo mật tuyệt đối
                    <br />
                    📞 Hỗ trợ 24/7: 1900 1234
                    <br />
                    ⭐ Đánh giá 4.9/5 từ 1000+ khách hàng
                  </Text>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default CartPage;