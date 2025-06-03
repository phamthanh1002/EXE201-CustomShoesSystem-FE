import React from "react";
import { Row, Col, Typography } from "antd";
import ProductCard from "../../../components/common/ProductCard";

export default function BestSellerCleaningShoes() {
  const productList = Array(4).fill(null);


  return (
    <>
      <div  style={{
          fontWeight: "550",
          fontSize: "1.5rem",
          textDecorationLine: "underline",
          marginBottom: "1rem",
        }}>Vệ sinh giày</div>
      <Row gutter={[16, 16]}>
        {productList.map((_, index) => (
          <Col
            key={index}
            xs={24}
            sm={12}
            md={8}
            lg={6}
            xl={6}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ProductCard />
          </Col>
        ))}
      </Row>
    </>
  );
}
