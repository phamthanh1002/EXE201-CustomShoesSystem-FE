import React from "react";
import { Carousel, Row, Col, Typography } from "antd";
import ProductCard from "../../../components/common/ProductCard";
import { chunkArray } from "../../../utils/chunkArray";
import ReviewCard from "../../../components/common/ReviewCard";
import RevealOnScroll from "../../../utils/RevealOnScroll";

const { Title } = Typography;

export default function Review() {
  const reviewList = [
    {
      id: 1,
      avatar: "https://i.pravatar.cc/150?img=1",
      name: "Nguyễn Văn A",
      rating: 5,
      comment: "Sản phẩm rất đẹp và chất lượng, mình rất hài lòng!",
    },
    {
      id: 2,
      avatar: "https://i.pravatar.cc/150?img=2",
      name: "Trần Thị B",
      rating: 4,
      comment: "Hàng ok, giao hàng nhanh, sẽ ủng hộ tiếp!",
    },
    {
      id: 3,
      avatar: "https://i.pravatar.cc/150?img=3",
      name: "Lê Văn C",
      rating: 3,
      comment: "Sản phẩm được nhưng hơi khác ảnh một chút.",
    },
    {
      id: 4,
      avatar: "https://i.pravatar.cc/150?img=4",
      name: "Phạm Thị D",
      rating: 5,
      comment: "Tuyệt vời! Đúng mô tả, đóng gói cẩn thận.",
    },
    {
      id: 5,
      avatar: "https://i.pravatar.cc/150?img=5",
      name: "Hoàng Văn E",
      rating: 4,
      comment: "Ổn so với giá tiền, sẽ mua lần sau.",
    },
    {
      id: 6,
      avatar: "https://i.pravatar.cc/150?img=6",
      name: "Đỗ Thị F",
      rating: 5,
      comment: "Rất hài lòng, 5 sao!",
    },
    {
      id: 7,
      avatar: "https://i.pravatar.cc/150?img=7",
      name: "Ngô Văn G",
      rating: 2,
      comment: "Không như mong đợi, giao hàng trễ.",
    },
    {
      id: 8,
      avatar: "https://i.pravatar.cc/150?img=8",
      name: "Bùi Thị H",
      rating: 5,
      comment: "Sản phẩm đẹp, đúng mô tả, shop nhiệt tình.",
    },
  ];

  const slides = chunkArray(reviewList, 4);

  return (
    <RevealOnScroll>
      <div style={{ padding: "1rem" }}>
        <Title level={3} style={{ textAlign: "center", fontWeight: 600 }}>
          Review
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
          dotPosition="bottom"
          autoplay={{ dotDuration: true }}
          autoplaySpeed={5000}
          dots={true}
          style={{
            // backgroundColor: "rgb(224, 224, 224)",
            boxShadow: "revert 0px 0px 20px rgba(0, 0, 0, 0.5) ",
            borderRadius: "1rem",
          }}
        >
          {slides.map((group, index) => (
            <div key={index}>
              <Row
                gutter={[24, 32]}
                style={{ padding: "1.5rem 2rem 1.5rem 2.5rem" }}
                justify="center"
              >
                {group.map((review, idx) => (
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
                    <ReviewCard review={review} />
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </Carousel>
      </div>
    </RevealOnScroll>
  );
}
