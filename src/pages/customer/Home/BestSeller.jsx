import { Typography, Flex } from "antd";
import React from "react";
import BestSellerCustomShoes from "./BestSellerCustomShoes";
import BestSellerCleaningShoes from "./BestSellerCleaningShoes";
import BestSellerAccessory from "./BestSellerAccessory";

const { Title } = Typography;

export default function BestSeller() {
  return (
    <Flex vertical gap="middle" style={{ marginTop: "3.5rem" }}>
      <div style={{ textAlign: "center", fontSize: "1.5rem" }}>BEST SELLER</div>
      <div style={{ width: "100%", padding:"1.5rem 2rem 1.5rem 2.5rem" }}>
        <BestSellerCustomShoes />
        <BestSellerCleaningShoes />
        <BestSellerAccessory />
      </div>
    </Flex>
  );
}
