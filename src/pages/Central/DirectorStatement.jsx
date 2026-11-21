import React from 'react';

const directorCopy = {
    en: {
        title: ['What is ', 'Surreality?'],
        role: 'Exhibition director',
        paragraphs: [
            'We envision a future where the digital world coexists with the physical world through immersive experiences, until people can no longer fully distinguish reality from the virtual.',
            'Through advanced holographic projection or high-quality head-mounted displays, we will live and interact with virtual objects seamlessly integrated into our surroundings, dissolving the boundaries of the virtual world. We call this entirely new reality Surreality.',
        ],
        author: 'Pan Hui',
    },
    'zh-Hans': {
        title: ['什么是', '「幻实之境」？'],
        role: '展览总监',
        paragraphs: [
            '我们设想在未来，数字世界将以沉浸式的方式与实体世界共存，达到让人完全无法分辨真实与虚拟的程度。',
            '通过先进的全息投影技术或高品质的头戴式显示器，我们将与无缝融入周遭环境的虚拟物件共同生活并进行互动，从而消弭虚拟世界的边界。我们将这种全新的现实称之为「幻实之境」。',
        ],
        author: '许彬',
    },
    'zh-Hant': {
        title: ['什麼是', '「幻實之境」？'],
        role: '展覽總監',
        paragraphs: [
            '我們設想在未來，數位世界將以沉浸式的方式與實體世界共存，達到讓人完全無法分辨真實與虛擬的程度。',
            '透過先進的全息投影技術或高品質的頭戴式顯示器，我們將與無縫融入周遭環境的虛擬物件共同生活並進行互動，從而消弭虛擬世界的邊界。我們將這種全新的現實稱之為「幻實之境」。',
        ],
        author: '許彬',
    },
};

export default function DirectorStatement({ lang }) {
    const copy = directorCopy[lang] || directorCopy.en;
    return (
        <section id="home-manifesto" className="central-statement" aria-labelledby="director-title">
            <div className="central-shell central-statement__inner">
                <h2 id="director-title">{copy.title[0]}<em>{copy.title[1]}</em></h2>
                <picture className="central-statement__portrait">
                    <source media="(max-width: 700px)" srcSet="/images/central/pan-hui-mobile.webp" />
                    <img src="/images/central/pan-hui.webp" alt={copy.author}
                        width="800" height="1210" loading="lazy" />
                </picture>
                <blockquote aria-describedby="director-byline">
                    {copy.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                </blockquote>
                <p id="director-byline" className="central-statement__byline">
                    <strong>{copy.author}</strong><span>{copy.role}</span>
                </p>
            </div>
        </section>
    );
}
