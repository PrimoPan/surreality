import React from 'react';
import './PanHui.css';
import { t as _t } from '../../components/i18n';

export default function PanHui({ lang = 'en' }) {
    /* ========= 文案 ========= */
    const texts = {
        name_en: 'Professor Pan Hui',
        name_cn: '许彬 教授',

        pos_en: 'Director, MC² – HKUST(GZ)',
        pos_cn: '香港科技大学（广州）MC² 中心主任',

        bio_en: `
Professor Pan Hui received his PhD from the Computer Laboratory at the University of Cambridge and both his Bachelor and MPhil degrees from the University of Hong Kong. He is a Chair Professor of Computational Media and Arts and Director of the Centre for Metaverse and Computational Creativity at HKUST (GZ), and a Chair Professor of Emerging Interdisciplinary Areas at HKUST. From 2008 to 2015 he was a Distinguished Scientist at Telekom Innovation Labs, Germany. He has also conducted research at Intel Research Cambridge and Thomson Paris. His work has been sponsored by Nokia, Deutsche Telekom, Microsoft Research, and China Mobile. He has published 500+ papers (35 000+ citations) and holds over 30 EU/US patents in AR, mobile computing, and data science. He is an International Fellow of the Royal Academy of Engineering, a member of Academia Europaea, an IEEE Fellow, and an ACM Distinguished Scientist. He serves on the INTERPOL Expert Group on Metaverse and was a member the World Economic Forum Global Future Council on the Future of Metaverse.
        `.trim(),

        bio_cn: `
许彬教授先后于香港大学获得学士及哲学硕士，并于剑桥大学计算机实验室取得博士学位。现任香港科技大学（广州）计算媒体与艺术讲席教授、元宇宙与计算创意中心主任；同时担任香港科技大学跨领域前沿讲席教授及 HKUST-DT Systems and Media Lab 主任。

他的研究团队成员来自 12 个以上国家。2008–2015 年任德国电信创新实验室杰出科学家，并曾于 Intel Research Cambridge 及 Thomson Paris 工作。研究获诺基亚、德国电信、微软研究院与中国移动等资助。

许教授发表学术论文 500 余篇、引用逾 35 000 次，拥有 30 项欧美专利（AR、移动计算、数据科学）。他是英国皇家工程院国际院士、欧洲科学院院士、IEEE 会士及 ACM 杰出科学家，并任国际刑警组织元宇宙专家组及世界经济论坛元宇宙未来全球委员会成员。
        `.trim(),
    };

    const name = _t(texts, 'name', lang);
    const pos  = _t(texts, 'pos', lang);
    const bio  = _t(texts, 'bio', lang);

    return (
        <section className="main-section panhui-wrapper">
            <div className="panhui-card">
                {/* ===== 头像 + 名称、职称 ===== */}
                <div className="panhui-header">
                    <div className="panhui-avatar">
                        <img
                            src="https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/3051752581882_.pic_hd.jpg"
                            alt={name}
                            loading="lazy"
                        />
                    </div>

                    <div className="panhui-title">
                        <h1>
                            <a
                                href="https://panhui.people.ust.hk/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="panhui-link"
                            >
                                {name}
                            </a>
                        </h1>
                        <h4>{pos}</h4>
                    </div>
                </div>

                {/* ===== 简介 ===== */}
                <p
                    className="panhui-bio"
                    dangerouslySetInnerHTML={{
                        __html: bio.replace(/\n/g, '<br/>'),
                    }}
                />
            </div>
        </section>
    );
}
