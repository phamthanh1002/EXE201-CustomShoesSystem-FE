import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

export default function AboutUs() {
  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: '2rem',
        padding: '0 1rem', // adds horizontal padding for small screens
      }}
    >
      <Title
        level={2}
        style={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: 'clamp(20px, 5vw, 32px)',
        }}
      >
        VỀ CHÚNG TÔI
      </Title>

      <Paragraph
        style={{
          maxWidth: 1000,
          margin: '0 auto',
          fontSize: 'clamp(16px, 2.5vw, 20px)',
          lineHeight: 1.8,
        }}
      >
        Hãy cùng tìm hiểu! Hãy là chính mình bằng cách mang lại sự trẻ trung hơn và độc đáo cho
        riêng bạn với DesignMyKick, dịch vụ chuyên custom, vệ sinh và bán phụ kiện cho tất cả các
        loại giày. Nhiều hơn một chút về sáng tạo, ít hơn một chút về kinh phí, một vài bước đơn
        giản để có một đôi giày cho riêng bạn.
      </Paragraph>
    </div>
  );
}
