import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { ArrowUpRight, Search, X } from 'lucide-react';
import { centralArtworkText } from './centralArtworkText';
import works from './centralArtworks.json';
import './CentralWorks.css';

const labels = {
    en: {
        venue: 'Hong Kong Observation Wheel',
        title: 'Exhibited works',
        search: 'Search by title or artist',
        empty: 'No works match your search.',
        close: 'Close artwork',
    },
    'zh-Hans': {
        venue: '香港摩天轮',
        title: '展出作品',
        search: '搜索作品或艺术家',
        empty: '没有找到相符的作品。',
        close: '关闭作品介绍',
    },
    'zh-Hant': {
        venue: '香港摩天輪',
        title: '展出作品',
        search: '搜尋作品或藝術家',
        empty: '找不到相符的作品。',
        close: '關閉作品介紹',
    },
};

const assetUrl = (work) => (process.env.PUBLIC_URL || '') + work.image;

// Visitors can search in any of the site's three languages.
const searchTerms = works.map((work) =>
    [work.title_en, work.title_cn, work.title_hk,
        work.artist_en, work.artist_cn, work.artist_hk]
        .join(' ').toLowerCase()
);

export default function CentralWorks({ lang = 'en' }) {
    const copy = labels[lang] || labels.en;
    const location = useLocation();
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const filtered = works.filter((_, index) =>
        searchTerms[index].includes(query.trim().toLowerCase())
    );
    const selected = works.find(work => '#' + work.id === location.hash);
    const close = () => {
        if (location.state?.fromCatalogue) navigate(-1);
        else navigate(location.pathname, { replace: true });
    };

    return (
        <main className="central-catalogue" id="central-works">
            <div className="central-catalogue__inner">
                <header className="central-catalogue__header">
                    <div>
                        <p className="central-catalogue__venue">{copy.venue}</p>
                        <h1>{copy.title}</h1>
                    </div>
                    <label className="central-catalogue__search">
                        <Search size={18} aria-hidden="true" />
                        <input type="search" value={query} onChange={event => setQuery(event.target.value)}
                            aria-label={copy.search} placeholder={copy.search} />
                    </label>
                </header>
                <ul className="central-catalogue__grid">
                    {filtered.map((work) => (
                        <li key={work.id}>
                            <Link className="central-catalogue__link"
                                to={{ pathname: location.pathname, hash: work.id }}
                                state={{ fromCatalogue: true }} aria-haspopup="dialog">
                                <div className={work.coverDimensions ? 'central-catalogue__cover central-catalogue__cover--portrait' : 'central-catalogue__cover'}
                                    style={work.coverDimensions ? { aspectRatio: work.coverDimensions.join(' / ') } : undefined}>
                                    <img src={assetUrl(work)} alt="" loading="lazy" decoding="async" />
                                </div>
                                <div className="central-catalogue__name">
                                    <h2>{centralArtworkText(work, 'title', lang)}</h2>
                                    <ArrowUpRight size={20} aria-hidden="true" />
                                </div>
                                <p className="central-catalogue__artists">{centralArtworkText(work, 'artist', lang)}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
                {!filtered.length && <p role="status">{copy.empty}</p>}
            </div>
            <Modal isOpen={Boolean(selected)} onRequestClose={close}
                className="central-artwork-dialog" overlayClassName="central-artwork-overlay"
                aria={{ labelledby: 'central-artwork-title' }}>
                {selected && (
                    <>
                        <button className="central-artwork-dialog__close" type="button"
                            aria-label={copy.close} onClick={close}>
                            <X size={23} aria-hidden="true" />
                        </button>
                        <div className="central-artwork-dialog__image">
                            <img src={assetUrl(selected)} alt={centralArtworkText(selected, 'title', lang)} />
                        </div>
                        <div className="central-artwork-dialog__text">
                            {selected.year && <p className="central-artwork-dialog__year">{selected.year}</p>}
                            <h2 id="central-artwork-title">{centralArtworkText(selected, 'title', lang)}</h2>
                            <p className="central-catalogue__artists">{centralArtworkText(selected, 'artist', lang)}</p>
                            <p className="central-artwork-dialog__description">{centralArtworkText(selected, 'description', lang)}</p>
                        </div>
                    </>
                )}
            </Modal>
        </main>
    );
}
