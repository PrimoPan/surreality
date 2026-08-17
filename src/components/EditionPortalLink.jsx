import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './EditionPortalLink.css';

const editionContextCopy = {
    en: {
        previous: 'Previous edition',
        current: 'Current edition',
    },
    'zh-Hans': {
        previous: '往届展览',
        current: '当前展览',
    },
    'zh-Hant': {
        previous: '往屆展覽',
        current: '當前展覽',
    },
};

export default function EditionPortalLink({ lang, context, edition, to }) {
    const copy = editionContextCopy[lang] || editionContextCopy.en;

    return (
        <motion.div
            className={`edition-portal${lang === 'en' ? '' : ' edition-portal--cjk'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05, ease: 'easeOut' }}
        >
            <Link className="edition-portal__link" to={to} aria-label={`${copy[context]}: ${edition}`}>
                <span className="edition-portal__context">{copy[context]}</span>
                <span className="edition-portal__edition">
                    {edition}
                    <ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" />
                </span>
            </Link>
        </motion.div>
    );
}
