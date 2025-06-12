import React, { useState } from "react";
import CustomeCard from "../../../components/common/CustomCard";

const categories = [
  { label: "Giày thể thao", value: "sport" },
  { label: "Giày chạy bộ", value: "running" },
  { label: "Giày đá bóng", value: "soccer" },
];

const products = [
  {
    id: 1,
    name: "Giày thể thao đa năng",
    price: 1200000,
    image: "https://example.com/shoe1.jpg",
    description: "Giày thể thao đa năng, phù hợp cho nhiều hoạt động.",
  },
  {
    id: 2,
    name: "Giày chạy bộ nhẹ",
    price: 1500000,
    image: "https://example.com/shoe2.jpg",
    description: "Giày chạy bộ nhẹ, êm ái, thoáng khí.",
  },
  {
    id: 3,
    name: "Giày đá bóng chuyên nghiệp",
    price: 1800000,
    image: "https://example.com/shoe3.jpg",
    description: "Giày đá bóng chuyên nghiệp, bám sân tốt.",
  },
];

export default function ShoeCustomPage() {
  const [selectedCategory, setSelectedCategory] = useState("sport");
  return (
    <div style={{ display: "flex", padding: 32 }}>
      <main style={{ flex: 1 }}>
        {/* Danh sách sản phẩm */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 0fr))",
            gap: 40,
          }}
        >
          {products.map((product) => (
            <CustomeCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
