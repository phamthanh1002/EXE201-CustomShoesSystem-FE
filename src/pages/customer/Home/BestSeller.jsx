import { Typography, Flex, Button } from 'antd';
import React from 'react';
import BestSellerCustomShoes from './BestSellerCustomShoes';
import BestSellerCleaningShoes from './BestSellerCleaningShoes';
import BestSellerAccessory from './BestSellerAccessory';
import { useNavigate } from 'react-router-dom';
import RevealOnScroll from '../../../utils/RevealOnScroll';
import img1 from '../../../assets/BestSellerCustomShoes/img1.webp';

const { Title, Paragraph } = Typography;

export default function BestSeller() {
  const navigate = useNavigate();

  return (
    <Flex vertical gap="middle" style={{ marginTop: '3.5rem' }}>
      <div style={{ textAlign: 'center', fontSize: 'clamp(1.2rem, 2.5vw, 2rem)', fontWeight: 600 }}>
        BEST SELLER
      </div>

      <div style={{ width: '100%' }}>
        <BestSellerCustomShoes />

        <RevealOnScroll>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              // justifyContent: 'center',
              alignItems: 'center',
              padding: '2rem 1rem',
              backgroundImage: `url(${img1})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              minHeight: 'clamp(300px, 80vh, 600px)',
              textAlign: 'center',
            }}
          >
            <Title
              level={2}
              style={{
                color: 'white',
                fontWeight: 600,
                fontSize: 'clamp(20px, 4vw, 36px)',
              }}
            >
              Giày Custom Theo Phong Cách Của Bạn
            </Title>

            <Paragraph
              style={{
                fontSize: 'clamp(14px, 2vw, 18px)',
                color: 'white',
                marginBottom: 24,
                maxWidth: 600,
              }}
            >
              Khám phá những đôi giày được thiết kế riêng, không đụng hàng, đậm chất cá nhân.
            </Paragraph>

            <Button
              onClick={() => navigate('/custom')}
              size="large"
              style={{
                fontWeight: 600,
                border: '1px solid black',
              }}
            >
              Xem thêm
            </Button>
          </div>
        </RevealOnScroll>
      </div>

      <RevealOnScroll>
        <div style={{ width: '100%' }}>
          <BestSellerCleaningShoes />
        </div>
      </RevealOnScroll>

      <RevealOnScroll>
        <div style={{ width: '100%' }}>
          <BestSellerAccessory />
        </div>
      </RevealOnScroll>
    </Flex>
  );
}
