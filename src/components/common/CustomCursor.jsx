import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [waves, setWaves] = useState([]);
  const moveTimeout = useRef(null);
  const positionRef = useRef({ x: -100, y: -100 });
  const animationFrame = useRef(null);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
      setIsMoving(true);

      if (!moveTimeout.current) {
        setWaves((prev) => [
          ...prev,
          { id: Date.now(), x: e.clientX, y: e.clientY },
        ]);
        moveTimeout.current = setTimeout(() => {
          moveTimeout.current = null;
        }, 400);
      }
    };

    window.addEventListener("mousemove", moveCursor);

    // Cập nhật vị trí con trỏ mỗi frame
    const updatePosition = () => {
      if (cursorRef.current) {
        const { x, y } = positionRef.current;
        cursorRef.current.style.transform = `translate3d(${x - 10}px, ${
          y - 10
        }px, 0) scale(${isMoving ? 1.1 : 1})`;
      }
      animationFrame.current = requestAnimationFrame(updatePosition);
    };
    updatePosition();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      cancelAnimationFrame(animationFrame.current);
    };
  }, [isMoving]);

  // Xoá sóng ripple sau 800ms
  useEffect(() => {
    if (waves.length === 0) return;
    const timer = setTimeout(() => {
      setWaves((prev) => prev.slice(1));
    }, 800);
    return () => clearTimeout(timer);
  }, [waves]);

  return (
    <>
      {/* Sóng ripple */}
      <AnimatePresence>
        {waves.map(({ id, x, y }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0.5, scale: 0.6 }}
            animate={{ opacity: 0, scale: 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: "fixed",
              top: y - 25,
              left: x - 25,
              width: 50,
              height: 50,
              borderRadius: "50%",
              border: "2px solid rgba(255, 59, 48, 0.5)",
              pointerEvents: "none",
              zIndex: 9998,
              mixBlendMode: "difference",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Con trỏ chính */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 14,
          height: 14,
          borderRadius: "50%",
          backgroundColor: "#FF3B30",
          boxShadow: "0 0 6px 2px rgba(255, 59, 48, 0.8)",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
          transform: "translate3d(-100px, -100px, 0)",
          transition: "transform 0.1s ease-out",
        }}
      />

      {/* Ẩn con trỏ mặc định */}
      <style>{`
        body, img, .ant-card, .ant-card *, .ant-btn, button {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
