import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ExhibitionSection.css';
import { t } from '../i18n';

export default function ExhibitionSection({ titleEn, titleZh, idRange, lang }) {
    const nav = useNavigate();
    const [list, setList] = useState([]);
    const [open, setOpen] = useState(null);

    useEffect(() => {
        fetch('/data/artworks.json')
            .then((r) => r.json())
            .then((all) => {
                const [from, to] = idRange;
                const slice = all.filter((x) => x.id >= from && x.id <= to);
                setList(slice);
                if (slice.length) setOpen(slice[0].id);
            })
            .catch(console.error);
    }, [idRange]);

    // 三语标题：英文用 titleEn；简体 & 繁体都用 titleZh.cn 然后在繁体时转换
    const localeTitle = lang === 'en'
        ? titleEn
        : t({ 'title_cn': titleZh['zh-Hans'] || titleZh.cn }, 'title', lang);

    const labels = {
        back: {
            en: 'Back',
            'zh-Hans': '返回',
            'zh-Hant': '返回',
        },
        bio: {
            en: 'Artist Bio',
            'zh-Hans': '艺术家简介',
            'zh-Hant': '藝術家簡介',
        },
    };

    return (
        <>
            {/* —— 返回按钮 —— */}
            <div className="dg-back-wrapper">
                <button className="dg-back-btn" onClick={() => nav(-1)}>
                    ‹ {labels.back[lang] || labels.back.en}
                </button>
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
                                >
                                    <span className="dg-num">{String(idx + 1).padStart(2, '0')}.</span>
                                    <span className="dg-name">{t(it, 'title', lang)}</span>
                                    <span className="dg-icon">{isOpen ? '✕' : '+'}</span>
                                </button>

                                {isOpen && (
                                    <div className="dg-panel">
                                        <img
                                            src={it.poster_url}
                                            alt={t(it, 'title', lang)}
                                            className="dg-img"
                                        />

                                        <div className="dg-text">
                                            <h3>{t(it, 'title', lang)}</h3>
                                            <p className="dg-author">{t(it, 'artist', lang)}</p>

                                            <p
                                                className="dg-desc"
                                                dangerouslySetInnerHTML={{
                                                    __html: t(it, 'description', lang).replace(/\n/g, '<br/>'),
                                                }}
                                            />

                                            <h4>{labels.bio[lang] || labels.bio.en}</h4>
                                            <p
                                                className="dg-desc"
                                                dangerouslySetInnerHTML={{
                                                    __html: t(it, 'artist_bio', lang).replace(/\n/g, '<br/>'),
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </section>
        </>
    );
}
