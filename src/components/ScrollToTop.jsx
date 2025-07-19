// src/components/ScrollToTop.jsx
import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        // 1. 把整个 document 滚到最顶
        const docEl = document.scrollingElement || document.documentElement;
        docEl.scrollTo({ top: 0, left: 0, behavior: 'instant' });

        // 2. 扫描所有 div/section，重置它们的滚动
        document.querySelectorAll('div, section').forEach((el) => {
            const style = window.getComputedStyle(el);
            const isScrollable =
                (style.overflowY === 'auto' || style.overflowY === 'scroll') &&
                el.scrollHeight > el.clientHeight;
            if (isScrollable) {
                el.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }
        });
    }, [pathname]);

    return null;
}
