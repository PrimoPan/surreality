// Info.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Info/Info.css';
import { ChevronDown, Search, X } from 'lucide-react';
import { Converter } from 'opencc-js';
import { t as pickText } from '../../components/i18n';

const toSimplified = Converter({ from: 'tw', to: 'cn' });
const searchTokenPattern = /[\p{L}\p{N}]+/gu;

// 三语字段选择器
const pick = (obj, key, lang) => pickText(obj || {}, key, lang);

const normalizeSearchText = (value) =>
    toSimplified(String(value || ''))
        .normalize('NFKC')
        .toLowerCase()
        .replace(/[^\p{L}\p{N}]+/gu, '');

const getSearchTokens = (value) =>
    Array.from(toSimplified(String(value || '')).normalize('NFKC').toLowerCase().matchAll(searchTokenPattern))
        .map(match => normalizeSearchText(match[0]))
        .filter(Boolean);

const isTightSubsequence = (needle, haystack) => {
    if (!needle) return true;
    for (let start = 0; start < haystack.length; start += 1) {
        if (haystack[start] !== needle[0]) continue;
        let queryIndex = 1;
        let end = start;
        while (end + 1 < haystack.length && queryIndex < needle.length) {
            end += 1;
            if (haystack[end] === needle[queryIndex]) queryIndex += 1;
        }
        if (queryIndex === needle.length && end - start + 1 <= needle.length + 3) {
            return true;
        }
    }
    return false;
};

const buildSearchFields = (item, lang) => [
    { value: pick(item, 'title', lang), weight: 1, fuzzy: true },
    { value: item.title_en, weight: 1, fuzzy: true },
    { value: item.title_cn, weight: 1, fuzzy: true },
    { value: item.title_tw, weight: 1, fuzzy: true },
    { value: pick(item, 'artist', lang), weight: 0.86, fuzzy: true },
    { value: item.artist_en, weight: 0.86, fuzzy: true },
    { value: item.artist_cn, weight: 0.86, fuzzy: true },
    { value: item.artist_tw, weight: 0.86, fuzzy: true },
    { value: pick(item, 'artist_bio', lang), weight: 0.58, fuzzy: false },
    { value: item.artist_bio_en, weight: 0.58, fuzzy: false },
    { value: item.artist_bio_cn, weight: 0.58, fuzzy: false },
    { value: item.artist_bio_tw, weight: 0.58, fuzzy: false },
].filter(field => field.value);

const scoreSearchMatch = (item, query, lang) => {
    const normalizedQuery = normalizeSearchText(query);
    if (!normalizedQuery) return 0;

    const queryTokens = getSearchTokens(query);
    const fields = buildSearchFields(item, lang);

    let bestScore = 0;
    for (const field of fields) {
        const normalizedField = normalizeSearchText(field.value);
        if (!normalizedField) continue;
        if (normalizedField === normalizedQuery) bestScore = Math.max(bestScore, 120 * field.weight);
        if (normalizedField.startsWith(normalizedQuery)) bestScore = Math.max(bestScore, 100 * field.weight);
        if (normalizedField.includes(normalizedQuery)) {
            const positionPenalty = Math.min(normalizedField.indexOf(normalizedQuery), 20);
            bestScore = Math.max(bestScore, (86 - positionPenalty) * field.weight);
        }
        if (queryTokens.length > 1 && queryTokens.every(token => normalizedField.includes(token))) {
            bestScore = Math.max(bestScore, 72 * field.weight);
        }
        if (field.fuzzy && normalizedQuery.length >= 2 && isTightSubsequence(normalizedQuery, normalizedField)) {
            bestScore = Math.max(bestScore, 48 * field.weight);
        }
    }

    return bestScore;
};

const legacyAreaLabels = [
    {
        from: 1,
        to: 2,
        label: { en: 'Area 1 · Ocean of Origins', 'zh-Hans': '展区 1 · 溯源之海', 'zh-Hant': '展區 1 · 溯源之海' },
    },
    {
        from: 3,
        to: 9,
        label: { en: 'Area 2 · Digital Garden', 'zh-Hans': '展区 2 · 数字花园', 'zh-Hant': '展區 2 · 數字花園' },
    },
    {
        from: 10,
        to: 15,
        label: { en: 'Area 3 · Symbiotic Realms', 'zh-Hans': '展区 3 · 共生意境', 'zh-Hant': '展區 3 · 共生意境' },
    },
    {
        from: 16,
        to: 21,
        label: { en: 'Area 4 · City of Illusions', 'zh-Hans': '展区 4 · 幻象浮城', 'zh-Hant': '展區 4 · 幻象浮城' },
    },
    {
        from: 22,
        to: 31,
        label: { en: 'VR Corner', 'zh-Hans': 'VR 角', 'zh-Hant': 'VR 角' },
    },
];

