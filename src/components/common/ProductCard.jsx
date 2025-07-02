import React, { useState } from 'react';
import { Card, Image, Typography, InputNumber, Button, Divider, Space, Tooltip, Tag } from 'antd';
import {
  ShoppingCartOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  HeartOutlined,
  HeartFilled,
  PushpinFilled,
} from '@ant-design/icons';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const { Title, Text, Paragraph } = Typography;

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigate = useNavigate();
  const { token, refreshToken, user } = useAuth();

  if (!product) return null;

  const {
    productName,
    productType,
    description,
    imageUrl,
    price,
    discount,
    total,
    size,
    color,
    stockQuantity,
    isActive,
    status,
  } = product;

  const totalPrice = total * quantity;

  const handleAddToCart = () => {
    if (!token && !refreshToken && !user) {
      navigate('/login');
      toast.error('Vui lòng đăng nhập để thêm vào giỏ hàng!');
    } else {
      console.log('Thêm vào giỏ hàng:', { product, quantity, totalPrice });
      toast.success('Đã thêm vào giỏ hàng!');
    }
  };

  const tooltipContent = (
    <Space direction="vertical" size={0}>
      <Paragraph ellipsis={{ rows: 2 }}>{description}</Paragraph>
      <Text>
        <strong>💰 Giá gốc:</strong>{' '}
        <Text style={{ color: '#999' }}>{(price || 0).toLocaleString()} VND</Text>
      </Text>
      <Text>
        <strong>📦 Còn hàng:</strong>{' '}
        {stockQuantity > 0 ? (
          <Tag icon={<CheckCircleOutlined />} color="success">
            {stockQuantity} sản phẩm
          </Tag>
        ) : (
          <Tag icon={<CloseCircleOutlined />} color="error">
            Hết hàng
          </Tag>
        )}
      </Text>
    </Space>
  );

  return (
    <Tooltip
      placement="right"
      title={tooltipContent}
      color="#ffffff"
      overlayInnerStyle={{
        color: '#000000',
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: 8,
        padding: 12,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        border: '1px dashed black',
      }}
    >
      <Card
        hoverable
        style={{
          width: 300,
          borderRadius: 16,
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          border: '2px solid black',
          position: 'relative',
        }}
        bodyStyle={{ padding: 16 }}
      >
        {/* Ribbon giảm giá */}
        {discount > 0 && (
          <div
            style={{
              position: 'absolute',
              top: 8,
              left: 8,
              zIndex: 3,
            }}
          >
            {/* Ribbon */}
            <div
              style={{
                position: 'absolute',
                top: 12,
                left: -45,
                width: 140,
                backgroundColor: '#ff4d4f',
                color: 'white',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 12,
                padding: '4px 0',
                transform: 'rotate(-45deg)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                zIndex: 10,
                borderTop: '1px solid rgba(255,255,255,0.5)',
                borderBottom: '1px solid rgba(0,0,0,0.2)',
              }}
            >
              <span
                style={{
                  textShadow: '0 1px 2px rgba(0,0,0,0.4)',
                  letterSpacing: '0.5px',
                  fontSize: '11px',
                }}
              >
                -{discount}%
              </span>

              {/* Fold effect */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-8px',
                  left: 0,
                  width: 0,
                  height: 0,
                  borderLeft: '8px solid #a53860',
                  borderBottom: '8px solid transparent',
                }}
              />

              {/* Highlight */}
              <div
                style={{
                  position: 'absolute',
                  top: '2px',
                  left: '2px',
                  right: '12px',
                  height: '2px',
                  background: 'rgba(255,255,255,0.3)',
                  borderRadius: '2px',
                }}
              />

              {/* Shine effect */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background:
                    'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  borderRadius: '0 8px 8px 0',
                  overflow: 'hidden',
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background:
                      'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    animation: 'ribbonShine 3s infinite',
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* CSS Keyframes */}
        <style jsx>{`
          @keyframes ribbonShine {
            0% {
              left: -100%;
            }
            20% {
              left: -100%;
            }
            50% {
              left: 100%;
            }
            100% {
              left: 100%;
            }
          }
        `}</style>

        <div style={{ position: 'relative' }}>
          <div
            onClick={() => setIsBookmarked(!isBookmarked)}
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 2,
              cursor: 'pointer',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              transition: 'all 0.3s ease',
              transform: isBookmarked ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            {isBookmarked ? (
              <HeartFilled style={{ color: 'red', fontSize: 18 }} />
            ) : (
              <HeartOutlined style={{ color: 'black', fontSize: 18 }} />
            )}
          </div>

          <Image
            src={imageUrl}
            alt={productName}
            width="100%"
            height={180}
            style={{ objectFit: 'cover', borderRadius: 12 }}
            preview
            fallback="src/assets/img_fallback.png"
          />
        </div>

        <Title level={4} style={{ marginTop: 12, fontWeight: 600 }}>
          {productName}
        </Title>

        <Divider style={{ margin: '12px 0' }} />

        <Space direction="vertical" size={6} style={{ width: '100%' }}>
          <Text>
            <strong>💰 Giá:</strong>
            <Text type="danger" strong style={{ fontSize: 16, marginLeft: 8 }}>
              {total.toLocaleString()} VND
            </Text>
          </Text>

          {productType === 'Custom' && (
            <Text>
              <strong>👟 Size:</strong> {size}
            </Text>
          )}

          <Text>
            <strong>🎨 Màu:</strong> {color}
          </Text>

          <Text>
            <strong>⚙️ Trạng thái:</strong>{' '}
            {status ? <Tag color="green">Còn hàng</Tag> : <Tag color="volcano">Hết hàng</Tag>}
          </Text>

          <Text>
            <strong>🔢 Số lượng:</strong>{' '}
            <InputNumber
              min={1}
              max={stockQuantity}
              value={quantity}
              onChange={setQuantity}
              style={{ marginLeft: 8, width: 80 }}
              disabled={stockQuantity === 0}
            />
          </Text>

          <Text>
            <strong>🧮 Tổng tiền:</strong>{' '}
            <Text type="warning" strong>
              {totalPrice.toLocaleString()} VND
            </Text>
          </Text>
        </Space>

        <Button
          icon={<ShoppingCartOutlined />}
          type="primary"
          block
          size="large"
          disabled={stockQuantity === 0 || !isActive || !status}
          style={{
            marginTop: 16,
            background:
              stockQuantity === 0 || !isActive || !status
                ? '#ccc'
                : 'linear-gradient(135deg, #000000 0%, #333333 100%)',
            borderRadius: 8,
            fontWeight: 600,
          }}
          onClick={handleAddToCart}
        >
          Thêm vào giỏ hàng
        </Button>
      </Card>
    </Tooltip>
  );
}
