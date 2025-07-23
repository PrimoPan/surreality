// SpeechSectionArtist.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './SpeechSectionArtist.module.css';

const speechTextArtist = {
    en: [
        `“The Surreality experience was nothing short of magical—my mind was transported into the very worlds I had only ever imagined.”`,
        `“I was moved to tears watching my silk-like creatures drift and dance around me, as if my own creations had truly come alive.”`,
        `“This exhibition proves that only through equal collaboration—between institutions like this one, our home universities, and communities—can we forge new systems and reshape everything.”`,
    ],
    'zh-Hant': [
        `「幻實之境的體驗宛如魔幻──我的思緒被帶入從未觸及的幻想世界。」`,
        `「看著我以絲質般輕盈創作的生物漂浮、舞動，彷彿自身的想像成為現實，讓我動容落淚。」`,
        `「此展證明，唯有在平等協作──大學、社群與藝術家攜手──方能構築新系統，改寫一切可能。」`,
    ],
    'zh-Hans': [
        `“幻实之境的体验宛如魔幻——我的思绪被带入从未触及的幻想世界。”`,
        `“看着我那些丝绸般轻盈的生物漂浮、舞动，仿佛想象真正成为了现实，我感动得热泪盈眶。”`,
        `“这个展览证明，唯有在平等协作下——大学、社区与艺术家共同努力——我们才能建立新的体系，改写一切可能。”`,
    ],
};

const artistTitle = {
    en: 'Filmmaker · AI Innovator · Creative Technologist',
    'zh-Hant': '電影製片人 · AI 創新者 · 創意技術專家',
    'zh-Hans': '电影制片人 · AI 创新者 · 创意技术专家',
};

const subtitleMap = {
    'zh-Hant': '藝術家說',
    'zh-Hans': '艺术家说',
};

const mobileTextArtist = {
    en: `Violeta Ayala, a filmmaker, AI innovator, and creative technologist, stated: "The Surreality experience was nothing less than magical—my mind was transported into the very worlds I had only ever imagined. I was moved to tears while watching my silk-like creatures drift and dance around me, as if my own creations had truly come to life."`,
    'zh-Hant': `Violeta Ayala，一位電影製片人、AI 創新者和創意技術專家，表示：「幻實之境的體驗絕非平凡──我的思緒被帶進我從未想象過的世界。在觀看那些如絲般輕盈的生物在我眼前漂浮、舞動時，我感動得熱淚盈眶，彷彿自己的創作真正被賦予了生命。」`,
    'zh-Hans': `Violeta Ayala，一位电影制片人、AI 创新者和创意技术专家，表示：“幻实之境的体验绝非平凡——我的思绪被带进我从未想象过的世界。在观看那些如丝般轻盈的生物在我眼前漂浮、舞动时，我感动得热泪盈眶，仿佛自己的创作真正被赋予了生命。”`,
};

export default function SpeechSectionArtist({ lang }) {
    const lines = speechTextArtist[lang] || speechTextArtist.en;
    const title = artistTitle[lang] || artistTitle.en;
    const subtitle = subtitleMap[lang] || subtitleMap['zh-Hant'];

    const desktopBgUrl =
        'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/artist.jpg';
    const mobileBgUrl =
        'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/mobile/%E8%89%BA%E6%9C%AF%E5%AE%B6.png';

    const [isMobile, setIsMobile] = useState(
        typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
    );
    const [bgUrl, setBgUrl] = useState(() =>
        typeof window !== 'undefined' &&
        window.matchMedia('(max-width: 768px) and (orientation: portrait)').matches
            ? mobileBgUrl
            : desktopBgUrl
    );

    useEffect(() => {
        const widthMql = window.matchMedia('(max-width: 768px)');
        const orientMql = window.matchMedia('(max-width: 768px) and (orientation: portrait)');

        const updateMobile = (e) => setIsMobile(e.matches);
        const updateBg = (e) => setBgUrl(e.matches ? mobileBgUrl : desktopBgUrl);

        updateMobile(widthMql);
        updateBg(orientMql);

        widthMql.addEventListener('change', updateMobile);
        orientMql.addEventListener('change', updateBg);
        return () => {
            widthMql.removeEventListener('change', updateMobile);
            orientMql.removeEventListener('change', updateBg);
        };
    }, [desktopBgUrl, mobileBgUrl]);

    return (
        <section
            className={`hero-section ${styles.speechSectionArtist}`}
            style={{
                backgroundImage: `url(${bgUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* 标题 */}
            <div className={styles.sectionTitleArtist}>
                <h2>Artist’s Voice</h2>
                <h3>{subtitle}</h3>
            </div>

            {/* 发言气泡 */}
            <motion.div
                className={styles.speechBubbleArtist}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className={styles.bubbleContentArtist}>
                    {isMobile ? (
                        <p>{mobileTextArtist[lang] || mobileTextArtist.en}</p>
                    ) : (
                        <>
                            <div className={styles.artistInfo}>
                                <h4>Violeta Ayala</h4>
                                <p>{title}</p>
                            </div>
                            {lines.map((line, i) => (
                                <p key={i}>{line}</p>
                            ))}
                        </>
                    )}
                </div>
            </motion.div>
        </section>
    );
}
