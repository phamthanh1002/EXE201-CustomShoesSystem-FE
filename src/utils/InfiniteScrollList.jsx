import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Spin, Col } from 'antd';

export default function InfiniteScrollList({
  items = [],
  pageSize = 8,
  renderItem,
  loading = false,
  error = '',
}) {
  const [visibleItems, setVisibleItems] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const end = page * pageSize;
    setVisibleItems(items.slice(0, end));
  }, [page, items, pageSize]);

  const observer = useRef();
  const lastItemRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && visibleItems.length < items.length) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, visibleItems, items],
  );

  if (loading) {
    return (
      <Col span={24} style={{ textAlign: 'center' }}>
        <Spin size="large" tip="Đang tải dữ liệu..." />
      </Col>
    );
  }

  if (error) {
    return (
      <Col span={24} style={{ textAlign: 'center', color: 'red' }}>
        {error}
      </Col>
    );
  }

  if (!visibleItems.length) {
    return (
      <Col span={24} style={{ textAlign: 'center' }}>
        Không có sản phẩm nào phù hợp.
      </Col>
    );
  }

  return (
    <>
      {visibleItems.map((item, index) => {
        const isLast = index === visibleItems.length - 1;
        return renderItem(item, index, isLast ? lastItemRef : null);
      })}
    </>
  );
}
