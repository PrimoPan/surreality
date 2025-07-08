import React from 'react';
import { motion } from 'framer-motion';
import styles from './SpeechSectionPanHui.module.css';

const speechTextPanHui = {
    en: [
        `Professor Pan Hui says: After nearly a year of preparation, the "Surreality Exhibition"—a large-scale XR+AI art show—opens brilliantly on June 26th at the HKUST (GZ) campus.`,
        `I want to pay special tribute to my curatorial team: with pioneering courage, you made the “impossible” real. When the media asked, “Large-scale mixed-reality carries enormous technical risk—why do you dare to lead?” my answer stays the same: if you’re investing the time anyway, why not create something truly unique? Our confidence comes from our team’s fearless spirit and from every artist’s extraordinary creativity.`,
        `I’m particularly moved by our international artists’ dedication: some rerouted from South America to Doha only to be forced down in Saudi Arabia by conflict; others missed flights due to train delays and made emergency landings in San Francisco… these epic journeys mirror our own breakthroughs of technical frontiers.`,
        `Heartfelt thanks to HKUST (Guangzhou) and the French Consulate for their unwavering support. Today’s opening is just the beginning—we’ve already received invitations for an international tour. Yet no description compares to the thrill of being there in person—when virtual and reality entwine across 3,000㎡, you will witness the limitless possibilities of art and technology.`,
    ],
    zh: [
        `許彬教授說：籌備近一年的「幻實之境」大型XR+AI藝術展，已於6月26日在港科大（廣州）校園璀璨啟幕。`,
        `特別致敬我的策展團隊：你們以開拓者的勇氣，將「不可能」化為可能。媒體曾問：「大空間擴展現實技術風險極高，為何你們敢為人先？」我的回答始終如一：既然投入相同時間，何不創造獨一無二的價值？這份底氣，源自我們敢想敢做的團隊基因，也源自每位藝術家的非凡創造力。`,
        `尤其感動於國際參展藝術家的執著：有人從南美輾轉抵達多哈，卻因軍事衝突在沙特緊急迫降；有人因列車延誤而錯過航班，最終在舊金山緊急備降……這些跌宕起伏的旅程，正如我們突破技術邊界的寫照。`,
        `衷心感謝港科大（廣州）及法國領事館的鼎力支持。此刻的啟幕僅是開始——我們已收到國際巡展邀約。然而，再多文字描述，也不及親臨現場的震撼：當虛擬與現實在3000㎡空間交織，您將見證藝術科技的無限可能。`,
    ],
};

export default function SpeechSectionPanHui({ lang }) {
    return (
        <section
            className={`hero-section ${styles.speechSection}`}
            style={{ backgroundImage: `url(https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/Panhui.jpg)` }}
        >
            {/* 大標題 */}
            <div className={styles.sectionTitle}>
                <h2>Creator’s Voice</h2>
                <h3>製作人說</h3>
            </div>

            {/* 云朵气泡 */}
            <motion.div
                className={styles.speechBubble}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className={styles.bubbleContent}>
                    {speechTextPanHui[lang].map((line, idx) => (
                        <p key={idx}>{line}</p>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
