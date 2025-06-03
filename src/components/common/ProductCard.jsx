import React, { useState } from "react";
import { Card, Image, Typography, InputNumber, Button } from "antd";

const { Title, Text, Paragraph } = Typography;

export default function ProductCard() {
  const [quantity, setQuantity] = useState(1);

  const product = {
    name: "Giày Sneaker",
    description: "Đôi giày thể thao phong cách và bền bỉ.",
    price: 1200000, // VND
    image: "https://via.placeholder.com/300x200?text=Product+Image",
  };

  const totalPrice = product.price * quantity;

  const handleBuy = () => {
    console.log("Mua", quantity, "sản phẩm với tổng:", totalPrice);
  };

  return (
    <Card hoverable style={{ width: 300 }}>
      <Image
        src={product.image}
        alt={product.name}
        width="100%"
        height={180}
        style={{ objectFit: "cover" }}
      />
      <Title level={4} style={{ marginTop: 16 }}>
        {product.name}
      </Title>
      <Paragraph>{product.description}</Paragraph>

      <Text strong>Giá: </Text>
      <Text>{product.price.toLocaleString()} VND</Text>

      <div style={{ marginTop: 12, marginBottom: 12 }}>
        <Text strong>Số lượng: </Text>
        <InputNumber
          min={1}
          max={100}
          value={quantity}
          onChange={setQuantity}
          style={{ marginLeft: 8 }}
        />
      </div>

      <Text strong>Tổng tiền: </Text>
      <Text type="danger" style={{ fontSize: 16 }}>
        {totalPrice.toLocaleString()} VND
      </Text>

      <div style={{ marginTop: 16 }}>
        <Button
          style={{ backgroundColor: "black", color: "white" }}
          block
          onClick={handleBuy}
        >
          Mua
        </Button>
      </div>
    </Card>
  );
}
