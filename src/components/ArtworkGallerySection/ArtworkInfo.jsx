import React from 'react';

export default function ArtworkInfo({ artwork, lang }) {
    return (
        <div className="artwork-info">
            <img
                src={artwork.poster_url}
                alt={lang === 'en' ? artwork.title_en : artwork.title_cn}
                className="artwork-info-img"
            />
            <h2>{lang === 'en' ? artwork.title_en : artwork.title_cn}</h2>
            <h3>{lang === 'en' ? artwork.artist_en : artwork.artist_cn}</h3>
            <p className="artwork-description">
                {lang === 'en' ? artwork.description_en : artwork.description_cn}
            </p>
        </div>
    );
}
