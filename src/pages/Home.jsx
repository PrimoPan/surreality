import React from 'react';
import ParallaxSection from '../components/ParallaxSection';

const heroVideoUrl =
    'https://surreality-1419044809.cos.ap-hongkong.myqcloud.com/video/surreality-QxMgBRgVHrY-1080p.mp4';

export default function Home({ lang }) {
    return (
        <section className="main-section fullpage-clamp">
            <ParallaxSection
                lang={lang}
                videoSrc={heroVideoUrl}
                title="SURREALITY 2.0"
                subtitle="See you in 2026"
                isParallax={false}
                showCta={false}
                showScrollHint={false}
                contentPlacement="corner"
            />
        </section>
    );
}
