import React from 'react';
import './Info.css';
import VideoSection from '../../components/VideoSection';

// 四张海报链接
const posterLinks = [
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/poster/poster01.jpg',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/poster/poster02.jpg',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/poster/poster03.jpg',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/poster/poster04.jpg',
];

// 中英文文案
const copy = {
    en: {
        heroTitle: 'SURREALITY·幻實之境',
        heroSub: 'World’s First Large-Scale XR AI Art Exhibition',
        period: 'June 28 – August 28, 2025',
        host:
            'Hosted by Hong Kong University of Science and Technology (Guangzhou) and organized by the Center for Metaverse and Computational Creativity (MC²). Selected for the official “Sino-French Spring of Culture 2025” program, proudly supported by the Consulate General of France in Guangzhou and the Institut français.',
        techTitle: 'Featured Technologies',
        techList: [
            'Generative AI & Deep Learning: real-time image generation and evolution.',
            'Large-Scale XR: seamless AR/VR headset integration with spatial interaction.',
            'Spatial Audio & Multimodal Experience: immersive audio, scent, and haptic feedback.',
        ],
        artists:
            'Featuring works by over 50 artists worldwide in digital painting, interactive installations, immersive video, sound art, and generative creation—where technology meets imagination.',
        guideTitle: 'AI Butterfly Guide',
        guideDesc:
            'On-site AI “butterfly” guide supports Chinese, English, and Cantonese—responding to questions on each artwork’s background, technical details, and inspirations in real time.',
        qrTitle: 'Scan to Book Your Visit',
        qrImg:
            'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/WechatIMG1084.jpg',
    },
    zh: {
        heroTitle: 'SURREALITY·幻實之境',
        heroSub: '全球首個大空間擴展現實（XR）人工智能（AI）藝術展',
        period: '2025年6月28日 – 8月28日',
        host:
            '本次展覽由香港科技大學（廣州）主辦，元宇宙與計算創意研究中心（MC²）承辦，並入選2025年「中法文化之春」官方系列活動，獲法國駐廣州總領事館及法國文化中心鼎力支持。',
        techTitle: '展覽技術亮點',
        techList: [
            '生成式 AI 與深度學習：實時生成與演化影像。',
            '大空間擴展現實（XR）：AR/VR 頭顯與空間交互無縫融合。',
            '空間音頻與多模態體驗：沉浸式聲音、氣味與觸覺反饋。',
        ],
        artists:
            '本次展覽匯聚全球逾50位藝術家作品，涵蓋數字繪畫、交互裝置、沉浸式影像、聲音藝術與生成式創作等多樣形式，科技與想像在此交匯，描繪虛實融合新視界。',
        guideTitle: 'AI 蝴蝶導覽員',
        guideDesc:
            '現場 AI 蝴蝶導覽員提供中文、English 及廣東話三語支持，可根據觀眾提問，即時解讀作品創作背景、技術原理與藝術靈感。',
        qrTitle: '掃碼預約參觀',
        qrImg:
            'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/WechatIMG1084.jpg',
    },
};

export default function Info({ lang }) {
    const t = copy[lang] || copy.en;

    return (
        <div className="info-page">
            {/* ---------- 首屏：视频 + 海报 ---------- */}
            <section className="main-section">
                {/* 背景视频 */}
                <VideoSection
                    src="https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/newwebsite/%E7%AC%AC%E4%B8%89%E9%A1%B5.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.4,
                        zIndex: 1,
                    }}
                />

                {/* 海报层 */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 2,
                        padding: '2rem',
                    }}
                >
                    <div className="info-poster">
                        {posterLinks.map((src, i) => (
                            <div key={i} className="poster-item">
                                <img src={src} alt={`poster-${i + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------- 第二屏：正文内容 ---------- */}
            <section className="main-section info-content-section">
                <div className="info-wrapper">
                    <div className="info-container">
                        <p className="info-period">{t.period}</p>
                        <p className="info-host">{t.host}</p>

                        <h3>{t.techTitle}</h3>
                        <ul className="info-list">
                            {t.techList.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>

                        <p className="info-artists">{t.artists}</p>

                        <h3>{t.guideTitle}</h3>
                        <p className="info-guide">{t.guideDesc}</p>

                        <div className="info-qr">
                            <h3>{t.qrTitle}</h3>
                            <img src={t.qrImg} alt="QR Code for booking" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
