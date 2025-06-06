// src/components/common/ReviewCard.jsx
import React from "react";
import { Card, Rate, Avatar, Typography } from "antd";

const { Text, Paragraph } = Typography;

const ReviewCard = ({ review }) => {
  return (
    <Card style={{ width: "100%", minHeight: 200, border: "2px solid black" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Avatar
          style={{ border: "2px solid black" }}
          src={review.avatar}
          size={48}
        />
        <div>
          <Text strong>{review.name}</Text>
          <br />
          <Rate
            disabled
            defaultValue={review.rating}
          />
        </div>
      </div>
      <Paragraph style={{ marginTop: "1rem" }}>{review.comment}</Paragraph>
    </Card>
  );
};

export default ReviewCard;
