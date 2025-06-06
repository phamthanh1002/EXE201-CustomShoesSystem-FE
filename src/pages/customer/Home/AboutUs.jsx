import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

export default function AboutUs() {
  return (
    <div style={{  textAlign: "center", marginTop: "2rem" }}>
      <Title level={2} style={{ color: "black", fontWeight: "bold" }}>
        VỀ CHÚNG TÔI
      </Title>
      <Paragraph
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          fontSize: 20,
          lineHeight: 1.8,
        }}
      >
        Hãy cùng tìm hiểu! Hãy là chính mình bằng cách mang lại sự trẻ trung hơn
        và độc đáo cho riêng bạn với DesignMyKick, dịch vụ chuyên custom, vệ
        sinh và bán phụ kiện cho tất cả các loại giày. Nhiều hơn một chút về
        sáng tạo, ít hơn một chút về kinh phí, một vài bước đơn giản để có một
        đôi giày cho riêng bạn.
      </Paragraph>
    </div>
  );
}
