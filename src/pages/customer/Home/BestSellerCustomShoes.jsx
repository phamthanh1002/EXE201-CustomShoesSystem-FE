import React from 'react';
import { Row, Col, Typography, Spin } from 'antd';
import ProductCard from '../../../components/common/ProductCard';
import useProducts from '../../../hooks/useProducts';

const { Title } = Typography;

export default function BestSellerCustomShoes() {
  const { topCustomProducts, loadingTopCustom, errorTopCustom } = useProducts();

  return (
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

      <Spin spinning={loadingTopCustom} tip="Đang tải sản phẩm...">
        {errorTopCustom ? (
          <div style={{ color: 'red', textAlign: 'center', padding: '2rem' }}>{errorTopCustom}</div>
        ) : topCustomProducts?.length > 0 ? (
          <Row gutter={[24, 32]} style={{ padding: '1.5rem 2rem' }}>
            {topCustomProducts.map((product) => (
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
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem' }}>Không có sản phẩm nào.</div>
        )}
      </Spin>
    </div>
  );
}
