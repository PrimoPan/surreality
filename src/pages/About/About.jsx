import React, { useState, useEffect } from 'react';
import ParallaxSection from '../../components/ParallaxSection';
import './About.css';

// 英文与中文文案及实验室官网链接
const copy = {
    en: {
        intro: [
            `As the Metaverse continues to evolve, its significance in shaping social interactions, educational experiences, and collaborative opportunities is becoming increasingly essential. This digital frontier holds the potential to create prosocial environments where individuals can connect, learn, and innovate, transcending geographical boundaries and fostering inclusivity. By leveraging immersive technologies, the Metaverse can enhance engagement, promote creativity, and facilitate knowledge sharing, ultimately contributing to a more connected and compassionate society.`,
            `Led by Professor Pan Hui—an International Fellow of the Royal Academy of Engineering, Member of Academia Europaea, and IEEE Fellow—the <a href="https://mc2-lab-hkust.netlify.app/" target="_blank" rel="noopener noreferrer">Center for Metaverse and Computational Creativity (MC2)</a> operates at the intersection of immersive technology, Human-Computer Interaction (HCI), social computing, computational social science, and machine learning.`
        ],
        fociTitle: 'Our research is guided by five key foci:',
        foci: [
            'Pushing the Boundaries of Immersive Technologies: We explore the convergence of virtual reality (VR), augmented reality (AR), extended reality (XR), and mixed reality (MR), alongside other transformative technologies that shape the Metaverse.',
            'Social Computing and Prosocial Interactions: We investigate how social computing can enhance prosocial behaviors, fostering trust, engagement, and collaboration within virtual communities.',
            'Generative AI and Large Language Models Techniques: As core technologies driving our research, we focus on developing applicable generative AI and LLMs-related techniques for enhancing the interactivity in metaverse and broadening the boundaries of higher education.',
            'VR/AR/XR Computer Network: We examine innovative approaches on VR-related network usage that adapt to user needs and environmental conditions, ensuring seamless experiences in the Metaverse.',
            'AI+ Projects: Our AI+ initiative, particularly in education, encompasses three main components: Metaverse classrooms, AI lecturers, and the development of interactive AI lecturers. These projects aim to create immersive, cross-campus learning environments, introduce AI-driven teaching methods, and develop real-time interactive AI lecturers, thereby revolutionizing the educational landscape.'
        ],
        pubs: 'Our group’s work has been published in top-tier venues across computer science and art, including ACM WWW, ACM SIGCOMM, ACM Mobisys, ACM MobiCom, ACM CoNext, IEEE Infocom, IEEE PerCom, IEEE ICNP, IEEE ICDCS, IJCAI, AAAI, SIGGRAPH, CHI, CSCW, and more.',
        join: 'At MC2, we are committed to harnessing these interdisciplinary approaches to create transformative experiences that enrich lives and foster a more connected world. Join us as we navigate the exciting possibilities of the Metaverse and its applications in society.'
    },
    zh: {
        intro: [
            '隨著元宇宙的不斷演進，其在塑造社交互動、教育體驗及協作機會方面的重要性日益凸顯。這一數位前沿擁有創造互惠環境的潛力，讓個體能夠連結、學習並創新，超越地理界限並促進包容性。通過利用沉浸式技術，元宇宙可以提升參與度、促進創造力並促進知識分享，最終有助於構建更緊密且富有同理心的社會。',
            '在歐洲工程院國際院士、歐洲學術院成員及 IEEE 院士許彬教授的帶領下，<a href="https://mc2-lab-hkust.netlify.app/" target="_blank" rel="noopener noreferrer">元宇宙與計算創意中心（MC2）</a>工作於沉浸式技術、人機互動（HCI）、社會計算、計算社會科學與機器學習的交叉領域，推動前沿研究。'
        ],
        fociTitle: '我們的研究聚焦於五大方向：',
        foci: [
            '突破沉浸式技術的邊界：我們探索虛擬現實（VR）、增強現實（AR）、擴展現實（XR）和混合現實（MR）等技術的融合，以及其他塑造元宇宙的變革性技術。',
            '社會計算與互惠互動：我們研究社會計算如何增強互惠行為，在虛擬社群中促進信任、參與和協作。',
            '生成式 AI 與大型語言模型技術：作為推動研究的核心技術，我們專注於開發可應用的生成式 AI 和 LLM 相關技術，以加強元宇宙中的交互性並拓寬高等教育的邊界。',
            'VR/AR/XR 網路：我們研究針對 VR 應用的網路使用創新方法，以適應用戶需求和環境條件，確保在元宇宙中的無縫體驗。',
            'AI+ 專案：我們的 AI+ 計畫（特別是教育領域）涵蓋元宇宙教室、AI 講師及互動式 AI 講師的開發，這些項目旨在創建沉浸式、跨校園的學習環境，引入 AI 驅動的教學方法並開發實時互動 AI 講師，從而革新教育體驗。'
        ],
        pubs: '我們的團隊成果已發表於計算機科學與藝術領域的頂級期刊和會議，包括 ACM WWW、ACM SIGCOMM、ACM MobiSys、ACM MobiCom、ACM CoNext、IEEE INFOCOM、IEEE PerCom、IEEE ICNP、IEEE ICDCS、IJCAI、AAAI、SIGGRAPH、CHI、CSCW 等等。',
        join: '在 MC2，我們致力於運用這些跨學科方法創造變革性的體驗，以豐富人們的生活並促進更緊密的連結。期待您與我們一同探索元宇宙及其在社會中的應用所帶來的無限可能。'
    }
};

// 轮播用的三张封面图
const coverImages = [
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/mc2/mc201.jpg',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/mc2/mc201.png',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/mc2/mc203.png'
];

export default function About({ lang }) {
    const t = copy[lang] || copy.en;
    const [coverIndex, setCoverIndex] = useState(0);

    // 每 6 秒切换封面
    useEffect(() => {
        const id = setInterval(
            () => setCoverIndex(i => (i + 1) % coverImages.length),
            6000
        );
        return () => clearInterval(id);
    }, []);

    return (
        <>
            {/* 轮播封面：每 6 秒替换 image，禁用文字动画由全局 CSS 控制 */}
            <ParallaxSection
                image={coverImages[coverIndex]}
                title={lang === 'en' ? 'HKUST MC2 Lab' : '香港科技大學 MC2 實驗室'}
                subtitle={lang === 'en' ? 'Center for Metaverse and Computational Creativity' : '元宇宙與計算創意中心'}
                isParallax={true}
            />

            <section className="about-wrapper">
                <div className="about-container">
                    {t.intro.map((para, idx) => (
                        <p key={idx} dangerouslySetInnerHTML={{ __html: para }} />
                    ))}
                    <h3>{t.fociTitle}</h3>
                    <ul className="about-list">
                        {t.foci.map(item => <li key={item}>{item}</li>)}
                    </ul>
                    <p>{t.pubs}</p>
                    <p>{t.join}</p>
                </div>
            </section>
        </>
    );
}
