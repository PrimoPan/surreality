import ExhibitionSection from '../../components/ExhibitionSection/ExhibitionSection';

export default function City({ lang }) {
    return (
        <ExhibitionSection
            titleEn="City of Illusions"
            titleZh="幻象浮城"
            idRange={[16, 21]}
            lang={lang}
        />
    );
}
