// Info.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Info.css';
import { ChevronDown, Search, X } from 'lucide-react';
import { Converter } from 'opencc-js';
import { t as pickText } from '../../components/i18n';

const guangzhouRegistrationQr = '/images/guangzhou-registration-qr.jpg';
const toSimplified = Converter({ from: 'tw', to: 'cn' });
const searchTokenPattern = /[\p{L}\p{N}]+/gu;

// 三语字段选择器
const pick = (obj, key, lang) => pickText(obj || {}, key, lang);

const getPosterUrl = (item) =>
    item?.image_url || item?.poster_url || item?.local_image_url || item?.local_poster_url || '';

const getFallbackPosterUrl = (item) => item?.local_image_url || item?.local_poster_url || '';

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

const getSourceLabel = (item, lang) => {
    if (item.sourceType === 'vr') return 'VR Corner';
    const campus = pick(item, 'campus_label', lang) || item.campus || '';
    const area = lang === 'en' ? `Area ${item.area}` : pickText({ area_cn: `展区 ${item.area}` }, 'area', lang);
    return [campus, area].filter(Boolean).join(' · ');
};

const ArtworkImage = ({ item, className = '', alt, fallbackText }) => {
    const [src, setSrc] = useState(getPosterUrl(item));
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        setSrc(getPosterUrl(item));
        setFailed(false);
    }, [item]);

    if (!src || failed) {
        return (
            <div className={`${className} vrcard-image-placeholder`}>
                {fallbackText}
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => {
                const fallback = getFallbackPosterUrl(item);
                if (fallback && src !== fallback) {
                    setSrc(fallback);
                } else {
                    setFailed(true);
                }
            }}
        />
    );
};

// 2026 展区海报
const areaPosterGroups = [
    {
        id: 'hong-kong',
        label: {
            en: 'Hong Kong Exhibition Area',
            'zh-Hans': '香港展区',
            'zh-Hant': '香港展區',
        },
        posters: [
            {
                id: 'hk-living-currents',
                title: 'Living Currents',
                src: 'https://surreality-1419044809.cos.ap-hongkong.myqcloud.com/surreality-posters/05-area-01-living-currents-web.webp',
                path: '/exhibition/hong-kong/area-1',
            },
            {
                id: 'hk-future-fables',
                title: 'Future Fables',
                src: 'https://surreality-1419044809.cos.ap-hongkong.myqcloud.com/surreality-posters/06-area-02-future-fables-web.webp',
                path: '/exhibition/hong-kong/area-2',
            },
            {
                id: 'hk-beyond-mind',
                title: 'Beyond Mind',
                src: 'https://surreality-1419044809.cos.ap-hongkong.myqcloud.com/surreality-posters/07-area-03-beyond-mind-web.webp',
                path: '/exhibition/hong-kong/area-3',
            },
        ],
    },
    {
        id: 'guangzhou',
        label: {
            en: 'Guangzhou Exhibition Area',
            'zh-Hans': '广州展区',
            'zh-Hant': '廣州展區',
        },
        posters: [
            {
                id: 'gz-awakening',
                title: 'Awakening',
                src: 'https://surreality-1419044809.cos.ap-hongkong.myqcloud.com/surreality-posters/01-awakening-web.webp',
                path: '/exhibition/guangzhou/area-1',
            },
            {
                id: 'gz-surreal-garden',
                title: 'Surreal Garden',
                src: 'https://surreality-1419044809.cos.ap-hongkong.myqcloud.com/surreality-posters/02-surreal-garden-web.webp',
                path: '/exhibition/guangzhou/area-2',
            },
            {
                id: 'gz-threshold-realms',
                title: 'Threshold Realms',
                src: 'https://surreality-1419044809.cos.ap-hongkong.myqcloud.com/surreality-posters/03-threshold-realms-web.webp',
                path: '/exhibition/guangzhou/area-3',
            },
            {
                id: 'gz-algorithmic-theatre',
                title: 'Algorithmic Theatre',
                src: 'https://surreality-1419044809.cos.ap-hongkong.myqcloud.com/surreality-posters/04-algorithmic-theatre-web.webp',
                path: '/exhibition/guangzhou/area-4',
            },
        ],
    },
];

