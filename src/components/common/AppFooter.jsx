import { Layout, Row, Col, Image } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';
import React from 'react';
import logo from '../../assets/logo.png';

const { Footer } = Layout;

export default function AppFooter() {
  return (
    <Footer style={{ backgroundColor: '#f0f2f5', padding: '40px 50px' }}>
      <Row gutter={[32, 16]}>
        {/* Cột 1: Logo / Tên thương hiệu */}
        <Col xs={24} sm={12} md={6}>
          <Image src={logo} alt="Logo" style={{ width: 45, height: 45 }} preview={false} />
          <h2 style={{ marginBottom: 10 }}>DesignMyKicks</h2>
          <p>© {new Date().getFullYear()} DesignMyKicks. All rights reserved.</p>
        </Col>

        {/* Cột 2: Liên kết */}
        <Col xs={24} sm={12} md={6}>
          <h3>Liên kết</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li>
              <a href="#">Trang chủ</a>
            </li>
            <li>
              <a href="#">Sản phẩm</a>
            </li>
            <li>
              <a href="#">Liên hệ</a>
            </li>
          </ul>
        </Col>

        {/* Cột 3: Hỗ trợ */}
        <Col xs={24} sm={12} md={6}>
          <h3>Hỗ trợ</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li>
              <a href="#">Câu hỏi thường gặp</a>
            </li>
            <li>
              <a href="#">Chính sách bảo mật</a>
            </li>
            <li>
              <a href="#">Điều khoản sử dụng</a>
            </li>
          </ul>
        </Col>

        {/* Cột 4: Mạng xã hội */}
        <Col xs={24} sm={12} md={6}>
          <h3>Theo dõi chúng tôi</h3>
          <div style={{ fontSize: '20px' }}>
            <a
              href="https://www.facebook.com/profile.php?id=61576855024877"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit', textDecoration: 'none' }} 
            >
              <FacebookOutlined style={{ marginRight: 10 }} />
            </a>
            <TwitterOutlined style={{ marginRight: 10 }} />
            <InstagramOutlined />
          </div>
        </Col>
      </Row>
    </Footer>
  );
}
