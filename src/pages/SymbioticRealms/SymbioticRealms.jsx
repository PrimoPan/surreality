// 通用折叠页的复用封装
import ExhibitionSection from '../../components/ExhibitionSection/ExhibitionSection';

export default function SymbioticRealms({ lang }) {
    return (
        <ExhibitionSection
            titleEn="Symbiotic Realms"
            titleZh="共生意境"
            idRange={[10, 15]}   // ← 若作品 ID 另有区间，只改这里
            lang={lang}
        />
    );
}
