import React, { useState, useEffect } from 'react';
import './News.css';

/* ------------------------------------------------------------------
   SURREALITY press-release – bilingual content fully aligned (zh & en)
------------------------------------------------------------------------ */

const OPENING_IMAGES = [
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/newwebsite/%E5%9B%BE%E7%89%87%201.jpg',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/newwebsite/%E5%9B%BE%E7%89%87%202.jpg',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/newwebsite/%E5%9B%BE%E7%89%87%203.jpg',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/newwebsite/%E5%9B%BE%E7%89%87%204.jpg',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/newwebsite/00005.jpg',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/newwebsite/00006.jpg',
];
const HIGHLIGHT_IMAGES = [
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/newwebsite/00001.jpg',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/newwebsite/00002.png',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/newwebsite/00003.png',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/newwebsite/00004.jpg',
];
const ImageGrid = ({ imgs }) => (
    <div className="image-grid">
        {imgs.map(src => <img key={src} src={src} alt="overview" loading="lazy" />)}
    </div>
);

function Carousel({ imgs, auto = false }) {
    const [idx, setIdx] = useState(0);
    const total = imgs.length;

    useEffect(() => {
        if (!auto) return;
        const id = setInterval(() => setIdx(i => (i + 1) % total), 5000);
        return () => clearInterval(id);
    }, [auto, total]);

    const prev = () => setIdx(i => (i - 1 + total) % total);
    const next = () => setIdx(i => (i + 1) % total);

    return (
        <div className="carousel horizontal-slider">
            <button className="nav prev" onClick={prev} aria-label="prev">‹</button>
            <div className="viewport">
                <div className="track" style={{ transform: `translateX(-${idx * 100}%)` }}>
                    {imgs.map(src => (
                        <img key={src} src={src} alt="slide" loading="lazy" />
                    ))}
                </div>
            </div>
            <button className="nav next" onClick={next} aria-label="next">›</button>
        </div>
    );
}
const content = {
    zh: {
        hero: {
            title: '“SURREALITY·幻实之境”科技艺术展盛大开幕',
            subtitle: '当 AI 与 XR 邂逅人类创造力',
            date: '2025 年 6 月 26 日 — 8 月 26 日',
            bgImage: '/assets/news/hero.jpg',
        },
        sections: [
            /* 0 开幕概览 */
            {

                heading: '开幕概览',
                paragraphs: [
                    '2025 年 6 月 26 日，全球首个大空间扩展现实（XR）人工智能（AI）艺术展 “SURREALITY·幻实之境” 在香港科技大学（广州）隆重开幕。本次展览由港科大（广州）主办，元宇宙与计算创意研究中心（MC²）承办。作为全球首个大规模融合 AI 艺术创作与大空间 XR 的艺术展览，幻实之境应邀纳入 2025 年“中法文化之春”官方系列活动，并获法国驻广州总领事馆及法国文化中心鼎力支持。',
                    '开幕当日共接待 150 余位参与者，其中包括港科大领导、法国领事馆代表、参展艺术家与媒体记者等嘉宾 30 余人，以及百余位公众观众，彰显了展览开放包容与跨领域交流的愿景。',
                ],
                openingCarousel: OPENING_IMAGES,
            },

            /* 1 展览亮点 */
            {
                heading: '展览亮点',
                bullets: [
                    '人工智能（AI）辅助创作：50 余位国际艺术家使用 AI 生成文本、图像、声音与 3D 形态，探索人机共创的无限可能。',
                    '扩展现实（XR）技术：XR 让虚实边界消融，观众佩戴头显即可沉浸式体验场景式互动。',
                    '沉浸式数字体验：结合 XR、大空间定位与智能导览，观众自由穿梭于现实与虚拟之间，感受科技为艺术注入“生命”。',
                ],
                openingCarousel: HIGHLIGHT_IMAGES,
            },

            /* 2 开幕式致辞 */
            {
                heading: '开幕式致辞',
                paragraphs: [
                    '主持人：香港科技大学（广州）计算媒体与艺术（CMA）副教授许丕文。',
                    '倪明选校长致辞：“这不仅是技术革新，更是艺术表达方式的革命——当科技遇见艺术，想象力的边界被无限拓展。”',
                    '信息枢纽院长陈雷教授以“数字人”形象视频致辞，呼应“幻实融合”主题。',
                    'CMA 主任张康教授回顾学域两年成果，强调展览对校内外交流和科研融合的重要性。',
                    '展览总监许彬教授阐释“感知—技术—现实”的策展思路，并介绍 MR 装置区、VR 空间与 SLAM 导览系统。',
                ],
            },

            /* 3 策展人导览 */
            {
                heading: '策展人导览',
                paragraphs: [
                    '策展团队带领嘉宾与媒体深度导览作品，讲解创作背景与技术语境。倪明选校长与多位嘉宾现场体验 XR + AI 装置，并与艺术家交流技术策略。',
                ],
            },

            /* 4 国际艺术家现场感言 */
            {
                heading: '国际艺术家现场感言',
                paragraphs: [
                    '玻利维亚裔电影制片人、AI 艺术家 Violeta Ayala：“看到作品像丝绸一样在空中飞翔，我真的想哭。” 她期待大湾区成为全球创意科技中心。',
                ],
            },

            /* 5 艺术家讲座 I */
            {
                heading: '艺术家讲座 Artist Talk',
                paragraphs: ['六位国际艺术家围绕“创作”与“表达”分享跨媒介灵感与实践。'],
                bullets: [
                    'Jeremy Oury & Michelle Falcon：从建筑投影到 MR 与声音几何。',
                    'Naima Karim：VR 短片《The Anticipation of Rain》结合香氛与多感官叙事。',
                    'Taro Narahara：AI + 材料智能的未来建筑。',
                    'Violeta Ayala：AI 重现南美原住民神话的伦理实践。',
                    'Joey Verbeke & 任珂：T.A.E.L. 探讨“噪声—记忆”循环。',
                    '袁正：从服装到 VR 艺术，构建“共生身体”。',
                ],
            },

            /* 6 圆桌讨论 I */
            {
                heading: '圆桌讨论：未来生态的构建与连接',
                paragraphs: [
                    '在 Ingeborg Reichle 教授主持下，六位艺术家围绕“未来生态”展开深度对话，强调技术需服务情感与内容，并在创作伦理与生态系统构建中承担责任。'
                ],
            },

            /* 7 艺术讲座 II：重写未来的物质与记忆 */
            {
                heading: '艺术讲座 II：重写未来的物质与记忆',
                paragraphs: [
                    '27 日上午论坛聚焦“重写未来的物质与记忆”，六位中国高校学者、艺术家分享跨媒体创作：曹澍探讨“副本”与多维历史想象；RAY LC 通过 XR 与机器人重构文化遗产；张超讨论 AI 与身份认同；谭亮分享算法艺术教学与商业合作；胡芮用游戏引擎探讨金融市场与意识形态；卢思屹剖析 MR 叙事与观众行为互动。',
                ],
            },

            /* 8 圆桌讨论 II：生成与共生 / 模拟与副本 */
            {
                heading: '圆桌讨论 II：生成与共生 & 模拟与副本',
                paragraphs: [
                    '六位艺术家、学者围绕 AI & XR 作为“创作者”与“叙事引擎”展开双场对谈，讨论技术如何扩展艺术主体性、重写历史与未来想象。',
                ],
            },

            /* 9 幻实之间，连接未来 */
            {
                heading: '幻实之间，连接未来',
                paragraphs: [
                    '“SURREALITY·幻实之境”不仅是一次艺术展，更是知识系统、媒介语言与文化生态的交叉实验，以“幻”为感知入口，“实”为现实锚点，描绘未来科技艺术的轮廓与精神。',
                    '📅 展期：2025 年 6 月 26 日 — 8 月 26 日',
                    '📍 地点：香港科技大学（广州）校园内多个空间',
                    '如需参观，请扫描官方微信文章二维码预约。',
                ],
            },
        ],
        acknowledgments: [
            '展览总监｜许彬',
            '策划及执行团队｜赵雅薇、李昊、高沁咏、龙俊坤、李姝玥、梁育齐、毛媛媛、黄绎宁、顾文清、潘东逸杰、陈子轩、张一帅、雷小康、王安芑',
            '志愿者｜蔡文捷、陈泓熹、方凯荣、傅子豪、洪泽生、阮立心、蒋雨洋、李鸣晨、刘博楠、刘诗琪、梁佳欣、门云磊、彭晴、齐振超、孙嘉、王雪彤、许文博、杨思敏、杨小羽、杨泽禹、闫哲、尹智卓、于奥、张骞文、张谱、朱一铭、赵卓然',
            '主办｜香港科技大学（广州）',
            '承办｜元宇宙与计算创意研究中心 (MC²)',
            '支持｜信息枢纽、计算媒体与艺术学域、未来技术学院、XR+AI 协会',
            '特别鸣谢｜香港科技大学（广州）校长倪明选',
        ],
    },

    /* ---------------- English ---------------- */
    en: {
        hero: {
            title: 'HKUST(GZ) Launches Ground-breaking “SURREALITY” Tech-Art Exhibition',
            subtitle: 'Where AI, XR and Human Creativity Collide',
            date: 'June 26 – August 26, 2025',
            bgImage: '/assets/news/hero.jpg',
        },
        sections: [
            {
                heading: 'Opening Overview',
                paragraphs: [
                    'On 26 June 2025, the world’s first large-space XR & AI art exhibition “SURREALITY” opened at The Hong Kong University of Science and Technology (Guangzhou). Co-hosted by HKUST(GZ) and the Center for Metaverse and Computational Creativity (MC²), the show joined the 2025 “Festival Croisements” with support from the Consulate General of France in Guangzhou and the French Cultural Center.',
                    'Over 150 people attended, including university leadership, French diplomats, artists, journalists and the public—underscoring SURREALITY’s openness and cross-disciplinary reach.',
                ],
                openingCarousel: OPENING_IMAGES,
            },

            {
                heading: 'Highlights',
                bullets: [
                    'AI-augmented creativity: 50+ creators use AI to generate text, images, audio and 3D forms, exploring human–machine co-creation.',
                    'Extended Reality: XR blurs physical-digital boundaries, offering immersive, scene-based interaction.',
                    'Immersive experience: XR, large-area tracking and smart guides let visitors roam seamlessly through layered realities.',
                ],
                openingCarousel: HIGHLIGHT_IMAGES,
            },

            {
                heading: 'Opening Speeches',
                paragraphs: [
                    'Moderator: Assoc. Prof. James She (CMA).',
                    'President Lionel Ni: “SURREALITY is a revolution in artistic expression when technology meets art.”',
                    'Dean Lei Chen appeared via digital avatar, echoing the fusion of virtual and real.',
                    'Prof. Kang Zhang reviewed CMA’s growth and the exhibition’s role as a cross-media platform.',
                    'Curator Prof. Pan Hui detailed the show’s multi-space narrative map driven by perception, technology and reality.',
                ],
            },

            {
                heading: 'Curator-led Tour',
                paragraphs: [
                    'The MC² team guided guests and media through each zone, explaining creative context and technical pipelines. President Ni experienced AI-XR installations first-hand and discussed research pathways with artists.',
                ],
            },

            {
                heading: 'Artists on Site',
                paragraphs: [
                    'Bolivian-Australian filmmaker & AI artist Violeta Ayala said: “Seeing my work fly like silk in the air almost made me cry.” She hopes the Greater Bay Area will become a global hub for creative tech.',
                ],
            },

            {
                heading: 'Artist Talks',
                paragraphs: ['Six international creators shared cross-media inspirations around “creation” and “expression.”'],
                bullets: [
                    'Jeremy Oury & Michelle Falcon – From architectural projection to MR & sound geometry.',
                    'Naima Karim – VR short “The Anticipation of Rain” blending scents & multisensory storytelling.',
                    'Taro Narahara – AI + material intelligence for speculative architecture.',
                    'Violeta Ayala – Ethical AI visualisations of indigenous myths.',
                    'Joey Verbeke & Koi Ren – T.A.E.L. cycles noise & memory in recursive narratives.',
                    'Zheng Yuan – From fashion to VR art with “symbiotic bodies.”',
                ],
            },

            {
                heading: 'Roundtable I: Building Future Ecologies',
                paragraphs: [
                    'Moderated by Prof. Ingeborg Reichle, six artists debated AI/XR ethics and aesthetics, asserting that technology must serve content, emotion and sustainable creative ecosystems.',
                ],
            },

            {
                heading: 'Forum II: Rewriting Futures of Matter & Memory',
                paragraphs: [
                    'On 27 June, six Chinese scholars and artists explored algorithms, VR and historical “copies” as devices to rethink materiality and cultural memory.',
                ],
            },

            {
                heading: 'Roundtable II: Generation & Symbiosis / Simulation & Replica',
                paragraphs: [
                    'Two deep-dive panels examined AI & XR as creators and narrative engines—probing how emerging media reshape authorship, history and future imagination.',
                ],
            },

            {
                heading: 'Between Reality and Virtuality',
                paragraphs: [
                    'SURREALITY is more than an exhibition—it is a living experiment in art, knowledge and perception. It asks: how will we feel, think and imagine through machines when surreality becomes baseline reality?',
                    'The exhibition runs 26 June – 26 August 2025 across five curated zones on the HKUST(GZ) campus. Scan the official WeChat QR code to reserve a visit.',
                ],
            },
        ],
        acknowledgments: [
            'Exhibition Director | Prof. Pan Hui',
            'Curatorial Team | Zhao Yawei, Li Hao, Gao Qinyong, Long Junkun, Li Shuyue, Liang Yuqi, Mao Yuanyuan, Huang Yining, Gu Wenqing, Pan Dongyijie, Chen Zixuan, Zhang Yishuai, Lei Xiaokang, Wang Anqi',
            'Volunteers | see Chinese list',
            'Organized by | HKUST(GZ)',
            'Hosted by | MC²',
            'Supported by | Info Hub, CMA, AFT, XR+AI Association',
            'Special Thanks | President Lionel Ni',
        ],
    },
};

