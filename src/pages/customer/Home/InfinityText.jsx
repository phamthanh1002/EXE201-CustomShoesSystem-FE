import React from 'react';
import { motion } from 'framer-motion';

const textArray = [
  '🚀 Super Deals!',
  '🔥 Limited Offer!',
  '🎉 Best Prices!',
  '💯 Quality Guaranteed!',
  '📢 Shop Now!',
];

const InfinityText = () => {
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
          gap: '8vw', // responsive spacing
          fontSize: 'clamp(14px, 2.5vw, 24px)', // responsive font
          fontWeight: 'bold',
          color: 'white',
        }}
        animate={{ x: ['0%', '-100%'] }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: 'linear', // smoother for continuous scroll
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
