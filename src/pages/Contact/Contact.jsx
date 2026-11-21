// src/pages/Contact/Contact.jsx
import React from 'react';
import { useMatch } from 'react-router-dom';
import './Contact.css';

export default function Contact({ lang = 'en' }) {
    /* —— 1. 多语言文案 —— */
    const texts = {
        en: {
            header: 'Contact',
            locationLabel: 'Location:',
            officeLabel: 'Exhibition team office',
            venueLabel: 'Central exhibition venue',
            venueAddress: 'AIA Vitality Park, 33 Man Kwong Street, Central, Hong Kong, beside the Hong Kong Observation Wheel',
            addressLines: [
                'HKUST (Guangzhou)',
                'No. 1 Duxue Road, Dongchong Town, Nansha District',
                'Guangzhou, Guangdong, China',
            ],
            emailLabel: 'Email:',
            websiteLabel: 'Website:',
        },
        'zh-Hans': {
            header: '联系我们',
            locationLabel: '位置：',
            officeLabel: '展览团队办公室',
            venueLabel: '中环展场',
            venueAddress: '香港中环民光街33号 AIA Vitality 公园，香港摩天轮旁',
            addressLines: [
                '香港科技大学（广州）',
                '广东省广州市南沙区东涌镇笃学路 1 号',
            ],
            emailLabel: '邮箱：',
            websiteLabel: '官方网站：',
        },
        'zh-Hant': {
            header: '聯絡我們',
            locationLabel: '位置：',
            officeLabel: '展覽團隊辦公室',
            venueLabel: '中環展場',
            venueAddress: '香港中環民光街33號 AIA Vitality 公園，香港摩天輪旁',
            addressLines: [
                '香港科技大學（廣州）',
                '中華人民共和國廣東省廣州市南沙區東涌鎮篤學路 1 號',
            ],
            emailLabel: '郵箱：',
            websiteLabel: '官方網站：',
        },
    };
    const isCurrent = useMatch('/contact');
    const isArchive = !isCurrent;
    const { header, locationLabel, officeLabel, venueLabel, venueAddress, addressLines, emailLabel, websiteLabel } =
        texts[lang] || texts.en;
    const labWebsite = 'https://mc2-lab.space/';

    /* —— 2. OpenStreetMap iframe URL —— */
    const lat = isArchive ? 22.887358 : 22.2853;
    const lon = isArchive ? 113.4822253 : 114.1617;
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

                    {!isArchive && (
                        <div className="contact-block">
                            <h3>{venueLabel}</h3>
                            <p>{venueAddress}</p>
                        </div>
                    )}

                    <div className="contact-block">
                        <h3>{isArchive ? locationLabel : officeLabel}</h3>
                        {addressLines.map((l) => (
                            <p key={l}>{l}</p>
                        ))}
                    </div>

                    <div className="contact-block">
                        <h3>{emailLabel}</h3>
                        <a href="mailto:mc2@hkust-gz.edu.cn">mc2@hkust-gz.edu.cn</a>
                    </div>

                    <div className="contact-block">
                        <h3>{websiteLabel}</h3>
                        <a href={labWebsite} target="_blank" rel="noopener noreferrer">
                            {labWebsite}
                        </a>
                    </div>
                </div>

                {/* —— 地图 —— */}
                <div className="contact-map">
                    <iframe
                        title={isArchive ? "HKUST(GZ) Map" : venueLabel}
                        src={osmSrc}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </section>
    );
}
