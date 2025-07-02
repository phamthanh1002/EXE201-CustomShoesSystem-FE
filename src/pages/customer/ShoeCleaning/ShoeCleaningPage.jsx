import React, { useEffect, useMemo, useState } from 'react';
import { Card, Button, Typography, Row, Col, Space, List, Badge, Spin } from 'antd';
import { CheckOutlined, StarFilled, CrownOutlined, ToolOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllServicePackage } from '../../../store/slices/serviceSlice';
import mergeServiceData from '../../../utils/mergeServiceData';

const { Title, Text, Paragraph } = Typography;

const ShoeCleaningPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.services);

  const [hoveredCardId, setHoveredCardId] = useState(null);

  useEffect(() => {
    dispatch(getAllServicePackage());
  }, [dispatch]);

  const pricingPlans = [
    {
      id: 'basic',
      title: 'Cơ Bản',
      price: '50.000',
      originalPrice: '70.000',
      description: 'Dành cho việc vệ sinh giày thông thường',
      features: [
        'Vệ sinh bề mặt giày',
        'Làm sạch đế giày',
        'Sấy khô tự nhiên',
        'Bảo hành 3 ngày',
        'Thời gian: 2-3 giờ',
      ],
      buttonText: 'Chọn Gói Này',
      buttonType: 'default',
    },
    {
      id: 'professional',
      title: 'Chuyên Nghiệp',
      price: '120.000',
      originalPrice: '150.000',
      description: 'Dịch vụ vệ sinh toàn diện và chuyên sâu',
      features: [
        'Vệ sinh sâu toàn bộ',
        'Khử mùi và diệt khuẩn',
        'Bảo dưỡng da/vải',
        'Làm mới màu sắc',
        'Bảo hành 1 tuần',
        'Thời gian: 4-6 giờ',
      ],
      buttonText: 'Chọn Gói Này',
      buttonType: 'default',
    },
    {
      id: 'premium',
      title: 'Cao Cấp',
      price: '200.000',
      originalPrice: '250.000',
      description: 'Dịch vụ premium với công nghệ hiện đại',
      features: [
        'Vệ sinh công nghệ cao',
        'Phủ lớp bảo vệ chống nước',
        'Thay dây giày mới',
        'Sửa chữa nhỏ miễn phí',
        'Giao nhận tận nơi',
        'Bảo hành 2 tuần',
        'Thời gian: 1-2 ngày',
      ],
      buttonText: 'Chọn Gói Này',
      buttonType: 'default',
    },
  ];

  const finalPlans = useMemo(
    () => mergeServiceData(pricingPlans, services),
    [pricingPlans, services],
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '40px 20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <Title level={1} style={{ fontSize: '48px', fontWeight: '700', marginBottom: '16px' }}>
            Chọn Gói Dịch Vụ
          </Title>
          <Paragraph style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
            Chúng tôi cung cấp các gói dịch vụ vệ sinh giày chuyên nghiệp với chất lượng tốt nhất.
            Hãy chọn gói phù hợp với nhu cầu của bạn.
          </Paragraph>
        </div>

        <Spin spinning={loading} tip="Đang tải dịch vụ..." style={{ minHeight: '300px' }}>
          {error ? (
            <div style={{ color: 'red', textAlign: 'center', padding: '2rem' }}>{error}</div>
          ) : (
            <Row gutter={[32, 32]} justify="center">
              {finalPlans.map((plan) => {
                const isHovered = hoveredCardId === plan.id;
                return (
                  <Col xs={24} md={8} key={plan.id}>
                    <Card
                      onMouseEnter={() => setHoveredCardId(plan.id)}
                      onMouseLeave={() => setHoveredCardId(null)}
                      style={{
                        height: '100%',
                        borderRadius: '6px',
                        border: isHovered ? '3px solid #ff6b6b' : '1px solid #e0e0e0',
                        boxShadow: isHovered
                          ? '0 20px 40px rgba(0,0,0,0.3)'
                          : '0 10px 20px rgba(0,0,0,0.1)',
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        cursor: 'pointer',
                      }}
                      bodyStyle={{ padding: '40px 30px' }}
                    >
                      {isHovered && (
                        <Badge.Ribbon
                          text="Xin chào !"
                          color="#ff6b6b"
                          style={{
                            fontSize: '12px',
                            fontWeight: 'bold',
                            top: '15px',
                            right: '15px',
                          }}
                        />
                      )}

                      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        {plan.id === 'premium' && (
                          <CrownOutlined
                            style={{
                              fontSize: '40px',
                              color: '#ffd700',
                              marginBottom: '10px',
                            }}
                          />
                        )}
                        {plan.id === 'professional' && (
                          <StarFilled
                            style={{
                              fontSize: '40px',
                              color: '#ff6b6b',
                              marginBottom: '10px',
                            }}
                          />
                        )}
                        {plan.id === 'basic' && (
                          <ToolOutlined
                            style={{ fontSize: '40px', color: '#3498db', marginBottom: '10px' }}
                          />
                        )}
                        <Title level={3} style={{ marginBottom: '8px', color: '#2c3e50' }}>
                          {plan.title}
                        </Title>
                        <Text
                          style={{
                            color: '#7f8c8d',
                            fontSize: '16px',
                            display: 'block',
                            marginBottom: '20px',
                          }}
                        >
                          {plan.description}
                        </Text>
                        <div style={{ marginBottom: '20px' }}>
                          <Text
                            delete
                            style={{
                              color: '#bdc3c7',
                              fontSize: '16px',
                              marginRight: '10px',
                            }}
                          >
                            {plan.originalPrice} VND / đôi
                          </Text>
                          <Title
                            level={2}
                            style={{
                              margin: 0,
                              color: '#2c3e50',
                              fontSize: '36px',
                              fontWeight: '700',
                            }}
                          >
                            {plan.price}
                            <Text
                              style={{
                                fontSize: '18px',
                                fontWeight: '400',
                              }}
                            >
                              {' '}
                              VND / đôi
                            </Text>
                          </Title>
                        </div>
                      </div>

                      <List
                        style={{ marginBottom: '40px' }}
                        dataSource={plan.features}
                        renderItem={(item) => (
                          <List.Item style={{ border: 'none', padding: '8px 0' }}>
                            <Space>
                              <CheckOutlined style={{ color: '#27ae60', fontSize: '14px' }} />
                              <Text style={{ color: '#2c3e50', fontSize: '15px' }}>{item}</Text>
                            </Space>
                          </List.Item>
                        )}
                      />

                      <Button
                        type={plan.buttonType}
                        onClick={() => navigate('/cart')}
                        size="large"
                        block
                        style={{
                          height: '50px',
                          borderRadius: '6px',
                          fontSize: '16px',
                          fontWeight: '600',
                          ...(isHovered
                            ? {
                                background: 'linear-gradient(45deg, #ff6b6b, #ff8e8e)',
                                border: 'none',
                                color: '#fff',
                                boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)',
                              }
                            : {
                                borderColor: '#000',
                                color: '#000',
                              }),
                        }}
                        onMouseEnter={(e) => {
                          if (!isHovered) {
                            e.target.style.background = '#000';
                            e.target.style.color = 'white';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isHovered) {
                            e.target.style.background = 'transparent';
                            e.target.style.color = '#000';
                          }
                        }}
                      >
                        {plan.buttonText}
                      </Button>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          )}
        </Spin>

        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Text
            style={{
              color: 'rgba(0, 0, 0, 0.7)',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            ✨ Tất cả các gói đều bao gồm tư vấn miễn phí và đảm bảo chất lượng
          </Text>
        </div>
      </div>
    </div>
  );
};

export default ShoeCleaningPage;
