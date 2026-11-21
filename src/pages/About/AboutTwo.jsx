// src/pages/About/AboutTwo.jsx
import React from 'react';
import ParallaxSection from '../../components/ParallaxSection';
import './AboutTwo.css';

const text = {
    en: {
        heroTitle: 'About SURREALITY',
        heroSubtitle: 'Hong Kong Observation Wheel · Central Harbourfront',
        projectTitle: 'From campus to the harbourfront',
        origin: 'The Center for Metaverse and Computational Creativity (MC²) and the Computational Media and Arts Thrust (CMA) at HKUST (Guangzhou) founded SURREALITY. Professor Pan Hui directs the exhibition.',
        central: 'After exhibitions on the HKUST campuses in Hong Kong and Guangzhou and a stop in Shanghai, the artists turned to the Hong Kong Observation Wheel. In Central, visitors can follow the bow of erhu musician Guogan as his digital figure plays beneath the wheel. A trail of light leads up to dancers inspired by the murals of Dunhuang.',
        source: 'CMA’s Central exhibition announcement (in Chinese)',
        lab: 'MC² Lab',
        thrust: 'Computational Media and Arts',
        teamTitle: 'SURREALITY project team',
        featuredTitle: 'Core Team',
        creditsTitle: 'Staff Credits',
        specialThanks: 'Special Thanks',
    },
    'zh-Hans': {
        heroTitle: '关于幻实之境',
        heroSubtitle: '香港摩天轮 · 中环海滨',
        projectTitle: '从校园到中环海滨',
        origin: '香港科技大学（广州）元宇宙与计算创意研究中心（MC²）与计算媒体与艺术学域（CMA）共同发起了「幻实之境」，由许彬教授担任展览总监。',
        central: '从香港和广州的两座科大校园，到上海东方明珠，再到中环，艺术家随展场选取不同的城市景物。这一次，二胡演奏家果敢的数字化身在摩天轮下运弓，观众的视线沿着一道弧光向上，追随来自敦煌壁画的飞天。',
        source: '阅读 CMA 中环站展览预告',
        lab: 'MC² 实验室',
        thrust: '计算媒体与艺术学域',
        teamTitle: '幻实之境项目团队',
        featuredTitle: '核心团队',
        creditsTitle: '制作团队',
        specialThanks: '特别鸣谢',
    },
    'zh-Hant': {
        heroTitle: '關於幻實之境',
        heroSubtitle: '香港摩天輪 · 中環海濱',
        projectTitle: '從校園到中環海濱',
        origin: '香港科技大學（廣州）元宇宙與計算創意研究中心（MC²）與計算媒體與藝術學域（CMA）共同發起「幻實之境」，由許彬教授擔任展覽總監。',
        central: '從香港和廣州的兩個科大校園，到上海東方明珠，再到中環，藝術家隨展場選取不同的城市景物。這一次，二胡演奏家果敢的數碼化身在摩天輪下運弓，觀眾的目光沿着一道弧光向上，追隨來自敦煌壁畫的飛天。',
        source: '閱讀 CMA 中環站展覽預告',
        lab: 'MC² 實驗室',
        thrust: '計算媒體與藝術學域',
        teamTitle: '幻實之境項目團隊',
        featuredTitle: '核心團隊',
        creditsTitle: '製作團隊',
        specialThanks: '特別鳴謝',
    },
};

const featuredPeople = [
    {
        role: {
            en: 'Exhibition Director',
            'zh-Hans': '展览总监',
            'zh-Hant': '展覽總監',
        },
        nameEn: 'Pan HUI',
        nameZhHans: '许彬',
        nameZhHant: '許彬',
        photo: 'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/3051752581882_.pic_hd.jpg',
        profileUrl: 'https://mc2-lab.space/leader',
    },
    {
        role: {
            en: 'Exhibition Lead / Curatorial Team',
            'zh-Hans': '展览负责人 / 策展团队',
            'zh-Hant': '展覽負責人 / 策展團隊',
        },
        nameEn: 'Hao Li',
        nameZhHans: '李昊',
        nameZhHant: '李昊',
        photo: 'https://surreality-1419044809.cos.ap-hongkong.myqcloud.com/photos/HaoLi.JPG',
    },
    {
        role: {
            en: 'Exhibition Lead / Curatorial Team',
            'zh-Hans': '展览负责人 / 策展团队',
            'zh-Hant': '展覽負責人 / 策展團隊',
        },
        nameEn: 'Shuyue Li',
        nameZhHans: '李姝玥',
        nameZhHant: '李姝玥',
        photo: 'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/WechatIMG15170.jpg',
    },
];

