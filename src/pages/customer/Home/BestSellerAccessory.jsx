import React from 'react';
import { Carousel, Row, Col, Typography } from 'antd';
import ProductCard from '../../../components/common/ProductCard';
import { chunkArray } from '../../../utils/chunkArray';
import useProducts from '../../../hooks/useProducts';

const { Title } = Typography;

export default function BestSellerAccessory() {
  const { topAccessoryProducts, loading, error } = useProducts();

  const slides = chunkArray(topAccessoryProducts, 4);

  return (
    <div style={{ padding: '1rem' }}>
      <Title level={3} style={{ textAlign: 'center', fontWeight: 600 }}>
        Phụ kiện trang trí
      </Title>
      <div
        style={{
          width: 80,
          height: 4,
          backgroundColor: 'black',
          margin: '0 auto 2rem auto',
        }}
      />

      <Carousel
        dotPosition="left"
        autoplay={{ dotDuration: true }}
        autoplaySpeed={8000}
        dots={true}
        style={{
          boxShadow: '0px 0px 20px 10px black inset',
          backgroundColor: 'rgb(224, 224, 224)',
          borderRadius: '1rem',
        }}
      >
        {slides.map((group, index) => (
          <div key={index}>
            <Row
              gutter={[24, 32]}
              style={{ padding: '1.5rem 2rem 1.5rem 2.5rem' }}
              justify="center"
            >
              {topAccessoryProducts.map((product) => (
                <Col
                  key={product.productID}
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