const getSourceLabel = (item, lang) => {
    const source = legacyAreaLabels.find(({ from, to }) => item.id >= from && item.id <= to);
    return source?.label[lang] || source?.label.en || '';
};

// 海报链接
const posterLinks = [
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/poster/poster01.jpg',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/poster/poster02.jpg',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/poster/poster03.jpg',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/poster/poster04.jpg',
];

// 文案
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
        guideTitle: 'AI Butterfly Guide',
        guideDesc:
            'On-site AI “butterfly” guide supports Chinese, English, and Cantonese—responding to questions on each artwork’s background, technical details, and inspirations in real time.',
        qrTitle: 'Scan to Book Your Visit',
        qrImg:
            'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/WechatIMG1084.jpg',
        vrCorner: 'VR Corner',
        vrArtistBtn: 'Artist Bio',
        vrArtworkBtn: 'Artwork Info',
        vrClose: 'Close',
        learnMore: 'Learn more',
        areaTitle: 'Exhibition Areas',
        scrollPosterHint: 'Scroll down to explore the VR Corner & registration',
        scrollVRHint: 'Scroll down to explore registration',
        bookLinkText: 'Click to Book Your Visit',
        searchPlaceholder: 'Search artworks...',
        searchEmpty: 'No matching artworks',
        searchLoading: 'Loading artworks...',
        searchError: 'Unable to load artworks',
        searchResultsLabel: 'Artwork search results',
        searchClear: 'Clear search',
    },
    'zh-Hans': {
        heroTitle: 'SURREALITY·幻实之境',
        heroSub: '全球首个大空间扩展现实（XR）人工智能（AI）艺术展',
        period: '2025 年 6 月 26 日 – 8 月 26 日',
        host:
            '本次展览由香港科技大学（广州）主办，元宇宙与计算创意研究中心（MC²）承办，并入选 2025 年「中法文化之春」官方系列活动，获法国驻广州总领事馆及法国文化中心鼎力支持。',
        techTitle: '展览技术亮点',
        techList: [
            '生成式 AI 与深度学习：实时生成与演化影像。',
            '大空间扩展现实（XR）：AR/VR 头显与空间交互无缝融合。',
            '空间音频与多模态体验：沉浸式声音、气味与触觉反馈。',
        ],
        guideTitle: 'AI 蝴蝶导览员',
        guideDesc:
            '现场 AI 蝴蝶导览员提供中文、English 及粤语三语支持，可根据观众提问，即时解读作品创作背景、技术原理与艺术灵感。',
        qrTitle: '扫码预约参观',
        qrImg:
            'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/WechatIMG1084.jpg',
        vrCorner: 'VR 角',
        vrArtistBtn: '艺术家简介',
        vrArtworkBtn: '作品简介',
        vrClose: '关闭',
        learnMore: '了解更多',
        areaTitle: '展区介绍',
        scrollPosterHint: '向下滚动查看 VR 角与预约',
        scrollVRHint: '向下滚动查看预约入口',
        bookLinkText: '点击预约展览',
        searchPlaceholder: '搜索作品名...',
        searchEmpty: '没有找到匹配作品',
        searchLoading: '正在加载作品...',
        searchError: '作品加载失败',
        searchResultsLabel: '作品搜索结果',
        searchClear: '清空搜索',
    },
    'zh-Hant': {
        heroTitle: 'SURREALITY·幻實之境',
        heroSub: '全球首個大空間擴展現實（XR）人工智能（AI）藝術展',
        period: '2025 年 6 月 26 日 – 8 月 26 日',
        host:
            '本次展覽由香港科技大學（廣州）主辦，元宇宙與計算創意研究中心（MC²）承辦，並入選 2025 年「中法文化之春」官方系列活動，獲法國駐廣州總領事館及法國文化中心鼎力支持。',
        techTitle: '展覽技術亮點',
        techList: [
            '生成式 AI 與深度學習：即時生成與演化影像。',
            '大空間擴展現實（XR）：AR/VR 頭顯與空間互動無縫融合。',
            '空間音頻與多模態體驗：沉浸式聲音、氣味與觸覺回饋。',
        ],
        guideTitle: 'AI 蝴蝶導覽員',
        guideDesc:
            '現場 AI 蝴蝶導覽員提供中文、English 及廣東話三語支持，可根據觀眾提問，即時解讀作品創作背景、技術原理與藝術靈感。',
        qrTitle: '掃碼預約參觀',
        qrImg:
            'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/WechatIMG1084.jpg',
        vrCorner: 'VR 角',
        vrArtistBtn: '藝術家簡介',
        vrArtworkBtn: '作品簡介',
        vrClose: '關閉',
        learnMore: '了解更多',
        areaTitle: '展區介紹',
        scrollPosterHint: '向下滾動查看 VR 角與預約入口',
        scrollVRHint: '向下滾動查看預約入口',
        bookLinkText: '點擊預約展覽',
        searchPlaceholder: '搜尋作品名...',
        searchEmpty: '沒有找到匹配作品',
        searchLoading: '正在載入作品...',
        searchError: '作品載入失敗',
        searchResultsLabel: '作品搜尋結果',
        searchClear: '清空搜尋',
    },
};

