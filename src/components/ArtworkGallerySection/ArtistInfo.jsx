import React from 'react';
import { t } from '../i18n';

export default function ArtistInfo({ artwork, lang }) {
    return (
        <div className="artist-info">
            {/* 如有 artist_img 字段，可加头像 */}
            {/* <img src={artwork.artist_img_url} alt="artist" className="artist-avatar" /> */}
            <h2>{t(artwork, 'artist', lang)}</h2>
            <p className="artist-bio">
                {t(artwork, 'artist_bio', lang)}
            </p>
        </div>
    );
}
