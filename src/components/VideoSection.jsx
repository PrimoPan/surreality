import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SoundOutlined, SoundFilled } from '@ant-design/icons';
import { Button } from 'antd';
import './VideoSection.css';

/**
 * 通用视频区块（带字幕轮播）
 * -------------------------------------------
 * props
 *  ├ src            : 视频 URL
 *  ├ poster         : 可选首帧
 *  ├ subtitles      : 字幕数组（每条 { zh: '繁体', en: 'English' }）
 *  ├ interval       : 字幕切换间隔，默认 7500 ms
 *  ├ threshold      : 可见度阈值（IntersectionObserver）
 *  ├ loop           : 是否循环播放
 *  └ startMuted     : 初始是否静音
 */
export default function VideoSection({
                                         src,
                                         poster,
                                         subtitles = [],
                                         interval = 10000,
                                         threshold = 0.5,
                                         loop = true,
                                         startMuted = true,
                                         className = ''
                                     }) {
    const videoRef = useRef(null);
    const [inView, setInView] = useState(false);
    const [muted,  setMuted ] = useState(startMuted);

    // 当前字幕索引
    const [idx, setIdx] = useState(0);

    /* ===== 可见性监听 ===== */
    useEffect(() => {
        const io = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold }
        );
        if (videoRef.current) io.observe(videoRef.current);
        return () => io.disconnect();
    }, [threshold]);

    /* ===== 视口播放控制 ===== */
    useEffect(() => {
        if (!videoRef.current) return;
        inView ? videoRef.current.play() : videoRef.current.pause();
    }, [inView]);

    /* ===== 字幕定时轮播 ===== */
    useEffect(() => {
        if (!subtitles.length) return;
        const timer = setInterval(
            () => setIdx(prev => (prev + 1) % subtitles.length),
            interval
        );
        return () => clearInterval(timer);
    }, [subtitles, interval]);

    /* ===== 静音开关 ===== */
    const toggleMute = () => {
        if (!videoRef.current) return;
        videoRef.current.muted = !videoRef.current.muted;
        setMuted(videoRef.current.muted);
    };

    // 当前字幕文本（双语并列）
    const current = subtitles[idx] ?? {};

    return (
        <section className={`hero-section video-section ${className}`}>
            <motion.div
                className="video-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: inView ? 1 : 0 }}
                transition={{ duration: 1 }}
            >
                <video
                    ref={videoRef}
                    src={src}
                    poster={poster}
                    muted={muted}
                    loop={loop}
                    playsInline
                    preload="auto"
                    className="video-background"
                />

                {/* ---- 静音按钮 ---- */}
                <Button
                    className="mute-button"
                    onClick={toggleMute}
                    icon={muted ? <SoundOutlined /> : <SoundFilled />}
                    shape="circle"
                    size="large"
                />

                {/* ---- 字幕 ---- */}
                {!!subtitles.length && (
                    <div className="video-subtitle-container">
                        <p className="video-subtitle">{current.zh}</p>
                        <p className="video-subtitle">{current.en}</p>
                    </div>
                )}
            </motion.div>
        </section>
    );
}
