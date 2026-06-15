import React from 'react';
import { CalendarDays, Clock3, MapPin, Users } from 'lucide-react';
import './Agenda.css';

const heroImage =
    'https://surreality-1419044809.cos.ap-hongkong.myqcloud.com/photos/photo_01.png';
const guangzhouRegistrationQr = '/images/guangzhou-registration-qr.jpg';

const getLocaleKey = (lang) => {
    if (lang === 'zh-Hant') return 'zhHant';
    if (lang === 'zh-Hans') return 'zhHans';
    return 'en';
};

const text = (value, localeKey) => (
    typeof value === 'string' ? value : value?.[localeKey] || value?.en || ''
);

const copy = {
    en: {
        label: 'English Program Schedule',
        title: 'Agenda',
        subtitle: 'SURREALITY Art Exhibition - Hong Kong & Guangzhou - June 16-18, 2026 - Celebrating HKUST’s 35th Anniversary',
        overviewLabel: 'Agenda overview',
        datesLabel: 'Agenda dates',
        meta: ['3 Days', '2 Campuses', 'Opening, Forum & Tours'],
        guestsKicker: 'Forum & Opening Ceremony',
        guestsTitle: 'Speakers and Guests',
        speakerPanel: 'Roundtable Speakers',
        guestPanel: 'Additional Guests',
    },
    zhHans: {
        label: '活动日程',
        title: '日程',
        subtitle: 'SURREALITY 幻实之境艺术展 - 香港与广州 - 2026年6月16-18日 - 为香港科技大学35周年校庆献礼',
        overviewLabel: '日程概览',
        datesLabel: '日程日期',
        meta: ['3 天', '2 个校区', '开幕式、论坛与导览'],
        guestsKicker: '论坛与开幕式',
        guestsTitle: '发言嘉宾与参会嘉宾',
        speakerPanel: '圆桌发言嘉宾',
        guestPanel: '参加开幕式、论坛活动的其他嘉宾',
    },
    zhHant: {
        label: '活動日程',
        title: '日程',
        subtitle: 'SURREALITY 幻實之境藝術展 - 香港與廣州 - 2026年6月16-18日 - 為香港科技大學35周年校慶獻禮',
        overviewLabel: '日程概覽',
        datesLabel: '日程日期',
        meta: ['3 天', '2 個校區', '開幕式、論壇與導覽'],
        guestsKicker: '論壇與開幕式',
        guestsTitle: '發言嘉賓與參會嘉賓',
        speakerPanel: '圓桌發言嘉賓',
        guestPanel: '參加開幕式、論壇活動的其他嘉賓',
    },
};

