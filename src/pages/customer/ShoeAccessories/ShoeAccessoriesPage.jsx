// ... existing code ...
import React, { useState } from "react";
import ProductCard from "../../../components/common/ProductCard";

const categories = [
  { label: "Tất Vớ", value: "tatvo" },
  { label: "Dây Giày", value: "daygiay" },
  { label: "Lót Giày", value: "lotgiay" },
];

const products = [
  {
    id: 1,
    name: "Tất vớ 3 màu cốm 5012",
    price: 35000,
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTWEpUPPeQ-BqVmAkyM3AjArt7Z9zqqwbaVmyEtvFRXTkKDqlqF4AAoZtNi7ztwY5PBPoRFQzWsS8xgLcN1aoNLR7jPx_yUAamF0OlOZUPgdBjHOhv-pwf6RSpO7n6CLE9bPFNK9w&usqp=CAc",
    colors: ["#fff", "#223344", "#bada55"],
    description: "Đôi tất vớ thời trang, bền đẹp.",
  },
  {
    id: 2,
    name: "Tất vớ chữ R 5006",
    price: 30000,
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTWEpUPPeQ-BqVmAkyM3AjArt7Z9zqqwbaVmyEtvFRXTkKDqlqF4AAoZtNi7ztwY5PBPoRFQzWsS8xgLcN1aoNLR7jPx_yUAamF0OlOZUPgdBjHOhv-pwf6RSpO7n6CLE9bPFNK9w&usqp=CAc",
    colors: ["#fff", "#ff9900"],
    description: "Tất vớ chất liệu cotton, thấm hút tốt.",
  },
  // ... thêm sản phẩm khác ...
];

export default function ShoeAccessoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState("tatvo");
  const [sort, setSort] = useState("az");
  const [quantities, setQuantities] = useState(
    products.reduce((acc, p) => ({ ...acc, [p.id]: 1 }), {})
  );

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, Number(value)),
    }));
  };

  return (
    <div style={{ display: "flex", padding: 32 }}>
      {/* Sidebar ẩn, thay bằng dropdown */}
      {/* <aside style={{ width: 180, marginRight: 32 }}> ... </aside> */}

      {/* Main content */}
      <main style={{ flex: 1 }}>
        {/* Dropdown chọn danh mục */}
        <div
          style={{
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <label
            htmlFor="category-select"
            style={{ fontWeight: 700, fontSize: 20, marginRight: 8 }}
          >
            Phụ kiện
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              fontSize: 18,
              padding: "4px 12px",
              borderRadius: 6,
              border: "1.5px solid #222",
              minWidth: 120,
            }}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        {/* Bộ lọc và sắp xếp */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        ></div>
        {/* Danh sách sản phẩm */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 0fr))",
          }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
