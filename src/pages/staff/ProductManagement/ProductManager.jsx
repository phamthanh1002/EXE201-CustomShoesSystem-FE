import React, { useEffect, useState } from 'react';
import {
  Table,
  Card,
  Typography,
  Tag,
  Space,
  Button,
  Input,
  Checkbox,
  Tooltip,
  Image,
  Descriptions,
  Popconfirm,
  Switch,
} from 'antd';
import Title from 'antd/es/typography/Title';
import {
  ReloadOutlined,
  BgColorsOutlined,
  AppstoreOutlined,
  ShoppingOutlined,
  InboxOutlined,
  FileTextOutlined,
  SearchOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import useAllProduct from '../../../hooks/useAllProduct';
import CreateProductModal from './CreateProductModal';
import { toast } from 'react-toastify';
import EditProductModal from './EditProductModal';
import useAuth from '../../../hooks/useAuth';
import dayjs from 'dayjs';

const { Text } = Typography;

export default function ProductManager() {
  const [sortedInfo, setSortedInfo] = useState({});
  const [filteredInfo, setFilteredInfo] = useState({});
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const { fetchAllProduct, deleteProduct, changeActiveProduct, products } = useAllProduct();
  const { user } = useAuth();

  const role = user?.roleName;

  const sortedNewestProduct = [...products].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  useEffect(() => {
    fetchAllProduct();
  }, []);

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
    fetchAllProduct();
  };

  const handleToggleActive = async (productID) => {
    try {
      await changeActiveProduct(productID);
      await fetchAllProduct();
      toast.success('Thay đổi trạng thái sản phẩm thành công');
    } catch (error) {
      toast.error(error || 'Lỗi khi cập nhật trạng thái sản phẩm');
    }
  };

  const handleDeleteProduct = async (productID) => {
    try {
      await deleteProduct(productID);
      await fetchAllProduct();
      toast.success('Xóa sản phẩm thành công');
    } catch (error) {
      toast.error(error.message || 'Xóa sản phẩm thất bại!');
    }
  };

  const reloadTable = async () => {
    try {
      await fetchAllProduct();
      toast.success('Tải lại dữ liệu thành công');
    } catch (error) {
      toast.error(error || 'Tải lại dữ liệu thất bại');
    }
  };

  const openCreateModal = () => setIsCreateModalOpen(true);

  const closeCreateModal = () => setIsCreateModalOpen(false);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => setIsEditModalOpen(false);

  const productColumns = [
    {
      title: 'STT',
      key: 'index',
      render: (text, record, index) => `#${index + 1}`,
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (url) => (
        <Image
          src={url}
          alt="Product"
          width={60}
          height={60}
          style={{ objectFit: 'cover', borderRadius: 8 }}
          preview={true}
          fallback="https://via.placeholder.com/60x60?text=No+Image"
        />
      ),
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
      sorter: (a, b) => a.productName.localeCompare(b.productName),
      sortOrder: sortedInfo.columnKey === 'productName' && sortedInfo.order,
      filteredValue: filteredInfo.productName || null,
      onFilter: (value, record) => record.productName.toLowerCase().includes(value.toLowerCase()),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Tìm tên sản phẩm"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button type="primary" onClick={() => confirm()} size="small" style={{ width: 90 }}>
              Tìm kiếm
            </Button>

            <Button
              onClick={() => {
                clearFilters();
                confirm();
              }}
              size="small"
              style={{ width: 90 }}
            >
              Xóa
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      align: 'center',
    },
    {
      title: 'Loại sản phẩm',
      dataIndex: 'productType',
      key: 'productType',
      align: 'center',
      filters: [
        { text: 'Custom', value: 'Custom' },
        { text: 'Accessory', value: 'Accessory' },
      ],
      filteredValue: filteredInfo.productType || null,
      onFilter: (value, record) => record.productType === value,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8, width: 200 }}>
          <div style={{ marginBottom: 8 }}>
            <Checkbox
              checked={selectedKeys.includes('Custom')}
              onChange={(e) => {
                const nextKeys = e.target.checked
                  ? [...selectedKeys, 'Custom']
                  : selectedKeys.filter((key) => key !== 'Custom');
                setSelectedKeys(nextKeys);
              }}
            >
              Custom
            </Checkbox>
          </div>
          <div style={{ marginBottom: 8 }}>
            <Checkbox
              checked={selectedKeys.includes('Accessory')}
              onChange={(e) => {
                const nextKeys = e.target.checked
                  ? [...selectedKeys, 'Accessory']
                  : selectedKeys.filter((key) => key !== 'Accessory');
                setSelectedKeys(nextKeys);
              }}
            >
              Accessory
            </Checkbox>
          </div>
          <Space style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <Button
              size="small"
              style={{ width: 80 }}
              onClick={() => {
                clearFilters();
                confirm();
                setFilteredInfo((prev) => ({ ...prev, productType: null }));
              }}
            >
              Reset
            </Button>
            <Button
              type="primary"
              size="small"
              style={{ width: 80 }}
              onClick={() => {
                confirm();
                setFilteredInfo((prev) => ({ ...prev, productType: [...selectedKeys] }));
              }}
            >
              OK
            </Button>
          </Space>
        </div>
      ),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      render: (price) => (
        <Text type="danger" style={{ fontWeight: 'bold' }}>
          {price.toLocaleString('vi-VN')} VND
        </Text>
      ),
      sorter: (a, b) => a.price - b.price,
      sortOrder: sortedInfo.columnKey === 'price' && sortedInfo.order,
    },
    {
      title: 'Giảm giá (%)',
      dataIndex: 'discount',
      key: 'discount',
      align: 'center',
      sorter: (a, b) => a.discount - b.discount,
      sortOrder: sortedInfo.columnKey === 'discount' && sortedInfo.order,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
      key: 'total',
      align: 'center',
      render: (total) => (
        <Text type="warning" style={{ fontWeight: 'bold' }}>
          {total.toLocaleString('vi-VN')} VND
        </Text>
      ),
      sorter: (a, b) => a.total - b.total,
      sortOrder: sortedInfo.columnKey === 'total' && sortedInfo.order,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      key: 'isActive',
      align: 'center',
      filteredValue: filteredInfo.isActive || null,
      onFilter: (value, record) => record.isActive === value,
      render: (isActive, record) => (
        <Switch
          checked={isActive}
          checkedChildren="Hiện"
          unCheckedChildren="Ẩn"
          onChange={(checked) => handleToggleActive(record.productID, checked)}
          style={{
            backgroundColor: isActive ? '#389e0d' : '#cf1322',
          }}
        />
      ),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8, width: 200 }}>
          <div style={{ marginBottom: 8 }}>
            <Checkbox
              checked={selectedKeys.includes(true)}
              onChange={(e) => {
                const nextKeys = e.target.checked
                  ? [...selectedKeys, true]
                  : selectedKeys.filter((key) => key !== true);
                setSelectedKeys(nextKeys);
              }}
            >
              Đang bán
            </Checkbox>
          </div>
          <div style={{ marginBottom: 8 }}>
            <Checkbox
              checked={selectedKeys.includes(false)}
              onChange={(e) => {
                const nextKeys = e.target.checked
                  ? [...selectedKeys, false]
                  : selectedKeys.filter((key) => key !== false);
                setSelectedKeys(nextKeys);
              }}
            >
              Ẩn sản phẩm
            </Checkbox>
          </div>
          <Space style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button
              size="small"
              style={{ width: 80 }}
              onClick={() => {
                clearFilters();
                confirm();
                setFilteredInfo((prev) => ({ ...prev, isActive: null }));
              }}
            >
              Reset
            </Button>
            <Button
              type="primary"
              size="small"
              style={{ width: 80 }}
              onClick={() => {
                confirm();
                setFilteredInfo((prev) => ({ ...prev, isActive: [...selectedKeys] }));
              }}
            >
              OK
            </Button>
          </Space>
        </div>
      ),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <Space>
          <Button size="small" type="link" onClick={() => handleEdit(record)}>
            Sửa
          </Button>

          {role === 'Admin' && (
            <Popconfirm
              title="Bạn có chắc muốn xóa sản phẩm này?"
              description="Hành động này không thể hoàn tác"
              onConfirm={() => handleDeleteProduct(record.productID)}
              okText="Xóa"
              cancelText="Hủy"
              okButtonProps={{ danger: true }}
            >
              <Button size="small" type="link" danger>
                Xóa
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Title level={4}>Quản lý sản phẩm</Title>
      </Space>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
        <Space>
          <Button onClick={clearAll} style={{ color: 'red', borderColor: 'red' }}>
            x Clear all
          </Button>

          <Button onClick={openCreateModal} type="primary">
            + Tạo sản phẩm
          </Button>

          <Button onClick={reloadTable} style={{ color: 'black', borderColor: 'black' }}>
            <ReloadOutlined />
          </Button>
        </Space>
      </div>
      <Table
        columns={productColumns}
        dataSource={sortedNewestProduct}
        rowKey="productID"
        onChange={(pagination, filters, sorter) => {
          setFilteredInfo(filters);
          setSortedInfo(sorter);
        }}
        expandable={{
          expandedRowRender: (record) => (
            <Card
              size="small"
              bordered={false}
              bodyStyle={{
                background: '#E5E0D8',
                borderRadius: 8,
                padding: 16,
              }}
              style={{
                margin: '12px 24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <Descriptions
                title={
                  <span style={{ fontSize: 16, fontWeight: 600 }}>
                    📝 Thông tin chi tiết sản phẩm
                  </span>
                }
                column={2}
                labelStyle={{ fontWeight: 500, textAlign: 'center' }}
                contentStyle={{ textAlign: 'center' }}
                size="middle"
              >
                <Descriptions.Item
                  label={
                    <>
                      <span>
                        <CalendarOutlined style={{ marginRight: 4 }} />
                        Ngày tạo
                      </span>
                    </>
                  }
                  span={2} // 👉 chiếm 1 hàng
                  style={{ fontWeight: 'bold' }}
                >
                  {dayjs(record.createdAt).format('DD/MM/YYYY HH:mm')}
                </Descriptions.Item>

                <Descriptions.Item
                  label={
                    <>
                      <span>
                        <BgColorsOutlined style={{ marginRight: 4 }} />
                        Màu sắc
                      </span>
                    </>
                  }
                >
                  {record.color}
                </Descriptions.Item>

                {record.productType === 'Custom' && (
                  <Descriptions.Item
                    label={
                      <>
                        <span>
                          <AppstoreOutlined style={{ marginRight: 4 }} />
                          Kích cỡ
                        </span>
                      </>
                    }
                  >
                    {record.size}
                  </Descriptions.Item>
                )}

                <Descriptions.Item
                  label={
                    <>
                      <span>
                        <ShoppingOutlined style={{ marginRight: 4 }} />
                        Đã bán
                      </span>
                    </>
                  }
                >
                  {record.soldQuantity}
                </Descriptions.Item>

                <Descriptions.Item
                  label={
                    <>
                      <span>
                        <InboxOutlined style={{ marginRight: 4 }} />
                        Tồn kho
                      </span>
                    </>
                  }
                >
                  {record.stockQuantity}
                </Descriptions.Item>
              </Descriptions>
              <div style={{ marginTop: 10 }}>
                <span>
                  <FileTextOutlined style={{ color: '#7E7B83', marginRight: 4 }} />
                </span>
                <span style={{ color: '#7E7B83', marginRight: 4, fontWeight: '500' }}>Mô tả: </span>

                {record.description ? (
                  <Text>{record.description}</Text>
                ) : (
                  <i style={{ color: '#999' }}>Không có mô tả</i>
                )}
              </div>
            </Card>
          ),
          rowExpandable: (record) =>
            !!(
              record.color ||
              record.size ||
              record.soldQuantity ||
              record.stockQuantity ||
              record.description
            ),
        }}
      />
      <CreateProductModal
        open={isCreateModalOpen}
        onClose={closeCreateModal}
        onCreate={fetchAllProduct}
      />
      <EditProductModal
        open={isEditModalOpen}
        onClose={closeEditModal}
        onCreate={fetchAllProduct}
        editingProduct={editingProduct}
      />
    </>
  );
}
