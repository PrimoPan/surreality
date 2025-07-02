import React from 'react';
import { motion } from 'framer-motion';
import styles from './SpeechSectionNi.module.css';

const speechTextNi = {
    en: [
        `President Lionel M. Ni shares his vision: The Surreality Exhibition brings a dreamlike fusion of AI-assisted creation, XR technology, and immersive digital art to our campus.`,
        `Before the opening, journalists explored four mixed-reality zones and a virtual-reality corner, experiencing everything from underwater worlds of swimming fish to giant floating orchids and fantastical sky-borne structures—truly a living laboratory, as President Ni calls HKUST Guangzhou.`,
        `He adds: “This is not merely a technical breakthrough, but a revolution in artistic expression—when technology meets art, imagination knows no bounds.”`,
    ],
    zh: [
        `倪明選校長分享願景：「幻實之境」藝術展以AI輔助創作、XR技術和沉浸式數字藝術，為校園帶來如夢似幻的體驗。`,
        `開幕前，媒體記者走訪四大混合現實展區和一處虛擬現實角落，從室內魚群游動的海底世界，到室外懸浮的巨型蘭花與奇幻空中建築，真如校長所言——港科廣是一座「活的實驗室」。`,
        `他指出：「這不只是技術的突破，更是藝術表達的革命——當科技遇見藝術，想像力將被無限拓展。」`,
    ],
};

export default function SpeechSectionNi({ lang }) {
    return (
        <section
            className={`hero-section ${styles.speechSectionNi}`}
            style={{ backgroundImage: `url(https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/Ni.jpg)` }}
        >
            {/* 大標題 */}
            <div className={styles.sectionTitleNi}>
                <h2>Visionary Insight</h2>
                <h3>願景洞見</h3>
            </div>

            {/* 演講氣泡（左側） */}
            <motion.div
                className={styles.speechBubbleNi}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className={styles.bubbleContentNi}>
                    {speechTextNi[lang].map((line, idx) => (
                        <p key={idx}>{line}</p>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
