import ExhibitionSection from '../../components/ExhibitionSection/ExhibitionSection';

export default function DigitalGarden({ lang }) {
    return (
        <ExhibitionSection
            titleEn="Digital Garden"
            titleZh="数字花园"
            idRange={[3, 9]}   // 数据区间：id 3-10
            lang={lang}
        />
    );
}
