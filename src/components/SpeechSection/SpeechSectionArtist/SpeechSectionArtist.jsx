import React from 'react';
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

export default function SpeechSectionArtist({ lang }) {
    const lines = speechTextArtist[lang] || speechTextArtist.en;
    const title = artistTitle[lang] || artistTitle.en;
    const subtitle = subtitleMap[lang] || subtitleMap['zh-Hant'];

    return (
        <section
            className={`hero-section ${styles.speechSectionArtist}`}
            style={{
                backgroundImage:
                    'url(https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/artist.jpg)',
            }}
        >
            {/* 多语言标题 */}
            <div className={styles.sectionTitleArtist}>
                <h2>Artist’s Voice</h2>
                <h3>{subtitle}</h3>
            </div>

            {/* 云朵状气泡 */}
            <motion.div
                className={styles.speechBubbleArtist}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className={styles.bubbleContentArtist}>
                    {/* 艺术家信息 */}
                    <div className="artistInfo">
                        <h4>Violeta Ayala</h4>
                        <p>{title}</p>
                    </div>

                    {/* 发言内容 */}
                    {lines.map((line, i) => (
                        <p key={i}>{line}</p>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
