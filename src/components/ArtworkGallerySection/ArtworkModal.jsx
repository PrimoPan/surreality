import React, { useState } from 'react';
import Modal from 'react-modal';
import ArtworkInfo from './ArtworkInfo';
import ArtistInfo from './ArtistInfo';

export default function ArtworkModal({ artwork, lang, onClose }) {
    const [tab, setTab] = useState('artwork');

    // 安全防御：artwork 为空不渲染内容
    if (!artwork) return null;

    return (
        <Modal
            isOpen={true}
            onRequestClose={onClose}
            overlayClassName="artwork-overlay"
            className="artwork-modal"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={180}
            ariaHideApp={false}   // 防止 SSR 环境警告（可选，入口已 setAppElement 就不用写）
        >
            <div className="artwork-modal-tabs">
                <button
                    className={tab === 'artwork' ? 'active' : ''}
                    onClick={() => setTab('artwork')}
                >
                    {lang === 'en' ? 'Artwork' : '作品'}
                </button>
                <button
                    className={tab === 'artist' ? 'active' : ''}
                    onClick={() => setTab('artist')}
                >
                    {lang === 'en' ? 'Artist' : '艺术家'}
                </button>
                <button className="close-btn" onClick={onClose}>✕</button>
            </div>
            <div className="artwork-modal-content">
                {tab === 'artwork'
                    ? <ArtworkInfo artwork={artwork} lang={lang} />
                    : <ArtistInfo  artwork={artwork} lang={lang} />}
            </div>
        </Modal>
    );
}
