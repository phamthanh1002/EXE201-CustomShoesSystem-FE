import React, { useEffect, useState } from 'react';
import { Table, Card, Typography, Tag, Space, Button, Input, Checkbox, Tooltip } from 'antd';
import Title from 'antd/es/typography/Title';
import useOrder from '../../../hooks/useOrder';
import {
  CheckCircleTwoTone,
  ReloadOutlined,
  SearchOutlined,
  CarOutlined,
  ShoppingCartOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import usePickup from '../../../hooks/usePickup';
import PickupModal from './PickupModal';
import PrepareModal from './PrepareModal';
import ShipModal from './ShipModal';

const { Text } = Typography;

export default function OrderManager() {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({
    columnKey: 'orderDate',
    order: 'descend',
  });
  const [tableKey, setTableKey] = useState(0);
  const [modalType, setModalType] = useState(null); // 'pickup' | 'prepare' | 'delivery'
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { allOrders, orderDetailData, fetchAllOrders, fetchOrderDetail } = useOrder();
  const { pickup, loading, error, fetchPickup } = usePickup();
  const [checkedItemsMap, setCheckedItemsMap] = useState({});

  const totalOrder = allOrders.filter((ord) => ord.status !== 'Failed');

  useEffect(() => {
    fetchAllOrders();
    fetchPickup();
  }, []);

  const openModal = (type, order) => {
    setModalType(type);
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedOrder(null);
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
    setTableKey((prev) => prev + 1);
    fetchAllOrders();
    fetchPickup();
  };

  const reloadTable = async () => {
    await Promise.all([fetchAllOrders(), fetchPickup()]);
  };

  const getOrderActionType = (order, pickupList) => {
    const pickupStatuses = ['Đang đến lấy hàng'];
    const prepareStatuses = ['Đã lấy hàng', 'Đang thực hiện'];
    const deliveryStatuses = ['Chờ vận chuyển', 'Đang giao hàng'];
    const done = ['Đã giao đơn hàng'];

    // Kiểm tra nếu đơn hàng đã ở giai đoạn giao hàng thì không hiển thị phiếu nào
    if (done.includes(order.status)) return null;

    // Giai đoạn giữa & sau: dựa vào status
    if (deliveryStatuses.includes(order.status)) return 'delivery';
    if (pickupStatuses.includes(order.status)) return 'pickup';
    if (prepareStatuses.includes(order.status)) return 'prepare';

    // Giai đoạn đầu: phân loại phiếu đầu tiên dựa vào có trong pickup hay không
    const isInPickup = pickupList.some((p) => p.orderID === order.orderID);
    return isInPickup ? 'pickup' : 'prepare';
  };

  const statusFilterOptions = [
    { text: <Tag color="blue">Đã đặt hàng</Tag>, value: 'Đã đặt hàng' },
    { text: <Tag color="cyan">Đang đến lấy hàng</Tag>, value: 'Đang đến lấy hàng' },
    { text: <Tag color="orange">Đang thực hiện</Tag>, value: 'Đang thực hiện' },
    { text: <Tag color="orange">Chờ vận chuyển</Tag>, value: 'Chờ vận chuyển' },
    { text: <Tag color="orange">Đang giao hàng</Tag>, value: 'Đang giao hàng' },
    { text: <Tag color="green">Đã giao đơn hàng</Tag>, value: 'Đã giao đơn hàng' },
  ];

  const orderColumns = [
    {
      title: 'STT',
      key: 'index',
      render: (text, record, index) => `#${index + 1}`,
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'orderDate',
      key: 'orderDate',
      sorter: (a, b) => new Date(a.orderDate) - new Date(b.orderDate),
      sortOrder: sortedInfo.columnKey === 'orderDate' && sortedInfo.order,
      defaultSortOrder: 'descend',
      render: (date) => new Date(date).toLocaleString('vi-VN'),
    },
    {
      title: 'Địa chỉ giao hàng',
      dataIndex: 'deliveryAddress',
      key: 'deliveryAddress',
      sorter: (a, b) => a.deliveryAddress.localeCompare(b.deliveryAddress),
      sortOrder: sortedInfo.columnKey === 'deliveryAddress' && sortedInfo.order,
      filteredValue: filteredInfo.deliveryAddress || null,
      onFilter: (value, record) =>
        record.deliveryAddress.toLowerCase().includes(value.toLowerCase()),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Tìm địa chỉ"
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
        <span role="img" aria-label="Search" style={{ color: filtered ? '#1890ff' : undefined }}>
          <SearchOutlined />
        </span>
      ),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      sorter: (a, b) => a.totalAmount - b.totalAmount,
      sortOrder: sortedInfo.columnKey === 'totalAmount' && sortedInfo.order,
      render: (amount) => (
        <Text strong style={{ color: '#52c41a' }}>
          {amount.toLocaleString('vi-VN')} VND
        </Text>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      filters: statusFilterOptions,
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.status.includes(value),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          {statusFilterOptions.map((option) => (
            <div key={option.value}>
              <label style={{ cursor: 'pointer' }}>
                <input
                  style={{ marginBottom: 15, cursor: 'pointer' }}
                  type="checkbox"
                  checked={selectedKeys.includes(option.value)}
                  onChange={(e) => {
                    const nextKeys = e.target.checked
                      ? [...selectedKeys, option.value]
                      : selectedKeys.filter((k) => k !== option.value);
                    setSelectedKeys(nextKeys);
                  }}
                />
                <span style={{ marginLeft: 8 }}>{option.text}</span>
              </label>
            </div>
          ))}
          <Space style={{ marginTop: 8 }}>
            <Button
              onClick={() => {
                clearFilters();
                confirm();
                setFilteredInfo((prev) => ({ ...prev, status: null }));
              }}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
            <Button
              type="primary"
              onClick={() => {
                confirm();
                setFilteredInfo((prev) => ({ ...prev, status: [...selectedKeys] }));
              }}
              size="small"
              style={{ width: 90 }}
            >
              OK
            </Button>
          </Space>
        </div>
      ),
      render: (status) => {
        let color = 'default';
        switch (status) {
          case 'Đã đặt hàng':
            color = 'blue';
            break;
          case 'Đang đến lấy hàng':
          case 'Đã lấy hàng':
            color = 'cyan';
            break;
          case 'Đang thực hiện':
          case 'Chờ vận chuyển':
          case 'Đang giao hàng':
            color = 'orange';
            break;
          case 'Đã giao đơn hàng':
            color = 'green';
            break;
          default:
            color = 'red';
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record) => {
        const actionType = getOrderActionType(record, pickup);

        if (actionType === 'delivery') {
          return (
            <Tooltip title="Giao hàng">
              <Button
                type="default"
                size="small"
                icon={<CarOutlined />}
                onClick={() => openModal('delivery', record)}
              >
                Giao hàng
              </Button>
            </Tooltip>
          );
        }

        if (actionType === 'pickup') {
          return (
            <Tooltip title="Lấy hàng">
              <Button
                type="default"
                size="small"
                icon={<ShoppingCartOutlined />}
                onClick={() => openModal('pickup', record)}
              >
                Lấy hàng
              </Button>
            </Tooltip>
          );
        }

        if (actionType === 'prepare') {
          return (
            <Tooltip title="Chuẩn bị đơn hàng">
              <Button
                type="dashed"
                size="small"
                icon={<SolutionOutlined />}
                onClick={() => openModal('prepare', record)}
              >
                Chuẩn bị
              </Button>
            </Tooltip>
          );
        }

        return (
          <Text type="success">
            <CheckCircleTwoTone twoToneColor="#52c41a" /> Đã xong
          </Text>
        );
      },
    },
  ];

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Title level={4}>Quản lý đơn hàng</Title>
      </Space>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
        <Button onClick={clearAll} style={{ color: 'red', borderColor: 'red', marginRight: 15 }}>
          x Clear all
        </Button>
        <Button onClick={reloadTable} style={{ color: 'black', borderColor: 'black' }}>
          <ReloadOutlined />
        </Button>
      </div>
      <Table
        columns={orderColumns}
        dataSource={totalOrder}
        key={tableKey}
        rowKey="orderID"
        pagination={{ pageSize: 10 }}
        showSorterTooltip={{ target: 'sorter-icon' }}
        onChange={(pagination, filters, sorter) => {
          setFilteredInfo(filters || {});
          setSortedInfo(sorter || {});
        }}
        expandable={{
          expandedRowRender: (record) => {
            const detail = orderDetailData?.[record.orderID];
            if (!detail) return <Text type="secondary">Đang tải chi tiết đơn hàng...</Text>;
            return (
              <Card
                bordered={false}
                style={{ backgroundColor: '#1A1D24', borderRadius: '12px', padding: '8px' }}
                headStyle={{ borderBottom: '1px solid #2A2D33' }}
                title={
                  <Text style={{ color: '#F5F5F5', fontSize: 18, fontWeight: 600 }}>
                    Chi tiết đơn hàng
                  </Text>
                }
              >
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  {detail.map((item) => (
                    <div
                      key={item.orderDetailID}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px',
                        backgroundColor: '#2A2D33',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#3A3F4B';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#2A2D33';
                      }}
                    >
                      <div>
                        <Text
                          strong
                          style={{
                            fontSize: 16,
                            color: '#F5F5F5',
                            display: 'block',
                            marginBottom: 4,
                          }}
                        >
                          {item.productName || item.packageName}
                        </Text>
                        <Text style={{ color: '#BFBFBF' }}>SL: {item.quantity}</Text>
                      </div>

                      {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: 600 }}>
                          {item.total.toLocaleString('vi-VN')} VND
                        </Text>
                      </div> */}

                      <div style={{display:"flex"}}>
                        <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: 600, textAlign:"right" }}>
                          {item.total.toLocaleString('vi-VN')} VND
                        </Text>
                        {['Đang thực hiện'].includes(record.status) ? (
                          <div style={{ display: 'flex', alignItems: 'center', marginLeft: 20 }}>
                            <Checkbox
                              checked={
                                checkedItemsMap[record.orderID]?.includes(item.orderDetailID) ||
                                false
                              }
                              onChange={() => {
                                const currentChecked = checkedItemsMap[record.orderID] || [];
                                const updated = currentChecked.includes(item.orderDetailID)
                                  ? currentChecked.filter((id) => id !== item.orderDetailID)
                                  : [...currentChecked, item.orderDetailID];

                                setCheckedItemsMap((prev) => ({
                                  ...prev,
                                  [record.orderID]: updated,
                                }));
                              }}
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </Space>
              </Card>
            );
          },
          onExpand: (expanded, record) => {
            if (expanded && !orderDetailData?.[record.orderID]) {
              fetchOrderDetail(record.orderID);
            }
          },
        }}
      />
      {modalType === 'pickup' && (
        <PickupModal open={true} order={selectedOrder} onClose={closeModal} />
      )}

      {modalType === 'prepare' && (
        <PrepareModal
          open={true}
          order={{
            ...selectedOrder,
            orderDetails: orderDetailData?.[selectedOrder?.orderID] || [],
          }}
          checkedItems={checkedItemsMap[selectedOrder?.orderID] || []}
          onClose={closeModal}
        />
      )}

      {modalType === 'delivery' && (
        <ShipModal open={true} order={selectedOrder} onClose={closeModal} />
      )}
    </>
  );
}
