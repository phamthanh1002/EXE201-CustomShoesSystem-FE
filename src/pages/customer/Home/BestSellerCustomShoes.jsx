import React from 'react';
import { Row, Col, Typography, Card, Button } from 'antd';
import ProductCard from '../../../components/common/ProductCard';
import useProducts from '../../../hooks/useProducts';

const { Title, Paragraph } = Typography;

export default function BestSellerCustomShoes() {
  const { topCustomProducts, loading, error } = useProducts();

  console.log(topCustomProducts);

  return (
    <>
      <div style={{ padding: '1rem' }}>
        <Title level={3} style={{ textAlign: 'center', fontWeight: 600 }}>
          Giày Custom
        </Title>
        <div
          style={{
            width: 80,
            height: 4,
            backgroundColor: 'black',
            margin: '0 auto 2rem auto',
          }}
        />

        <Row gutter={[24, 32]} style={{ padding: '1.5rem 2rem 1.5rem 2.5rem' }}>
          {loading ? (
            <div>Đang tải sản phẩm...</div>
          ) : error ? (
            <div style={{ color: 'red' }}>{error}</div>
          ) : topCustomProducts?.length > 0 ? (
            topCustomProducts.map((product) => (
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
            ))
          ) : (
            <div>Không có sản phẩm nào.</div>
          )}
        </Row>
      </div>
    </>
  );
}
