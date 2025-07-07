import React, { useEffect, useState } from 'react';
import './Info.css';

/* ---------- 工具：按语言安全取字段 ---------- */
const pick = (item, key, lang) =>
    item?.[`${key}_${lang === 'zh' ? 'cn' : 'en'}`] ?? '';

/* ---------- 4 张通用海报 ---------- */
const posterLinks = [
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/poster/poster01.jpg',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/poster/poster02.jpg',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/poster/poster03.jpg',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/poster/poster04.jpg',
];

/* ---------- 固定 UI 文本 ---------- */
const copy = {
    en: {
        heroTitle: 'SURREALITY·幻實之境',
        heroSub: 'World’s First Large-Scale XR AI Art Exhibition',
        period: 'June 26 – August 26, 2025',
        host:
            'Hosted by Hong Kong University of Science and Technology (Guangzhou) and organized by the Center for Metaverse and Computational Creativity (MC²). Selected for the official “Sino-French Spring of Culture 2025” program, proudly supported by the Consulate General of France in Guangzhou and the Institut français.',
        techTitle: 'Featured Technologies',
        techList: [
            'Generative AI & Deep Learning: real-time image generation and evolution.',
            'Large-Scale XR: seamless AR/VR headset integration with spatial interaction.',
            'Spatial Audio & Multimodal Experience: immersive audio, scent, and haptic feedback.',
        ],
        artists:
            'Featuring works by over 50 artists worldwide in digital painting, interactive installations, immersive video, sound art, and generative creation—where technology meets imagination.',
        guideTitle: 'AI Butterfly Guide',
        guideDesc:
            'On-site AI “butterfly” guide supports Chinese, English, and Cantonese—responding to questions on each artwork’s background, technical details, and inspirations in real time.',
        qrTitle: 'Scan to Book Your Visit',
        qrImg:
            'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/WechatIMG1084.jpg',
        vrCorner: 'VR Corner',
        vrArtistBtn: 'Artist Bio',
        vrClose: 'Close',
    },
    zh: {
        heroTitle: 'SURREALITY·幻實之境',
        heroSub: '全球首個大空間擴展現實（XR）人工智能（AI）藝術展',
        period: '2025 年 6 月 26 日 – 8 月 26 日',
        host:
            '本次展覽由香港科技大學（廣州）主辦，元宇宙與計算創意研究中心（MC²）承辦，並入選 2025 年「中法文化之春」官方系列活動，獲法國駐廣州總領事館及法國文化中心鼎力支持。',
        techTitle: '展覽技術亮點',
        techList: [
            '生成式 AI 與深度學習：實時生成與演化影像。',
            '大空間擴展現實（XR）：AR/VR 頭顯與空間交互無縫融合。',
            '空間音頻與多模態體驗：沉浸式聲音、氣味與觸覺反饋。',
        ],
        artists:
            '本次展覽匯聚全球逾 50 位藝術家作品，涵蓋數字繪畫、交互裝置、沉浸式影像、聲音藝術與生成式創作等多樣形式，科技與想像在此交匯，描繪虛實融合新視界。',
        guideTitle: 'AI 蝴蝶導覽員',
        guideDesc:
            '現場 AI 蝴蝶導覽員提供中文、English 及廣東話三語支持，可根據觀眾提問，即時解讀作品創作背景、技術原理與藝術靈感。',
        qrTitle: '掃碼預約參觀',
        qrImg:
            'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/WechatIMG1084.jpg',
        vrCorner: 'VR 角',
        vrArtistBtn: '藝術家簡介',
        vrClose: '關閉',
    },
};

