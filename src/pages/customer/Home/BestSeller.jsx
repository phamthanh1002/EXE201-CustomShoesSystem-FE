import { Typography, Flex, Button } from "antd";
import React from "react";
import BestSellerCustomShoes from "./BestSellerCustomShoes";
import BestSellerCleaningShoes from "./BestSellerCleaningShoes";
import BestSellerAccessory from "./BestSellerAccessory";
import { useNavigate } from "react-router-dom";
import RevealOnScroll from "../../../utils/RevealOnScroll";
import img1 from "../../../assets/BestSellerCustomShoes/img1.jpg";

const { Title, Paragraph } = Typography;

export default function BestSeller() {
  const navigate = useNavigate();

  return (
    <Flex vertical gap="middle" style={{ marginTop: "3.5rem" }}>
      <div style={{ textAlign: "center", fontSize: "1.5rem" }}>BEST SELLER</div>
      <div style={{ width: "100%" }}>
        <BestSellerCustomShoes />
        <RevealOnScroll>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "center",
              height: "40rem",
              backgroundImage: `url(${img1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div>
              <Title
                level={2}
                style={{
                  color: "white",
                  fontWeight: 600,
                  textAlign: "center",
                  marginTop: "1rem",
                }}
              >
                Giày Custom Theo Phong Cách Của Bạn
              </Title>
              <Paragraph
                style={{
                  fontSize: "1.2rem",
                  color: "white",
                  marginBottom: 24,
                  textAlign: "center",
                }}
              >
                Khám phá những đôi giày được thiết kế riêng, không đụng hàng,
                đậm chất cá nhân.
              </Paragraph>
            </div>
            <Button
              onClick={() => navigate("/custom")}
              size="large"
              style={{
                display: "inline",
                fontWeight: 600,
                border: "1px solid black",
              }}
            >
              Xem thêm
            </Button>
          </div>
        </RevealOnScroll>
      </div>

      <div style={{ width: "100%" }}>
        <BestSellerCleaningShoes />
      </div>

      <div style={{ width: "100%" }}>
        <BestSellerAccessory />
      </div>
    </Flex>
  );
}
