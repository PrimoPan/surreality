import React from 'react';
import './CoreTechSection.css';

// 技術演示圖
const images = [
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/newwebsite/test02.png',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/newwebsite/test03.png',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/newwebsite/test04.png',
];

/* 文案 */
const copy = {
    zh: {
        title: '我們的核心技術：空間計算',
        subtitle: '基於Lidar和全景相機的室內外大空間掃描重建定位系統',
        bullets: [
            '該系統無需全景相機Lidar的<b>標定同步</b>，即插即用，極大簡化了傳統建圖的硬體依賴；',
            '基於預先掃描地圖，提供支援多人協同 SLAM 的<b>公分級高精度定位</b>；',
            '超高清彩色點雲重建，可直接導入 <b>Unity</b>，讓設計師高效對齊虛擬資產與真實世界。',
        ],
    },
    en: {
        title: 'Our Core Technology: Spatial Computing',
        subtitle:
            'Lidar- & panoramic-camera–based large-scale indoor/outdoor scanning, reconstruction & positioning',
        bullets: [
            'Plug-and-play — <b>no calibration</b> or synchronization between camera and Lidar, slashing setup time.',
            'Pre-mapped, <b>centimeter-level</b> multi-user collaborative SLAM for expansive venues.',
            'Ultra-HD color point-clouds stream straight into <b>Unity</b>, aligning digital assets with the physical world in minutes.',
        ],
    },
};

/**
 * CoreTechSection
 * -------------------------------------------------------
 * Props
 *   lang      'en' | 'zh'
 *   videoBg   可選：背景視頻 URL
 */
export default function CoreTechSection({ lang = 'en', videoBg }) {
    const t = copy[lang] || copy.en;
    return (
        <section className="coretech-section">
            {/* 背景視頻（可選） */}
            {videoBg && (
                <video
                    className="coretech-video-bg"
                    src={videoBg}
                    autoPlay
                    muted
                    loop
                    playsInline
                    webkit-playsinline="true"
                />
            )}

            <div className="coretech-inner">
                <h2 className="coretech-title">{t.title}</h2>
                <h3 className="coretech-sub">{t.subtitle}</h3>

                {/* 圖網格 */}
                <div className="coretech-grid">
                    {images.map((src) => (
                        <img key={src} src={src} alt="spatial-tech" loading="lazy" />
                    ))}
                </div>

                <ul className="coretech-list">
                    {t.bullets.map((b, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: b }} />
                    ))}
                </ul>
            </div>
        </section>
    );
}

/* ---------------- CoreTechSection.css ---------------- */