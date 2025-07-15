import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Row, Col, Typography, Spin } from 'antd';
import useFilterProduct from '../../../hooks/useFilterProduct';
import ProductCard from '../../../components/common/ProductCard';
import FilterBox from '../../../components/common/FilterBox';
import InfiniteScrollList from '../../../utils/InfiniteScrollList'; // 🧩 import

const { Title } = Typography;

const SearchResultPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get('keyword') || '';

  const { filters, products, loading, error, setFilter, clearFilters } = useFilterProduct({
    ProductName: keyword,
  });

  const activeProducts = products
    .filter((product) => product.isActive === true)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  useEffect(() => {
    setFilter('ProductName', keyword);
    setFilter('ProductType', '');
  }, [keyword]);

  return (
    <div style={{ padding: '1rem' }}>
      <Title level={3} style={{ textAlign: 'center' }}>
        Kết quả cho: “{keyword}”
      </Title>

      {/* 🧩 FilterBox */}
      <div style={{ margin: '1rem 3rem' }}>
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
          clearFilter={clearFilters}
          showSize={true}
          hideSearch={true}
        />
      </div>

      {/* 🧩 Kết quả với InfiniteScrollList */}
      <Spin spinning={loading} tip="Đang tải...">
        {error ? (
          <div style={{ color: 'red', textAlign: 'center', padding: '2rem' }}>{error}</div>
        ) : (
          <Row gutter={[24, 32]} style={{ padding: '1.5rem 2rem' }}>
            {activeProducts.length === 0 ? (
              <div style={{ textAlign: 'center', width: '100%' }}>Không tìm thấy sản phẩm</div>
            ) : (
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
                    style={{ display: 'flex', justifyContent: 'center' }}
                    ref={ref}
                  >
                    <ProductCard product={product} />
                  </Col>
                )}
              />
            )}
          </Row>
        )}
      </Spin>
    </div>
  );
};

export default SearchResultPage;
