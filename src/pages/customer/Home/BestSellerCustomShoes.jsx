import React from "react";
import { Row, Col, Typography, Card, Button } from "antd";
import ProductCard from "../../../components/common/ProductCard";

const { Title, Paragraph } = Typography;

export default function BestSellerCustomShoes() {
  const productList = Array(8).fill(null);

  const product = {
    name: "Giày Sneaker",
    description: "Đôi giày thể thao phong cách và bền bỉ.",
    price: 1200000,
    items: [
      "https://wokecustoms.com/cdn/shop/files/black_and_red_custom_nike_air_force_1s.jpg?v=1721386085&width=1946",
      "https://wokecustoms.com/cdn/shop/products/CustomAirForce1-BlackandRedDrip.jpg?v=1721386062&width=1946",
      "https://wokecustoms.com/cdn/shop/products/CustomAirForce1-BlackandRedDrip2.jpg?v=1721386062&width=1946",
    ],
  };

  return (
    <>
      <div style={{ padding: "1rem" }}>
        <Title level={3} style={{ textAlign: "center", fontWeight: 600 }}>
          Giày Custom
        </Title>
        <div
          style={{
            width: 80,
            height: 4,
            backgroundColor: "black",
            margin: "0 auto 2rem auto",
          }}
        />

        <Row gutter={[24, 32]} style={{ padding: "1.5rem 2rem 1.5rem 2.5rem" }}>
          {productList.map((_, index) => (
            <Col
              key={index}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}