const creditGroups = [
    {
        role: {
            en: 'Exhibition Graphic Design',
            'zh-Hans': '展览平面设计',
            'zh-Hant': '展覽平面設計',
        },
        namesEn: ['Wenjing Mao', 'Yulin Yao'],
        namesZhHans: ['毛雯婧', '姚钰琳'],
        namesZhHant: ['毛雯婧', '姚鈺琳'],
    },
    {
        role: {
            en: 'Administration, Venue and Project Coordination',
            'zh-Hans': '行政统筹、场地与项目协调',
            'zh-Hant': '行政統籌、場地與項目協調',
        },
        namesEn: ['Qinyong Gao', 'Ching Christie Pang'],
        namesZhHans: ['高沁咏', '彭晴'],
        namesZhHant: ['高沁詠', '彭晴'],
    },
    {
        role: {
            en: 'On-site Technical Execution',
            'zh-Hans': '现场技术执行',
            'zh-Hant': '現場技術執行',
        },
        namesEn: ['Yi Zou', 'Jianpeng Ren', 'Ka Man Janet Choi', 'Yuk Hang Tsui'],
        namesZhHans: ['邹一', '任健鹏', '蔡嘉雯', '徐煜衡'],
        namesZhHant: ['鄒一', '任健鵬', '蔡嘉雯', '徐煜衡'],
    },
    {
        role: {
            en: 'Artist Liaison and Coordination',
            'zh-Hans': '艺术家联系与统筹',
            'zh-Hant': '藝術家聯繫與統籌',
        },
        namesEn: ['Hao Li', 'Ruoshan Yang', 'Shuyue Li', 'Runqian Yang', 'Wenqing Gu', 'Ming Yin'],
        namesZhHans: ['李昊', '杨若杉', '李姝玥', '杨润芊', '顾文清', '印名'],
        namesZhHant: ['李昊', '楊若杉', '李姝玥', '楊潤芊', '顧文清', '印名'],
    },
    {
        role: {
            en: 'Forum and Public Programmes',
            'zh-Hans': '论坛与公共项目',
            'zh-Hant': '論壇與公共項目',
        },
        namesEn: ['Qiushi Zhou', 'Yuyang Jiang', 'Yawei Zhao', 'Shuyue Li'],
        namesZhHans: ['周秋实', '蒋雨洋', '赵雅薇', '李姝玥'],
        namesZhHant: ['周秋實', '蔣雨洋', '趙雅薇', '李姝玥'],
    },
    {
        role: {
            en: 'Art and Technical Production',
            'zh-Hans': '艺术与技术制作',
            'zh-Hant': '藝術與技術製作',
        },
        namesEn: [
            'Hao Li',
            'Yuxuan Chen',
            'Shuyue Li',
            'Wenjing Mao',
            'Jinfan Qian',
            'Jianpeng Ren',
            'Yulin Yao',
            'Junliang Chen',
            'Ruoshan Yang',
            'Jiale Hu',
            'Donahao Chen',
        ],
        namesZhHans: ['李昊', '陈聿喧', '李姝玥', '毛雯婧', '钱劲帆', '任健鹏', '姚钰琳', '陈俊良', '杨若杉', '胡佳乐', '陈东濠'],
        namesZhHant: ['李昊', '陳聿喧', '李姝玥', '毛雯婧', '錢勁帆', '任健鵬', '姚鈺琳', '陳俊良', '楊若杉', '胡佳樂', '陳東濠'],
    },
    {
        role: {
            en: 'Publicity and Promotion',
            'zh-Hans': '宣传与推广',
            'zh-Hant': '宣傳與推廣',
        },
        namesEn: ['Shuyue Li', 'Hao Li', 'Wenshu Chen', 'Yennes Sau Wai Cheng', 'Dongyijie Primo Pan', 'Runqian Yang'],
        namesZhHans: ['李姝玥', '李昊', '陈雯姝', '郑秀慧', '潘东逸杰', '杨润芊'],
        namesZhHant: ['李姝玥', '李昊', '陳雯姝', '鄭秀慧', '潘東逸杰', '楊潤芊'],
    },
    {
        role: {
            en: 'Exhibition Coordination and Site Operations',
            'zh-Hans': '布展协调与场务',
            'zh-Hant': '布展協調與場務',
        },
        namesEn: [
            'Weniye Chai',
            'Pui Hei Chan',
            'Yuxuan Chen',
            'Iris Delikoura',
            'Ching Deng',
            'Qinyong Gao',
            'Jiaxun Jiang',
            'Yuyang Jiang',
            'Hao Li',
            'Shuyue Li',
            'Jiaxin Liang',
            'Wenjing Mao',
            'Xiangze Meng',
            'Dongyijie Primo Pan',
            'Ching Christie Pang',
            'Hua Xuan Qin',
            'Yuk Hang Tsui',
            'Xuetong Wang',
            'Ze Wu',
            'Yixuan Xie',
            'Ruoshan Yang',
            'Yulin Yao',
            'Zhizhuo Yin',
            'Ao Yu',
            'Yiming Zhu',
        ],
        namesZhHans: [
            'Weniye Chai',
            'Pui Hei Chan',
            '陈聿喧',
            'Iris Delikoura',
            'Ching Deng',
            '高沁咏',
            'Jiaxun Jiang',
            '蒋雨洋',
            '李昊',
            '李姝玥',
            'Jiaxin Liang',
            '毛雯婧',
            'Xiangze Meng',
            'Dongyijie Primo Pan',
            '彭晴',
            'Hua Xuan Qin',
            '徐煜衡',
            'Xuetong Wang',
            'Ze Wu',
            'Yixuan Xie',
            '杨若杉',
            '姚钰琳',
            'Zhizhuo Yin',
            'Ao Yu',
            'Yiming Zhu',
        ],
        namesZhHant: [
            'Weniye Chai',
            'Pui Hei Chan',
            '陳聿喧',
            'Iris Delikoura',
            'Ching Deng',
            '高沁詠',
            'Jiaxun Jiang',
            '蔣雨洋',
            '李昊',
            '李姝玥',
            'Jiaxin Liang',
            '毛雯婧',
            'Xiangze Meng',
            'Dongyijie Primo Pan',
            '彭晴',
            'Hua Xuan Qin',
            '徐煜衡',
            'Xuetong Wang',
            'Ze Wu',
            'Yixuan Xie',
            '楊若杉',
            '姚鈺琳',
            'Zhizhuo Yin',
            'Ao Yu',
            'Yiming Zhu',
        ],
    },
];

