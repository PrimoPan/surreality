// src/pages/About/AboutTwo.jsx
import React from 'react';
import ParallaxSection from '../../components/ParallaxSection';
import './AboutTwo.css';

const text = {
    en: {
        heroTitle: 'About SURREALITY',
        heroSubtitle: 'Hong Kong Observation Wheel · Central Harbourfront',
        projectTitle: 'From campus to the harbourfront',
        origin: 'The Center for Metaverse and Computational Creativity (MC²) and the Computational Media and Arts Thrust (CMA) at HKUST (Guangzhou) founded SURREALITY. Professor Pan Hui directs the exhibition.',
        central: 'After exhibitions on the HKUST campuses in Hong Kong and Guangzhou and a stop in Shanghai, the artists turned to the Hong Kong Observation Wheel. In Central, visitors can follow the bow of erhu musician Guogan as his digital figure plays beneath the wheel. A trail of light leads up to dancers inspired by the murals of Dunhuang.',
        source: 'CMA’s Central exhibition announcement (in Chinese)',
        lab: 'MC² Lab',
        thrust: 'Computational Media and Arts',
        teamTitle: 'Central exhibition team',
        specialThanks: 'Special Thanks',
    },
    'zh-Hans': {
        heroTitle: '关于幻实之境',
        heroSubtitle: '香港摩天轮 · 中环海滨',
        projectTitle: '从校园到中环海滨',
        origin: '香港科技大学（广州）元宇宙与计算创意研究中心（MC²）与计算媒体与艺术学域（CMA）共同发起了「幻实之境」，由许彬教授担任展览总监。',
        central: '从香港和广州的两座科大校园，到上海东方明珠，再到中环，艺术家随展场选取不同的城市景物。这一次，二胡演奏家果敢的数字化身在摩天轮下运弓，观众的视线沿着一道弧光向上，追随来自敦煌壁画的飞天。',
        source: '阅读 CMA 中环站展览预告',
        lab: 'MC² 实验室',
        thrust: '计算媒体与艺术学域',
        teamTitle: '中环站展览团队',
        specialThanks: '特别鸣谢',
    },
    'zh-Hant': {
        heroTitle: '關於幻實之境',
        heroSubtitle: '香港摩天輪 · 中環海濱',
        projectTitle: '從校園到中環海濱',
        origin: '香港科技大學（廣州）元宇宙與計算創意研究中心（MC²）與計算媒體與藝術學域（CMA）共同發起「幻實之境」，由許彬教授擔任展覽總監。',
        central: '從香港和廣州的兩個科大校園，到上海東方明珠，再到中環，藝術家隨展場選取不同的城市景物。這一次，二胡演奏家果敢的數碼化身在摩天輪下運弓，觀眾的目光沿着一道弧光向上，追隨來自敦煌壁畫的飛天。',
        source: '閱讀 CMA 中環站展覽預告',
        lab: 'MC² 實驗室',
        thrust: '計算媒體與藝術學域',
        teamTitle: '中環站展覽團隊',
        specialThanks: '特別鳴謝',
    },
};

const centralTeam = [
    {
        role: ['Exhibition Director', '展覽總監', '展览总监'],
        members: [
            { en: 'Pan Hui', hant: '許彬', hans: '许彬', photo: 'pan-hui-mobile.webp', profile: 'https://mc2-lab.space/leader' },
        ],
    },
    {
        role: ['Exhibition Leads', '展覽統籌', '展览统筹'],
        members: [
            { en: 'Shuyue Li', hant: '李姝玥', hans: '李姝玥', photo: 'shuyue-li.webp' },
            { en: 'Hao Li', hant: '李昊', hans: '李昊', photo: 'hao-li.webp' },
        ],
    },
    {
        role: ['Administration, Venue and Project Coordination', '行政、場地與項目協調', '行政、场地与项目协调'],
        members: [
            { en: 'Jingyi Liang', hant: '梁經怡', hans: '梁经怡' },
            { en: 'Yuyang Jiang', hant: '蔣雨洋', hans: '蒋雨洋', photo: 'yuyang-jiang.webp' },
        ],
    },
    {
        role: ['Performance Support', '展演支持', '展演支持'],
        members: [
            { en: 'Chen Zihao Dance Studio', hant: '陳梓豪舞蹈工作室', hans: '陈梓豪舞蹈工作室' },
            { en: 'Tam Wai Yuen', hant: '談偉源', hans: '谈伟源' },
        ],
    },
];

