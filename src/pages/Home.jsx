import React, { useEffect, useState } from 'react';
import ParallaxSection from '../components/ParallaxSection';
import ArtworkGallerySection from '../components/ArtworkGallerySection/ArtworkGallerySection';
import SpeechSectionPanHui from '../components/SpeechSectionPanHui';
import SpeechSectionNi from '../components/SpeechSectionNi';
import SpeechSectionArtist from '../components/SpeechSectionArtist';
import VideoSection from '../components/VideoSection';
import CoreTechSection from '../components/CoreTechSection';
// 轮播用的 6 张图，顺序随意，如需替换只改这里
const carouselImages = [
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/001.jpg',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/002.PNG',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/003.PNG',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/004.PNG',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/005.png',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/006.PNG',
];

export default function Home({ lang }) {
    // 当前轮播图
    const [currentImage, setCurrentImage] = useState(carouselImages[0]);

    // 每 7.5 s 轮换一次
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage(prev => {
                const idx = carouselImages.indexOf(prev);
                return carouselImages[(idx + 1) % carouselImages.length];
            });
        }, 7500);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* 唯一的首屏 Parallax + 6 图轮播 */}
            <section className="main-section">
                <ParallaxSection
                    image={currentImage}
                    title={lang === 'en' ? 'Surreality' : '幻實之境'}
                    subtitle={
                        lang === 'en'
                            ? 'World’s First Large Scale AI XR Art Exhibition'
                            : '全球首個大空間擴展現實AI藝術展'
                    }
                    isParallax={true}
                />
            </section>

            {/* 以下区块保持不变 */}


            <section className="main-section">
                <VideoSection
                    src="https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/surreality.mov?q-sign-algorithm=sha1&q-ak=AKIDWjRZG3J9yV91WCQNeq..."
                />
            </section>
            <section className="main-section">
                <VideoSection
                    src="https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/newwebsite/%E7%AC%AC%E4%B8%89%E9%A1%B5.mp4"
                />
            </section>
            <section className="main-section">
                <SpeechSectionNi lang={lang} />
            </section>

            <section className="main-section">
                <SpeechSectionArtist lang={lang} />
            </section>

            <section className="main-section">
                <SpeechSectionPanHui lang={lang} />
            </section>
            <section className="main-section">
                <CoreTechSection
                    lang={lang}
                    videoBg="https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/newwebsite/red_bird_2.mp4"
                />
            </section>

        </>
    );
}
