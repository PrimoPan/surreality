// src/components/SpeechSectionArtist.jsx
import React from 'react';
import { motion } from 'framer-motion';
import styles from './SpeechSectionArtist.module.css';

const speechTextArtist = {
    en: [
        `“The Surreality experience was nothing short of magical—my mind was transported into the very worlds I had only ever imagined.”`,
        `“I was moved to tears watching my silk-like creatures drift and dance around me, as if my own creations had truly come alive.”`,
        `“This exhibition proves that only through equal collaboration—between institutions like this one, our home universities, and communities—can we forge new systems and reshape everything.”`,
    ],
    zh: [
        `「幻實之境的體驗宛如魔幻──我的思緒被帶入從未觸及的幻想世界。」`,
        `「看著我以絲質般輕盈創作的生物漂浮、舞動，彷彿自身的想像成為現實，讓我動容落淚。」`,
        `「此展證明，唯有在平等協作──大學、社群與藝術家攜手──方能構築新系統，改寫一切可能。」`,
    ],
};

export default function SpeechSectionArtist({ lang }) {
    return (
        <section
            className={`hero-section ${styles.speechSectionArtist}`}
            style={{ backgroundImage: `url(https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/artist.jpg)` }}
        >
            {/* 标题 */}
            <div className={styles.sectionTitleArtist}>
                <h2>Artist’s Voice</h2>
                <h3>藝術家說</h3>
            </div>

            {/* 底部中央云朵状气泡 */}
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
                        <p>
                            {lang === 'zh'
                                ? '電影製片人 · AI 創新者 · 創意技術專家'
                                : 'Filmmaker · AI Innovator · Creative Technologist'}
                        </p>
                    </div>
                    {/* 发言文本 */}
                    {speechTextArtist[lang].map((line, i) => (
                        <p key={i}>{line}</p>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
