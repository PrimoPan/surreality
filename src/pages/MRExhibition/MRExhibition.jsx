import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import ExhibitionSection from '../../components/ExhibitionSection/ExhibitionSection';

const validAreas = {
    guangzhou: new Set(['1', '2', '3', '4']),
    'hong-kong': new Set(['1', '2', '3']),
};

export default function MRExhibition({ lang, overviewPath = '/info' }) {
    const { campus, area } = useParams();
    const normalizedArea = String(area || '').replace('area-', '');

    if (!validAreas[campus]?.has(normalizedArea)) {
        return <Navigate to={overviewPath} replace />;
    }

    return (
        <ExhibitionSection
            campus={campus}
            area={Number(normalizedArea)}
            lang={lang}
            overviewPath={overviewPath}
        />
    );
}