const thanks = [
    {
        en: 'Global Engagement and Communications Office (GECO) @ HKUST',
        'zh-Hans': '环球事务及传讯处（GECO）@ HKUST',
        'zh-Hant': '環球事務及傳訊處（GECO）@ HKUST',
    },
    {
        en: 'Public Affairs Department (PAD) @ HKUST(GZ)',
        'zh-Hans': '公共事务处（PAD）@ HKUST(GZ)',
        'zh-Hant': '公共事務處（PAD）@ HKUST(GZ)',
    },
];

function TeamGroup({ role, members, locale }) {
    const [englishRole, traditionalRole, simplifiedRole] = role;
    const simplified = locale === 'zh-Hans';
    const chineseRole = simplified ? simplifiedRole : traditionalRole;
    const chineseLang = simplified ? 'zh-Hans' : 'zh-Hant';
    const englishFirst = locale === 'en';

    return (
        <div className="central-team__group">
            <h3>
                <span lang={englishFirst ? 'en' : chineseLang}>{englishFirst ? englishRole : chineseRole}</span>
                <small lang={englishFirst ? chineseLang : 'en'}>{englishFirst ? chineseRole : englishRole}</small>
            </h3>
            <ul>
                {members.map(member => {
                    const name = <span className="central-team__name">
                        <strong lang="en">{member.en}</strong>
                        <span lang={chineseLang}>{simplified ? member.hans : member.hant}</span>
                    </span>;
                    return (
                        <li key={member.en}>
                            {member.photo && <img src={'/images/central/' + member.photo} alt=""
                                width="80" height="80" loading="lazy" />}
                            {member.profile ? <a href={member.profile}>{name}</a> : name}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default function AboutTwo({ lang = 'en' }) {
    const locale = ['en', 'zh-Hans', 'zh-Hant'].includes(lang) ? lang : 'en';
    const t = text[locale];

    return (
        <>
            <div className="about-hero-wrapper about-two-hero-wrapper">
                <ParallaxSection
                    lang={locale}
                    image="/images/central/harbour-poster.webp"
                    title={t.heroTitle}
                    subtitle={t.heroSubtitle}
                    showCta={false}
                    scrollHintTargetId="about-two-project"
                    isParallax
                />
            </div>

            <section id="about-two-project" className="about-two-project" aria-labelledby="about-two-project-title">
                <div className="about-two-project-copy">
                    <h2 id="about-two-project-title">{t.projectTitle}</h2>
                    <p>{t.origin}</p>
                    <p>{t.central}</p>
                    <div className="about-two-project-links">
                        <a href="https://mp.weixin.qq.com/s/mXlgRGcAH5YVrY4zH7PXaA">{t.source}</a>
                        <a href="https://mc2-lab.space/">{t.lab}</a>
                        <a href="https://cma.hkust-gz.edu.cn/">{t.thrust}</a>
                    </div>
                </div>
            </section>

            <section className="central-team" id="team" aria-labelledby="central-team-title">
                <div className="central-team__inner">
                    <h2 id="central-team-title">{t.teamTitle}</h2>
                    {centralTeam.map(group => <TeamGroup key={group.role[0]} {...group} locale={locale} />)}

                    <section className="about-two-thanks" aria-labelledby="about-two-thanks-title">
                        <h2 id="about-two-thanks-title">{t.specialThanks}</h2>
                        <div className="about-two-thanks-list">
                            {thanks.map((item) => (
                                <p key={item.en}>{item[locale]}</p>
                            ))}
                        </div>
                    </section>
                </div>
            </section>
        </>
    );
}
