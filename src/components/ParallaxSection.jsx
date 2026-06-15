import React, { useEffect, useRef } from 'react';
import { Parallax } from 'react-scroll-parallax';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronsDown, Volume2, VolumeX } from 'lucide-react';
import './ParallaxSection.css';

/**
 * ParallaxSection 3.1 – 多语言支持
 * — 背景 cross‑fade；文字首屏动画；Parallax 位移
 * — 支持 en / zh-Hans / zh-Hant 的 CTA 与 scroll 提示
 */

const uiText = {
    en: {
        cta: 'View the news!',
        scroll: 'Scroll to explore ↓',
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
                                            videoSrc,
                                            title,
                                            subtitle,
                                            ctaLabel,
                                            ctaTo = '/news',
                                            isParallax = true,
                                            showScrollHint = true,
                                            showCta = true,
                                            contentPlacement = 'center',
                                            videoMuted = true,
                                            showAudioToggle = false,
                                            onAudioToggle,
                                            scrollHintTargetId,
                                        }) {
    const navigate = useNavigate();
    const t = uiText[lang] || uiText.en;
    const bgImage = image || '/assets/hero/bg.jpg';
    const ctaText = ctaLabel || t.cta;
    const hasAnimated = useRef(false);
    const videoRef = useRef(null);
    const rootRef = useRef(null);

    useEffect(() => {
        if (!videoRef.current || !videoSrc) return;

        videoRef.current.muted = videoMuted;
        videoRef.current.play().catch(() => {
            // Browsers may block unmuted autoplay until the viewer interacts.
        });
    }, [videoMuted, videoSrc]);

    const handleCtaClick = () => {
        if (/^https?:\/\//i.test(ctaTo)) {
            window.location.assign(ctaTo);
            return;
        }

        navigate(ctaTo);
    };
    const handleAudioToggle = () => {
        const nextMuted = !videoMuted;
        if (videoRef.current) {
            videoRef.current.muted = nextMuted;
        }
        onAudioToggle?.();
        if (nextMuted || videoRef.current?.paused) {
            videoRef.current?.play().catch(() => {
                // Browsers may still require another interaction before audio playback.
            });
        }
    };
    const handleScrollHintClick = () => {
        const currentSection =
            rootRef.current?.parentElement?.closest('section') || rootRef.current;
        const target = scrollHintTargetId
            ? document.getElementById(scrollHintTargetId)
            : currentSection?.nextElementSibling;

        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const textVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
    };

    return (
        <section
            ref={rootRef}
            className={`parallax-root${videoSrc ? ' parallax-root--video' : ''}`}
        >
            {/* 背景层 */}
            <Parallax speed={isParallax ? -20 : 0} className="bg-parallax">
                <AnimatePresence mode="wait">
                    {videoSrc ? (
                        <motion.video
                            ref={videoRef}
                            key={videoSrc}
                            className="bg-video"
                            src={videoSrc}
                            autoPlay
                            muted={videoMuted}
                            loop
                            playsInline
                            preload="auto"
                            aria-hidden="true"
                        />
                    ) : (
                        <motion.div
                            key={bgImage}
                            className="bg-image"
                            style={{ backgroundImage: `url(${bgImage})` }}
                        />
                    )}
                </AnimatePresence>
            </Parallax>

            {/* 暗色遮罩 */}
            <div className="dark-overlay" />

            {/* 文字 + CTA */}
            <div className={`banner-content banner-content--${contentPlacement}`}>
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

                {showCta && (
                    <motion.button
                        className="view-news-btn"
                        onClick={handleCtaClick}
                        variants={textVariants}
                        initial={hasAnimated.current ? undefined : 'hidden'}
                        animate={hasAnimated.current ? undefined : 'visible'}
                        whileHover={{ scale: 1.05, y: -2 }}
                    >
                        {ctaText}
                    </motion.button>
                )}
            </div>

            {videoSrc && showAudioToggle && (
                <button
                    className="hero-audio-toggle"
                    type="button"
                    onClick={handleAudioToggle}
                    aria-label={videoMuted ? 'Unmute video' : 'Mute video'}
                    aria-pressed={videoMuted}
                >
                    {videoMuted ? (
                        <VolumeX size={22} aria-hidden="true" />
                    ) : (
                        <Volume2 size={22} aria-hidden="true" />
                    )}
                </button>
            )}

            {/* Scroll hint */}
            {showScrollHint && (
                <div className="scroll-hint">
                    <Parallax speed={isParallax ? -4 : 0} className="scroll-hint__motion">
                        <button
                            type="button"
                            className="scroll-hint__button"
                            onClick={handleScrollHintClick}
                            aria-label={t.scroll.replace('↓', '').trim()}
                        >
                            <span>{t.scroll.replace('↓', '').trim()}</span>
                            <ChevronsDown
                                className="scroll-hint__arrow"
                                size={20}
                                strokeWidth={2.2}
                                aria-hidden="true"
                            />
                        </button>
                    </Parallax>
                </div>
            )}
        </section>
    );
}
