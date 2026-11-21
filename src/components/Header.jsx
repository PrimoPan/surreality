import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Drawer } from 'antd';
import { Menu, X } from 'lucide-react';
import './Header.css';

const labels = {
    en: { home: 'Home', works: 'Artworks', info: 'Information', visit: 'Visit', agenda: 'Agenda', central: 'Central exhibition', past: 'Past exhibitions', about: 'About us', contact: 'Contact', language: 'Language', menu: 'Menu', close: 'Close menu' },
    'zh-Hans': { home: '首页', works: '展出作品', info: '展览信息', visit: '参观信息', agenda: '日程', central: '中环展览', past: '往届展览', about: '关于我们', contact: '联系我们', language: '语言', menu: '菜单', close: '关闭菜单' },
    'zh-Hant': { home: '首頁', works: '展出作品', info: '展覽資訊', visit: '參觀資訊', agenda: '日程', central: '中環展覽', past: '往屆展覽', about: '關於我們', contact: '聯絡我們', language: '語言', menu: '選單', close: '關閉選單' },
};

const editionMetadata = new Map(Object.entries({
    'surreality-2-0': {
        title: 'SURREALITY 2.0 · Hong Kong & Guangzhou, 2026',
        description: 'The June 2026 SURREALITY exhibition at HKUST and HKUST(GZ). Explore the works, seven exhibition areas and programme.',
    },
    'surreality-1-0': {
        title: 'SURREALITY 1.0 · Guangzhou, 2025',
        description: 'The 2025 SURREALITY exhibition at HKUST(GZ). Explore the works and four exhibition areas.',
    },
}));

export default function Header({ lang, onLangChange }) {
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();
    const edition = pathname.split('/')[1];
    const firstEdition = edition === 'surreality-1-0';
    const secondEdition = edition === 'surreality-2-0';
    const archive = firstEdition || secondEdition;
    useEffect(() => {
        const metadata = editionMetadata.get(edition);
        if (!metadata) return;
        const tag = document.querySelector('meta[name="description"]');
        const originalTitle = document.title;
        const originalDescription = tag?.content;
        document.title = metadata.title;
        if (tag) tag.content = metadata.description;
        return () => {
            document.title = originalTitle;
            if (tag) tag.content = originalDescription;
        };
    }, [edition]);
    const prefix = archive ? `/${edition}` : '';
    const l = labels[lang];
    const links = [
        [prefix || '/', secondEdition ? 'SURREALITY 2.0' : l.home], [prefix + '/info', archive ? l.info : l.works],
        ...(!firstEdition ? [[prefix + '/agenda', secondEdition ? l.agenda : l.visit]] : []),
        [prefix + '/about', l.about], [prefix + '/contact', l.contact],
        ...(archive ? [['/', l.central]] : [['/#past-exhibitions', l.past]]),
        ...(secondEdition ? [['/surreality-1-0', 'SURREALITY 1.0']] : []),
    ];
    const navLinks = links.map(([path, title]) => path.includes('#') ? (
        <Link key={path} to={path} onClick={() => setOpen(false)}>{title}</Link>
    ) : (
        <NavLink key={path} to={path} end onClick={() => setOpen(false)}>{title}</NavLink>
    ));
    const language = (
        <select className="exhibition-lang" value={lang} aria-label={l.language} onChange={e => {
            onLangChange(e.target.value);
            setOpen(false);
        }}>
            <option value="en">English</option>
            <option value="zh-Hans">简体中文</option>
            <option value="zh-Hant">繁體中文</option>
        </select>
    );

    return (
        <>
            <header className={'major-nav exhibition-nav' + (archive ? ' exhibition-nav--archive' : ' exhibition-nav--central')}>
                <div className="nav-logo">
                    <img src="/images/central/hkust-35-nav.webp" alt="HKUST 35" />
                    <div className="vertical" />
                    <img src="/images/central/hkust-gz-nav.webp" alt="HKUST(GZ)" />
                </div>
                <nav className="exhibition-nav__desktop">{navLinks}{language}</nav>
                <button type="button" className="exhibition-menu" aria-label={l.menu} aria-expanded={open} onClick={() => setOpen(true)}><Menu /></button>
            </header>
            <Drawer placement="right" closable={false} onClose={() => setOpen(false)} open={open} width="min(84vw, 340px)"
                styles={{ body: { background: '#0d233b', padding: '1.5rem' } }}>
                <nav className="exhibition-drawer">
                    <button type="button" onClick={() => setOpen(false)} aria-label={l.close}><X /></button>
                    {navLinks}{language}
                </nav>
            </Drawer>
        </>
    );
}
