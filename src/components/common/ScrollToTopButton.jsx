import React, { useEffect, useState } from "react";
import { UpOutlined } from "@ant-design/icons";

const glowAnimation = {
  animation: "glow 3s infinite ease-in-out",
};

const injectGlowKeyframes = () => {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes glow {
      0% {
        box-shadow: 0 0 5px rgba(255, 77, 79, 0.3);
      }
      50% {
        box-shadow: 0 0 15px rgba(255, 77, 79, 0.7);
      }
      100% {
        box-shadow: 0 0 5px rgba(255, 77, 79, 0.3);
      }
    }
  `;
  document.head.appendChild(style);
};

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    injectGlowKeyframes();
  }, []);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 1200);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          backgroundColor: "#ff4d4f",
          color: "white",
          border: "1px solid #ff4d4f",
          borderRadius: "50%",
          width: "48px",
          height: "48px",
          cursor: "pointer",
          zIndex: 9999,
          ...glowAnimation,
        }}
        aria-label="Scroll to top"
      >
        <UpOutlined style={{ fontSize: "18px" }} />
      </button>
    )
  );
};

export default ScrollToTopButton;
