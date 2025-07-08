import React from 'react';
import './PanHui.css';

export default function PanHui({ lang = 'en' }) {
    // 多语言文本
    const t = {
        en: {
            name: 'Professor Pan Hui',
            pos:  'Director, MC2 – HKUST(GZ)',
            bio: `Professor Pan Hui received his PhD from the Computer Laboratory at the University of Cambridge and both his Bachelor and MPhil degrees from the University of Hong Kong. He is a Chair Professor of Computational Media and Arts and Director of the Centre for Metaverse and Computational Creativity at HKUST (Guangzhou), and a Chair Professor of Emerging Interdisciplinary Areas and Director of the HKUST-DT Systems and Media Lab, HKUST.

His research team is highly multicultural with researchers from over 12 countries. From 2008 to 2015 he was a Distinguished Scientist at Telekom Innovation Labs, Germany. He has also conducted research at Intel Research Cambridge and Thomson Paris. His work has been sponsored by Nokia, Deutsche Telekom, Microsoft Research, and China Mobile.

He has published 500+ papers (35 000+ citations) and holds 30 EU/US patents in AR, mobile computing, and data science. He is an International Fellow of the Royal Academy of Engineering, a member of Academia Europaea, an IEEE Fellow, and an ACM Distinguished Scientist. He serves on the INTERPOL Expert Group on Metaverse and the World Economic Forum Global Future Council on the Future of Metaverse.`,
        },
        zh: {
            name: '許彬 教授',
            pos:  '香港科技大學（廣州）MC2 中心主任',
            bio: `許彬教授先後於香港大學獲得學士及哲學碩士，並於劍橋大學計算機實驗室取得博士學位。現任香港科技大學（廣州）計算媒體與藝術講席教授、元宇宙與計算創意中心主任；同時擔任香港科技大學跨領域前沿講席教授及 HKUST-DT Systems and Media Lab 主任。

他的研究團隊成員來自 12 個以上國家。2008–2015 年任德國電信創新實驗室傑出科學家，並曾於 Intel Research Cambridge 及 Thomson Paris 工作。研究獲諾基亞、德國電信、微軟研究院與中國移動等資助。

許教授發表學術論文 500 餘篇、引用逾 35 000 次，擁有 30 項歐美專利（AR、移動計算、數據科學）。他是英國皇家工程院國際院士、歐洲科學院院士、IEEE 會士及 ACM 傑出科學家，並任國際刑警組織元宇宙專家組及世界經濟論壇元宇宙未來全球委員會成員。`,
        },
    }[lang] || {};

    return (
        <section className="main-section panhui-wrapper">
            <div className="panhui-card">
                <div className="panhui-header">
                    <img
                        className="panhui-avatar"
                        src="https://cma.hkust-gz.edu.cn/content/images/2021/10/Hui-Pan_E3F9823_photo-small-.jpg"
                        alt={t.name}
                    />
                    <div className="panhui-title">
                        <h1>
                            <a
                                href="https://panhui.people.ust.hk/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="panhui-link"
                            >
                                {t.name}
                            </a>
                        </h1>
                        <h4>{t.pos}</h4>
                    </div>
                </div>

                <p
                    className="panhui-bio"
                    dangerouslySetInnerHTML={{ __html: t.bio.replace(/\n/g, '<br/>') }}
                />
            </div>
        </section>
    );
}
