import React from 'react';
import { InputNumber, Select, Button, Space, Typography, Input } from 'antd';
import { ClearOutlined, FilterOutlined } from '@ant-design/icons';
import SearchBar from './SearchBar';

const { Option } = Select;
const { Text } = Typography;

const FilterBox = ({
  searchTerm,
  setSearchTerm,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  clearFilter,
  showSize = true,
  hideSearch = false,
}) => {
  const inputStyle = {
    borderRadius: '8px',
    fontSize: '14px',
    minWidth: 160,
    maxWidth: 200,
  };

  const primaryButtonStyle = {
    background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '14px',
  };

  const handleClear = () => clearFilter();

  return (
    <div
      style={{
        padding: '12px 16px',
        background: '#fefefe',
        borderRadius: 12,
        border: '1px solid #ddd',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        overflowX: 'auto',
      }}
    >
      <Space wrap align="center" size="middle" style={{ width: '100%' }}>
        <FilterOutlined style={{ fontSize: 20, color: '#ff6b35' }} />

        {/* Search */}
        {!hideSearch && (
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm sản phẩm..."
            size="large"
            style={{ ...inputStyle }}
          />
        )}

        {/* Min price */}
        <InputNumber
          placeholder="Giá từ"
          min={0}
          value={minPrice ?? 0}
          onChange={(value) => setMinPrice(value ?? 0)}
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          style={{ ...inputStyle }}
        />

        {/* Max price */}
        <InputNumber
          placeholder="Giá đến"
          min={0}
          value={maxPrice}
          onChange={setMaxPrice}
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          style={{ ...inputStyle }}
        />

        {/* Size */}
        {showSize && (
          <Select
            placeholder="Size"
            value={selectedSize || undefined}
            onChange={setSelectedSize}
            allowClear
            style={{ ...inputStyle }}
          >
            {[36, 37, 38, 39, 40, 41, 42, 43, 44, 45].map((size) => (
              <Option key={size} value={size}>
                Size {size}
              </Option>
            ))}
          </Select>
        )}

        {/* Color */}
        <Input
          placeholder="Màu sắc"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          style={{ ...inputStyle }}
          allowClear
        />

        {/* Clear Button */}
        <Button
          icon={<ClearOutlined />}
          onClick={handleClear}
          size="large"
          style={{
            ...primaryButtonStyle,
            background: '#f1f1f1',
            color: '#333',
          }}
        >
          Xóa lọc
        </Button>
      </Space>
    </div>
  );
};

export default FilterBox;
