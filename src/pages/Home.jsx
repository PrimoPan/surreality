import React, { useEffect, useState } from 'react';
import ParallaxSection from '../components/ParallaxSection';
import SpeechSectionPanHui from '../components/SpeechSection/SpeechSectionPanHui/SpeechSectionPanHui';
import SpeechSectionNi from '../components/SpeechSection/SpeechSectionNi/SpeechSectionNi';
import SpeechSectionArtist from '../components/SpeechSection/SpeechSectionArtist/SpeechSectionArtist';
import VideoSection from '../components/VideoSection';
import CoreTechSection from '../components/CoreTechSection';

const carouselImages = [
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/001.jpg',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/002.PNG',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/003.PNG',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/004.PNG',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/005.png',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/006.PNG',
];

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
    const [currentImage, setCurrentImage] = useState(carouselImages[0]);
    useEffect(() => {
        const id = setInterval(() => {
            setCurrentImage((prev) => {
                const idx = carouselImages.indexOf(prev);
                return carouselImages[(idx + 1) % carouselImages.length];
            });
        }, 7500);
        return () => clearInterval(id);
    }, []);

    const [subtitleIndex, setSubtitleIndex] = useState(0);
    useEffect(() => {
        const id = setInterval(
            () => setSubtitleIndex((i) => (i + 1) % subtitles.length),
            7500
        );
        return () => clearInterval(id);
    }, []);

    const currentSubtitle =
        subtitles[subtitleIndex][lang] || subtitles[subtitleIndex].en;

    return (
        <>
            {/* ── ① 首屏：Parallax + 輪播 ───────────────────────── */}
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

            {/* ── ② 影片１ ─────────────────────────────────── */}
            <section className="main-section">
                <VideoSection
                    src="https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/surreality.mov?q-sign-algorithm=sha1&q-ak=AKIDWjRZG3J9yV91WCQNeq..."
                />
            </section>

            {/* ── ③ 影片２（含字幕）────────────────────────── */}
            <section className="main-section">
                <VideoSection
                    src="https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/newwebsite/%E7%AC%AC%E4%B8%89%E9%A1%B5.mp4"
                    subtitles={speechSubs}
                    lang={lang}
                />
            </section>

            {/* ── ④ 其餘區塊 ───────────────────────── */}
            <section className="main-section">
                <SpeechSectionNi lang={lang} />
            </section>

            <section className="main-section">
                <SpeechSectionArtist lang={lang} />
            </section>

            <section className="main-section">
                <SpeechSectionPanHui lang={lang} />
            </section>

            <CoreTechSection
                lang={lang}
                videoBg="https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/newwebsite/red_bird_2.mp4"
                subtitle={currentSubtitle}
            />
        </>
    );
}
