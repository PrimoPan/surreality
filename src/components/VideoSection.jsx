// src/components/VideoSection.jsx
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SoundOutlined, SoundFilled } from '@ant-design/icons';
import { Button } from 'antd';
import './VideoSection.css';

export default function VideoSection({
                                         src,                 // 视频 URL
                                         poster,              // 可选：封面
                                         threshold = 0.5,     // IntersectionObserver 触发阈值
                                         loop = true,
                                         startMuted = true,   // 默认是否静音
                                         className = '',      // 额外样式
                                     }) {
    const videoRef = useRef(null);
    const [inView, setInView] = useState(false);
    const [muted, setMuted] = useState(startMuted);

    // 视口检测
    useEffect(() => {
        const io = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold }
        );
        if (videoRef.current) io.observe(videoRef.current);
        return () => io.disconnect();
    }, [threshold]);

    // 自动播放 / 暂停
    useEffect(() => {
        if (!videoRef.current) return;
        inView ? videoRef.current.play() : videoRef.current.pause();
    }, [inView]);

    // 切换静音
    const toggleMute = () => {
        if (!videoRef.current) return;
        videoRef.current.muted = !videoRef.current.muted;
        setMuted(videoRef.current.muted);
    };

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
                    webkit-playsinline="true"
                    preload="auto"
                    className="video-background"
                />
                <Button
                    className="mute-button"
                    onClick={toggleMute}
                    icon={muted ? <SoundOutlined /> : <SoundFilled />}
                    shape="circle"
                    size="large"
                    style={{
                        position: 'absolute',
                        bottom: 20,
                        left: 20,
                        zIndex: 10,
                        background: 'rgba(0,0,0,.6)',
                        border: 'none',
                    }}
                />
            </motion.div>
        </section>
    );
}
