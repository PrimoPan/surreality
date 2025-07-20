import React, { useRef } from 'react';
import { Parallax } from 'react-scroll-parallax';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './ParallaxSection.css';

/**
 * ParallaxSection 3.1 – 多语言支持
 * — 背景 cross‑fade；文字首屏动画；Parallax 位移
 * — 支持 en / zh-Hans / zh-Hant 的 CTA 与 scroll 提示
 */

const uiText = {
    en: {
        cta: 'View the news!',
        scroll: 'Scroll ↓',
    },
    'zh-Hans': {
        cta: '查看新闻！',
        scroll: '下滑探索 ↓',
    },
    'zh-Hant': {
        cta: '查看新聞！',
        scroll: '下滑探索 ↓',
    },
};

export default function ParallaxSection({
                                            lang = 'en',
                                            image,
                                            title,
                                            subtitle,
                                            isParallax = true,
                                        }) {
    const navigate = useNavigate();
    const t = uiText[lang] || uiText.en;
    const bgImage = image || '/assets/hero/bg.jpg';
    const hasAnimated = useRef(false);

    const textVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
    };

    return (
        <section className="parallax-root">
            {/* 背景层 */}
            <Parallax speed={isParallax ? -20 : 0} className="bg-parallax">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={bgImage}
                        className="bg-image"
                        style={{ backgroundImage: `url(${bgImage})` }}
                    />
                </AnimatePresence>
            </Parallax>

            {/* 暗色遮罩 */}
            <div className="dark-overlay" />

            {/* 文字 + CTA */}
            <div className="banner-content">
                <Parallax speed={isParallax ? -12 : 0}>
                    <motion.h1
                        variants={textVariants}
                        initial={hasAnimated.current ? undefined : 'hidden'}
                        animate={hasAnimated.current ? undefined : 'visible'}
                        onAnimationComplete={() => (hasAnimated.current = true)}
                    >
                        {title}
                    </motion.h1>
                </Parallax>

                {subtitle && (
                    <Parallax speed={isParallax ? -8 : 0}>
                        <motion.p
                            className="tagline"
                            variants={textVariants}
                            initial={hasAnimated.current ? undefined : 'hidden'}
                            animate={hasAnimated.current ? undefined : 'visible'}
                        >
                            {subtitle}
                        </motion.p>
                    </Parallax>
                )}

                <motion.button
                    className="view-news-btn"
                    onClick={() => navigate('/news')}
                    variants={textVariants}
                    initial={hasAnimated.current ? undefined : 'hidden'}
                    animate={hasAnimated.current ? undefined : 'visible'}
                    whileHover={{ scale: 1.05, y: -2 }}
                >
                    {t.cta}
                </motion.button>
            </div>

            {/* Scroll hint */}
            <Parallax speed={isParallax ? -4 : 0} className="scroll-hint">
                <span>{t.scroll}</span>
            </Parallax>
        </section>
    );
}
