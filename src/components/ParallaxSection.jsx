import React, { useEffect, useRef, useState } from 'react';
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
                                            videoType,
                                            videoFallbackSrc,
                                            videoFallbackType = 'video/mp4',
                                            videoPoster,
                                            videoPreload = 'metadata',
                                            title,
                                            subtitle,
                                            ctaLabel,
                                            ctaTo = '/news',
                                            isParallax = true,
                                            showScrollHint = true,
                                            showCta = true,
                                            contentPlacement = 'center',
                                            videoMuted = true,
                                            disableVideoOnSaveData = true,
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
    const onAudioToggleRef = useRef(onAudioToggle);
    const [shouldLoadVideo, setShouldLoadVideo] = useState(true);
    const [isVideoReady, setIsVideoReady] = useState(false);
    const hasVideo = Boolean(videoSrc && shouldLoadVideo);

    useEffect(() => {
        onAudioToggleRef.current = onAudioToggle;
    }, [onAudioToggle]);

    useEffect(() => {
        setIsVideoReady(false);
    }, [videoSrc]);

    useEffect(() => {
        if (!disableVideoOnSaveData || typeof navigator === 'undefined') return;

        const connection =
            navigator.connection || navigator.mozConnection || navigator.webkitConnection;

        if (!connection) return;

        const updateVideoPreference = () => {
            const effectiveType = connection.effectiveType || '';
            const isConstrainedNetwork =
                connection.saveData || effectiveType === 'slow-2g' || effectiveType === '2g';

            setShouldLoadVideo(!isConstrainedNetwork);
        };

        updateVideoPreference();
        connection.addEventListener?.('change', updateVideoPreference);
        return () => connection.removeEventListener?.('change', updateVideoPreference);
    }, [disableVideoOnSaveData]);

    useEffect(() => {
        if (!videoRef.current || !hasVideo) return;

        const video = videoRef.current;
        let isCancelled = false;

        const playMutedFallback = () => {
            if (isCancelled || videoMuted) return;

            video.muted = true;
            onAudioToggleRef.current?.(true);
            video.play().catch(() => {
                // If even muted autoplay is blocked, the poster remains visible.
            });
        };

        video.muted = videoMuted;
        video.play().catch(playMutedFallback);

        return () => {
            isCancelled = true;
        };
    }, [hasVideo, videoMuted, videoSrc]);

    const handleCtaClick = () => {
        if (/^https?:\/\//i.test(ctaTo)) {
            window.location.assign(ctaTo);
            return;
        }

        navigate(ctaTo);
    };
    const handleAudioToggle = () => {
        const nextMuted = !videoMuted;
        const video = videoRef.current;

        onAudioToggle?.(nextMuted);

        if (!video) return;

        video.muted = nextMuted;
        if (nextMuted || video.paused) {
            video.play().catch(() => {
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
                    {hasVideo ? (
                        <>
                            {bgImage && (
                                <motion.div
                                    key={`${videoSrc}-cover`}
                                    className={`bg-image bg-video-cover${isVideoReady ? ' is-hidden' : ''}`}
                                    style={{ backgroundImage: `url(${bgImage})` }}
                                />
                            )}
                            <motion.video
                                ref={videoRef}
                                key={`${videoSrc}-${videoFallbackSrc || ''}`}
                                className={`bg-video${isVideoReady ? ' is-ready' : ''}`}
                                src={videoFallbackSrc ? undefined : videoSrc}
                                poster={videoPoster}
                                autoPlay
                                muted={videoMuted}
                                loop
                                playsInline
                                preload={videoPreload}
                                onLoadedData={() => setIsVideoReady(true)}
                                onCanPlay={() => setIsVideoReady(true)}
                                onPlaying={() => setIsVideoReady(true)}
                                aria-hidden="true"
                            >
                                {videoFallbackSrc ? (
                                    <>
                                        <source src={videoSrc} type={videoType} />
                                        <source src={videoFallbackSrc} type={videoFallbackType} />
                                    </>
                                ) : null}
                            </motion.video>
                        </>
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

            {hasVideo && showAudioToggle && (
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
