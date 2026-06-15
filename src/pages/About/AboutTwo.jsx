// src/pages/About/AboutTwo.jsx
import React, { useEffect, useState } from 'react';
import ParallaxSection from '../../components/ParallaxSection';
import './AboutTwo.css';

const desktopCoverImages = [
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/mc2/mc201.jpg',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/mc2/mc201.png',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/mc2/mc203.png',
];

const mobileCoverImages = Array.from(
    { length: 3 },
    (_, i) => `https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/mobile/about/${i + 1}.png`
);

const text = {
    en: {
        heroTitle: 'MC² at HKUST(GZ)',
        heroSubtitle: 'Center for Metaverse and Computational Creativity',
        heroCta: 'Learn About the Lab',
        teamTitle: 'Surreality 2.0 Team',
        featuredTitle: 'Core Team',
        creditsTitle: 'Staff Credits',
        specialThanks: 'Special Thanks',
    },
    'zh-Hans': {
        heroTitle: '香港科技大学(广州) MC² 实验室',
        heroSubtitle: '元宇宙与计算创意中心',
        heroCta: '了解实验室',
        teamTitle: 'Surreality 2.0 团队',
        featuredTitle: '核心团队',
        creditsTitle: '制作团队',
        specialThanks: '特别鸣谢',
    },
    'zh-Hant': {
        heroTitle: '香港科技大學(廣州) MC² 實驗室',
        heroSubtitle: '元宇宙與計算創意中心',
        heroCta: '了解實驗室',
        teamTitle: 'Surreality 2.0 團隊',
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
        namesEn: ['Shuyue Li', 'Hao Li', 'Wenshu Chen', 'Yennes Sau Wai Cheng', 'Primo Dongyijie Pan', 'Runqian Yang'],
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
            'Donaviie Pan',
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
            'Donaviie Pan',
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
            'Donaviie Pan',
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
    const chineseNames = locale === 'zh-Hant' ? group.namesZhHant : group.namesZhHans;

    return (
        <div className="about-two-credit-names">
            <p>{group.namesEn.join(', ')}</p>
            <p>{chineseNames.join('，')}</p>
        </div>
    );
}

export default function AboutTwo({ lang = 'en' }) {
    const locale = ['en', 'zh-Hans', 'zh-Hant'].includes(lang) ? lang : 'en';
    const t = text[locale];

    const [coverImages, setCoverImages] = useState(() =>
        typeof window !== 'undefined' && window.innerWidth <= 768
            ? mobileCoverImages
            : desktopCoverImages
    );

    useEffect(() => {
        const onResize = () => {
            setCoverImages(window.innerWidth <= 768 ? mobileCoverImages : desktopCoverImages);
        };

        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const [coverIndex, setCoverIndex] = useState(0);

    useEffect(() => {
        setCoverIndex(0);
        const id = setInterval(() => {
            setCoverIndex((i) => (i + 1) % coverImages.length);
        }, 6000);

        return () => clearInterval(id);
    }, [coverImages]);

    const director = featuredPeople[0];
    const planners = featuredPeople.slice(1);

    return (
        <>
            <div className="about-hero-wrapper about-two-hero-wrapper">
                <ParallaxSection
                    lang={locale}
                    image={coverImages[coverIndex]}
                    title={t.heroTitle}
                    subtitle={t.heroSubtitle}
                    ctaLabel={t.heroCta}
                    ctaTo="https://mc2-lab.space/"
                    isParallax
                />
            </div>

            <section className="about-two-team" aria-labelledby="about-two-team-title">
                <div className="about-two-shell">
                    <header className="about-two-section-header">
                        <p>{t.featuredTitle}</p>
                        <h2 id="about-two-team-title">{t.teamTitle}</h2>
                    </header>

                    <div className="about-two-featured">
                        <article className="about-two-person-card about-two-director" key={director.nameEn}>
                            <figure className="about-two-photo-frame">
                                <img src={director.photo} alt={director.nameEn} />
                            </figure>
                            <div className="about-two-person-info">
                                <p className="about-two-role">{director.role[locale]}</p>
                                <LocalizedName person={director} locale={locale} />
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
