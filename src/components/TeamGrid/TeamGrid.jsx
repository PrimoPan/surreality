// src/components/TeamGrid/TeamGrid.jsx
import React, { useState, useEffect } from 'react';
import './TeamGrid.css';

export default function TeamGrid({ lang = 'en' }) {
    const [members, setMembers] = useState([]);

    // 语言对应的大标题
    const titles = {
        en: 'Our Team',
        'zh-Hans': '团队成员',
        'zh-Hant': '團隊成員',
    };
    const title = titles[lang] || titles.en;

    // 把 lang 转成我们 JSON 里用的字段
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

    return (
        <section className="team-grid-wrapper">
            <h2 className="team-grid-title">{title}</h2>
            <div className="team-grid">
                {members.map((m, idx) => {
                    const name = m.name[suf] || '';
                    const position = m.position[suf] || '';
                    const research = m.research[suf] || '';
                    return (
                        <div key={idx} className="team-item">
                            <div className="avatar-wrapper">
                                <img
                                    src={m.photo_url}
                                    alt={name}
                                    className="team-avatar"
                                />
                                <div className="team-tooltip">
                                    {research && (
                                        <p className="tooltip-line">
                                            <strong>
                                                {lang === 'en' ? 'Research:' : '研究方向：'}
                                            </strong>
                                            {research}
                                        </p>
                                    )}
                                    <p className="tooltip-line">
                                        <strong>Email：</strong>
                                        <a href={`mailto:${m.email}`}>{m.email}</a>
                                    </p>
                                </div>
                            </div>
                            <div className="team-label">
                                <div className="team-position">{position}</div>
                                <div className="team-name">{name}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
