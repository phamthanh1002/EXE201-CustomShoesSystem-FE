import React from 'react';
import { Row, Col, Card, Typography, Button, Image } from 'antd';
import RevealOnScroll from '../../../utils/RevealOnScroll';

const { Title, Paragraph } = Typography;

// Mock data
const newsList = [
  {
    id: 1,
    title: 'PHIÊN BẢN MỚI',
    subtitle: 'Thiết kế thể thao mới của DesignMyKick',
    description:
      'Tháng 3/2025 chào đón phiên bản thể thao mới của DesignMyKick, cá nhân và trẻ trung. Săn Deal ngay từ ngày 5/3 để được giảm giá và nhận những ưu đãi hấp dẫn nhất.',
    image:
      'https://jedidiah.store/cdn/shop/products/7366-1_jpg.png?v=1696282450&width=550%20550w,//jedidiah.store/cdn/shop/products/7366-1_jpg.png?v=1696282450%20794w',
    buttonText: 'CHI TIẾT',
  },
  {
    id: 2,
    title: 'GIẢM 50% NHÂN DỊP 8/3',
    subtitle: 'Sale chấn động nhân dịp quốc tế phụ nữ',
    description:
      'DesignMyKick áp dụng khuyến mãi 8-3 từ ngày 04/3/2025 – 15/3/2025, giảm giá trực tiếp từ 30% – 50% trên từng sản phẩm.',
    image: 'https://pos.nvncdn.com/62a70c-142650/art/20240308_n5iJRkSj.webp',
    buttonText: 'CHI TIẾT',
  },
];

export default function News() {
  return (
    <RevealOnScroll>
      <div style={{ padding: '1rem', marginBottom: '1.4rem' }}>
        <Row gutter={[16, 16]}>
          {newsList.map((news) => (
            <Col xs={24} md={12} key={news.id}>
              <Card
                style={{
                  overflow: 'hidden',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
                }}
                hoverable
                cover={
                  <Image.PreviewGroup>
                    <Image
                      src={news.image}
                      alt={news.title}
                      width="100%"
                      height={200}
                      style={{ objectFit: 'cover' }}
                      loading="lazy"
                      preview={true}
                      fallback="src/assets/img_fallback.png"
                    />
                  </Image.PreviewGroup>
                }
              >
                <Title level={5} style={{ color: '#5c28d4' }}>
                  {news.title}
                </Title>
                <Paragraph strong>{news.subtitle}</Paragraph>
                <Paragraph>{news.description}</Paragraph>
                <Button type="primary" style={{ backgroundColor: 'black' }}>
                  {news.buttonText}
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </RevealOnScroll>
  );
}
