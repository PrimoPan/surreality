import React, { useEffect, useState } from 'react';
import { Parallax } from 'react-scroll-parallax';
import ParallaxSection from '../components/ParallaxSection';
import './Home.css';

const heroVideoUrl =
    'https://surreality-1419044809.cos.ap-hongkong.myqcloud.com/video/surreality-QxMgBRgVHrY-1080p.mp4';

const manifestoBgImages = [
    'https://surreality-1419044809.cos.ap-hongkong.myqcloud.com/photos/photo_01.png',
    'https://surreality-1419044809.cos.ap-hongkong.myqcloud.com/photos/photo_2.png',
];

const manifestoCopy = {
    en: {
        title: 'What is Surreality?',
        paragraphs: [
            'We envision a future where the digital world coexists with the physical world through immersive experiences, until people can no longer fully distinguish reality from the virtual.',
            'Through advanced holographic projection or high-quality head-mounted displays, we will live and interact with virtual objects seamlessly integrated into our surroundings, dissolving the boundaries of the virtual world. We call this entirely new reality Surreality.',
        ],
        quote: 'We call this entirely new reality Surreality.',
        author: '- Pan Hui',
    },
    'zh-Hans': {
        title: '什么是「幻实之境」？',
        paragraphs: [
            '我们设想在未来，数字世界将以沉浸式的方式与实体世界共存，达到让人完全无法分辨真实与虚拟的程度。',
            '通过先进的全息投影技术或高品质的头戴式显示器，我们将与无缝融入周遭环境的虚拟物件共同生活并进行互动，从而消弭虚拟世界的边界。我们将这种全新的现实称之为「幻实之境」。',
        ],
        quote: '我们将这种全新的现实称之为「幻实之境」。',
        author: '- 许彬',
    },
    'zh-Hant': {
        title: '什麼是「幻實之境」？',
        paragraphs: [
            '我們設想在未來，數位世界將以沉浸式的方式與實體世界共存，達到讓人完全無法分辨真實與虛擬的程度。',
            '透過先進的全息投影技術或高品質的頭戴式顯示器，我們將與無縫融入周遭環境的虛擬物件共同生活並進行互動，從而消弭虛擬世界的邊界。我們將這種全新的現實稱之為「幻實之境」。',
        ],
        quote: '我們將這種全新的現實稱之為「幻實之境」。',
        author: '- 許彬',
    },
};

const manifestoCarouselDelay = 7500;

function ManifestoSection({ lang }) {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const copy = manifestoCopy[lang] || manifestoCopy.en;

    useEffect(() => {
        manifestoBgImages.forEach((src) => {
            const image = new Image();
            image.src = src;
        });
    }, []);

    useEffect(() => {
        const id = setInterval(() => {
            setActiveImageIndex((index) => (index + 1) % manifestoBgImages.length);
        }, manifestoCarouselDelay);

        return () => clearInterval(id);
    }, []);

    return (
        <section className="main-section home-manifesto-section" aria-labelledby="surreality-manifesto-title">
            <Parallax speed={-20} className="home-manifesto-bg" aria-hidden="true">
                {manifestoBgImages.map((src, index) => (
                    <div
                        key={src}
                        className={`home-manifesto-bg__image${index === activeImageIndex ? ' is-active' : ''}`}
                        style={{ backgroundImage: `url(${src})` }}
                    />
                ))}
            </Parallax>
            <div className="home-manifesto-overlay" />

            <div className="home-manifesto-content">
                <Parallax speed={-5} className="home-manifesto-copy">
                    <h2 id="surreality-manifesto-title" className="home-manifesto-title">
                        {copy.title}
                    </h2>
                    <div className="home-manifesto-body">
                        {copy.paragraphs.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </div>
                </Parallax>

                <Parallax speed={-3} className="home-manifesto-quote-wrap">
                    <figure className="home-manifesto-quote">
                        <div className="home-manifesto-quote-mark" aria-hidden="true">
                            “
                        </div>
                        <blockquote>{copy.quote}</blockquote>
                        <figcaption>{copy.author}</figcaption>
                    </figure>
                </Parallax>
            </div>
        </section>
    );
}

export default function Home({ lang }) {
    return (
        <>
            <section className="main-section fullpage-clamp">
                <ParallaxSection
                    lang={lang}
                    videoSrc={heroVideoUrl}
                    title="SURREALITY 2.0"
                    subtitle="See you in Hong Kong & Guangzhou, 2026"
                    isParallax={false}
                    showCta={false}
                    showScrollHint={false}
                    contentPlacement="corner"
                />
            </section>

            <ManifestoSection lang={lang} />
        </>
    );
}
