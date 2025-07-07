import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import './ArtworkGallerySection.css';

export default function ArtworkCarousel({ artworks = [], lang, activeId, onOpen }) {
    if (!artworks.length) return <div style={{ color: 'white' }}>No artworks loaded.</div>;

    return (
        <Swiper
            modules={[Navigation, EffectCoverflow, Keyboard]}
            breakpoints={{
                0:    { slidesPerView: 1.15, spaceBetween: 16 },
                600:  { slidesPerView: 2,    spaceBetween: 24 },
                960:  { slidesPerView: 3,    spaceBetween: 40 },
            }}
            centeredSlides
            navigation
            loop={artworks.length > 3}
            effect="coverflow"
            coverflowEffect={{
                rotate: 0,
                stretch: 20,
                depth: 120,
                modifier: 2,
                slideShadows: false,
            }}
            keyboard={{ enabled: true }}
            preventClicks={false}
            preventClicksPropagation={false}
            pagination={false}
            className="artwork-swiper"
        >
            {artworks.map((art) => (
                <SwiperSlide key={art.id}>
                    <div
                        role="button"
                        className={`artwork-window-card cool-card ${activeId === art.id ? 'active' : ''}`}
                        tabIndex={0}
                        onClick={() => onOpen(art.id === activeId ? null : art.id)}
                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen(art.id)}
                    >
                        <img
                            src={art.poster_url}
                            alt={lang === 'en' ? art.title_en : art.title_cn}
                            className="artwork-window-img"
                            onError={(e) => {
                                e.target.src = 'https://dummyimage.com/320x220/252533/fff&text=No+Image';
                            }}
                        />
                        <div className="artwork-window-caption">
                            <h4>{lang === 'en' ? art.title_en : art.title_cn}</h4>
                            <div className="artist-name">
                                {lang === 'en' ? art.artist_en : art.artist_cn}
                            </div>
                        </div>
                        <div className="artwork-card-glow" />
                        {activeId === art.id && (
                            <div className="artwork-expand-content">
                                <ArtworkExpandInfo artwork={art} lang={lang} />
                            </div>
                        )}
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

function ArtworkExpandInfo({ artwork, lang }) {
    const [tab, setTab] = React.useState('artwork');
    return (
        <div>
            <div className="expand-tab-btns">
                <button
                    className={tab === 'artwork' ? 'active' : ''}
                    onClick={() => setTab('artwork')}
                >
                    {lang === 'en' ? 'Artwork' : '作品'}
                </button>
                <button
                    className={tab === 'artist' ? 'active' : ''}
                    onClick={() => setTab('artist')}
                >
                    {lang === 'en' ? 'Artist' : '艺术家'}
                </button>
            </div>
            {tab === 'artwork' ? (
                <div className="expand-desc">
                    <img
                        src={artwork.poster_url}
                        alt=""
                        style={{ width: '100%', borderRadius: 8, marginBottom: 12 }}
                    />
                    <div style={{ fontWeight: 700, marginBottom: 6 }}>
                        {lang === 'en' ? artwork.title_en : artwork.title_cn}
                    </div>
                    <div
                        style={{ fontWeight: 400, color: '#47d8fa', marginBottom: 10 }}
                    >
                        {lang === 'en' ? artwork.artist_en : artwork.artist_cn}
                    </div>
                    <div style={{ fontSize: 15, lineHeight: 1.6 }}>
                        {lang === 'en' ? artwork.description_en : artwork.description_cn}
                    </div>
                </div>
            ) : (
                <div className="expand-desc">
                    <div style={{ fontWeight: 700, marginBottom: 8 }}>
                        {lang === 'en' ? artwork.artist_en : artwork.artist_cn}
                    </div>
                    <div style={{ fontSize: 15, lineHeight: 1.65 }}>
                        {lang === 'en'
                            ? artwork.artist_bio_en || '(No artist bio)'
                            : artwork.artist_bio_cn || '(暂无艺术家简介)'}
                    </div>
                </div>
            )}
        </div>
    );
}
