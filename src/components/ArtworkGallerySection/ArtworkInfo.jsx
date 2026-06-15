import React from 'react';
import { t } from '../i18n';

export default function ArtworkInfo({ artwork, lang }) {
    return (
        <div className="artwork-info">
            <img
                src={artwork.poster_url}
                alt={t(artwork, 'title', lang)}
                className="artwork-info-img"
            />
            <h2>{t(artwork, 'title', lang)}</h2>
            <h3>{t(artwork, 'artist', lang)}</h3>
            <p className="artwork-description">
                {t(artwork, 'description', lang)}
            </p>
        </div>
    );
}
