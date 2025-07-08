import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ExhibitionSection.css';

const pick = (o, key, lang) => o?.[`${key}_${lang === 'zh' ? 'cn' : 'en'}`] ?? '';

export default function ExhibitionSection({ titleEn, titleZh, idRange, lang }) {
    const nav               = useNavigate();
    const [list, setList]   = useState([]);
    const [open, setOpen]   = useState(null);     // ← 默认 null

    /* 拉取数据 */
    useEffect(() => {
        fetch('/data/artworks.json')
            .then(r => r.json())
            .then(all => {
                const [from, to] = idRange;
                const slice      = all.filter(x => x.id >= from && x.id <= to);
                setList(slice);
                if (slice.length) setOpen(slice[0].id); // ← ① 首次加载即展开第 1 项
            })
            .catch(console.error);
    }, [idRange]);

    const localeTitle = lang === 'zh' ? titleZh : titleEn;

    return (
        <>
            {/* —— 返回按钮 —— */}
            <div className="dg-back-wrapper">
                <button className="dg-back-btn" onClick={() => nav(-1)}>
                    ‹ {lang === 'zh' ? '返回' : 'Back'}
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
                                    <span className="dg-name">{pick(it, 'title', lang)}</span>
                                    <span className="dg-icon">{isOpen ? '✕' : '+'}</span>
                                </button>

                                {isOpen && (
                                    <div className="dg-panel">
                                        <img src={it.poster_url} alt={pick(it, 'title', lang)} className="dg-img" />

                                        <div className="dg-text">
                                            <h3>{pick(it, 'title', lang)}</h3>
                                            <p className="dg-author">{pick(it, 'artist', lang)}</p>

                                            <p
                                                className="dg-desc"
                                                dangerouslySetInnerHTML={{
                                                    __html: pick(it, 'description', lang).replace(/\n/g, '<br/>')
                                                }}
                                            />
                                            <h4>{lang === 'zh' ? '艺术家简介' : 'Artist Bio'}</h4>
                                            <p
                                                className="dg-desc"
                                                dangerouslySetInnerHTML={{
                                                    __html: pick(it, 'artist_bio', lang).replace(/\n/g, '<br/>')
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