const agendaDays = [
    {
        id: 'jun-16',
        navLabel: {
            en: 'Jun 16 Hong Kong',
            zhHans: '6月16日 香港',
            zhHant: '6月16日 香港',
        },
        date: {
            en: 'June 16, 2026',
            zhHans: '2026年6月16日',
            zhHant: '2026年6月16日',
        },
        weekday: {
            en: 'Tuesday',
            zhHans: '星期二',
            zhHant: '星期二',
        },
        city: {
            en: 'Hong Kong',
            zhHans: '香港',
            zhHant: '香港',
        },
        venue: {
            en: 'Tsang Shiu Tim Art Hall, HKUST, near Starbucks',
            zhHans: '香港科技大学曾肇添艺展中心，近 Starbucks',
            zhHant: '香港科技大學曾肇添藝展中心，近 Starbucks',
        },
        summary: {
            en: 'Press conference, exhibition kick-off, artist sharing, and media tour.',
            zhHans: '新闻发布会、展览启动、艺术家分享与媒体导览。',
            zhHant: '新聞發布會、展覽啟動、藝術家分享與媒體導覽。',
        },
        sessions: [
            {
                label: { en: 'Reception', zhHans: '接待', zhHant: '接待' },
                items: [
                    {
                        time: '10:00',
                        title: { en: 'Media reception starts', zhHans: '媒体接待开始', zhHant: '媒體接待開始' },
                    },
                    {
                        time: '10:30',
                        title: { en: 'Event commences', zhHans: '活动开始', zhHant: '活動開始' },
                    },
                ],
            },
            {
                label: { en: 'Opening', zhHans: '开幕环节', zhHant: '開幕環節' },
                items: [
                    {
                        time: '10:31',
                        duration: { en: '3 mins', zhHans: '3 分钟', zhHant: '3 分鐘' },
                        title: { en: 'Welcome address', zhHans: '欢迎致辞', zhHant: '歡迎致辭' },
                        detail: {
                            en: 'Prof. Nancy Ip, HKUST President',
                            zhHans: '叶玉如教授（Prof. Nancy Ip），香港科技大学校长',
                            zhHant: '葉玉如教授（Prof. Nancy Ip），香港科技大學校長',
                        },
                    },
                    {
                        time: '10:34',
                        duration: { en: '3 mins', zhHans: '3 分钟', zhHant: '3 分鐘' },
                        title: { en: 'Opening remarks', zhHans: '开幕致辞', zhHant: '開幕致辭' },
                        detail: {
                            en: 'Prof. Lionel Ni, HKUST(GZ) President',
                            zhHans: '倪明选教授（Prof. Lionel Ni），香港科技大学（广州）校长',
                            zhHant: '倪明選教授（Prof. Lionel Ni），香港科技大學（廣州）校長',
                        },
                    },
                    {
                        time: '10:37',
                        title: { en: 'Exhibition kick-off', zhHans: '展览启动', zhHant: '展覽啟動' },
                        detail: {
                            en: 'Prof. Nancy Ip, Prof. Lionel Ni, and Prof. Pan Hui',
                            zhHans: '叶玉如教授、倪明选教授、许彬教授',
                            zhHant: '葉玉如教授、倪明選教授、許彬教授',
                        },
                    },
                    {
                        time: '10:40',
                        title: { en: 'Group photos', zhHans: '合影', zhHant: '合影' },
                        detail: {
                            en: 'Group Photo 1 with Prof. Nancy Ip, Prof. Lionel Ni, Prof. Pan Hui, Dr. Louis Ng, and four artists. Group Photo 2 with the above guests and VIP guests.',
                            zhHans: '合影 1：叶玉如教授、倪明选教授、许彬教授、Dr. Louis Ng 及四位艺术家。合影 2：上述嘉宾及 VIP 嘉宾。',
                            zhHant: '合影 1：葉玉如教授、倪明選教授、許彬教授、Dr. Louis Ng 及四位藝術家。合影 2：上述嘉賓及 VIP 嘉賓。',
                        },
                    },
                ],
            },
            {
                label: { en: 'Program', zhHans: '活动议程', zhHant: '活動議程' },
                items: [
                    {
                        time: '10:45',
                        duration: { en: '10 mins', zhHans: '10 分钟', zhHant: '10 分鐘' },
                        title: { en: 'Presentation by Prof. Pan Hui', zhHans: '许彬教授主题介绍', zhHant: '許彬教授主題介紹' },
                        detail: {
                            en: 'Chair Professor of Emerging Interdisciplinary Areas, HKUST; Acting Head and Chair Professor, Computational Media and Arts; Director, Center for Metaverse and Computational Creativity, HKUST(GZ)',
                            zhHans: '香港科技大学新兴跨学科领域讲座教授；香港科技大学（广州）计算媒体与艺术学域署理主任及讲座教授；元宇宙与计算创意研究中心主任',
                            zhHant: '香港科技大學新興跨學科領域講座教授；香港科技大學（廣州）計算媒體與藝術學域署理主任及講座教授；元宇宙與計算創意研究中心主任',
                        },
                    },
                    {
                        time: '10:55',
                        duration: { en: '12 mins', zhHans: '12 分钟', zhHant: '12 分鐘' },
                        title: {
                            en: 'Sharing by four invited artists on their artworks',
                            zhHans: '四位受邀艺术家作品分享',
                            zhHant: '四位受邀藝術家作品分享',
                        },
                    },
                    {
                        time: '11:07',
                        duration: { en: '10 mins', zhHans: '10 分钟', zhHant: '10 分鐘' },
                        title: { en: 'Q&A session and VIP tour', zhHans: '问答环节与 VIP 导览', zhHant: '問答環節與 VIP 導覽' },
                    },
                    {
                        time: '11:17',
                        title: {
                            en: 'Press conference ends; media tour begins',
                            zhHans: '新闻发布会结束；媒体导览开始',
                            zhHant: '新聞發布會結束；媒體導覽開始',
                        },
                    },
                    {
                        time: '11:30',
                        title: { en: 'Event ends', zhHans: '活动结束', zhHant: '活動結束' },
                    },
                ],
            },
        ],
    },
    {
        id: 'jun-17',
        navLabel: { en: 'Jun 17 Guangzhou', zhHans: '6月17日 广州', zhHant: '6月17日 廣州' },
        date: { en: 'June 17, 2026', zhHans: '2026年6月17日', zhHant: '2026年6月17日' },
        weekday: { en: 'Wednesday', zhHans: '星期三', zhHant: '星期三' },
        city: { en: 'Guangzhou', zhHans: '广州', zhHant: '廣州' },
        venue: {
            en: 'Opening Ceremony: Student Activity Center C2-102, HKUST(GZ). Forum: Lecture Hall C, HKUST(GZ).',
            zhHans: '开幕式：香港科技大学（广州）学生活动中心 C2-102。论坛：香港科技大学（广州）演讲厅 C。',
            zhHant: '開幕式：香港科技大學（廣州）學生活動中心 C2-102。論壇：香港科技大學（廣州）演講廳 C。',
        },
        summary: {
            en: 'Opening ceremony, guided exhibition visit, artist talks, roundtable, and networking.',
            zhHans: '开幕式、展区导览、艺术家讲座、圆桌讨论与自由交流。',
            zhHant: '開幕式、展區導覽、藝術家講座、圓桌討論與自由交流。',
        },
        registration: {
            title: {
                en: 'Guangzhou Exhibition Area Registration',
                zhHans: '广州展区注册',
                zhHant: '廣州展區註冊',
            },
            note: {
                en: 'Scan the QR code to register for Guangzhou activities only.',
                zhHans: '请扫码注册广州活动，二维码仅用于广州活动注册。',
                zhHant: '請掃碼註冊廣州活動，二維碼僅用於廣州活動註冊。',
            },
            qrImg: guangzhouRegistrationQr,
        },
        sessions: [
            {
                label: { en: 'Opening Ceremony', zhHans: '开幕式', zhHant: '開幕式' },
                items: [
                    { time: '09:30', title: { en: 'Registration', zhHans: '现场签到', zhHant: '現場簽到' } },
                    { time: '10:00', title: { en: 'Opening Speech', zhHans: '开幕致辞', zhHant: '開幕致辭' } },
                    { time: '10:30', title: { en: 'Exhibition Introduction', zhHans: '展览介绍', zhHant: '展覽介紹' } },
                    { time: '11:00', title: { en: 'Guided Exhibition Tour', zhHans: '展区导览', zhHant: '展區導覽' } },
                    { time: '11:15', title: { en: 'Free Exploration of the Exhibition', zhHans: '自由观展', zhHant: '自由觀展' } },
                    { time: '12:15', title: { en: 'Lunch Break', zhHans: '午餐时间', zhHant: '午餐時間' } },
                ],
            },
            {
                label: { en: 'International Forum', zhHans: '国际论坛', zhHant: '國際論壇' },
                items: [
                    { time: '14:00-14:10', title: { en: 'Opening Remarks', zhHans: '开场', zhHant: '開場' } },
                    { time: '14:10-16:00', title: { en: 'Artist Talks', zhHans: '艺术家讲座', zhHant: '藝術家講座' } },
                    { time: '16:00-16:15', title: { en: 'Coffee Break', zhHans: '中场休息', zhHant: '中場休息' } },
                    { time: '16:15-17:40', title: { en: 'Roundtable Discussion', zhHans: '圆桌讨论', zhHant: '圓桌討論' } },
                    { time: '17:40-17:55', title: { en: 'Q&A Session', zhHans: '问答环节', zhHant: '問答環節' } },
                    { time: '17:55-18:00', title: { en: 'Closing Remarks', zhHans: '结束', zhHant: '結束' } },
                    { time: '18:00-18:30', title: { en: 'Networking', zhHans: '自由交流', zhHant: '自由交流' } },
                ],
            },
        ],
    },
    {
        id: 'jun-18',
        navLabel: { en: 'Jun 18 Guangzhou', zhHans: '6月18日 广州', zhHant: '6月18日 廣州' },
        date: { en: 'June 18, 2026', zhHans: '2026年6月18日', zhHant: '2026年6月18日' },
        weekday: { en: 'Thursday', zhHans: '星期四', zhHant: '星期四' },
        city: { en: 'Guangzhou', zhHans: '广州', zhHant: '廣州' },
        venue: {
            en: 'Lecture Hall C, HKUST(GZ)',
            zhHans: '香港科技大学（广州）演讲厅 C',
            zhHant: '香港科技大學（廣州）演講廳 C',
        },
        summary: {
            en: 'Guest lecture, two roundtable discussions, emerging scholars and artists lecture, and exhibition visit.',
            zhHans: '嘉宾讲座、两场圆桌讨论、青年学者与艺术家讲座，以及自由观展。',
            zhHant: '嘉賓講座、兩場圓桌討論、青年學者與藝術家講座，以及自由觀展。',
        },
        sessions: [
            {
                label: { en: 'Forum Program', zhHans: '论坛日程', zhHant: '論壇日程' },
                items: [
                    { time: '08:45-09:00', title: { en: 'Registration', zhHans: '入场签到', zhHant: '入場簽到' } },
                    { time: '09:00-09:40', title: { en: 'Guest Lecture', zhHans: '嘉宾讲座', zhHant: '嘉賓講座' } },
                    { time: '09:40-10:40', title: { en: 'Roundtable Discussion 1', zhHans: '圆桌讨论 1', zhHant: '圓桌討論 1' } },
                    { time: '10:40-11:00', title: { en: 'Coffee Break', zhHans: '中场休息', zhHant: '中場休息' } },
                    {
                        time: '11:00-11:30',
                        title: {
                            en: 'Emerging Scholars and Artists Lecture',
                            zhHans: '青年学者与艺术家讲座',
                            zhHant: '青年學者與藝術家講座',
                        },
                    },
                    { time: '11:30-12:40', title: { en: 'Roundtable Discussion 2', zhHans: '圆桌讨论 2', zhHant: '圓桌討論 2' } },
                    {
                        time: '12:40-14:00',
                        title: {
                            en: 'Lunch Break & Free Exhibition Visit',
                            zhHans: '午餐 + 下午自由观展',
                            zhHant: '午餐 + 下午自由觀展',
                        },
                    },
                ],
            },
        ],
    },
];

