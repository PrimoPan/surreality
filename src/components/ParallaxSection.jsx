// src/components/ParallaxSection.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ParallaxSection({ image, title, subtitle, isParallax = true }) {
  return (
    <section className="hero-section">
      {/* 背景图淡入淡出 */}
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={image}
          className="background-image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          style={{
            backgroundImage: `url(${image})`,
            backgroundAttachment: isParallax ? 'fixed' : 'scroll',
          }}
        />
      </AnimatePresence>

      {/* 标题、子标题：只在滚动到屏幕时进场动画一次 */}
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </motion.div>
    </section>
  );
}