/* ---------- 单张 VR 卡片 ---------- */
const ArtworkCard = ({ item, lang, onClick, t }) => {
    const firstAuthor = pick(item, 'artist', lang).split(/[，,]/)[0]?.trim();
    return (
        <div className="vrcard" onClick={() => onClick(item)}>
            <img src={item.poster_url} alt={pick(item, 'title', lang)} />
            <div className="vrcard-body">
                <h3 className="vrcard-title">{pick(item, 'title', lang)}</h3>
                <p className="vrcard-author">{firstAuthor}</p>
                <button className="vrcard-learn">{t.learnMore}</button>
            </div>
        </div>
    );
};

/* ---------- VR Modal ---------- */
const ArtworkModal = ({
                          item,
                          lang,
                          showBio,
                          onToggleBio,
                          onClose,
                          t
                      }) =>
    !item ? null : (
        <div className="vrcard-modal" onClick={onClose}>
            <div className="vrcard-modal-body" onClick={e => e.stopPropagation()}>
                <img
                    className="vrcard-modal-img"
                    src={item.poster_url}
                    alt={pick(item, 'title', lang)}
                />
                <h2>{pick(item, 'title', lang)}</h2>
                <h4>{pick(item, 'artist', lang)}</h4>
                <p
                    className="vrcard-desc"
                    dangerouslySetInnerHTML={{
                        __html: (showBio
                            ? pick(item, 'artist_bio', lang)
                            : pick(item, 'description', lang)
                        ).replace(/\n/g, '<br/>'),
                    }}
                />
                <div className="vrcard-modal-actions">
                    <button onClick={onToggleBio}>
                        {showBio ? t.vrArtworkBtn : t.vrArtistBtn}
                    </button>
                    <button onClick={onClose}>{t.vrClose}</button>
                </div>
            </div>
        </div>
    );

