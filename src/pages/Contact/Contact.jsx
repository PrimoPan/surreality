// src/pages/Contact/Contact.jsx
import React from 'react';

export default function Contact({ lang = 'en' }) {
    /* —— 1. 多语言文案映射 —— */
    const texts = {
        en: {
            header: 'Contact',
            locationLabel: 'Location:',
            addressLines: [
                'HKUST (Guangzhou)',
                'No. 1 Duxue Road, Dongchong Town, Nansha District',
                'Guangzhou, Guangdong, China',
            ],
            emailLabel: 'Email:',
        },
        'zh-Hans': {
            header: '联系我们',
            locationLabel: '位置：',
            addressLines: [
                '香港科技大学（广州）',
                '广东省广州市南沙区东涌镇笃学路1号',
            ],
            emailLabel: '邮箱：',
        },
        'zh-Hant': {
            header: '聯絡我們',
            locationLabel: '位置：',
            addressLines: [
                '香港科技大學（廣州）',
                '中華人民共和國廣東省廣州市南沙區東涌鎮篤學路1號',
            ],
            emailLabel: '郵箱：',
        },
    };
    // 安全回退
    const { header, locationLabel, addressLines, emailLabel } = texts[lang] || texts.en;

    /* —— 2. 地图逻辑保持不变 —— */
    const lat = 22.887358;
    const lon = 113.4822253;
    const bbox = [
        (lon - 0.01).toFixed(4),
        (lat - 0.01).toFixed(4),
        (lon + 0.01).toFixed(4),
        (lat + 0.01).toFixed(4),
    ].join(',');
    const osmSrc =
        `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}` +
        `&marker=${lat}%2C${lon}&layer=mapnik`;

    return (
        <section
            className="main-section"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 1.25rem',
            }}
        >
            <img
                src="https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/MC2.png"
                alt="MC2 Lab"
            />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '2rem',
                    maxWidth: 1080,
                    width: '100%',
                }}
            >
                {/* —— 联系信息 —— */}
                <div
                    style={{
                        flex: '1 1 380px',
                        minWidth: 320,
                        padding: '3rem 2.4rem',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: 16,
                        backdropFilter: 'blur(6px)',
                        color: '#fff',
                        lineHeight: 1.85,
                        fontSize: '1.05rem',
                    }}
                >
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.4rem' }}>
                        {header}
                    </h2>

                    <p style={{ marginBottom: '1.2rem' }}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 500 }}>
                            {locationLabel}
                        </h2>
                        <br />
                        {addressLines.map((line) => (
                            <React.Fragment key={line}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))}
                    </p>

                    <p>
                        <strong>{emailLabel}&nbsp;</strong>
                        <a
                            href="mailto:mc2@hkust-gz.edu.cn"
                            style={{ color: '#00e0ff', textDecoration: 'underline' }}
                        >
                            mc2@hkust-gz.edu.cn
                        </a>
                    </p>
                </div>

                {/* —— 地图 —— */}
                <div
                    style={{
                        flex: '1 1 380px',
                        minWidth: 320,
                        borderRadius: 16,
                        overflow: 'hidden',
                        border: '1px solid rgba(255,255,255,0.12)',
                    }}
                >
                    <iframe
                        title="HKUST(GZ) Map"
                        width="100%"
                        height="400"
                        frameBorder="0"
                        scrolling="no"
                        src={osmSrc}
                        style={{ display: 'block' }}
                    />
                </div>
            </div>
        </section>
    );
}