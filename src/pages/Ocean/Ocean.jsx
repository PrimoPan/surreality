// Ocean.jsx
import React from 'react';
import ExhibitionSection from '../../components/ExhibitionSection/ExhibitionSection';
import './Ocean.css';

export default function Ocean({ lang }) {
    return (
        <div className="ocean-section">
            <ExhibitionSection
                titleEn="Exhibition Area 1: Ocean Of Origins"
                titleZh="展区一：溯源之海"
                campus="guangzhou"
                area={1}
                lang={lang}
            />
        </div>
    );
}
