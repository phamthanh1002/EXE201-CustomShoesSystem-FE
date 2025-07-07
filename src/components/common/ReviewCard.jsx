// src/components/common/ReviewCard.jsx
import React from 'react';
import { Card, Rate, Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

const ReviewCard = ({ review }) => {
  return (
    <Card style={{ width: '100%', minHeight: 200, border: '2px solid black' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Avatar
          size={50}
          style={{
            background: 'linear-gradient(45deg, #1890ff, #722ed1)',
            marginBottom: '16px',
          }}
          icon={<UserOutlined />}
        />
        <div>
          <Text strong>{review.name}</Text>
          <br />

          <Text type="secondary">Sản phẩm đã mua: {review.productName || review.packageName}</Text>
          <br />
          <Rate disabled value={review.rating} />
        </div>
      </div>
      <Paragraph style={{ marginTop: '1rem' }}>{review.comment}</Paragraph>
    </Card>
  );
};

export default ReviewCard;
