import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const textArray = [
  '🚀 Super Deals!',
  '🔥 Limited Offer!',
  '🎉 Best Prices!',
  '💯 Quality Guaranteed!',
  '📢 Shop Now!',
];

const InfinityText = () => {
  const [start, setStart] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStart(true);
    }, 500); 
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        background: '#000',
        padding: '5px 10px',
      }}
    >
      <motion.div
        style={{
          display: 'flex',
          gap: '8vw',
          fontSize: 'clamp(14px, 2.5vw, 24px)',
          fontWeight: 'bold',
          color: 'white',
          willChange: 'transform',
        }}
        animate={start ? { x: ['0%', '-100%'] } : false} // ⬅ chỉ animate khi start
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: 'linear',
        }}
      >
        {[...textArray, ...textArray].map((item, index) => (
          <span key={index} style={{ minWidth: 'max-content' }}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default InfinityText;
