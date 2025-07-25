import React, { useEffect } from 'react';
import { Row, Col, Typography, Spin } from 'antd';
import ProductCard from '../../../components/common/ProductCard';
import InfiniteScrollList from '../../../utils/InfiniteScrollList';
import useFilterProduct from '../../../hooks/useFilterProduct';
import FilterBox from '../../../components/common/FilterBox';

const { Title } = Typography;

export default function ShoeAccessoriesPage() {
  const { filters, products, loading, error, setFilter, clearFilters } = useFilterProduct({
    ProductType: 'Accessory',
  });

  const activeProducts = products
    .filter((product) => product.isActive === true)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <Title level={3} style={{ textAlign: 'center', fontWeight: 600 }}>
        Phụ Kiện
      </Title>
      <div
        style={{
          width: 80,
          height: 4,
          backgroundColor: 'black',
          margin: '0 auto 2rem auto',
        }}
      />

      <div style={{ top: 64, zIndex: 1000, margin: '0 3.1rem' }}>
        <FilterBox
          searchTerm={filters.ProductName}
          setSearchTerm={(val) => setFilter('ProductName', val)}
          minPrice={filters.MinPrice}
          setMinPrice={(val) => setFilter('MinPrice', val)}
          maxPrice={filters.MaxPrice}
          setMaxPrice={(val) => setFilter('MaxPrice', val)}
          selectedSize={filters.Size}
          setSelectedSize={(val) => setFilter('Size', val)}
          selectedColor={filters.Color}
          setSelectedColor={(val) => setFilter('Color', val)}
          showSize={false}
          clearFilter={clearFilters}
        />
      </div>

      <Spin spinning={loading} tip="Đang tải phụ kiện...">
        {error ? (
          <div style={{ color: 'red', textAlign: 'center', padding: '2rem' }}>{error}</div>
        ) : (
          <Row gutter={[24, 32]} style={{ padding: '1.5rem 2rem 1.5rem 2.5rem' }}>
            <InfiniteScrollList
              items={activeProducts}
              pageSize={8}
              loading={false}
              error={null}
              renderItem={(product, index, ref) => (
                <Col
                  key={product.productID}
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                  ref={ref}
                >
                  <ProductCard product={product} />
                </Col>
              )}
            />
          </Row>
        )}
      </Spin>
    </div>
  );
}
