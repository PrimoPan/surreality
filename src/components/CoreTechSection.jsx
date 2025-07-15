import React from 'react';
import './CoreTechSection.css';

// 技术演示图
const images = [
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/newwebsite/test02.png',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/newwebsite/test03.png',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/newwebsite/test04.png',
];

/* 文案：繁体、简体、英文 */
const copy = {
    'zh-Hant': {
        title: '我們的核心技術：空間計算',
        subtitle: '基於 Lidar & 全景相機 的大空間掃描、重建與定位系統',
        bullets: [
            '即插即用 — <b>無需標定同步</b>，簡化硬件依賴；',
            '預掃描地圖支援多用戶協同 SLAM，達到 <b>公分級定位</b>；',
            '超高清彩色點雲可直入 <b>Unity</b>，快速對齊虛實資產。',
        ],
    },
    'zh-Hans': {
        title: '我们的核心技术：空间计算',
        subtitle: '基于 Lidar 与全景相机的大空间扫描、重建与定位系统',
        bullets: [
            '即插即用 — <b>无需标定同步</b>，简化硬件依赖；',
            '预扫描地图支持多用户协同 SLAM，实现 <b>厘米级定位</b>；',
            '超高清彩色点云可直接导入 <b>Unity</b>，快速对齐虚实资产。',
        ],
    },
    en: {
        title: 'Core Technology: Spatial Computing',
        subtitle: 'Lidar & panoramic-camera–based large-scale scanning, reconstruction & positioning',
        bullets: [
            'Plug-and-play — <b>no calibration</b> or sync required;',
            'Pre-mapped, <b>centimeter-level</b> multi-user collaborative SLAM;',
            'Ultra-HD color point-clouds stream into <b>Unity</b> in minutes.',
        ],
    },
};

export default function CoreTechSection({ lang = 'en', videoBg }) {
    const t = copy[lang] || copy.en;

    return (
        <section className="coretech-section">
            {videoBg && (
                <video
                    className="coretech-video-bg"
                    src={videoBg}
                    autoPlay
                    muted
                    loop
                    playsInline
                />
            )}

            <div className="coretech-container">
                <header className="coretech-header">
                    <h2>{t.title}</h2>
                    <h3>{t.subtitle}</h3>
                </header>

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
