import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronUp } from 'lucide-react';
import './ExhibitionSection.css';
import { t } from '../i18n';

const areaTitles = {
    guangzhou: {
        1: { en: 'Guangzhou Area 1: Awakening', cn: '广州展区一：觉醒' },
        2: { en: 'Guangzhou Area 2: Surreal Garden', cn: '广州展区二：超现实花园' },
        3: { en: 'Guangzhou Area 3: Threshold Realms', cn: '广州展区三：阈限之境' },
        4: { en: 'Guangzhou Area 4: Algorithmic Theatre', cn: '广州展区四：算法剧场' },
    },
    'hong-kong': {
        1: { en: 'Hong Kong Area 1: Living Currents', cn: '香港展区一：生命流动' },
        2: { en: 'Hong Kong Area 2: Future Fables', cn: '香港展区二：未来寓言' },
        3: { en: 'Hong Kong Area 3: Beyond Mind', cn: '香港展区三：心智之外' },
    },
};

const getLegacyTitle = (titleEn, titleZh, lang) => {
    if (lang === 'en') return titleEn;
    if (typeof titleZh === 'string') return titleZh;
    return t({ title_cn: titleZh?.['zh-Hans'] || titleZh?.cn || '' }, 'title', lang);
};

const getAreaTitle = (campus, area, lang, titleEn, titleZh) => {
    const areaCopy = areaTitles[campus]?.[Number(area)];
    if (!areaCopy) return getLegacyTitle(titleEn, titleZh, lang);
    if (lang === 'en') return areaCopy.en;
    return t({ title_cn: areaCopy.cn }, 'title', lang);
};

const getArtworkImage = (item) => item.image_url || item.poster_url || item.local_image_url || '';

export default function ExhibitionSection({ titleEn, titleZh, idRange, lang, campus, area }) {
    const nav = useNavigate();
    const [list, setList] = useState([]);
    const [open, setOpen] = useState(null);

    useEffect(() => {
        const isMrArea = campus && area;
        fetch(isMrArea ? '/data/mr-artworks-2026.json' : '/data/artworks.json')
            .then((r) => r.json())
            .then((all) => {
                const slice = isMrArea
                    ? all.filter((x) => x.campus === campus && Number(x.area) === Number(area))
                    : all.filter((x) => {
                        const [from, to] = idRange;
                        return x.id >= from && x.id <= to;
                    });
                setList(slice);
                if (slice.length) setOpen(slice[0].id);
            })
            .catch(console.error);
    }, [idRange, campus, area]);

    const localeTitle = getAreaTitle(campus, area, lang, titleEn, titleZh);

    const labels = {
        back: {
            en: 'Back to overview',
            'zh-Hans': '返回展区介绍',
            'zh-Hant': '返回展區介紹',
        },
        collapse: {
            en: 'Collapse artwork',
            'zh-Hans': '收起作品',
            'zh-Hant': '收起作品',
        },
        mobileBack: {
            en: 'Overview',
            'zh-Hans': '展区',
            'zh-Hant': '展區',
        },
        bio: {
            en: 'Artist Bio',
            'zh-Hans': '艺术家简介',
            'zh-Hant': '藝術家簡介',
        },
        year: {
            en: 'Year',
            'zh-Hans': '年份',
            'zh-Hant': '年份',
        },
        imageMissing: {
            en: 'Image pending upload',
            'zh-Hans': '图片待上传',
            'zh-Hant': '圖片待上傳',
        },
    };

    const goBackToOverview = () => nav('/info');
    const backLabel = labels.back[lang] || labels.back.en;
    const mobileBackLabel = labels.mobileBack[lang] || labels.mobileBack.en;
    const collapseLabel = labels.collapse[lang] || labels.collapse.en;

    return (
        <>
            {/* —— 返回按钮 —— */}
            <div className="dg-back-wrapper" aria-label={backLabel}>
                <button className="dg-back-btn" onClick={goBackToOverview}>
                    <ArrowLeft size={18} strokeWidth={2.4} aria-hidden="true" />
                    <span>{backLabel}</span>
                </button>
                <span className="dg-back-context">{localeTitle}</span>
            </div>

            {/* —— 折叠内容 —— */}
            <section className="dg-wrapper">
                <h1 className="dg-title">{localeTitle}</h1>

                <ul className="dg-accordion">
                    {list.map((it, idx) => {
                        const isOpen = open === it.id;
                        return (
                            <li key={it.id} className={`dg-item ${isOpen ? 'open' : ''}`}>
                                <button
                                    className="dg-toggle"
                                    onClick={() => setOpen(isOpen ? null : it.id)}
                                    aria-expanded={isOpen}
                                    aria-controls={`artwork-panel-${it.id}`}
                                >
                                    <span className="dg-num">{String(idx + 1).padStart(2, '0')}.</span>
                                    <span className="dg-name">{t(it, 'title', lang)}</span>
                                    <span className="dg-icon">{isOpen ? '✕' : '+'}</span>
                                </button>

                                {isOpen && (
                                    <div className="dg-panel" id={`artwork-panel-${it.id}`}>
                                        {getArtworkImage(it) ? (
                                            <img
                                                src={getArtworkImage(it)}
                                                alt={t(it, 'title', lang)}
                                                className="dg-img"
                                                onError={(event) => {
                                                    if (it.local_image_url && event.currentTarget.dataset.fallback !== 'true') {
                                                        event.currentTarget.dataset.fallback = 'true';
                                                        event.currentTarget.src = it.local_image_url;
                                                    }
                                                }}
                                            />
                                        ) : (
                                            <div className="dg-img dg-img-placeholder">
                                                {labels.imageMissing[lang] || labels.imageMissing.en}
                                            </div>
                                        )}

                                        <div className="dg-text">
                                            <h3>{t(it, 'title', lang)}</h3>
                                            <p className="dg-author">{t(it, 'artist', lang)}</p>
                                            {it.year && (
                                                <p className="dg-year">
                                                    {labels.year[lang] || labels.year.en}: {it.year}
                                                </p>
                                            )}

                                            {t(it, 'description', lang) && (
                                                <p
                                                    className="dg-desc"
                                                    dangerouslySetInnerHTML={{
                                                        __html: t(it, 'description', lang).replace(/\n/g, '<br/>'),
                                                    }}
                                                />
                                            )}

                                            {t(it, 'artist_bio', lang) && (
                                                <>
                                                    <h4>{labels.bio[lang] || labels.bio.en}</h4>
                                                    <p
                                                        className="dg-desc"
                                                        dangerouslySetInnerHTML={{
                                                            __html: t(it, 'artist_bio', lang).replace(/\n/g, '<br/>'),
                                                        }}
                                                    />
                                                </>
                                            )}

                                            <div className="dg-panel-actions">
                                                <button className="dg-collapse-btn" onClick={() => setOpen(null)}>
                                                    <ChevronUp size={18} strokeWidth={2.4} aria-hidden="true" />
                                                    <span>{collapseLabel}</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </section>

            <button className="dg-floating-back" onClick={goBackToOverview} aria-label={backLabel}>
                <ArrowLeft size={18} strokeWidth={2.4} aria-hidden="true" />
                <span>{mobileBackLabel}</span>
            </button>
        </>
    );
}
