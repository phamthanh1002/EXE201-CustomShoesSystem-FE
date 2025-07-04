import React, { useEffect, useState, Suspense } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function RevealOnScroll({
  children,
  lazy = false,
  fallback = <div>Đang tải...</div>,
}) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.05,
    triggerOnce: false,
  });
  const [show, setShow] = useState(!lazy);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
      if (lazy) setShow(true);
    } else {
      controls.start('hidden');
      if (lazy) setShow(false);
    }
  }, [controls, inView, lazy]);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants}>
      {show ? <Suspense fallback={fallback}>{children}</Suspense> : null}
    </motion.div>
  );
}
