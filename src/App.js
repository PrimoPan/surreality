import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';

import Header from './components/Header';
import Home   from './pages/Home';
import About  from './pages/About/About';
import Info from './pages/Info/Info'
// import Info from './pages/Info';  // 如果后续还有信息页，可一并加上

export default function App() {
    const [lang, setLang] = useState('en');   // 默认语言

    return (
        <BrowserRouter>
            <ParallaxProvider>
                {/* 统一的站点导航条 */}
                <Header lang={lang} onLangChange={setLang} />

                {/* 路由出口：只渲染匹配的页面 */}
                <Routes>
                    <Route path="/"       element={<Home  lang={lang} />} />
                    <Route path="/about"  element={<About lang={lang} />} />
                    <Route path="/info" element={<Info  lang={lang} />} />
                    {/* 可以加一个 404：<Route path="*" element={<NotFound />} /> */}
                </Routes>
            </ParallaxProvider>
        </BrowserRouter>
    );
}