/* ------------------------------------------------------------------
   News component
------------------------------------------------------------------------ */
export default function News({ lang = 'en' }) {
    const t = content[lang] || content.en;
    return (
        <main className="news-page">
            <section className="news-hero" style={{ backgroundImage: `url(${t.hero.bgImage})` }}>
                <div className="news-hero__overlay"><h1>{t.hero.title}</h1><h2>{t.hero.subtitle}</h2><p className="news-date">{t.hero.date}</p></div>
            </section>

            {t.sections.map((sec, i) => (
                <section key={i} className="news-section">
                    <h2>{sec.heading}</h2>
                    {sec.openingCarousel && (
                        sec.openingCarousel === HIGHLIGHT_IMAGES ? (
                            <Carousel imgs={sec.openingCarousel} />
                        ) : (
                            <ImageGrid imgs={OPENING_IMAGES} />
                        )
                    )}
                    {sec.paragraphs && sec.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
                    {sec.bullets && <ul className="news-bullets">{sec.bullets.map(b => <li key={b}>{b}</li>)}</ul>}
                </section>
            ))}

            <section className="news-ack"><h2>{lang === 'zh' ? '鸣谢' : 'Acknowledgments'}</h2><ul>{t.acknowledgments.map(a => <li key={a}>{a}</li>)}</ul></section>
        </main>
    );
}
