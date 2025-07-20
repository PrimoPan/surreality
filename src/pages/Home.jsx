import React, { useEffect, useState } from 'react';
import ParallaxSection from '../components/ParallaxSection';
import SpeechSectionPanHui from '../components/SpeechSection/SpeechSectionPanHui/SpeechSectionPanHui';
import SpeechSectionNi from '../components/SpeechSection/SpeechSectionNi/SpeechSectionNi';
import SpeechSectionArtist from '../components/SpeechSection/SpeechSectionArtist/SpeechSectionArtist';
import VideoSection from '../components/VideoSection';
import CoreTechSection from '../components/CoreTechSection';

const desktopImages = [
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/001.jpg',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/002.PNG',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/003.PNG',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/004.PNG',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/mc2/BenBenBen.jpg',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/006.PNG',
];

// 移动端竖屏轮播图：1.png 到 7.png
const mobileImages = Array.from({ length: 7 }, (_, i) =>
    `https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/mobile/homepage/${i + 1}.png`
);

// 第②页视频：桌面 & 移动竖屏专用版
const desktopVideo1Url =
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/surreality.mov?q-sign-algorithm=sha1&q-ak=AKIDWjRZG3J9yV91WCQNeq...';
const mobilePortraitVideo1Url =
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/mobile/homepage/%E8%A7%86%E5%B7%AE%E6%BB%9A%E5%8A%A8-%E7%AC%AC%E4%BA%8C%E9%A1%B5-%E7%AB%96%E7%89%88.mp4';

// 第③页视频：桌面版 & 移动竖屏专用版
const desktopVideo2Url =
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/newwebsite/%E7%AC%AC%E4%B8%89%E9%A1%B5.mp4';
const mobilePortraitVideo2Url =
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/mobile/homepage/%E7%BD%91%E9%A1%B5-%E7%AB%96%E7%89%88-%E8%A7%86%E9%A2%91.mp4';

const subtitles = [
    {
        'zh-Hant': '文明不是被發明的，而是被體驗、被回應。',
        'zh-Hans': '文明不是被发明的，而是被体验、被回应。',
        en: "Civilization isn't invented—it is felt and responded to.",
    },
    {
        'zh-Hant': '藝術的未來，是一場不設限的變奏。',
        'zh-Hans': '艺术的未来，是一场不设限的变奏。',
        en: 'The future of art is an unbounded variation.',
    },
    {
        'zh-Hant': '超越螢幕的，是意識的邊界。',
        'zh-Hans': '超越屏幕的，是意识的边界。',
        en: 'What lies beyond the screen is the boundary of consciousness.',
    },
];

const speechSubs = [
    {
        'zh-Hant': '文明不是被發明的，而是被體驗、被回應。',
        'zh-Hans': '文明不是被发明的，而是被体验、被回应。',
        en: "Civilization isn't invented –­ it is felt and responded to.",
    },
    {
        'zh-Hant': '藝術的未來，是一場不設限的變奏。',
        'zh-Hans': '艺术的未来，是一场不设限的变奏。',
        en: 'The future of art is an unbounded variation.',
    },
    {
        'zh-Hant': '超越頭顯的，是意識的邊界。',
        'zh-Hans': '超越头显的，是意识的边界。',
        en: 'What lies beyond the headsets is the boundary of consciousness.',
    },
];

export default function Home({ lang }) {
    // 轮播图及当前图状态
    const [images, setImages] = useState(desktopImages);
    const [currentImage, setCurrentImage] = useState(desktopImages[0]);

    // 根据“移动端竖屏”切换 desktopImages ↔ mobileImages
    useEffect(() => {
        const mql = window.matchMedia(
            '(max-width: 768px) and (orientation: portrait)'
        );
        const updateImages = (e) => {
            setImages(e.matches ? mobileImages : desktopImages);
        };
        updateImages(mql); // 首次执行
        mql.addEventListener('change', updateImages);
        return () => mql.removeEventListener('change', updateImages);
    }, []);

    // 轮播逻辑：images 数组变化时重置并启动定时器
    useEffect(() => {
        setCurrentImage(images[0]);
        const id = setInterval(() => {
            setCurrentImage((prev) => {
                const idx = images.indexOf(prev);
                return images[(idx + 1) % images.length];
            });
        }, 7500);
        return () => clearInterval(id);
    }, [images]);

    // 第②页视频 src 状态
    const [video1Src, setVideo1Src] = useState(desktopVideo1Url);
    // 根据“移动端竖屏”切换第②页视频
    useEffect(() => {
        const mql1 = window.matchMedia(
            '(max-width: 768px) and (orientation: portrait)'
        );
        const updateVideo1 = (e) => {
            setVideo1Src(e.matches ? mobilePortraitVideo1Url : desktopVideo1Url);
        };
        updateVideo1(mql1);
        mql1.addEventListener('change', updateVideo1);
        return () => mql1.removeEventListener('change', updateVideo1);
    }, []);

    // 第③页视频 src 状态
    const [video2Src, setVideo2Src] = useState(desktopVideo2Url);
    // 根据“移动端竖屏”切换第③页视频
    useEffect(() => {
        const mql2 = window.matchMedia(
            '(max-width: 768px) and (orientation: portrait)'
        );
        const updateVideo2 = (e) => {
            setVideo2Src(e.matches ? mobilePortraitVideo2Url : desktopVideo2Url);
        };
        updateVideo2(mql2);
        mql2.addEventListener('change', updateVideo2);
        return () => mql2.removeEventListener('change', updateVideo2);
    }, []);

    // 轮播字幕索引及当前字幕
    const [subtitleIndex, setSubtitleIndex] = useState(0);
    useEffect(() => {
        const sid = setInterval(
            () => setSubtitleIndex((i) => (i + 1) % subtitles.length),
            7500
        );
        return () => clearInterval(sid);
    }, []);
    const currentSubtitle =
        subtitles[subtitleIndex][lang] || subtitles[subtitleIndex].en;

    return (
        <>
            {/* ── ① 首屏：Parallax + 轮播 ───────────────────────── */}
            <section className="main-section">
                <ParallaxSection
                    image={currentImage}
                    title={
                        lang === 'en'
                            ? 'Surreality'
                            : lang === 'zh-Hant'
                                ? '幻實之境'
                                : '幻实之境'
                    }
                    subtitle={
                        lang === 'en'
                            ? "World’s First Large-Scale AI XR Art Exhibition"
                            : lang === 'zh-Hant'
                                ? '全球首個大空間擴展現實 AI 藝術展'
                                : '全球首个大空间扩展现实 AI 艺术展'
                    }
                    isParallax
                />
            </section>

            {/* ── ② 影片１（根据移动竖屏切换）────────────────────────── */}
            <section className="main-section">
                <VideoSection src={video1Src} />
            </section>

            {/* ── ③ 影片２（含字幕，根据移动竖屏切换）────────────────────────── */}
            <section className="main-section">
                <VideoSection src={video2Src} subtitles={speechSubs} lang={lang} />
            </section>

            {/* ── ④ 其余区块 ───────────────────────── */}
            <section className="main-section">
                <SpeechSectionNi lang={lang} />
            </section>

            <section className="main-section">
                <SpeechSectionArtist lang={lang} />
            </section>

            <section className="main-section">
                <SpeechSectionPanHui lang={lang} />
            </section>

            {/* ── ⑤ CoreTechSection，含字幕轮播 ───────────────────────── */}
            <CoreTechSection
                lang={lang}
                videoBg="https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/newwebsite/red_bird_2.mp4"
                subtitle={currentSubtitle}
            />
        </>
    );
}