// 文案
const copy = {
    en: {
        heroTitle: 'SURREALITY·幻實之境',
        heroSub: 'SURREALITY 2026: Large-Scale XR AI Art Exhibition across Hong Kong and Guangzhou',
        period: 'June 16 – 18, 2026',
        host:
            'SURREALITY 2026 unfolds across HKUST and HKUST(GZ), bringing together seven thematic exhibition areas, VR experiences, artist talks, forums, and guided visits. Presented in celebration of HKUST’s 35th anniversary, the exhibition explores how AI, XR, immersive media, and computational creativity reshape perception, storytelling, and the relationship between virtual and physical worlds.',
        techTitle: '2026 Exhibition Highlights',
        techList: [
            'Two-city exhibition: three Hong Kong areas and four Guangzhou areas form a connected cross-campus journey.',
            'Large-scale XR & immersive media: AR/VR, spatial interaction, AI-generated worlds, and sensory experience.',
            'Public programs: opening events, artist sharing, international forum sessions, guided tours, and VR Corner works.',
        ],
        guideTitle: 'Visit & Registration',
        guideDesc:
            'Visitors can explore the exhibition areas and VR Corner, join selected public programs, and follow the agenda for Hong Kong and Guangzhou activities.',
        qrTitle: 'Guangzhou Activity Registration',
        qrNote: '(For Guangzhou activity registration only)',
        qrImg: guangzhouRegistrationQr,
        vrCorner: 'VR Corner',
        vrArtistBtn: 'Artist Bio',
        vrArtworkBtn: 'Artwork Info',
        vrClose: 'Close',
        learnMore: 'Learn more',
        areaTitle: 'Exhibition Areas',
        scrollPosterHint: 'Scroll down to explore the VR Corner & registration',
        scrollVRHint: 'Scroll down to explore registration',
        bookLinkText: 'Guangzhou Activity Registration',
        searchPlaceholder: 'Search artworks...',
        searchEmpty: 'No matching artworks',
        searchLoading: 'Loading artworks...',
        searchError: 'Unable to load artworks',
        searchResultsLabel: 'Artwork search results',
        searchClear: 'Clear search',
    },
    'zh-Hans': {
        heroTitle: 'SURREALITY·幻实之境',
        heroSub: 'SURREALITY 2026：跨越香港与广州的大空间 XR AI 艺术展',
        period: '2026 年 6 月 16 日 – 18 日',
        host:
            'SURREALITY 2026 将在香港科技大学与香港科技大学（广州）两地展开，呈现七个主题展区、VR Corner、艺术家分享、论坛与导览活动。本次展览为香港科技大学35周年校庆献礼，聚焦 AI、XR、沉浸式媒体与计算创意如何重塑感知、叙事，以及虚拟与现实之间的关系。',
        techTitle: '2026 展览亮点',
        techList: [
            '双城展览：香港三个展区与广州四个展区共同构成跨校区展览旅程。',
            '大空间 XR 与沉浸式媒体：AR/VR、空间交互、AI 生成世界与多感官体验。',
            '公共活动：开幕活动、艺术家分享、国际论坛、展区导览与 VR Corner 作品。',
        ],
        guideTitle: '参观与注册',
        guideDesc:
            '观众可根据日程参与香港与广州两地活动，体验展区、VR Corner、艺术家交流与论坛内容。',
        qrTitle: '广州活动注册',
        qrNote: '（仅为广州活动注册）',
        qrImg: guangzhouRegistrationQr,
        vrCorner: 'VR 角',
        vrArtistBtn: '艺术家简介',
        vrArtworkBtn: '作品简介',
        vrClose: '关闭',
        learnMore: '了解更多',
        areaTitle: '展区介绍',
        scrollPosterHint: '向下滚动查看 VR 角与预约',
        scrollVRHint: '向下滚动查看预约入口',
        bookLinkText: '广州活动注册',
        searchPlaceholder: '搜索作品名...',
        searchEmpty: '没有找到匹配作品',
        searchLoading: '正在加载作品...',
        searchError: '作品加载失败',
        searchResultsLabel: '作品搜索结果',
        searchClear: '清空搜索',
    },
    'zh-Hant': {
        heroTitle: 'SURREALITY·幻實之境',
        heroSub: 'SURREALITY 2026：跨越香港與廣州的大空間 XR AI 藝術展',
        period: '2026 年 6 月 16 日 – 18 日',
        host:
            'SURREALITY 2026 將在香港科技大學與香港科技大學（廣州）兩地展開，呈現七個主題展區、VR Corner、藝術家分享、論壇與導覽活動。本次展覽為香港科技大學35周年校慶獻禮，聚焦 AI、XR、沉浸式媒體與計算創意如何重塑感知、敘事，以及虛擬與現實之間的關係。',
        techTitle: '2026 展覽亮點',
        techList: [
            '雙城展覽：香港三個展區與廣州四個展區共同構成跨校區展覽旅程。',
            '大空間 XR 與沉浸式媒體：AR/VR、空間互動、AI 生成世界與多感官體驗。',
            '公共活動：開幕活動、藝術家分享、國際論壇、展區導覽與 VR Corner 作品。',
        ],
        guideTitle: '參觀與註冊',
        guideDesc:
            '觀眾可根據日程參與香港與廣州兩地活動，體驗展區、VR Corner、藝術家交流與論壇內容。',
        qrTitle: '廣州活動註冊',
        qrNote: '（僅為廣州活動註冊）',
        qrImg: guangzhouRegistrationQr,
        vrCorner: 'VR 角',
        vrArtistBtn: '藝術家簡介',
        vrArtworkBtn: '作品簡介',
        vrClose: '關閉',
        learnMore: '了解更多',
        areaTitle: '展區介紹',
        scrollPosterHint: '向下滾動查看 VR 角與預約入口',
        scrollVRHint: '向下滾動查看預約入口',
        bookLinkText: '廣州活動註冊',
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
            <ArtworkImage
                item={item}
                alt={pick(item, 'title', lang)}
                fallbackText={pick(item, 'title', lang)}
            />
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
                <ArtworkImage
                    item={item}
                    className="vrcard-modal-img"
                    alt={pick(item, 'title', lang)}
                    fallbackText={pick(item, 'title', lang)}
                />
                <h2>{pick(item, 'title', lang)}</h2>
                <h4>{pick(item, 'artist', lang)}</h4>
                <p className="vrcard-desc">
                    {showBio
                        ? pick(item, 'artist_bio', lang)
                        : pick(item, 'description', lang)}
                </p>
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
        Promise.all([
            fetch('/data/mr-artworks-2026.json').then(r => r.json()),
            fetch('/data/vr-corner-2026.json').then(r => r.json()),
        ])
            .then(([mr, vr]) => {
                if (!active) return;
                const merged = [
                    ...mr.map(item => ({ ...item, sourceType: 'mr', searchId: `mr-${item.id}` })),
                    ...vr.map(item => ({ ...item, sourceType: 'vr', searchId: `vr-${item.id}` })),
                ];
                setArtworks(merged);
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
                                key={item.searchId}
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
        fetch('/data/vr-corner-2026.json')
            .then(r => r.json())
            .then(all => setData(all))
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
export default function Info({ lang }) {
    const t = copy[lang] || copy['zh-Hans'];
    const nav = useNavigate();
    const goto = p => { nav(p); window.scrollTo(0, 0); };

    return (
        <div className="info-page">
            {/* ---- 展区海报 ---- */}
            <section className="main-section info-poster-full">
                <div className="info-poster-container">
                    {/* ---- 作品搜索 ---- */}
                    <ArtworkSearchSection lang={lang} t={t} />

                    <h2 className="info-poster-title">{t.areaTitle}</h2>
                    <div className="info-poster-groups">
                        {areaPosterGroups.map(group => (
                            <section className="area-poster-group" key={group.id}>
                                <h3 className="area-poster-heading">
                                    {group.label[lang] || group.label.en}
                                </h3>
                                <div className="info-poster">
                                    {group.posters.map(item => (
                                        <div
                                            key={item.id}
                                            className={`poster-item${item.path ? ' poster-item--link' : ''}`}
                                            onClick={item.path ? () => goto(item.path) : undefined}
                                            onKeyDown={item.path ? (e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault();
                                                    goto(item.path);
                                                }
                                            } : undefined}
                                            role={item.path ? 'button' : undefined}
                                            tabIndex={item.path ? 0 : undefined}
                                            aria-label={item.path ? `${item.title} ${t.learnMore}` : item.title}
                                        >
                                            <img
                                                src={item.src}
                                                alt={item.title}
                                                loading="eager"
                                                decoding="async"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </section>
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

                        <div className="info-qr">
                            <h3>{t.qrTitle}</h3>
                            <p>{t.qrNote}</p>
                            <img
                                src={t.qrImg}
                                alt={t.qrTitle}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
