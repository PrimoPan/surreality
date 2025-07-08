import ExhibitionSection from '../../components/ExhibitionSection/ExhibitionSection';

export default function City({ lang }) {
    return (
        <ExhibitionSection
            titleEn="Exhibition Area 4: City Of Illusions"
            titleZh="展区四：幻象浮城"
            idRange={[16, 21]}
            lang={lang}
        />
    );
}
