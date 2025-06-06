import React from "react";
import { Carousel, Row, Col, Typography } from "antd";
import ProductCard from "../../../components/common/ProductCard";
import { chunkArray } from "../../../utils/chunkArray";

const { Title } = Typography;

export default function BestSellerAccessory() {
  const productList = [
    {
      id: 1,
      name: "Charm giày màu bạc",
      price: 25000,
      items: [
        "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m7citrwbgel434.webp",
      ],
    },
    {
      id: 2,
      name: "Charm giày hello kitty",
      price: 25000,
      items: [
        "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m7citrwbht5k71.webp",
      ],
    },
    {
      id: 3,
      name: "Stiker đầu lâu",
      price: 20000,
      items: [
        "https://down-vn.img.susercontent.com/file/sg-11134201-7r9aq-ln7ari1n2ud15b.webp",
      ],
    },
    {
      id: 4,
      name: "Sticker 76 Godfather",
      price: 20000,
      items: [
        "https://down-vn.img.susercontent.com/file/sg-11134201-7rbng-llz5rughhh515f.webp",
      ],
    },
    {
      id: 5,
      name: "Dây giày màu xanh lam",
      price: 25000,
      items: [
        "https://down-vn.img.susercontent.com/file/sg-11134301-7rd6x-luhixci4ckuna4.webp",
      ],
    },
  ];

  const slides = chunkArray(productList, 4);

  return (
    <div style={{ padding: "1rem" }}>
      <Title level={3} style={{ textAlign: "center", fontWeight: 600 }}>
        Phụ kiện trang trí
      </Title>
      <div
        style={{
          width: 80,
          height: 4,
          backgroundColor: "black",
          margin: "0 auto 2rem auto",
        }}
      />

      <Carousel
        dotPosition="left"
        autoplay={{ dotDuration: true }}
        autoplaySpeed={8000}
        dots={true}
        style={{ boxShadow:"0px 0px 20px 10px black inset" ,backgroundColor: "rgb(224, 224, 224)", borderRadius: "1rem" }}
      >
        {slides.map((group, index) => (
          <div key={index}>
            <Row
              gutter={[24, 32]}
              style={{ padding: "1.5rem 2rem 1.5rem 2.5rem" }}
              justify="center"
            >
              {group.map((product, idx) => (
                <Col
                  key={idx}
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
        ))}
      </Carousel>
    </div>
  );
}
