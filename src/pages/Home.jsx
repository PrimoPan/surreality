import React, { useEffect, useState } from 'react';
import ParallaxSection from '../components/ParallaxSection';
import SpeechSectionPanHui from '../components/SpeechSectionPanHui';
import SpeechSectionNi from '../components/SpeechSectionNi';
import SpeechSectionArtist from '../components/SpeechSectionArtist';
import VideoSection from '../components/VideoSection';
import CoreTechSection from '../components/CoreTechSection';

/* 6 张首屏轮播图 */
const carouselImages = [
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/001.jpg',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/002.PNG',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/003.PNG',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/004.PNG',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/005.png',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/006.PNG',
];
const speechSubs = [
    {
        zh: '文明不是被發明的，而是被體驗、被回應。',
        en: "Civilization isn't invented –­ it is felt and responded to."
    },
    {
        zh: '藝術的未來，是一場不設限的變奏。',
        en: 'The future of art is an unbounded variation.'
    },
    {
        zh: '超越頭顯的，是意識的邊界。',
        en: 'What lies beyond the headsets is the boundary of consciousness.'
    }
];

/* 第 3 屏字幕：繁中 + English，每 7.5 s 轮换 */
const subtitles = [
    {
        zh: '文明不是被發明的，而是被體驗、被回應。',
        en: "Civilization isn't invented—it is felt and responded to.",
    },
    {
        zh: '藝術的未來，是一場不設限的變奏。',
        en: 'The future of art is an unbounded variation.',
    },
    {
        zh: '超越螢幕的，是意識的邊界。',
        en: 'What lies beyond the screen is the boundary of consciousness.',
    },
];

export default function Home({ lang }) {
    /* 首屏 Parallax 背景輪播 */
    const [currentImage, setCurrentImage] = useState(carouselImages[0]);
    useEffect(() => {
        const id = setInterval(() => {
            setCurrentImage(prev => {
                const idx = carouselImages.indexOf(prev);
                return carouselImages[(idx + 1) % carouselImages.length];
            });
        }, 7500);
        return () => clearInterval(id);
    }, []);

    /* 第 3 屏字幕輪播 */
    const [subtitleIndex, setSubtitleIndex] = useState(0);
    useEffect(() => {
        const id = setInterval(
            () => setSubtitleIndex(i => (i + 1) % subtitles.length),
            7500,
        );
        return () => clearInterval(id);
    }, []);

    const { zh, en } = subtitles[subtitleIndex];

    return (
        <>
            {/* ── ① 首屏：Parallax + 輪播 ───────────────────────── */}
            <section className="main-section">
                <ParallaxSection
                    image={currentImage}
                    title={lang === 'en' ? 'Surreality' : '幻實之境'}
                    subtitle={
                        lang === 'en'
                            ? 'World’s First Large-Scale AI XR Art Exhibition'
                            : '全球首個大空間擴展現實 AI 藝術展'
                    }
                    isParallax
                />
            </section>

            {/* ── ② 影片１ ─────────────────────────────────── */}
            <section className="main-section">
                <VideoSection src="https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/surreality.mov?q-sign-algorithm=sha1&q-ak=AKIDWjRZG3J9yV91WCQNeq..." />
            </section>

            {/* ── ③ 影片２（帶字幕）────────────────────────── */}
            <section className="main-section">

                <VideoSection
                    src="https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/newwebsite/%E7%AC%AC%E4%B8%89%E9%A1%B5.mp4"
                    subtitles={speechSubs}
                />
            </section>

            {/* ── ④ 後續區塊保持原樣 ───────────────────────── */}
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
                />
        </>
    );
}
