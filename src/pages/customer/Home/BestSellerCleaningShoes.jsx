import React from "react";
import { Row, Col, Typography } from "antd";
import ProductCard from "../../../components/common/ProductCard";

const { Title, Paragraph } = Typography;

export default function BestSellerCleaningShoes() {
  const productList = Array(4).fill(null);

  return (
    <div style={{ padding: "1rem" }}>
      <Title level={3} style={{ textAlign: "center", fontWeight: 600 }}>
        Vệ sinh giày
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
            <ProductCard />
          </Col>
        ))}
      </Row>
    </div>
  );
}