/* ---------- Artwork Search ---------- */
function ArtworkSearchSection({ lang, t }) {
    const [artworks, setArtworks] = useState([]);
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState(null);
    const [showBio, setBio] = useState(false);
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        let active = true;
        fetch('/data/artworks.json')
            .then(response => response.json())
            .then(items => {
                if (!active) return;
                setArtworks(items.filter(item => item.id >= 1 && item.id <= 31));
                setStatus('ready');
            })
            .catch(() => {
                if (active) setStatus('error');
            });

        return () => {
            active = false;
        };
    }, []);

    const trimmedQuery = query.trim();
    const results = useMemo(() => {
        if (!trimmedQuery) return [];
        return artworks
            .map(item => ({ item, score: scoreSearchMatch(item, trimmedQuery, lang) }))
            .filter(result => result.score > 0)
            .sort((a, b) => b.score - a.score || pick(a.item, 'title', lang).localeCompare(pick(b.item, 'title', lang)))
            .map(result => result.item);
    }, [artworks, lang, trimmedQuery]);

    const showEmpty = trimmedQuery && status === 'ready' && results.length === 0;

    return (
        <div className="info-search-section">
            <div className="info-search-shell">
                <div className="info-search-box">
                    <Search className="info-search-icon" size={22} strokeWidth={2} aria-hidden="true" />
                    <input
                        value={query}
                        onChange={event => setQuery(event.target.value)}
                        className="info-search-input"
                        placeholder={t.searchPlaceholder}
                        aria-label={t.searchPlaceholder}
                        autoComplete="off"
                    />
                    {query && (
                        <button
                            type="button"
                            className="info-search-clear"
                            onClick={() => setQuery('')}
                            aria-label={t.searchClear}
                        >
                            <X size={20} strokeWidth={2.2} aria-hidden="true" />
                        </button>
                    )}
                </div>

                {trimmedQuery && (
                    <div className="info-search-results" aria-label={t.searchResultsLabel}>
                        {status === 'loading' && <p className="info-search-state">{t.searchLoading}</p>}
                        {status === 'error' && <p className="info-search-state">{t.searchError}</p>}
                        {showEmpty && <p className="info-search-state">{t.searchEmpty}</p>}
                        {results.map(item => (
                            <button
                                type="button"
                                className="info-search-result"
                                key={item.id}
                                onClick={() => {
                                    setSelected(item);
                                    setBio(false);
                                }}
                            >
                                <span className="info-search-result-main">
                                    <span className="info-search-result-title">{pick(item, 'title', lang)}</span>
                                    <span className="info-search-result-artist">{pick(item, 'artist', lang)}</span>
                                </span>
                                <span className="info-search-result-source">{getSourceLabel(item, lang)}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <ArtworkModal
                item={selected}
                lang={lang}
                showBio={showBio}
                onToggleBio={() => setBio(b => !b)}
                onClose={() => setSelected(null)}
                t={t}
            />
        </div>
    );
}

/* ---------- VR Corner Section ---------- */
function VRCornerSection({ lang, t }) {
    const [data, setData] = useState([]);
    const [selected, setSel] = useState(null);
    const [showBio, setBio] = useState(false);

    useEffect(() => {
        fetch('/data/artworks.json')
            .then(r => r.json())
            .then(all => {
                const items = all.filter(x => x.id >= 22 && x.id <= 31);
                const order = [25, 26, 27, 29, 24, 30, 22, 23, 28, 31];
                setData(
                    order
                        .map(id => items.find(x => x.id === id))
                        .filter(Boolean)
                );
            })
            .catch(console.error);
    }, []);

    return (
        <section className="main-section vrcorner-section">
            <h2 className="vrcorner-title">{t.vrCorner}</h2>

            <div className="vr-grid">
                {data.map(it => (
                    <ArtworkCard
                        key={it.id}
                        item={it}
                        lang={lang}
                        t={t}
                        onClick={() => { setSel(it); setBio(false); }}
                    />
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

            <div className="scroll-hint">
                {t.scrollVRHint}
                <ChevronDown className="scroll-icon" size={34} strokeWidth={1.8} />
            </div>
        </section>
    );
}

/* ---------- 整个 Info 页面 ---------- */
export default function SurrealityOneInfo({ lang }) {
    const t = copy[lang] || copy['zh-Hans'];
    const nav = useNavigate();
    const goto = p => { nav(p); window.scrollTo(0, 0); };

    return (
        <div className="info-page surreality-one-info">
            {/* ---- 展区海报 ---- */}
            <section className="main-section info-poster-full">
                <div className="info-poster-container">
                    <ArtworkSearchSection lang={lang} t={t} />

                    <h2 className="info-poster-title">{t.areaTitle}</h2>
                    <div className="info-poster">
                        {posterLinks.map((src, i) => (
                            <div
                                key={i}
                                className="poster-item"
                                onClick={() => goto(['/ocean','/garden','/realms','/city'][i])}
                            >
                                <img src={src} alt={`poster-${i+1}`} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="scroll-hint">
                    {t.scrollPosterHint}
                    <ChevronDown className="scroll-icon" size={34} strokeWidth={1.8} />
                </div>
            </section>

            {/* ---- VR Corner ---- */}
            <VRCornerSection lang={lang} t={t} />

            {/* ---- 展览说明 ---- */}
            <section className="main-section info-content-section">
                <div className="info-wrapper">
                    <div className="info-container">
                        <h1 className="info-hero-title">{t.heroTitle}</h1>
                        <h2 className="info-hero-sub">{t.heroSub}</h2>
                        <p className="info-period">{t.period}</p>
                        <p className="info-host">{t.host}</p>

                        <h3>{t.techTitle}</h3>
                        <ul className="info-list">
                            {t.techList.map(s => <li key={s}>{s}</li>)}
                        </ul>

                        <h3>{t.guideTitle}</h3>
                        <p className="info-guide">{t.guideDesc}</p>

                        <div
                            className="info-qr"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center'
                            }}
                        >
                            {/* 语言区分的预约链接 */}
                            <a
                                href="https://qnr.hkust-gz.edu.cn/vm/rfWBX5F.aspx"
                                style={{
                                    color: '#fff',
                                    textDecoration: 'underline',
                                    marginBottom: '0.5rem'
                                }}
                            >
                                {t.bookLinkText}
                            </a>

                            <h3>{t.qrTitle}</h3>
                            <img
                                src={t.qrImg}
                                alt="QR code"
                                style={{
                                    maxWidth: '200px',
                                    width: '100%',
                                    height: 'auto'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
