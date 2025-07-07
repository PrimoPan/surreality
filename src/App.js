import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import Modal from 'react-modal';
import News from './pages/News/News';
import Header from './components/Header';
import Home   from './pages/Home';
import About  from './pages/About/About';
import Info from './pages/Info/Info';

if (typeof window !== 'undefined') {
    Modal.setAppElement('#root');
}

export default function App() {
    const [lang, setLang] = useState('en');

    return (
        <BrowserRouter>
            <ParallaxProvider>
                <Header lang={lang} onLangChange={setLang} />
                <Routes>
                    <Route path="/"      element={<Home  lang={lang} />} />
                    <Route path="/about" element={<About lang={lang} />} />
                    <Route path="/info"  element={<Info  lang={lang} />} />
                    <Route path="/news"  element={<News  lang={lang} />} />
                </Routes>
            </ParallaxProvider>
        </BrowserRouter>
    );
}
