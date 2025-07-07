import React, { useEffect, useState } from 'react';
import ArtworkCarousel from './ArtworkCarousel';
import './ArtworkGallerySection.css';

export default function ArtworkGallerySection({ lang }) {
    const [artworks, setArtworks] = useState([]);
    const [activeId, setActiveId] = useState(null);

    useEffect(() => {
        fetch('/data/artworks.json')
            .then(res => res.json())
            .then(data => {
                console.log('Loaded artworks:', data); // <=== 重点
                setArtworks(data);
            });
    }, []);


    return (
        <section className="artwork-gallery-section">
            <h1 className="gallery-title">{lang === 'en' ? 'Featured Artworks' : '精选展品'}</h1>
            <ArtworkCarousel
                artworks={artworks}
                lang={lang}
                activeId={activeId}
                onOpen={setActiveId}
            />
        </section>
    );
}
