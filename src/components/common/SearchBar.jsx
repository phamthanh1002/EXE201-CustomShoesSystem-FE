// src/components/common/SearchBar.jsx
import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SearchBar = ({ value, onChange, onSearch }) => {
  return (
    <Input
      placeholder="Search products..."
      prefix={<SearchOutlined />}
      style={{ width: '100%' }}
      value={value}
      onChange={onChange}
      onPressEnter={onSearch}
    />
  );
};

export default SearchBar;
