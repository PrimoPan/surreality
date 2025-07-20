import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './SpeechSectionNi.module.css';

const speechTextNi = {
    en: [
        `HKUST (GZ) President Lionel M. Ni shares his vision: The Surreality Exhibition brings a dreamlike fusion of AI-assisted creation, XR technology, and immersive digital art to our campus.`,
        `Before the opening, journalists explored four mixed-reality zones and a virtual-reality corner, experiencing everything from underwater worlds of swimming fish to giant floating orchids and fantastical sky-borne structures—truly a living laboratory, as President Ni calls HKUST Guangzhou.`,
        `He adds: “This is not merely a technical breakthrough, but a revolution in artistic expression—when technology meets art, imagination knows no bounds.”`,
    ],
    'zh-Hant': [
        `倪明選校長分享願景：「幻實之境」藝術展以AI輔助創作、XR技術和沉浸式數字藝術，為校園帶來如夢似幻的體驗。`,
        `開幕前，媒體記者走訪四大混合現實展區和一處虛擬現實角落，從室內魚群游動的海底世界，到室外懸浮的巨型蘭花與奇幻空中建築，真如校長所言——港科廣是一座「活的實驗室」。`,
        `他指出：「這不只是技術的突破，更是藝術表達的革命——當科技遇見藝術，想像力將被無限拓展。」`,
    ],
    'zh-Hans': [
        `倪明选校长分享愿景：“幻实之境”艺术展以AI辅助创作、XR技术和沉浸式数字艺术，为校园带来如梦似幻的体验。`,
        `开幕前，媒体记者走访四大混合现实展区和一处虚拟现实角落，从室内鱼群游动的海底世界，到室外悬浮的巨型兰花与奇幻空中建筑，正如校长所言——港科广是一座“活的实验室”。`,
        `他说：“这不仅是技术的突破，更是艺术表达方式的革命——当科技遇见艺术，想象力的边界将被无限拓展。”`,
    ],
};

const subtitleMap = {
    'zh-Hant': '願景洞見',
    'zh-Hans': '愿景洞见',
};

export default function SpeechSectionNi({ lang }) {
    const lines = speechTextNi[lang] || speechTextNi.en;
    const subtitle = subtitleMap[lang] || subtitleMap['zh-Hant'];

    const desktopBgUrl =
        'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/Ni.jpg';
    const mobileBgUrl =
        'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/mobile/%E6%A0%A1%E9%95%BF.png';

    const [bgUrl, setBgUrl] = useState(
        typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
            ? mobileBgUrl
            : desktopBgUrl
    );

    useEffect(() => {
        const mql = window.matchMedia('(max-width: 768px) and (orientation: portrait)');
        const updateBg = (e) => {
            setBgUrl(e.matches ? mobileBgUrl : desktopBgUrl);
        };
        // initial
        updateBg(mql);
        mql.addEventListener('change', updateBg);
        return () => mql.removeEventListener('change', updateBg);
    }, []);

    return (
        <section
            className={`hero-section ${styles.speechSectionNi}`}
            style={{
                backgroundImage: `url(${bgUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* 大標題 */}
            <div className={styles.sectionTitleNi}>
                <h2>Visionary Insight</h2>
                <h3>{subtitle}</h3>
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
                    {lines.map((line, idx) => (
                        <p key={idx}>{line}</p>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
