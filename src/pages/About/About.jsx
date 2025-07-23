// src/pages/About/About.jsx
import React, { useState, useEffect } from 'react';
import ParallaxSection from '../../components/ParallaxSection';
import TeamGrid from '../../components/TeamGrid/TeamGrid';
import './About.css';
import PanHui from '../PanHui/PanHui.jsx';

/* =============================================================
 * 1. 文案：实验室总览 copy（英文 / 简体 / 繁体）
 * =========================================================== */
const copy = {
    en: {
        intro: [
            `As the Metaverse continues to evolve, its significance in shaping social interactions, educational experiences, and collaborative opportunities is becoming increasingly essential. This digital frontier holds the potential to create prosocial environments where individuals can connect, learn, and innovate, transcending geographical boundaries and fostering inclusivity. By leveraging immersive technologies, the Metaverse can enhance engagement, promote creativity, and facilitate knowledge sharing, ultimately contributing to a more connected and compassionate society.`,
            `Led by Professor Pan Hui—an International Fellow of the Royal Academy of Engineering, Member of Academia Europaea, and IEEE Fellow—the <a href="https://mc2-lab-hkust.netlify.app/" target="_blank" rel="noopener noreferrer">Center for Metaverse and Computational Creativity (MC²)</a> operates at the intersection of immersive technology, Human-Computer Interaction (HCI), social computing, computational social science, and machine learning.`
        ],
        fociTitle: 'Our research is guided by five key foci:',
        foci: [
            'Pushing the Boundaries of Immersive Technologies: We explore the convergence of virtual reality (VR), augmented reality (AR), extended reality (XR), and mixed reality (MR), alongside other transformative technologies that shape the Metaverse.',
            'Social Computing and Prosocial Interactions: We investigate how social computing can enhance prosocial behaviors, fostering trust, engagement, and collaboration within virtual communities.',
            'Generative AI and Large Language Models Techniques: As core technologies driving our research, we focus on developing applicable generative AI and LLM-related techniques for enhancing the interactivity in the Metaverse and broadening the boundaries of higher education.',
            'VR/AR/XR Computer Network: We examine innovative approaches on VR-related network usage that adapt to user needs and environmental conditions, ensuring seamless experiences in the Metaverse.',
            'AI+ Projects: Our AI+ initiative, particularly in education, encompasses three main components: Metaverse classrooms, AI lecturers, and the development of interactive AI lecturers. These projects aim to create immersive, cross-campus learning environments, introduce AI-driven teaching methods, and develop real-time interactive AI lecturers, thereby revolutionizing the educational landscape.'
        ],
        pubs: 'Our group’s work has been published in top-tier venues across computer science and art, including ACM WWW, ACM SIGCOMM, ACM MobiSys, ACM MobiCom, ACM CoNEXT, IEEE INFOCOM, IEEE PerCom, IEEE ICNP, IEEE ICDCS, IJCAI, AAAI, SIGGRAPH, CHI, CSCW, and more.',
        join: 'At MC², we are committed to harnessing these interdisciplinary approaches to create transformative experiences that enrich lives and foster a more connected world. Join us as we navigate the exciting possibilities of the Metaverse and its applications in society.'
    },
    'zh-Hans': {
        intro: [
            '随着元宇宙的不断演进，其在塑造社交互动、教育体验及协作机会方面的重要性日益凸显。这一数字前沿拥有创造互惠环境的潜力，让个体能够连接、学习并创新，超越地理界限并促进包容性。通过利用沉浸式技术，元宇宙可以提升参与度、促进创造力并推动知识分享，最终有助于构建更紧密且富有同理心的社会。',
            '在欧洲工程院国际院士、欧洲学术院成员及 IEEE 院士许彬教授的带领下，<a href="https://mc2-lab-hkust.netlify.app/" target="_blank" rel="noopener noreferrer">元宇宙与计算创意中心（MC²）</a>工作于沉浸式技术、人机交互（HCI）、社会计算、计算社会科学与机器学习的交叉领域，推动前沿研究。'
        ],
        fociTitle: '我们的研究聚焦于五大方向：',
        foci: [
            '突破沉浸式技术的边界：我们探索虚拟现实（VR）、增强现实（AR）、扩展现实（XR）和混合现实（MR）等技术的融合，以及其他塑造元宇宙的变革性技术。',
            '社会计算与互惠互动：我们研究社会计算如何增强互惠行为，在虚拟社群中促进信任、参与和协作。',
            '生成式 AI 与大型语言模型技术：作为推动研究的核心技术，我们专注于开发可应用的生成式 AI 和 LLM 相关技术，以加强元宇宙中的交互性并拓宽高等教育的边界。',
            'VR/AR/XR 网络：我们研究针对 VR 应用的网络使用创新方法，以适应用户需求和环境条件，确保在元宇宙中的无缝体验。',
            'AI+ 项目：我们的 AI+ 计划（特别是教育领域）涵盖元宇宙教室、AI 讲师及互动式 AI 讲师的开发，这些项目旨在创建沉浸式、跨校园的学习环境，引入 AI 驱动的教学方法并开发实时互动 AI 讲师，从而革新教育体验。'
        ],
        pubs: '我们的团队成果已发表于计算机科学与艺术领域的顶级期刊和会议，包括 ACM WWW、ACM SIGCOMM、ACM MobiSys、ACM MobiCom、ACM CoNEXT、IEEE INFOCOM、IEEE PerCom、IEEE ICNP、IEEE ICDCS、IJCAI、AAAI、SIGGRAPH、CHI、CSCW 等等。',
        join: '在 MC²，我们致力于运用这些跨学科方法创造变革性的体验，以丰富人们的生活并促进更紧密的连接。期待您与我们一同探索元宇宙及其在社会中的应用所带来的无限可能。'
    },
    'zh-Hant': {
        intro: [
            '隨著元宇宙的不斷演進，其在塑造社交互動、教育體驗及協作機會方面的重要性日益凸顯。這一數位前沿擁有創造互惠環境的潛力，讓個體能夠連結、學習並創新，超越地理界限並促進包容性。通過利用沉浸式技術，元宇宙可以提升參與度、促進創造力並促進知識分享，最終有助於構建更緊密且富有同理心的社會。',
            '在歐洲工程院國際院士、歐洲學術院成員及 IEEE 院士許彬教授的帶領下，<a href="https://mc2-lab-hkust.netlify.app/" target="_blank" rel="noopener noreferrer">元宇宙與計算創意中心（MC²）</a>工作於沉浸式技術、人機互動（HCI）、社會計算、計算社會科學與機器學習的交叉領域，推動前沿研究。'
        ],
        fociTitle: '我們的研究聚焦於五大方向：',
        foci: [
            '突破沉浸式技術的邊界：我們探索虛擬現實（VR）、增強現實（AR）、擴展現實（XR）和混合現實（MR）等技術的融合，以及其他塑造元宇宙的變革性技術。',
            '社會計算與互惠互動：我們研究社會計算如何增強互惠行為，在虛擬社群中促進信任、參與和協作。',
            '生成式 AI 與大型語言模型技術：作為推動研究的核心技術，我們專注於開發可應用的生成式 AI 和 LLM 相關技術，以加強元宇宙中的交互性並拓寬高等教育的邊界。',
            'VR/AR/XR 網絡：我們研究針對 VR 應用的網絡使用創新方法，以適應用戶需求和環境條件，確保在元宇宙中的無縫體驗。',
            'AI+ 專案：我們的 AI+ 計畫（特別是教育領域）涵蓋元宇宙教室、AI 講師及互動式 AI 讲师的开发，這些項目旨在創建沉浸式、跨校園的學習環境，引入 AI 驅動的教學方法並開發實時互動 AI 讲师，從而革新教育體驗。'
        ],
        pubs: '我們的團隊成果已發表於計算機科學與藝術領域的頂級期刊和會議，包括 ACM WWW、ACM SIGCOMM、ACM MobiSys、ACM MobiCom、ACM CoNEXT、IEEE INFOCOM、IEEE PerCom、IEEE ICNP、IEEE ICDCS、IJCAI、AAAI、SIGGRAPH、CHI、CSCW 等等。',
        join: '在 MC²，我們致力於運用這些跨學科方法創造變革性的體驗，以豐富人們的生活並促進更緊密的連結。期待您與我們一同探索元宇宙及其在社會中的應用所帶來的無限可能。'
    }
};

