import React from 'react';

export default function ArtistInfo({ artwork, lang }) {
    return (
        <div className="artist-info">
            {/* 如有 artist_img 字段，可加头像 */}
            {/* <img src={artwork.artist_img_url} alt="artist" className="artist-avatar" /> */}
            <h2>{lang === 'en' ? artwork.artist_en : artwork.artist_cn}</h2>
            <p className="artist-bio">
                {lang === 'en' ? artwork.artist_bio_en : artwork.artist_bio_cn}
            </p>
        </div>
    );
}
