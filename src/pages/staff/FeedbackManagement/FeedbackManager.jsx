import React, { useEffect, useState } from 'react';
import {
  Table,
  Card,
  Typography,
  Space,
  Button,
  Descriptions,
  Tag,
  Input,
  Checkbox,
  Switch,
  Popconfirm,
} from 'antd';
import {
  ReloadOutlined,
  FileTextOutlined,
  StarOutlined,
  UserOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import useFeedback from '../../../hooks/useFeedback';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';

const { Title, Text } = Typography;
const { Search } = Input;

export default function FeedbackManager() {
  const { feedbacks, deleteFeedback } = useFeedback();
  const [filteredFeedbacks, setFilteredFeedbacks] = useState(feedbacks);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({
    columnKey: 'createdAt',
    order: 'descend',
  });
  const { changeActiveFeedback, getAllFeedbacks } = useFeedback();
  const { user } = useAuth();

  const role = user.roleName;

  useEffect(() => {
    setFilteredFeedbacks(feedbacks);
  }, [feedbacks]);

  const handleToggleActive = async (feedbackID) => {
    try {
      await changeActiveFeedback(feedbackID);

      setFilteredFeedbacks((prev) =>
        prev.map((item) =>
          item.feedbackID === feedbackID ? { ...item, isActive: !item.isActive } : item,
        ),
      );

      toast.success('Thay đổi trạng thái feedback thành công');
    } catch (error) {
      toast.error(error || 'Lỗi khi cập nhật trạng thái feedback');
    }
  };

  const reloadTable = async () => {
    try {
      await getAllFeedbacks();
      toast.success('Tải lại dữ liệu thành công');
    } catch (error) {
      toast.error(error || 'Tải lại dữ liệu thất bại');
    }
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
    setFilteredFeedbacks(feedbacks);
  };

  const handleDelete = async (feedbackID) => {
    try {
      await deleteFeedback(feedbackID);
      toast.success('Xóa feedback thành công!');
      setFilteredFeedbacks((prev) => prev.filter((item) => item.feedbackID !== feedbackID));
    } catch (error) {
      toast.error(error || 'Xóa feedback thất bại!');
    }
  };

  const columns = [
    {
      title: 'Người dùng',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <span>
          <UserOutlined /> {text}
        </span>
      ),
    },
    {
      title: 'Loại',
      dataIndex: 'feedbackType',
      key: 'feedbackType',
      filteredValue: filteredInfo.feedbackType || null,
      onFilter: (value, record) => record.feedbackType === value,
      sorter: (a, b) => a.feedbackType.localeCompare(b.feedbackType),
      sortOrder: sortedInfo.columnKey === 'feedbackType' && sortedInfo.order,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8, width: 200 }}>
          <div style={{ marginBottom: 8 }}>
            <Checkbox
              checked={selectedKeys.includes('Cleaning')}
              onChange={(e) => {
                const nextKeys = e.target.checked
                  ? [...selectedKeys, 'Cleaning']
                  : selectedKeys.filter((key) => key !== 'Cleaning');
                setSelectedKeys(nextKeys);
              }}
            >
              Cleaning
            </Checkbox>
          </div>
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
          <Space style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button
              size="small"
              style={{ width: 80 }}
              onClick={() => {
                clearFilters();
                confirm();
                setFilteredInfo((prev) => ({ ...prev, feedbackType: null }));
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
                setFilteredInfo((prev) => ({ ...prev, feedbackType: [...selectedKeys] }));
              }}
            >
              OK
            </Button>
          </Space>
        </div>
      ),
      render: (type) => <Tag color={type === 'Cleaning' ? 'green' : 'blue'}>{type}</Tag>,
    },
    {
      title: 'Gói / Sản phẩm',
      key: 'itemName',
      render: (record) => record.packageName || record.productName || <i>Không rõ</i>,
      sorter: (a, b) =>
        (a.packageName || a.productName || '').localeCompare(b.packageName || b.productName || ''),
      sortOrder: sortedInfo.columnKey === 'itemName' && sortedInfo.order,
    },
    {
      title: 'Số sao',
      dataIndex: 'rating',
      key: 'rating',
      filteredValue: filteredInfo.rating || null,
      onFilter: (value, record) => record.rating === value,
      sorter: (a, b) => a.rating - b.rating,
      sortOrder: sortedInfo.columnKey === 'rating' && sortedInfo.order,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8, width: 200 }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <div key={star} style={{ marginBottom: 8 }}>
              <Checkbox
                checked={selectedKeys.includes(star)}
                onChange={(e) => {
                  const nextKeys = e.target.checked
                    ? [...selectedKeys, star]
                    : selectedKeys.filter((key) => key !== star);
                  setSelectedKeys(nextKeys);
                }}
              >
                <StarOutlined style={{ color: '#faad14' }} /> {star} sao
              </Checkbox>
            </div>
          ))}
          <Space style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button
              size="small"
              style={{ width: 80 }}
              onClick={() => {
                clearFilters();
                confirm();
                setFilteredInfo((prev) => ({ ...prev, rating: null }));
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
                setFilteredInfo((prev) => ({ ...prev, rating: [...selectedKeys] }));
              }}
            >
              OK
            </Button>
          </Space>
        </div>
      ),
      render: (rating) => (
        <span>
          <StarOutlined style={{ color: '#faad14' }} /> {rating}
        </span>
      ),
    },
    {
      title: 'Ngày đánh giá',
      dataIndex: 'createdAt',
      key: 'createdAt',
      defaultSortOrder: 'descend',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      sortOrder: sortedInfo.columnKey === 'createdAt' && sortedInfo.order,
      render: (date) => (
        <span>
          <CalendarOutlined /> {new Date(date).toLocaleString()}
        </span>
      ),
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
          onChange={(checked) => handleToggleActive(record.feedbackID, checked)}
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
              Hiện
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
              Ẩn
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
    ...(role === 'Admin'
      ? [
          {
            title: 'Thao tác',
            key: 'action',
            align: 'center',
            render: (_, record) => (
              <Popconfirm
                title="Bạn có chắc muốn xóa đánh giá này?"
                description="Hành động này không thể hoàn tác"
                onConfirm={() => handleDelete(record.feedbackID)}
                okText="Xóa"
                cancelText="Hủy"
                okButtonProps={{ danger: true }}
              >
                <Button danger size="small">
                  Xóa
                </Button>
              </Popconfirm>
            ),
          },
        ]
      : []),
  ];

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Title level={4}>Quản lý đánh giá</Title>
      </Space>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <Space>
          <Button danger onClick={clearAll}>
            x Clear all
          </Button>
          <Button icon={<ReloadOutlined />} onClick={reloadTable} />
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={filteredFeedbacks}
        rowKey="feedbackID"
        onChange={(pagination, filters, sorter) => {
          setFilteredInfo(filters);
          setSortedInfo(sorter);
        }}
        expandable={{
          expandedRowRender: (record) => (
            <Card size="small" bordered={false} style={{ background: '#f9f9f9' }}>
              <Descriptions title={<b>Chi tiết phản hồi</b>} column={1} size="small">
                <Descriptions.Item label="Gói / Sản phẩm">
                  {record.packageName || record.productName || 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item label="Bình luận">{record.comment}</Descriptions.Item>
                <Descriptions.Item label="Thời gian">
                  {new Date(record.createdAt).toLocaleString()}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          ),
        }}
      />
    </>
  );
}