/* =============================================================
 * 2. 轮播封面图片（桌面 & 移动端通用）
 * =========================================================== */
const desktopCoverImages = [
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/mc2/mc201.jpg',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/mc2/mc201.png',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/mc2/mc203.png'
];
const mobileCoverImages = Array.from({ length: 3 }, (_, i) =>
    `https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/mobile/about/${i +
    1}.png`
);

export default function About({ lang = 'en' }) {
    const locale = ['en', 'zh-Hans', 'zh-Hant'].includes(lang) ? lang : 'en';
    const t = copy[locale];

    // 根据窗口宽度切换封面图
    const [coverImages, setCoverImages] = useState(() =>
        typeof window !== 'undefined' && window.innerWidth <= 768
            ? mobileCoverImages
            : desktopCoverImages
    );

    useEffect(() => {
        const onResize = () => {
            setCoverImages(
                window.innerWidth <= 768 ? mobileCoverImages : desktopCoverImages
            );
        };
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    // 轮播索引
    const [coverIndex, setCoverIndex] = useState(0);
    useEffect(() => {
        setCoverIndex(0);
        const id = setInterval(
            () => setCoverIndex(i => (i + 1) % coverImages.length),
            6000
        );
        return () => clearInterval(id);
    }, [coverImages]);

    return (
        <>
            {/* —— 1. 头图 Parallax —— */}
            <div className="about-hero-wrapper">
                <ParallaxSection
                    image={coverImages[coverIndex]}
                    title={
                        locale === 'en'
                            ? 'MC² at HKUST(GZ)'
                            : locale === 'zh-Hans'
                                ? '香港科技大学(广州) MC² 实验室'
                                : '香港科技大學(广州) MC² 實驗室'
                    }
                    subtitle={
                        locale === 'en'
                            ? 'Center for Metaverse and Computational Creativity'
                            : locale === 'zh-Hans'
                                ? '元宇宙与计算创意中心'
                                : '元宇宙與計算創意中心'
                    }
                    isParallax
                />
            </div>

            {/* —— 2. 团队九宫格 —— */}
            <TeamGrid lang={locale} />

            {/* —— 3. 领航人 Pan Hui 名片 —— */}
            <PanHui lang={locale} />

            {/* —— 4. 实验室详情 —— */}
            <section className="about-wrapper">
                <div className="about-container">
                    {t.intro.map((p, i) => (
                        <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                    ))}

                    <h3>{t.fociTitle}</h3>
                    <ul className="about-list">
                        {t.foci.map(item => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>

                    <p>{t.pubs}</p>
                    <p>{t.join}</p>
                </div>
            </section>
        </>
    );
}