/* =================================================
   卡片组件
================================================= */
const ArtworkCard = ({ item, lang, onClick }) => {
    const firstAuthor = pick(item, 'artist', lang).split(/[，,]/)[0]?.trim();
    const summary     = pick(item, 'description', lang).split(/[\n。.]/)[0];

    return (
        <div className="vrcard" onClick={() => onClick(item)}>
            <img src={item.poster_url} alt={pick(item, 'title', lang)} />
            <div className="vrcard-body">
                <h3 className="vrcard-title">{pick(item, 'title', lang)}</h3>
                <p  className="vrcard-author">{firstAuthor}</p>
                <button className="vrcard-learn">
                    {lang === 'zh' ? '了解更多' : 'Learn more'}
                </button>
            </div>
        </div>
    );
};

/* —— Modal —— */
/* Modal 内加入作品图 */
const ArtworkModal = ({ item, lang, showBio, onToggleBio, onClose, t }) =>
    !item ? null : (
        <div className="vrcard-modal" onClick={onClose}>
            <div className="vrcard-modal-body" onClick={e => e.stopPropagation()}>
                <img className="vrcard-modal-img" src={item.poster_url} alt={pick(item,'title',lang)} />
                <h2>{pick(item,'title',lang)}</h2>
                <h4>{pick(item,'artist',lang)}</h4>
                <p className="vrcard-desc">
                    {showBio ? pick(item,'artist_bio',lang) : pick(item,'description',lang)}
                </p>
                <div className="vrcard-modal-actions">
                    <button onClick={onToggleBio}>{t.vrArtistBtn}</button>
                    <button onClick={onClose}>{t.vrClose}</button>
                </div>
            </div>
        </div>
    );


/* =================================================
   VR-Corner Section
================================================= */
function VRCornerSection({ lang, t }) {
    const [data, setData]   = useState([]);
    const [selected, setSel] = useState(null);
    const [showBio, setBio]  = useState(false);

    useEffect(() => {
        fetch('/data/artworks.json')
            .then(res => res.json())
            .then(all => setData(all.filter(x => x.id >= 22 && x.id <= 31)))
            .catch(console.error);
    }, []);

    const grid = {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '1.2rem',
        width: '100%',
        maxWidth: '1280px',
        padding: '0 2rem',
        boxSizing: 'border-box',
    };

    const open = it => { setSel(it); setBio(false); };

    return (
        <section className="main-section vrcorner-section">
            <h2 className="vrcorner-title">{t.vrCorner}</h2>

            <div style={grid}>
                {data.map(it => (
                    <ArtworkCard key={it.id} item={it} lang={lang} onClick={open} />
                ))}
            </div>

            <ArtworkModal
                item={selected}
                lang={lang}
                showBio={showBio}
                onToggleBio={() => setBio(b => !b)}
                onClose={() => setSel(null)}
                t={t}
            />
        </section>
    );
}

/* =================================================
   主页面
================================================= */
export default function Info({ lang }) {
    const t = copy[lang] || copy.en;

    return (
        <div className="info-page">
            {/* ===== 首屏：展览信息 ===== */}
            <section className="main-section info-content-section">
                <div className="info-wrapper">
                    <div className="info-container">
                        <h1 className="info-hero-title">{t.heroTitle}</h1>
                        <h2 className="info-hero-sub">{t.heroSub}</h2>

                        <p className="info-period">{t.period}</p>
                        <p className="info-host">{t.host}</p>

                        <h3>{t.techTitle}</h3>
                        <ul className="info-list">
                            {t.techList.map(txt => <li key={txt}>{txt}</li>)}
                        </ul>

                        <p className="info-artists">{t.artists}</p>

                        <h3>{t.guideTitle}</h3>
                        <p className="info-guide">{t.guideDesc}</p>

                        {/* 居中二维码 */}
                        <div className="info-qr">
                            <h3>{t.qrTitle}</h3>
                            <img src={t.qrImg} alt="QR" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== 第二屏：四张海报 ===== */}
            <section className="main-section info-poster-full">
                <div className="info-poster">
                    {posterLinks.map((src, i) => (
                        <div key={i} className="poster-item">
                            <img src={src} alt={`poster-${i + 1}`} />
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== 第三屏：VR Corner ===== */}
            <VRCornerSection lang={lang} t={t} />
        </div>
    );
}
