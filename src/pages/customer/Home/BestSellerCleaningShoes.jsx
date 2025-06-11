import React from "react";
import { Row, Col, Typography } from "antd";
import ProductCard from "../../../components/common/ProductCard";
import ShoeCleaningPage from "../ShoeCleaning/ShoeCleaningPage";

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

      <ShoeCleaningPage />
    </div>
  );
}
