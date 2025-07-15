import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic, Spin, Select, Typography, Space, Divider } from 'antd';
import useUser from '../../../hooks/useUser';
import useRevenue from '../../../hooks/useRevenue';
import { toast } from 'react-toastify';
import { ReloadOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Title, Text } = Typography;

ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
);

export default function RevenueManager() {
  const { getAllUser, users, loading: userLoading } = useUser();
  const [initialYear, setInitialYear] = useState('2025');
  const { getMonthlyRevenue, revenues, loading: revenueLoading } = useRevenue();
  const currentYear = new Date().getFullYear();

  const yearOptions = Array.from({ length: 10 }, (_, i) => (currentYear - 5 + i).toString());

  const labels = Array.isArray(revenues?.monthlyRevenues)
    ? revenues.monthlyRevenues.map((item) => `Tháng ${item.month}`)
    : [];

  const revenueData = Array.isArray(revenues?.monthlyRevenues)
    ? revenues.monthlyRevenues.map((item) => item.totalRevenue)
    : [];

  const orderData = Array.isArray(revenues?.monthlyRevenues)
    ? revenues.monthlyRevenues.map((item) => item.orderCount)
    : [];

  const totalRevenue = revenues?.totalYearlyRevenue || 0;
  const totalOrders = revenues?.totalYearlyOrderCount || 0;

  useEffect(() => {
    getAllUser();
  }, []);

  useEffect(() => {
    getMonthlyRevenue({ year: initialYear });
  }, [initialYear]);

  const reloadTable = async () => {
    const y = currentYear.toString();
    setInitialYear(y);
    try {
      await getMonthlyRevenue({ year: currentYear });
      toast.success('Tải lại dữ liệu thành công');
    } catch (error) {
      toast.error(error || 'Tải lại dữ liệu thất bại');
    }
  };

  const data = {
    labels,
    datasets: [
      // Cột doanh thu
      {
        type: 'bar', // <- mặc định của Bar, ghi rõ cho dễ đọc
        label: 'Doanh thu (VND)',
        data: revenueData,
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderRadius: 5,
        barThickness: 24,
        yAxisID: 'left',
      },
      // Đường số đơn hàng
      {
        type: 'line', // 👈 chuyển sang line
        label: 'Số đơn hàng',
        data: orderData,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.15)',
        borderWidth: 2,
        tension: 0.3, // độ cong
        pointRadius: 4,
        pointHoverRadius: 6,
        yAxisID: 'right',
        fill: false, // không tô dưới đường
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
    },
    scales: {
      left: {
        type: 'linear',
        position: 'left',
        beginAtZero: true,
        title: { display: true, text: 'Doanh thu (VND)' },
        ticks: {
          callback: (v) => v.toLocaleString('vi-VN'),
        },
      },
      right: {
        type: 'linear',
        position: 'right',
        beginAtZero: true,
        grid: { drawOnChartArea: false },
        title: { display: true, text: 'Số đơn hàng' },
        ticks: {
          stepSize: 1,
          precision: 0,
        },
      },
      x: {
        ticks: { font: { size: 12 } },
      },
    },
  };

  const isLoading = userLoading || revenueLoading;

  return (
    <div style={{ padding: 24 }}>
      <Title level={3} style={{ marginBottom: 16 }}>
        Quản lý doanh thu
      </Title>

      <Row align="middle" style={{ marginBottom: 24, display: 'flex', justifyContent: 'flex-end' }}>
        <Col span={6}>
          <Text strong>Chọn năm:</Text>
          <Select
            value={initialYear}
            style={{ width: '100%' }}
            onChange={(value) => setInitialYear(value)}
          >
            {yearOptions.map((year) => (
              <Option key={year} value={year}>
                {year}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card bordered hoverable>
            <Statistic
              title="Tổng số người dùng"
              value={users?.length || 0}
              loading={userLoading}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered hoverable>
            <Statistic
              title="Tổng doanh thu"
              value={totalRevenue}
              precision={0}
              suffix="₫"
              loading={revenueLoading}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered hoverable>
            <Statistic title="Tổng số đơn hàng" value={totalOrders} loading={revenueLoading} />
          </Card>
        </Col>
      </Row>

      <Divider />

      {isLoading ? (
        <Spin size="large" />
      ) : (
        <Card
          title={`Biểu đồ doanh thu và số đơn hàng theo tháng (${initialYear})`}
          bordered
          hoverable
          style={{ borderRadius: 8 }}
          extra={
            <ReloadOutlined onClick={reloadTable} style={{ fontSize: 16, cursor: 'pointer' }} />
          }
        >
          <Bar key={initialYear} data={data} options={options} />
        </Card>
      )}
    </div>
  );
}
