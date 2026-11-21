import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { ArrowRight, ArrowUpRight, Pause, Play, X } from 'lucide-react';
import { getCopy, filmUrl } from './Central/centralCopy';
import CentralVisit from './Central/CentralVisit';
import DirectorStatement from './Central/DirectorStatement';
import works from './Central/centralArtworks.json';
import { centralArtworkText } from './Central/centralArtworkText';
import './Home.css';

const featured = ['an-orbit-of-sound', 'a-memory-of-the-stars', 'light-takes-form']
    .map(id => works.find(work => work.id === id));
const poster = '/images/central/harbour-poster.webp';

function FilmHero({ copy }) {
    const [filmOpen, setFilmOpen] = useState(false);
    const [previewEnabled, setPreviewEnabled] = useState(() =>
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches && !navigator.connection?.saveData
    );
    const preview = useRef(null);
    const [inView, setInView] = useState(true);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
        observer.observe(preview.current);
        return () => observer.disconnect();
    }, []);
    useEffect(() => {
        const video = preview.current;
        let active = true;
        if (previewEnabled && !filmOpen && inView) {
            if (!video.getAttribute('src')) {
                const portrait = window.matchMedia('(max-width: 768px) and (orientation: portrait)').matches;
                video.src = portrait ? '/video/central/harbour-preview-mobile.mp4' : '/video/central/harbour-preview.mp4';
            }
            video.play().catch(() => { if (active) setPreviewEnabled(false); });
        } else {
            video.pause();
        }
        return () => { active = false; };
    }, [previewEnabled, filmOpen, inView]);

    return (
        <section className="central-hero" aria-labelledby="central-hero-title">
            <video className="central-hero__video" ref={preview}
                poster={poster} loop muted playsInline preload="none" aria-hidden="true" />
            <div className="central-hero__shade" />
            <div className="central-hero__content">
                <p className="central-kicker">{copy.medium}</p>
                <h1 id="central-hero-title">SURREALITY</h1>
                <p className="central-hero__place">{copy.heroPlace}</p>
                <p className="central-hero__details">{copy.venue}<span> / </span>{copy.dates}</p>
                <div className="central-hero__actions">
                    <button type="button" className="central-film-link" onClick={() => setFilmOpen(true)}>
                        <Play size={15} fill="currentColor" aria-hidden="true" />{copy.film}
                    </button>
                    <Link to="/agenda">{copy.visit} <ArrowRight size={17} aria-hidden="true" /></Link>
                </div>
            </div>
            <button type="button" className="central-preview-toggle" onClick={() => setPreviewEnabled(!previewEnabled)}
                aria-label={previewEnabled ? copy.pause : copy.resume} title={previewEnabled ? copy.pause : copy.resume}>
                {previewEnabled ? <Pause size={17} /> : <Play size={17} />}
            </button>
            <Modal isOpen={filmOpen} onRequestClose={() => setFilmOpen(false)} contentLabel={copy.film}
                className="central-film-dialog" overlayClassName="central-film-overlay">
                <div className="central-film-bar">
                    <p>{copy.credit}</p>
                    <button type="button" aria-label={copy.close} onClick={() => setFilmOpen(false)}><X /></button>
                </div>
                {filmOpen && <video src={filmUrl} controls autoPlay playsInline poster={poster} aria-label={copy.film} />}
            </Modal>
        </section>
    );
}

export default function Home({ lang }) {
    const copy = getCopy(lang);
    return (
        <main className="central-home">
            <FilmHero copy={copy} />
            <section className="central-featured central-shell" aria-labelledby="featured-title">
                <div className="central-featured__intro">
                    <h2 id="featured-title">{copy.title}</h2>
                    <p>{copy.intro}</p>
                </div>
                <div className="central-featured__grid">
                    {featured.map((work, index) => (
                        <article key={work.id}>
                            <Link to={'/info#' + work.id}>
                                <div className="central-featured__image"><img src={work.image} alt="" loading="lazy" /></div>
                                <h3>{centralArtworkText(work, 'title', lang)} <ArrowUpRight size={23} aria-hidden="true" /></h3>
                            </Link>
                            <p>{copy.captions[index]}</p>
                        </article>
                    ))}
                </div>
                <Link className="central-text-link" to="/info">{copy.all} <ArrowRight size={17} /></Link>
            </section>
            <DirectorStatement lang={lang} />
            <CentralVisit lang={lang} embedded />
            <section id="past-exhibitions" className="central-archives" aria-labelledby="past-title">
                <div className="central-shell central-archives__inner">
                    <h2 id="past-title">{copy.archive}</h2>
                    <div className="central-archives__editions">
                        {[
                            { path: '/surreality-2-0', title: 'SURREALITY 2.0', year: '2026', cities: copy.campuses },
                            { path: '/surreality-1-0', title: 'SURREALITY 1.0', year: '2025', cities: copy.firstCampus },
                        ].map(({ path, title, year, cities }) => (
                            <Link key={path} to={path} className="central-archives__edition">
                                <span className="central-archives__year">{year}</span>
                                <span className="central-archives__name">{title}<small>{cities}</small></span>
                                <ArrowUpRight size={24} aria-hidden="true" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
