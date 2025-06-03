import React from "react";
import { motion } from "framer-motion";

const textArray = [
  "🚀 Super Deals!",
  "🔥 Limited Offer!",
  "🎉 Best Prices!",
  "💯 Quality Guaranteed!",
  "📢 Shop Now!",
];

const InfinityText = () => {
  return (
    <div
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        background: "#000",
        padding: "5px",
      }}
    >
      <motion.div
        style={{
          display: "flex",
          gap: "100px",
          fontSize: "24px",
          fontWeight: "bold",
          color: "white",
        }}
        animate={{ x: ["0%", "-100%"] }} 
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
      >
        {/* Duplicate text to create a seamless loop */}
        {[...textArray, ...textArray].map((item, index) => (
          <span key={index} style={{ minWidth: "max-content" }}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default InfinityText;
