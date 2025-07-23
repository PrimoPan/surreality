// SpeechSectionPanHui.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './SpeechSectionPanHui.module.css';

const speechTextPanHui = {
    en: [
        `Professor Pan Hui says: After nearly a year of preparation, the "Surreality Exhibition"—a large‐scale XR+AI art show—opens brilliantly on June 26th at the HKUST (GZ) campus.`,
        `I want to pay special tribute to my curatorial team: with pioneering courage, you made the “impossible” real. When the media asked, “Large‐scale mixed‐reality carries enormous technical risk—why do you dare to lead?” my answer stays the same: if you’re investing the time anyway, why not create something truly unique? Our confidence comes from our team’s fearless spirit and from every artist’s extraordinary creativity.`,
        `I’m particularly moved by our international artists’ dedication: some rerouted from South America to Doha only to be forced down in Saudi Arabia by conflict; others missed flights due to train delays and made emergency landings in San Francisco… these epic journeys mirror our own breakthroughs of technical frontiers.`,
        `Heartfelt thanks to HKUST (Guangzhou) and the French Consulate for their unwavering support. Today’s opening is just the beginning—we’ve already received invitations for an international tour. Yet no description compares to the thrill of being there in person—when virtual and reality entwine across 3,000㎡, you will witness the limitless possibilities of art and technology.`,
    ],
    'zh-Hant': [
        `許彬教授說：籌備近一年的「幻實之境」大型 XR+AI 藝術展，已於 6 月 26 日在港科大（廣州）校園璀璨啟幕。`,
        `特別致敬我的策展團隊：你們以開拓者的勇氣，將「不可能」化為可能。媒體曾問：「大空間混合現實技術風險極高，為何你們敢為人先？」我的回答始終如一：既然已投入時間，何不創造真正獨特的作品？我們的信心源於團隊無畏的精神，也源於每位藝術家的卓越創造力。`,
        `尤其感動於國際參展藝術家的執著：有人從南美輾轉抵達多哈，卻因軍事衝突在沙特緊急迫降；有人因列車延誤錯過航班，最終在舊金山緊急備降……這些跌宕起伏的旅程，正如我們突破技術邊界的寫照。`,
        `衷心感謝港科大（廣州）及法國領事館的鼎力支持。此刻的啟幕僅是開始——我們已收到國際巡展邀約。然而，再多文字描述，也不及親臨現場的震撼：當虛擬與現實在 3000㎡ 空間交織，您將見證藝術科技的無限可能。`,
    ],
    'zh-Hans': [
        `许彬教授说：筹备近一年的“幻实之境”大型 XR+AI 艺术展，已于 6 月 26 日在港科大（广州）校园璀璨启幕。`,
        `特别致敬我的策展团队：你们以开拓者的勇气，将“不可能”化为可能。媒体曾问：“大空间混合现实技术风险极高，为什么你们敢为人先？”我的回答始终如一：既然已投入时间，为什么不创造真正独特的作品？我们的信心源自团队无畏的精神，也源自每位艺术家的卓越创造力。`,
        `尤其感动于国际参展艺术家的执着：有人从南美辗转抵达多哈，却因军事冲突在沙特紧急迫降；有人因列车延误错过航班，最终在旧金山紧急备降……这些跌宕起伏的旅程，正如我们突破技术边界的写照。`,
        `衷心感谢港科大（广州）及法国领事馆的鼎力支持。此刻的启幕仅是开始——我们已收到国际巡展邀约。然而，再多文字描述，也不及亲临现场的震撼：当虚拟与现实在 3000㎡ 空间交织，您将见证艺术科技的无限可能。`,
    ],
};

const mobileTextPanHui = {
    en: `Professor Pan Hui said: "When the media asked, “Large‐scale mixed‐reality carries enormous technical risk—why do you dare to lead?” my answer stays the same: if you’re investing the time anyway, why not create something truly unique? Our confidence comes from our team’s fearless spirit and from every artist’s extraordinary creativity."`,
    'zh-Hant': `許彬教授說：「當媒體提問：『大空間混合現實技術風險極高，為何你們敢為人先？』我的回答始終如一：既然已投入時間，何不創造真正獨特的作品？我們的信心源於團隊無畏的精神，也源於每位藝術家的卓越創造力。」`,
    'zh-Hans': `许彬教授说：“当媒体提问：‘大空间混合现实技术风险极高，为什么你们敢为人先？’我的回答始终如一：既然已投入时间，为什么不创造真正独特的作品？我们的信心源自团队无畏的精神，也源自每位艺术家的卓越创造力。”`,
};

const subtitleMap = {
    'zh-Hant': '制作人说',
    'zh-Hans': '制作人说',
};

export default function SpeechSectionPanHui({ lang }) {
    const lines = speechTextPanHui[lang] || speechTextPanHui.en;
    const subtitle = subtitleMap[lang] || subtitleMap['zh-Hant'];

    const desktopBgUrl =
        'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/Panhui.jpg';
    const mobileBgUrl =
        'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/mobile/Ben.png';

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
            className={`hero-section ${styles.speechSection}`}
            style={{
                backgroundImage: `url(${bgUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className={styles.sectionTitle}>
                <h2>Creator’s Voice</h2>
                <h3>{subtitle}</h3>
            </div>

            <motion.div
                className={styles.speechBubble}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className={styles.bubbleContent}>
                    {isMobile ? (
                        <p>{mobileTextPanHui[lang] || mobileTextPanHui.en}</p>
                    ) : (
                        lines.map((line, idx) => <p key={idx}>{line}</p>)
                    )}
                </div>
            </motion.div>
        </section>
    );
}
