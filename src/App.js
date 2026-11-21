// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import Modal from 'react-modal';

import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';

import Home from './pages/Home';
import SurrealityTwoHome from './pages/SurrealityTwoHome';
import ArchiveAbout from './pages/SurrealityTwo/ArchiveAbout';
import Info from './pages/Info/Info';
import Agenda from './pages/Agenda/Agenda';
import SurrealityOneHome from './pages/SurrealityOneHome';
import SurrealityOneInfo, { archivedZones } from './pages/SurrealityOne/SurrealityOneInfo';
import SurrealityOneAbout from './pages/About/About';
import AboutTwo from './pages/About/AboutTwo';
import ExhibitionSection from './components/ExhibitionSection/ExhibitionSection';
import CentralWorks from './pages/Central/CentralWorks';
import News from './pages/News/News';
import Contact from './pages/Contact/Contact';
import CentralVisit from './pages/Central/CentralVisit';
import DigitalGarden from './pages/DigitalGarden/DigitalGarden';
import SymbioticRealms from './pages/SymbioticRealms/SymbioticRealms';
import City from './pages/City/City';
import Ocean from './pages/Ocean/Ocean';
import MRExhibition from './pages/MRExhibition/MRExhibition';

if (typeof window !== 'undefined') {
    Modal.setAppElement('#root');
}

export default function App() {
    const [lang, setLang] = useState('en');
    useEffect(() => { document.documentElement.lang = lang; }, [lang]);

    return (
        <BrowserRouter>
            {/* 当路由变化时自动滚到最顶部（window + 各 section 容器） */}
            <ScrollToTop />

            <ParallaxProvider>
                <Header lang={lang} onLangChange={setLang} />

                <Routes>
                    <Route path="/"                 element={<Home               lang={lang} />} />
                    <Route path="/surreality-2-0">
                        <Route index element={<SurrealityTwoHome lang={lang} />} />
                        <Route path="about" element={<ArchiveAbout lang={lang} />} />
                        <Route path="info" element={<Info lang={lang} />} />
                        <Route path="agenda" element={<Agenda lang={lang} />} />
                        <Route path="news" element={<News lang={lang} />} />
                        <Route path="contact" element={<Contact lang={lang} />} />
                        {['ocean', 'garden', 'realms', 'city'].map((alias, index) => (
                            <Route key={alias} path={alias} element={
                                <Navigate to={`/surreality-2-0/exhibition/guangzhou/area-${index + 1}`} replace />
                            } />
                        ))}
                        <Route path="exhibition/:campus/:area" element={
                            <MRExhibition lang={lang} overviewPath="/surreality-2-0/info" />
                        } />
                    </Route>
                    <Route path="/surreality-1-0"   element={<SurrealityOneHome  lang={lang} />} />
                    <Route path="/surreality-1-0/info"    element={<SurrealityOneInfo  lang={lang} />} />
                    {archivedZones.map(({ path, label, idRange }) => (
                        <Route key={path} path={path} element={
                            <ExhibitionSection
                                key={path}
                                titleEn={label.en}
                                titleZh={label}
                                idRange={idRange}
                                lang={lang}
                                overviewPath="/surreality-1-0/info"
                            />
                        } />
                    ))}
                    <Route path="/surreality-1-0/about"   element={<SurrealityOneAbout lang={lang} />} />
                    <Route path="/surreality-1-0/contact" element={<Contact            lang={lang} />} />
                    <Route path="/about"            element={<AboutTwo           lang={lang} />} />
                    <Route path="/info"             element={<CentralWorks       lang={lang} />} />
                    <Route path="/news"             element={<News               lang={lang} />} />
                    <Route path="/agenda"           element={<CentralVisit       lang={lang} />} />
                    <Route path="/ocean"            element={<Ocean              lang={lang} />} />
                    <Route path="/garden"           element={<DigitalGarden      lang={lang} />} />
                    <Route path="/realms"           element={<SymbioticRealms     lang={lang} />} />
                    <Route path="/city"             element={<City               lang={lang} />} />
                    <Route path="/exhibition/:campus/:area" element={<MRExhibition lang={lang} />} />
                    <Route path="/contact"          element={<Contact            lang={lang} />} />
                </Routes>
            </ParallaxProvider>
        </BrowserRouter>
    );
}
