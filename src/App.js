// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import Modal from 'react-modal';

import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';

import Home from './pages/Home';
import About from './pages/About/About';
import Info from './pages/Info/Info';
import News from './pages/News/News';
import Contact from './pages/Contact/Contact';
import DigitalGarden from './pages/DigitalGarden/DigitalGarden';
import SymbioticRealms from './pages/SymbioticRealms/SymbioticRealms';
import City from './pages/City/City';
import Ocean from './pages/Ocean/Ocean';

if (typeof window !== 'undefined') {
    Modal.setAppElement('#root');
}

export default function App() {
    const [lang, setLang] = useState('en');

    return (
        <BrowserRouter>
            {/* 当路由变化时自动滚到最顶部（window + 各 section 容器） */}
            <ScrollToTop />

            <ParallaxProvider>
                <Header lang={lang} onLangChange={setLang} />

                <Routes>
                    <Route path="/"        element={<Home           lang={lang} />} />
                    <Route path="/about"   element={<About          lang={lang} />} />
                    <Route path="/info"    element={<Info           lang={lang} />} />
                    <Route path="/news"    element={<News           lang={lang} />} />
                    <Route path="/ocean"   element={<Ocean          lang={lang} />} />
                    <Route path="/garden"  element={<DigitalGarden  lang={lang} />} />
                    <Route path="/realms"  element={<SymbioticRealms lang={lang} />} />
                    <Route path="/city"    element={<City           lang={lang} />} />
                    <Route path="/contact" element={<Contact        lang={lang} />} />
                </Routes>
            </ParallaxProvider>
        </BrowserRouter>
    );
}
