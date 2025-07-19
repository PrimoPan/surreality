// src/pages/Contact/Contact.jsx
import React from 'react';
import './Contact.css';            // ★ 新增

export default function Contact({ lang = 'en' }) {
    /* —— 1. 多语言文案 —— */
    const texts = {
        en: {
            header: 'Contact',
            locationLabel: 'Location:',
            addressLines: [
                'HKUST (Guangzhou)',
                'No. 1 Duxue Road, Dongchong Town, Nansha District',
                'Guangzhou, Guangdong, China',
            ],
            emailLabel: 'Email:',
        },
        'zh-Hans': {
            header: '联系我们',
            locationLabel: '位置：',
            addressLines: [
                '香港科技大学（广州）',
                '广东省广州市南沙区东涌镇笃学路 1 号',
            ],
            emailLabel: '邮箱：',
        },
        'zh-Hant': {
            header: '聯絡我們',
            locationLabel: '位置：',
            addressLines: [
                '香港科技大學（廣州）',
                '中華人民共和國廣東省廣州市南沙區東涌鎮篤學路 1 號',
            ],
            emailLabel: '郵箱：',
        },
    };
    const { header, locationLabel, addressLines, emailLabel } =
    texts[lang] || texts.en;

    /* —— 2. OpenStreetMap iframe URL —— */
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

    /* —— 3. 结构 —— */
    return (
        <section className="main-section contact-section">
            {/* logo 可选，若想隐藏可删 */}
            <img
                className="contact-logo"
                src="https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/MC2.png"
                alt="MC2 Lab"
            />

            <div className="contact-wrapper">
                {/* —— 联系信息卡 —— */}
                <div className="contact-card">
                    <h2 className="contact-title">{header}</h2>

                    <div className="contact-block">
                        <h3>{locationLabel}</h3>
                        {addressLines.map((l) => (
                            <p key={l}>{l}</p>
                        ))}
                    </div>

                    <div className="contact-block">
                        <h3>{emailLabel}</h3>
                        <a href="mailto:mc2@hkust-gz.edu.cn">mc2@hkust-gz.edu.cn</a>
                    </div>
                </div>

                {/* —— 地图 —— */}
                <div className="contact-map">
                    <iframe
                        title="HKUST(GZ) Map"
                        src={osmSrc}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </section>
    );
}
