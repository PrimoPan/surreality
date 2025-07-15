import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SoundOutlined, SoundFilled } from '@ant-design/icons';
import { Button } from 'antd';
import './VideoSection.css';

/**
 * 通用视频区块（支持中英/简/繁字幕轮播）
 *
 * props:
 *  ├ src           : 视频 URL
 *  ├ poster        : 首帧图像
 *  ├ subtitles     : 字幕数组，每条为 { en, zh-Hans?, zh-Hant? }
 *  ├ lang          : 当前语言（'en' | 'zh-Hans' | 'zh-Hant'）
 *  ├ interval      : 字幕切换间隔（默认 10000ms）
 *  ├ threshold     : 可见度阈值（默认 0.5）
 *  ├ loop          : 是否循环播放（默认 true）
 *  ├ startMuted    : 是否默认静音（默认 true）
 *  ├ className     : 自定义 class（可选）
 */
export default function VideoSection({
                                         src,
                                         poster,
                                         subtitles = [],
                                         lang = 'en',
                                         interval = 10000,
                                         threshold = 0.5,
                                         loop = true,
                                         startMuted = true,
                                         className = '',
                                     }) {
    const videoRef = useRef(null);
    const [inView, setInView] = useState(false);
    const [muted, setMuted] = useState(startMuted);
    const [idx, setIdx] = useState(0);

    // 视频滚动控制播放
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold }
        );
        if (videoRef.current) observer.observe(videoRef.current);
        return () => observer.disconnect();
    }, [threshold]);

    useEffect(() => {
        if (!videoRef.current) return;
        inView ? videoRef.current.play() : videoRef.current.pause();
    }, [inView]);

    // 字幕轮播
    useEffect(() => {
        if (!subtitles.length) return;
        const timer = setInterval(
            () => setIdx((prev) => (prev + 1) % subtitles.length),
            interval
        );
        return () => clearInterval(timer);
    }, [subtitles, interval]);

    const toggleMute = () => {
        if (!videoRef.current) return;
        const newMuted = !videoRef.current.muted;
        videoRef.current.muted = newMuted;
        setMuted(newMuted);
    };

    const current = subtitles[idx] ?? {};
    const mainText =
        lang === 'en'
            ? current['zh-Hant'] // 英文用户显示繁体字幕为主
            : current[lang] || current['zh-Hant'] || current['zh-Hans'];
    const secondaryText = current.en;

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

                {/* 静音按钮 */}
                <Button
                    className="mute-button"
                    onClick={toggleMute}
                    icon={muted ? <SoundOutlined /> : <SoundFilled />}
                    shape="circle"
                    size="large"
                />

                {/* 字幕 */}
                {!!subtitles.length && (mainText || secondaryText) && (
                    <div className="video-subtitle-container">
                        {mainText && <p className="video-subtitle">{mainText}</p>}
                        {secondaryText && <p className="video-subtitle">{secondaryText}</p>}
                    </div>
                )}
            </motion.div>
        </section>
    );
}
