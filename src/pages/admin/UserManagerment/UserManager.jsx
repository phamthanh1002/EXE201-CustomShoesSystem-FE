import React, { useEffect, useState } from 'react';
import { Table, Switch, Input, Space, Button, Checkbox } from 'antd';
import { toast } from 'react-toastify';
import useUser from '../../../hooks/useUser';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import CreateStaffModal from './CreateStaffModal';

export default function UserManager() {
  const { getAllUser, changeUserStatus, users, loading } = useUser();
  const [data, setData] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [sortedInfo, setSortedInfo] = useState({
    columnKey: 'roleName',
    order: 'ascend',
  });

  useEffect(() => {
    getAllUser();
  }, [getAllUser]);

  useEffect(() => {
    setData(users.filter((u) => u.roleName !== 'Admin'));
  }, [users]);

  const handleChangeStatus = async (record) => {
    setData((prev) =>
      prev.map((u) => (u.email === record.email ? { ...u, status: !u.status } : u)),
    );

    try {
      await changeUserStatus(record.email);
      toast.success('Thay đổi trạng thái user thành công!');
    } catch (err) {
      setData((prev) =>
        prev.map((u) => (u.email === record.email ? { ...u, status: record.status } : u)),
      );
      toast.error(err || 'Thay đổi trạng thái user thất bại!');
    }
  };

  const openCreateModal = () => setIsCreateModalOpen(true);

  const closeCreateModal = () => setIsCreateModalOpen(false);

  const getSearchColumn = (dataIndex, label) => ({
    dataIndex,
    key: dataIndex,
    title: label,
    sorter: (a, b) => a[dataIndex].localeCompare(b[dataIndex]),
    sortOrder: sortedInfo.columnKey === dataIndex && sortedInfo.order,
    filteredValue: filteredInfo[dataIndex] || null,
    onFilter: (value, record) => record[dataIndex]?.toLowerCase().includes(value.toLowerCase()),
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Tìm ${label.toLowerCase()}`}
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
  });

  const reloadTable = () => {
    try {
      getAllUser();
      toast.success('Tải lại dữ liệu thành công');
    } catch (error) {
      toast.error(error || 'Tải lại dữ liệu thất bại');
    }
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({
      columnKey: 'roleName',
      order: 'ascend',
    });
  };

  const refreshUserData = async () => {
    try {
      await getAllUser();
      setData(users.filter((u) => u.roleName !== 'Admin'));
    } catch (error) {
      toast.error('Lỗi khi làm mới danh sách nhân viên');
    }
  };

  const columns = [
    {
      title: 'STT',
      key: 'index',
      render: (_, __, i) => `#${i + 1}`,
    },
    getSearchColumn('email', 'Email'),
    getSearchColumn('name', 'Name'),
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Role',
      dataIndex: 'roleName',
      key: 'roleName',
      align: 'center',
      filteredValue: filteredInfo.roleName || null,
      onFilter: (value, record) => record.roleName === value,
      sorter: (a, b) => a.roleName.localeCompare(b.roleName),
      sortOrder: sortedInfo.columnKey === 'roleName' && sortedInfo.order,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8, width: 200 }}>
          <div style={{ marginBottom: 8 }}>
            <Checkbox
              checked={selectedKeys.includes('Customer')}
              onChange={(e) => {
                const nextKeys = e.target.checked
                  ? [...selectedKeys, 'Customer']
                  : selectedKeys.filter((key) => key !== 'Customer');
                setSelectedKeys(nextKeys);
              }}
            >
              Customer
            </Checkbox>
          </div>
          <div style={{ marginBottom: 8 }}>
            <Checkbox
              checked={selectedKeys.includes('Staff')}
              onChange={(e) => {
                const nextKeys = e.target.checked
                  ? [...selectedKeys, 'Staff']
                  : selectedKeys.filter((key) => key !== 'Staff');
                setSelectedKeys(nextKeys);
              }}
            >
              Staff
            </Checkbox>
          </div>
          <Space style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button
              size="small"
              style={{ width: 80 }}
              onClick={() => {
                clearFilters();
                confirm();
                setFilteredInfo((prev) => ({ ...prev, roleName: null }));
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
                setFilteredInfo((prev) => ({ ...prev, roleName: [...selectedKeys] }));
              }}
            >
              OK
            </Button>
          </Space>
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (_, record) => (
        <Switch
          checked={record.status}
          checkedChildren="Hiện"
          unCheckedChildren="Ẩn"
          style={{ backgroundColor: record.status ? '#389e0d' : '#cf1322' }}
          onChange={() => handleChangeStatus(record)}
        />
      ),
    },
  ];

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Title level={4}>Quản lý người dùng</Title>
      </Space>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
        <Space>
          <Button onClick={clearAll} style={{ color: 'red', borderColor: 'red' }}>
            x Clear all
          </Button>

          <Button onClick={openCreateModal} type="primary">
            + Tạo staff
          </Button>

          <Button onClick={reloadTable} style={{ color: 'black', borderColor: 'black' }}>
            <ReloadOutlined />
          </Button>
        </Space>
      </div>
      <Table
        rowKey="userID"
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: 10 }}
        onChange={(pagination, filters, sorter) => {
          setFilteredInfo(filters);
          setSortedInfo(sorter);
        }}
      />
      <CreateStaffModal
        open={isCreateModalOpen}
        onClose={closeCreateModal}
        onCreate={refreshUserData}
      />
    </>
  );
}