const forumSpeakers = [
    {
        en: 'ZHUO Min - Director of International Cooperation and Exchange; Professor, China Academy of Art',
        zhHans: '卓旻 - 中国美术学院国际合作与交流处处长、教授',
        zhHant: '卓旻 - 中國美術學院國際合作與交流處處長、教授',
    },
    {
        en: 'YU Zhen - Professor and Associate Dean, School of Design and Innovation, China Academy of Art',
        zhHans: '于朕 - 中国美术学院创新设计学院副院长、教授',
        zhHant: '于朕 - 中國美術學院創新設計學院副院長、教授',
    },
    {
        en: 'SHEN Kang - Professor and Dean, Jimei Research Institute, Guangzhou Academy of Fine Arts',
        zhHans: '沈康 - 广州美术学院集美研究院院长、教授',
        zhHant: '沈康 - 廣州美術學院集美研究院院長、教授',
    },
    {
        en: 'YANG Nan - Academic Leader of Design, Beijing Institute of Technology, Zhuhai; Director, AIGC Design Innovation Research Center',
        zhHans: '杨南 - 北京理工大学（珠海）设计学科学术带头人、AIGC 设计创新研究中心主任',
        zhHant: '楊南 - 北京理工大學（珠海）設計學科學術帶頭人、AIGC 設計創新研究中心主任',
    },
    {
        en: 'LI Jinya - Associate Professor, School of Architecture and Design, Beijing Jiaotong University',
        zhHans: '李静雅 - 北京交通大学建筑与艺术学院副教授',
        zhHant: '李靜雅 - 北京交通大學建築與藝術學院副教授',
    },
    {
        en: 'HUANG Hairong - Director, Research and Curatorial Department, Guangdong Museum of Art',
        zhHans: '黄海蓉 - 广东美术馆研究策展部主任',
        zhHant: '黃海蓉 - 廣東美術館研究策展部主任',
    },
    {
        en: 'ZHOU Tiange - Research Associate Professor, Future Design School, Beijing Normal University at Zhuhai',
        zhHans: '周天歌 - 北京师范大学（珠海）未来设计学院副研究员',
        zhHant: '周天歌 - 北京師範大學（珠海）未來設計學院副研究員',
    },
    {
        en: 'YU Tongzhou - Lecturer, School of Design Innovation, China Academy of Art; Digital Artist',
        zhHans: '俞同舟 - 中国美术学院创新设计学院教师、数字艺术家',
        zhHant: '俞同舟 - 中國美術學院創新設計學院教師、數字藝術家',
    },
    {
        en: 'LUO Qi - Director and Professor, Guangzhou Museum of Art',
        zhHans: '罗奇 - 广州美术馆馆长、教授',
        zhHant: '羅奇 - 廣州美術館館長、教授',
    },
];

