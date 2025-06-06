import React, { useState } from "react";
import { Card, Image, Typography, InputNumber, Button } from "antd";
import RevealOnScroll from "../../utils/RevealOnScroll";

const { Title, Text, Paragraph } = Typography;

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null; // Optional: tránh lỗi khi product chưa có

  const totalPrice = product.price * quantity;

  const handleBuy = () => {
    console.log("Mua", quantity, "sản phẩm với tổng:", totalPrice);
  };

  return (
    <RevealOnScroll>
      <Card hoverable style={{ width: 300, border:"2px solid black" }}>
        <Image.PreviewGroup items={product.items}>
          <Image
            src={product.items?.[0]}
            alt={product.name}
            width="100%"
            height={180}
            style={{ objectFit: "cover" }}
            loading="lazy"
            preview={true}
            fallback="src/assets/img_fallback.png"
          />
        </Image.PreviewGroup>

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
    </RevealOnScroll>
  );
}
