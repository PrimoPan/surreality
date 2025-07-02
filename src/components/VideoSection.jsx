import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SoundOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import './VideoSection.css';

const VideoSection = () => {
    const videoRef = useRef(null);
    const [isInView, setIsInView] = useState(false);
    const [isMuted, setIsMuted] = useState(true);  // 默认为静音状态

    // 使用IntersectionObserver检查视频是否进入视口
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true); // 视频进入视口，播放视频
                }
            },
            { threshold: 0.5 } // 设置阈值，表示视频需要至少50%出现在视口时才开始播放
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current); // 清理监听
            }
        };
    }, []);

    useEffect(() => {
        if (isInView && videoRef.current) {
            videoRef.current.play(); // 只有在视频进入视口时才播放
        }
    }, [isInView]);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted; // 切换静音状态
            setIsMuted(!isMuted); // 更新静音状态
        }
    };

    return (
        <section className="hero-section video-section">
            <motion.div
                className="video-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{ duration: 1 }}
            >
                <video
                    ref={videoRef}
                    preload="auto"
                    muted={isMuted}
                    loop
                    playsInline
                    webkit-playsinline
                    className="video-background"
                >
                    <source
                        src="https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/surreality.mov?q-sign-algorithm=sha1&q-ak=AKIDWjRZG3J9yV91WCQNeqk5bGBVlfb5O3qR78Ju-qSz7NaNYH5PO6RubA77P_v_thhA&q-sign-time=1751293221;1751296821&q-key-time=1751293221;1751296821&q-signature=0bf5eaefcb36d926ab0962184af6493701da3871&x-cos-security-token=5OvwZ645YJtQdGAVZ3YnDZCo2fbZ6rcaa43cc832e8987ee35d90b0b5d9572e8fx4RjyrxB3FZZHtVURRPKZxkp3nkscI_DBIT7WVLo4dAUENg5l1-4lVDdejXN6jwHkhj6xjKfuoXAGb3Q2AscezQmZJvOOuV50cfBz5VNaqnpkhbWJKq_AGUvkFEUIFzNbH3YbGcEb1WzM_mTBZUN72LU3n1C6PmvuI_dGol4Hw_gouvydZ0dKSdU-mZTJC_w7BaHVV4y1HVm_6uPZtRet1qOhsWwpWnKyZNBc9GN3tyIDBiGZ9SJUCK2cFzaf00BFFDVhNarXTkiDqZRwhCZbw"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>

                {/* 控制音频的按钮 */}
                <Button
                    className="mute-button"
                    onClick={toggleMute}
                    icon={<SoundOutlined />}
                    shape="circle"
                    size="large"
                    style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '20px',
                        zIndex: 10,
                        background: 'rgba(0, 0, 0, 0.6)',
                        border: 'none',
                    }}
                />
            </motion.div>
        </section>
    );
};

export default VideoSection;