const additionalGuests = [
    {
        en: 'WU Duan - Dean and Professor, Institute of Greater Bay Area, Guangzhou Academy of Fine Arts',
        zhHans: '伍端 - 广州美术学院湾区创新学院院长、教授',
        zhHant: '伍端 - 廣州美術學院灣區創新學院院長、教授',
    },
    {
        en: 'TAN Liang - Professor, Institute of Greater Bay Area, Guangzhou Academy of Fine Arts',
        zhHans: '谭亮 - 广州美术学院湾区创新学院教授',
        zhHant: '譚亮 - 廣州美術學院灣區創新學院教授',
    },
    {
        en: 'HONG Rongman - Director, GAFA Art Museum; Professor, Guangzhou Academy of Fine Arts',
        zhHans: '洪荣满 - 广州美术学院美术馆馆长、教授',
        zhHant: '洪榮滿 - 廣州美術學院美術館館長、教授',
    },
    {
        en: 'WANG Zi - Founder and Director, Shenzhen Biennale of AI Media Art',
        zhHans: '王子 - 深圳人工智能媒体艺术双年展艺术总监、创办人',
        zhHant: '王子 - 深圳人工智能媒體藝術雙年展藝術總監、創辦人',
    },
    {
        en: 'FENG Daquan - Professor, School of Electronic and Information Engineering, Shenzhen University',
        zhHans: '冯大权 - 深圳大学电子与信息工程学院教授',
        zhHant: '馮大權 - 深圳大學電子與信息工程學院教授',
    },
    {
        en: 'ZHANG Hong - Associate Professor, Beijing Institute of Technology, Zhuhai',
        zhHans: '张宏 - 北京理工大学（珠海）副教授',
        zhHant: '張宏 - 北京理工大學（珠海）副教授',
    },
    {
        en: 'SONG Wei - Associate Professor, Beijing Institute of Graphic Communication',
        zhHans: '宋玮 - 北京印刷学院副教授',
        zhHant: '宋瑋 - 北京印刷學院副教授',
    },
    {
        en: 'BI Wei - Associate Professor, Guangdong University of Finance and Economics',
        zhHans: '毕伟 - 广东财经大学副教授',
        zhHant: '畢偉 - 廣東財經大學副教授',
    },
    {
        en: 'KE Pingchuan - Assistant Professor, Hong Kong Shue Yan University',
        zhHans: '柯平川 - 香港树仁大学助理教授',
        zhHant: '柯平川 - 香港樹仁大學助理教授',
    },
    {
        en: 'ZHENG Lizhen - Faculty Member, China Academy of Art',
        zhHans: '郑丽镇 - 中国美术学院教师',
        zhHant: '鄭麗鎮 - 中國美術學院教師',
    },
    {
        en: 'WANG Jinhao - Faculty Member, Guangzhou University',
        zhHans: '王镜皓 - 广州大学教师',
        zhHant: '王鏡皓 - 廣州大學教師',
    },
];

