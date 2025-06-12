import React from "react";
import { Card, Image, Button } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import RevealOnScroll from "../../utils/RevealOnScroll";

export default function CustomeCard({ product }) {
  if (!product) return null;

  const handleZalo = () => {
    window.open("https://zalo.me", "_blank");
  };

  return (
    <RevealOnScroll>
      <Card
        hoverable
        style={{
          width: 280,
          height: 370,
          border: "2px solid black",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 20,
          boxSizing: "border-box",
        }}
        bodyStyle={{
          width: "100%",
          padding: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Image.PreviewGroup items={product.items}>
          <Image
            src={product.items?.[0]}
            alt={product.name}
            width={250}
            height={250}
            style={{ objectFit: "cover", borderRadius: 12, marginBottom: 0 }}
            loading="lazy"
            preview={true}
            fallback="src/assets/img_fallback.png"
          />
        </Image.PreviewGroup>
        <Button
          style={{
            backgroundColor: "#0084ff",
            color: "white",
            fontWeight: 600,
            fontSize: 16,
            border: "none",
            width: "100%",
            height: 40,
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "auto",
          }}
          icon={<MessageOutlined />}
          onClick={handleZalo}
        >
          Tư vấn Zalo
        </Button>
      </Card>
    </RevealOnScroll>
  );
}
