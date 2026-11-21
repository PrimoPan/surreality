import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
    const { pathname, hash, key } = useLocation();
    const previousPath = useRef(null);

    useLayoutEffect(() => {
        const previousRestoration = window.history.scrollRestoration;
        window.history.scrollRestoration = 'manual';
        return () => { window.history.scrollRestoration = previousRestoration; };
    }, []);

    useLayoutEffect(() => {
        const pathChanged = previousPath.current !== pathname;
        previousPath.current = pathname;
        if ((pathname === '/' && hash) || (pathname === '/about' && hash === '#team')) {
            const section = document.getElementById(hash.slice(1));
            if (section) {
                const scrollToSection = () => section.scrollIntoView({ block: 'start', behavior: 'instant' });
                scrollToSection();
                if (document.readyState !== 'complete') {
                    window.addEventListener('load', scrollToSection, { once: true });
                    return () => window.removeEventListener('load', scrollToSection);
                }
                return;
            }
        }
        // Catalogue artwork dialogs use hash links and retain their list position.
        if (!pathChanged && pathname !== '/') return;

        const docEl = document.scrollingElement || document.documentElement;
        docEl.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.querySelectorAll('div, section').forEach((el) => {
            const style = window.getComputedStyle(el);
            if ((style.overflowY === 'auto' || style.overflowY === 'scroll') &&
                el.scrollHeight > el.clientHeight) {
                el.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }
        });
    }, [pathname, hash, key]);

    return null;
}