function TimelineItem({ item, localeKey }) {
    return (
        <li className="agenda-timeline-item">
            <div className="agenda-time">
                <span>{item.time}</span>
                {item.duration && <small>{text(item.duration, localeKey)}</small>}
            </div>
            <div className="agenda-dot" aria-hidden="true" />
            <div className="agenda-item-copy">
                <h4>{text(item.title, localeKey)}</h4>
                {item.detail && <p>{text(item.detail, localeKey)}</p>}
            </div>
        </li>
    );
}

function RegistrationCard({ registration, localeKey }) {
    return (
        <aside className="agenda-registration-card">
            <div>
                <h3>{text(registration.title, localeKey)}</h3>
                <p>{text(registration.note, localeKey)}</p>
            </div>
            <img src={registration.qrImg} alt={text(registration.title, localeKey)} />
        </aside>
    );
}

function AgendaDay({ day, localeKey }) {
    return (
        <section className="agenda-day-section" id={day.id} aria-labelledby={`${day.id}-title`}>
            <div className="agenda-day-shell">
                <div className="agenda-day-header">
                    <div>
                        <p className="agenda-day-kicker">{text(day.city, localeKey)}</p>
                        <h2 id={`${day.id}-title`}>{text(day.date, localeKey)}</h2>
                        <p className="agenda-weekday">{text(day.weekday, localeKey)}</p>
                    </div>
                    <div className="agenda-venue">
                        <MapPin size={20} strokeWidth={1.8} />
                        <span>{text(day.venue, localeKey)}</span>
                    </div>
                </div>

                <p className="agenda-summary">{text(day.summary, localeKey)}</p>

                {day.registration && (
                    <RegistrationCard registration={day.registration} localeKey={localeKey} />
                )}

                <div className="agenda-session-grid">
                    {day.sessions.map((session) => (
                        <article className="agenda-session" key={text(session.label, localeKey)}>
                            <h3>{text(session.label, localeKey)}</h3>
                            <ol className="agenda-timeline">
                                {session.items.map((item) => (
                                    <TimelineItem
                                        item={item}
                                        key={`${item.time}-${text(item.title, localeKey)}`}
                                        localeKey={localeKey}
                                    />
                                ))}
                            </ol>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function GuestList({ title, names, localeKey }) {
    return (
        <article className="agenda-guest-panel">
            <h3>{title}</h3>
            <ul>
                {names.map((name) => (
                    <li key={name.en}>{text(name, localeKey)}</li>
                ))}
            </ul>
        </article>
    );
}

export default function Agenda({ lang = 'en' }) {
    const localeKey = getLocaleKey(lang);
    const t = copy[localeKey] || copy.en;

    return (
        <main className="agenda-page" style={{ '--agenda-hero-image': `url(${heroImage})` }}>
            <section className="main-section agenda-hero" aria-labelledby="agenda-title">
                <div className="agenda-hero-bg" aria-hidden="true" />
                <div className="agenda-hero-overlay" aria-hidden="true" />
                <div className="agenda-hero-content">
                    <p className="agenda-program-label">{t.label}</p>
                    <h1 id="agenda-title">{t.title}</h1>
                    <p className="agenda-hero-subtitle">{t.subtitle}</p>
                    <div className="agenda-hero-meta" aria-label={t.overviewLabel}>
                        <span><CalendarDays size={18} /> {t.meta[0]}</span>
                        <span><MapPin size={18} /> {t.meta[1]}</span>
                        <span><Clock3 size={18} /> {t.meta[2]}</span>
                    </div>
                </div>
            </section>

            <nav className="agenda-jump-nav" aria-label={t.datesLabel}>
                {agendaDays.map((day) => (
                    <a href={`#${day.id}`} key={day.id}>{text(day.navLabel, localeKey)}</a>
                ))}
            </nav>

            {agendaDays.map((day) => (
                <AgendaDay day={day} key={day.id} localeKey={localeKey} />
            ))}

            <section className="agenda-guests-section" aria-labelledby="agenda-guests-title">
                <div className="agenda-guests-shell">
                    <div className="agenda-guests-heading">
                        <Users size={24} strokeWidth={1.8} />
                        <div>
                            <p>{t.guestsKicker}</p>
                            <h2 id="agenda-guests-title">{t.guestsTitle}</h2>
                        </div>
                    </div>
                    <div className="agenda-guests-grid">
                        <GuestList title={t.speakerPanel} names={forumSpeakers} localeKey={localeKey} />
                        <GuestList title={t.guestPanel} names={additionalGuests} localeKey={localeKey} />
                    </div>
                </div>
            </section>
        </main>
    );
}