const thanks = [
    {
        en: 'Global Engagement and Communications Office (GECO) @ HKUST',
        'zh-Hans': '环球事务及传讯处（GECO）@ HKUST',
        'zh-Hant': '環球事務及傳訊處（GECO）@ HKUST',
    },
    {
        en: 'Public Affairs Department (PAD) @ HKUST(GZ)',
        'zh-Hans': '公共事务处（PAD）@ HKUST(GZ)',
        'zh-Hant': '公共事務處（PAD）@ HKUST(GZ)',
    },
];

function LocalizedName({ person, locale }) {
    const chineseName = locale === 'zh-Hant' ? person.nameZhHant : person.nameZhHans;

    return (
        <>
            <div className="about-two-name-en">{person.nameEn}</div>
            <div className="about-two-name-zh">{chineseName}</div>
        </>
    );
}

function CreditNames({ group, locale }) {
    const names = { en: group.namesEn, 'zh-Hans': group.namesZhHans, 'zh-Hant': group.namesZhHant };
    return (
        <div className="about-two-credit-names">
            <p>{names[locale].join(locale === 'en' ? ', ' : '、')}</p>
        </div>
    );
}

export default function AboutTwo({ lang = 'en' }) {
    const locale = ['en', 'zh-Hans', 'zh-Hant'].includes(lang) ? lang : 'en';
    const t = text[locale];

    const director = featuredPeople[0];
    const planners = featuredPeople.slice(1);

    return (
        <>
            <div className="about-hero-wrapper about-two-hero-wrapper">
                <ParallaxSection
                    lang={locale}
                    image="/images/central/harbour-poster.webp"
                    title={t.heroTitle}
                    subtitle={t.heroSubtitle}
                    showCta={false}
                    scrollHintTargetId="about-two-project"
                    isParallax
                />
            </div>

            <section id="about-two-project" className="about-two-project" aria-labelledby="about-two-project-title">
                <div className="about-two-project-copy">
                    <h2 id="about-two-project-title">{t.projectTitle}</h2>
                    <p>{t.origin}</p>
                    <p>{t.central}</p>
                    <div className="about-two-project-links">
                        <a href="https://mp.weixin.qq.com/s/mXlgRGcAH5YVrY4zH7PXaA">{t.source}</a>
                        <a href="https://mc2-lab.space/">{t.lab}</a>
                        <a href="https://cma.hkust-gz.edu.cn/">{t.thrust}</a>
                    </div>
                </div>
            </section>

            <section className="about-two-team" aria-labelledby="about-two-team-title">
                <div className="about-two-shell">
                    <header className="about-two-section-header">
                        <p>{t.featuredTitle}</p>
                        <h2 id="about-two-team-title">{t.teamTitle}</h2>
                    </header>

                    <div className="about-two-featured">
                        <article className="about-two-person-card about-two-director" key={director.nameEn}>
                            <a
                                className="about-two-profile-link about-two-profile-link--photo"
                                href={director.profileUrl}
                                aria-label={`${director.nameEn} profile`}
                            >
                                <figure className="about-two-photo-frame">
                                    <img src={director.photo} alt={director.nameEn} />
                                </figure>
                            </a>
                            <div className="about-two-person-info">
                                <p className="about-two-role">{director.role[locale]}</p>
                                <a
                                    className="about-two-profile-link about-two-profile-link--name"
                                    href={director.profileUrl}
                                >
                                    <LocalizedName person={director} locale={locale} />
                                </a>
                            </div>
                        </article>

                        <div className="about-two-planner-branches">
                            {planners.map((person) => (
                                <article className="about-two-person-card about-two-planner" key={person.nameEn}>
                                    <figure className="about-two-photo-frame">
                                        <img src={person.photo} alt={person.nameEn} />
                                    </figure>
                                    <div className="about-two-person-info">
                                        <p className="about-two-role">{person.role[locale]}</p>
                                        <LocalizedName person={person} locale={locale} />
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>

                    <header className="about-two-section-header about-two-section-header--credits">
                        <p>{t.creditsTitle}</p>
                    </header>

                    <div className="about-two-credits">
                        {creditGroups.map((group) => (
                            <article className="about-two-credit-group" key={group.role.en}>
                                <h3>{group.role[locale]}</h3>
                                <CreditNames group={group} locale={locale} />
                            </article>
                        ))}
                    </div>

                    <section className="about-two-thanks" aria-labelledby="about-two-thanks-title">
                        <h2 id="about-two-thanks-title">{t.specialThanks}</h2>
                        <div className="about-two-thanks-list">
                            {thanks.map((item) => (
                                <p key={item.en}>{item[locale]}</p>
                            ))}
                        </div>
                    </section>
                </div>
            </section>
        </>
    );
}
