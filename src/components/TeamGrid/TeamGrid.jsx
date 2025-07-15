import React, { useState, useEffect } from 'react';
import './TeamGrid.css';

export default function TeamGrid({ lang = 'en' }) {
    const [members, setMembers] = useState([]);

    const titles = {
        en: 'CinemagicAR Team',
        'zh-Hans': 'CinemagicAR团队成员',
        'zh-Hant': 'CinemagicAR團隊成員',
    };
    const title = titles[lang] || titles.en;

    const langMap = {
        en: 'en',
        'zh-Hans': 'cn',
        'zh-Hant': 'tw',
    };
    const suf = langMap[lang] || 'en';

    useEffect(() => {
        fetch('/data/team.json')
            .then((r) => r.json())
            .then((data) => setMembers(data))
            .catch(console.error);
    }, []);

    const center = members[0];
    const others = members.slice(1, 10);

    const renderOverlay = (member) => (
        <div className="info-overlay">
            <div className="overlay-text">{member.research[suf]}</div>
            <div className="overlay-email">{member.email}</div>
        </div>
    );

    return (
        <section className="team-wrapper">
            <h2 className="team-title">{title}</h2>

            {center && (
                <div className="team-center">
                    <img
                        className="center-avatar"
                        src={center.photo_url}
                        alt={center.name[suf]}
                    />
                    <div className="center-info">
                        <div className="center-pos">{center.position[suf]}</div>
                        <div className="center-name">{center.name[suf]}</div>
                    </div>
                    {renderOverlay(center)}
                </div>
            )}

            <div className="team-grid">
                {others.map((m, i) => (
                    <div key={i} className="team-item">
                        <img
                            className="team-avatar"
                            src={m.photo_url}
                            alt={m.name[suf]}
                        />
                        <div className="team-pos">{m.position[suf]}</div>
                        <div className="team-name">{m.name[suf]}</div>
                        {renderOverlay(m)}
                    </div>
                ))}
            </div>
        </section>
    );
}
