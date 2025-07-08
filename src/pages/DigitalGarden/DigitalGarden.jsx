import ExhibitionSection from '../../components/ExhibitionSection/ExhibitionSection';

export default function DigitalGarden({ lang }) {
    return (
        <ExhibitionSection
            titleEn="Exhibition Area 2: Digital Garden"
            titleZh="展区二：数字花园"
            idRange={[3, 9]}   // 数据区间：id 3-10
            lang={lang}
        />
    );
}
