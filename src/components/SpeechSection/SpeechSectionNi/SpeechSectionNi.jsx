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
        `港科大（廣州）校長倪明選分享願景：「『幻實之境』藝術展將 AI 輔助創作、XR 技術與沉浸式數字藝術如夢似幻地引入校園。」`,
        `開幕前，媒體記者走訪了四大混合現實展區和一處虛擬現實區域，從室內游動的魚群海底世界，到戶外漂浮的巨型蘭花與奇幻的空中建築，正如校長所言——港科廣就是一座「活的實驗室」。`,
        `他補充道：「這不僅是技術層面的突破，更是藝術表達方式的革命——當科技遇見藝術，想像力便無限延展。」`,
    ],
    'zh-Hans': [
        `港科大（广州）校长倪明选分享愿景：“‘幻实之境’艺术展将 AI 辅助创作、XR 技术与沉浸式数字艺术如梦似幻地带入校园。”`,
        `开幕前，媒体记者走访了四大混合现实展区和一个虚拟现实区域，从室内游动的鱼群海底世界，到户外漂浮的巨型兰花与奇幻的空中建筑，正如校长所言——港科广就是一座“活的实验室”。`,
        `他补充道：“这不仅是技术层面的突破，更是艺术表达方式的革命——当科技遇见艺术，想象力便无限延展。”`,
    ],
};

const mobileTextNi = {
    en: `HKUST (GZ) President Lionel M. Ni shares his vision: "The Surreality Exhibition brings a dreamlike fusion of AI-assisted creation, XR technology, and immersive digital art to our campus. This is not merely a technical breakthrough, but a revolution in artistic expression—when technology meets art, imagination knows no bounds."`,
    'zh-Hant': `港科大（廣州）校長倪明選分享願景：「『幻實之境』藝術展將 AI 輔助創作、XR 技術與沉浸式數字藝術如夢似幻地引入校園。這不僅是技術層面的突破，更是藝術表達方式的革命——當科技遇見藝術，想像力便無限延展。」`,
    'zh-Hans': `港科大（广州）校长倪明选分享愿景：“‘幻实之境’艺术展将 AI 辅助创作、XR 技术与沉浸式数字艺术如梦似幻地带入校园。这不仅是技术层面的突破，更是艺术表达方式的革命——当科技遇见艺术，想象力便无限延展。”`,
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

    const [isMobile, setIsMobile] = useState(
        typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
    );
    const [bgUrl, setBgUrl] = useState(
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

        // 初始
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

            {/* 演講氣泡 */}
            <motion.div
                className={styles.speechBubbleNi}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className={styles.bubbleContentNi}>
                    {isMobile ? (
                        <p>{mobileTextNi[lang] || mobileTextNi.en}</p>
                    ) : (
                        lines.map((line, idx) => <p key={idx}>{line}</p>)
                    )}
                </div>
            </motion.div>
        </section>
    );
}
