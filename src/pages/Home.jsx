import React, { useEffect, useState } from 'react';
import { Parallax } from 'react-scroll-parallax';
import Modal from 'react-modal';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import ParallaxSection from '../components/ParallaxSection';
import './Home.css';

const desktopHeroVideoUrl =
    'https://surreality-1419044809.cos.ap-hongkong.myqcloud.com/video/XR%E5%B1%952.0-%E5%AE%A3%E4%BC%A0%E7%89%87-%E6%97%A0%E9%85%8D%E9%9F%B3%E6%97%A0%E6%A0%87-720p.mov';

const mobileHeroVideoUrl =
    'https://surreality-1419044809.cos.ap-hongkong.myqcloud.com/video/%E7%AB%96%E7%89%88%E5%AE%A3%E4%BC%A0%E7%89%87720P.mp4';

const getHeroVideoUrl = () => {
    if (typeof window === 'undefined') return desktopHeroVideoUrl;

    return window.matchMedia('(max-width: 768px)').matches
        ? mobileHeroVideoUrl
        : desktopHeroVideoUrl;
};

const manifestoBgImage =
    'https://surreality-1419044809.cos.ap-hongkong.myqcloud.com/photos/photo_01.png';
const openCallBgImage =
    'https://surreality-1419044809.cos.ap-hongkong.myqcloud.com/photos/photo_2.png';
const featuredArtistBaseUrl =
    'https://surreality-1419044809.cos.ap-hongkong.myqcloud.com/featured-artists/';
const publicUrl = process.env.PUBLIC_URL || '';
const heroVideoCoverImage = `${publicUrl}/images/hero/home-cos-video-cover.jpg`;
const anniversaryAssetBase = `${publicUrl}/images/anniversary-gift/`;
const anniversaryBgImage = `${anniversaryAssetBase}anniversary-campus-bg.webp`;

const anniversaryInstitutionLogos = [
    { id: 'hkust', src: `${anniversaryAssetBase}hkust-35.png`, alt: 'HKUST 35th Anniversary and The Hong Kong University of Science and Technology' },
    { id: 'hkust-gz', src: `${anniversaryAssetBase}hkust-gz.png`, alt: 'The Hong Kong University of Science and Technology (Guangzhou)' },
    { id: 'mc2', src: `${anniversaryAssetBase}mc2.png`, alt: 'Center for Metaverse and Computational Creativity' },
    { id: 'cma', src: `${anniversaryAssetBase}cma.png`, alt: 'Computational Media and Arts' },
    { id: 'eia', src: `${anniversaryAssetBase}eia.png`, alt: 'Division of Emerging Interdisciplinary Areas' },
];

const manifestoCopy = {
    en: {
        title: 'What is Surreality?',
        paragraphs: [
            'We envision a future where the digital world coexists with the physical world through immersive experiences, until people can no longer fully distinguish reality from the virtual.',
            'Through advanced holographic projection or high-quality head-mounted displays, we will live and interact with virtual objects seamlessly integrated into our surroundings, dissolving the boundaries of the virtual world. We call this entirely new reality Surreality.',
        ],
        quote: 'We call this entirely new reality Surreality.',
        author: '- Pan Hui',
    },
    'zh-Hans': {
        title: '什么是「幻实之境」？',
        paragraphs: [
            '我们设想在未来，数字世界将以沉浸式的方式与实体世界共存，达到让人完全无法分辨真实与虚拟的程度。',
            '通过先进的全息投影技术或高品质的头戴式显示器，我们将与无缝融入周遭环境的虚拟物件共同生活并进行互动，从而消弭虚拟世界的边界。我们将这种全新的现实称之为「幻实之境」。',
        ],
        quote: '我们将这种全新的现实称之为「幻实之境」。',
        author: '- 许彬',
    },
    'zh-Hant': {
        title: '什麼是「幻實之境」？',
        paragraphs: [
            '我們設想在未來，數位世界將以沉浸式的方式與實體世界共存，達到讓人完全無法分辨真實與虛擬的程度。',
            '透過先進的全息投影技術或高品質的頭戴式顯示器，我們將與無縫融入周遭環境的虛擬物件共同生活並進行互動，從而消弭虛擬世界的邊界。我們將這種全新的現實稱之為「幻實之境」。',
        ],
        quote: '我們將這種全新的現實稱之為「幻實之境」。',
        author: '- 許彬',
    },
};

const openCallCopy = {
    en: {
        eyebrow: 'Open Call Overview',
        title: 'International open call across campuses',
        intro: 'New commissions, audience favorites, and internationally shown creators come together.',
        bullets: [
            '50+ works across two campuses, including 40 new commissions and selected classics.',
            '70+ artists from 23 countries and regions.',
            'Creators recognized by the Emmys, Venice Immersive, Lumen Prize, SXSW XR, and more.',
            'Featured works have appeared at MoMA, Tate Modern, Centre Pompidou, ZKM, and other leading institutions.',
        ],
        metrics: [
            { value: '90+', label: 'Submissions' },
            { value: '23', label: 'Countries', prefix: 'from' },
            { value: '~50', label: 'Exhibited Works' },
        ],
    },
    'zh-Hans': {
        eyebrow: '公开征件概览',
        title: '跨校区展开的国际征集',
        intro: '项目汇聚全新创作、经典回归之作，以及具备国际履历的创作者。',
        bullets: [
            '两校区展出 50+ 件作品，包含约 40 件全新创作与精选经典。',
            '70+ 位全球艺术家，来自 23 个国家与地区。',
            '创作者曾获艾美奖、威尼斯沉浸式单元、流明奖、SXSW XR 等认可。',
            '作品曾亮相 MoMA、泰特现代、蓬皮杜中心、ZKM 等重要机构。',
        ],
        metrics: [
            { value: '90+', label: '投稿件数' },
            { value: '23', label: '国家地区', prefix: '来自' },
            { value: '~50', label: '展出作品' },
        ],
    },
    'zh-Hant': {
        eyebrow: '公開徵件概覽',
        title: '跨校區展開的國際徵集',
        intro: '項目匯聚全新創作、經典回歸之作，以及具備國際履歷的創作者。',
        bullets: [
            '兩校區展出 50+ 件作品，包含約 40 件全新創作與精選經典。',
            '70+ 位全球藝術家，來自 23 個國家與地區。',
            '創作者曾獲艾美獎、威尼斯沉浸式單元、流明獎、SXSW XR 等認可。',
            '作品曾亮相 MoMA、泰特現代、龐畢度中心、ZKM 等重要機構。',
        ],
        metrics: [
            { value: '90+', label: '投稿件數' },
            { value: '23', label: '國家地區', prefix: '來自' },
            { value: '~50', label: '展出作品' },
        ],
    },
};

const featuredArtistsCopy = {
    en: {
        eyebrow: 'Featured Artists',
        title: 'Passages into Surreality',
        intro: 'From bio art and cosmic mixed reality to generative spatial drawing and submerged memory, these works frame the exhibition as a field where bodies, algorithms, life, and place begin to overlap.',
        artworkTab: 'Artwork',
        artistTab: 'Artist',
    },
    'zh-Hans': {
        eyebrow: '重点艺术家',
        title: '通往幻实的多重路径',
        intro: '从生物艺术、宇宙尺度的混合现实，到由身体运动生成的空间绘画，以及关于香港记忆的水下重构，这些作品共同勾勒出身体、算法、生命与地方彼此交叠的展览现场。',
        artworkTab: '作品',
        artistTab: '艺术家',
    },
    'zh-Hant': {
        eyebrow: '重點藝術家',
        title: '通往幻實的多重路徑',
        intro: '從生物藝術、宇宙尺度的混合現實，到由身體運動生成的空間繪畫，以及關於香港記憶的水下重構，這些作品共同勾勒出身體、演算法、生命與地方彼此交疊的展覽現場。',
        artworkTab: '作品',
        artistTab: '藝術家',
    },
};

const anniversaryGiftCopy = {
    en: {
        eyebrow: 'A Gift from MC²',
        title: 'Celebrating HKUST’s 35th Anniversary',
        resonance: 'One HKUST, two campuses in resonance',
        hkustLabel: 'HKUST',
        hkustMode: 'Mixed Reality',
        hkustGzLabel: 'HKUST(GZ)',
        hkustGzMode: 'Mixed Reality',
        portalTitle: 'Twin Universe',
        portalMode: 'Virtual Reality',
        description: 'The gateway folds both campuses into a shared MR experience, allowing visitors to move through explorable virtual environments that transcend physical distance.',
        institutionAlt: 'HKUST, HKUST(GZ), MC², Computational Media and Arts, and Division of Emerging Interdisciplinary Areas',
    },
    'zh-Hans': {
        eyebrow: '来自 MC² 的礼物',
        title: '为香港科技大学35周年校庆献礼',
        resonance: '港科大一体，双校互补',
        hkustLabel: 'HKUST',
        hkustMode: '混合现实',
        hkustGzLabel: 'HKUST(GZ)',
        hkustGzMode: '混合现实',
        portalTitle: '双生宇宙',
        portalMode: '虚拟实境',
        description: '大门融入两个校区的 MR 体验中，使参观者能够透过元宇宙在两地可探索的虚拟环境之间无缝穿梭，超越物理距离。',
        institutionAlt: '香港科技大学、香港科技大学（广州）、元宇宙与计算创意研究中心、计算媒体与艺术、交叉学科部',
    },
    'zh-Hant': {
        eyebrow: '來自 MC² 的禮物',
        title: '為香港科技大學35周年校慶獻禮',
        resonance: '港科大一體，雙校互補',
        hkustLabel: 'HKUST',
        hkustMode: '混合現實',
        hkustGzLabel: 'HKUST(GZ)',
        hkustGzMode: '混合現實',
        portalTitle: '雙生宇宙',
        portalMode: '虛擬實境',
        description: '大門融入兩個校區的 MR 體驗中，使參觀者能夠透過元宇宙在兩地可探索的虛擬環境之間無縫穿梭，超越物理距離。',
        institutionAlt: '香港科技大學、香港科技大學（廣州）、元宇宙與計算創意研究中心、計算媒體與藝術、交叉學科部',
    },
};

const featuredArtists = [
    {
        id: 'eduardo-kac',
        tag: 'Bio Art',
        images: [
            `${featuredArtistBaseUrl}01-eduardo-kac-gfp-bunny.png`,
        ],
        en: {
            artist: 'Eduardo Kac',
            artwork: 'GFP Bunny',
            medium: 'Bio art · Genetic engineering · Public discourse',
            summary: 'A landmark work in bio art, centered on Alba, the green fluorescent bunny.',
            artworkText: 'Eduardo Kac’s GFP Bunny is one of the most iconic works in the history of bio art. Centered on Alba, a green fluorescent rabbit, the work brings genetic engineering, life ethics, public debate, and artistic practice into a single cultural event. The transgenic bunny, later echoed across popular culture including The Big Bang Theory, Sherlock, and The Simpsons, returns in this exhibition in a new form.',
            artistText: 'Eduardo Kac is an internationally renowned artist and a pioneer of bio art and telepresence art. He is Professor of Art and Technology Studies at the School of the Art Institute of Chicago. Working across art, technology, and the life sciences, Kac has had a profound influence on the development of technological art and received the Golden Nica at Prix Ars Electronica, often described as a leading honor in new media art.',
        },
        'zh-Hans': {
            artist: 'Eduardo Kac',
            artwork: 'GFP Bunny',
            medium: '生物艺术 · 基因工程 · 公共讨论',
            summary: '生物艺术史上最具标志性的作品之一，以绿色荧光兔 Alba 为核心。',
            artworkText: '国际知名艺术家、被誉为“生物艺术（bio art）先驱”的 Eduardo Kac 的代表作《GFP Bunny》，是生物艺术史上最具标志性的作品之一。作品以名为 Alba 的绿色荧光兔为核心，将基因工程、生命伦理、公众讨论与艺术创作交织在一起，成为生物技术进入当代艺术语境的重要里程碑。这只曾出现在《生活大爆炸》《神探夏洛克》《辛普森一家》等流行文化语境中的转基因兔，也将在此次展览中以全新的形式再次呈现。',
            artistText: 'Kac 现任芝加哥艺术学院（School of the Art Institute of Chicago）艺术与科技研究系教授（Professor, Art and Technology Studies），长期活跃于艺术、科技与生命科学交叉领域，是远程临场艺术（telepresence art）与生物艺术（bio art）的重要先驱之一。他的创作实践与理论对科技艺术的发展产生了深远影响，并曾获得有“新媒体艺术奥斯卡”之称的电子艺术大奖（Prix Ars Electronica）金尼卡奖（Golden Nica）。',
        },
        'zh-Hant': {
            artist: 'Eduardo Kac',
            artwork: 'GFP Bunny',
            medium: '生物藝術 · 基因工程 · 公共討論',
            summary: '生物藝術史上最具標誌性的作品之一，以綠色螢光兔 Alba 為核心。',
            artworkText: '國際知名藝術家、被譽為「生物藝術（bio art）先驅」的 Eduardo Kac 的代表作《GFP Bunny》，是生物藝術史上最具標誌性的作品之一。作品以名為 Alba 的綠色螢光兔為核心，將基因工程、生命倫理、公眾討論與藝術創作交織在一起，成為生物技術進入當代藝術語境的重要里程碑。這隻曾出現在《生活大爆炸》《新世紀福爾摩斯》《辛普森一家》等流行文化語境中的轉基因兔，也將在此次展覽中以全新的形式再次呈現。',
            artistText: 'Kac 現任芝加哥藝術學院（School of the Art Institute of Chicago）藝術與科技研究系教授（Professor, Art and Technology Studies），長期活躍於藝術、科技與生命科學交叉領域，是遠端臨場藝術（telepresence art）與生物藝術（bio art）的重要先驅之一。他的創作實踐與理論對科技藝術的發展產生了深遠影響，並曾獲得有「新媒體藝術奧斯卡」之稱的電子藝術大獎（Prix Ars Electronica）金尼卡獎（Golden Nica）。',
        },
    },
    {
        id: 'eliza-mcnitt',
        tag: 'Cosmic MR',
        images: [
            `${featuredArtistBaseUrl}02-eliza-mcnitt-astra-wide.png`,
            `${featuredArtistBaseUrl}03-eliza-mcnitt-astra-portrait.png`,
        ],
        en: {
            artist: 'Eliza McNitt',
            artwork: 'Astra',
            medium: 'Mixed reality · Space storytelling · Immersive cinema',
            summary: 'A ticket to the stars, carrying viewers from Earth into the depths of the cosmos.',
            artworkText: 'Welcome to ASTRA: a ticket to the stars. This mixed reality experience launches from Earth and travels into the deepest reaches of the cosmos, tracing a journey in search of the essential ingredients for life. Viewers step onto planets and their shadowed moons, exploring possible futures and distant forms of existence.',
            artistText: 'Eliza McNitt is a writer and director, an Emmy Awards finalist, and winner of the Venice Immersive Grand Prize. She has also served as President of the Venice Immersive Jury. Her work explores the meeting point of science and art at cosmic scale. From astronauts to astrophysicists, McNitt works closely with scientists to tell stories about humanity’s deep connection with the universe.',
        },
        'zh-Hans': {
            artist: 'Eliza McNitt',
            artwork: 'Astra',
            medium: '混合现实 · 宇宙叙事 · 沉浸式影像',
            summary: '一张通往群星的门票，带领观众从地球出发，进入宇宙深处。',
            artworkText: '欢迎来到 ASTRA——通往群星的门票。这一混合现实体验将带你从地球出发，前往宇宙最深处，踏上一场寻找宇宙中生命关键要素的旅程。你将踏足行星及其幽暗的卫星，探索未来世界与遥远生命存在的可能。',
            artistText: 'Eliza McNitt 是一位编剧兼导演，曾入围艾美奖（Emmy Awards Finalist），并荣获威尼斯电影节沉浸式单元大奖（Venice Immersive Grand Prize），并曾担任威尼斯电影节沉浸式单元评审团主席（Venice Immersive Jury President）。她的创作探索科学与艺术在宇宙尺度上的交汇。从宇航员到天体物理学家，McNitt 长期与科学家合作，讲述人类与宇宙之间的深层联结。',
        },
        'zh-Hant': {
            artist: 'Eliza McNitt',
            artwork: 'Astra',
            medium: '混合現實 · 宇宙敘事 · 沉浸式影像',
            summary: '一張通往群星的門票，帶領觀眾從地球出發，進入宇宙深處。',
            artworkText: '歡迎來到 ASTRA——通往群星的門票。這一混合現實體驗將帶你從地球出發，前往宇宙最深處，踏上一場尋找宇宙中生命關鍵要素的旅程。你將踏足行星及其幽暗的衛星，探索未來世界與遙遠生命存在的可能。',
            artistText: 'Eliza McNitt 是一位編劇兼導演，曾入圍艾美獎（Emmy Awards Finalist），並榮獲威尼斯電影節沉浸式單元大獎（Venice Immersive Grand Prize），並曾擔任威尼斯電影節沉浸式單元評審團主席（Venice Immersive Jury President）。她的創作探索科學與藝術在宇宙尺度上的交會。從太空人到天體物理學家，McNitt 長期與科學家合作，講述人類與宇宙之間的深層連結。',
        },
    },
    {
        id: 'adam-nash',
        tag: 'Generative Space',
        images: [
            `${featuredArtistBaseUrl}04-adam-nash-abject-space-wide.png`,
            `${featuredArtistBaseUrl}05-adam-nash-abject-space-square.png`,
        ],
        en: {
            artist: 'Adam Nash',
            artwork: 'Abject Space',
            medium: 'Augmented reality · Generative form · Spatial audio',
            summary: 'A large-scale AR work where bodies generate translucent spatial drawings.',
            artworkText: 'Abject Space is a large-scale augmented reality artwork triggered by bodily movement. As viewers move through an architectural volume, each path calls forth translucent three-dimensional forms. Their color, scale, position, and spatialized audio vary from person to person, gradually accumulating into an abstract audiovisual drawing traced by human movement.',
            artistText: 'Adam Nash creates playable art in mixed reality. He is internationally recognized as one of the most original artists working across digital virtual environments, sound art, performance, and extended reality. His practice treats virtual environments as a medium for generative programming, data and motion capture, composition, and live performance. An early innovator in XR performance and exhibition formats, Nash has exhibited and performed at SIGGRAPH, ISEA, 01SJ, the Venice Biennale, the National Gallery of Victoria, and the National Portrait Gallery of Australia, among others.',
        },
        'zh-Hans': {
            artist: 'Adam Nash',
            artwork: 'Abject Space',
            medium: '增强现实 · 生成形态 · 空间音频',
            summary: '由观众身体运动触发生成的大型增强现实作品。',
            artworkText: '《Abject Space》是一件大型增强现实艺术作品，观众通过身体动作与移动触发作品的生成与显现。观众在一个建筑空间体量中移动；每一位观众的行动路径都会触发一系列半透明的三维形态，其色彩、尺度、位置与空间化音频皆因人而异，并逐渐累积成由人体运动轨迹描绘出的抽象视听“绘画”。',
            artistText: 'Adam Nash 创作混合现实中的可玩性艺术。他被国际公认为在数字虚拟环境、声音艺术、表演与扩展现实技术领域最具原创性的艺术家之一。其作品将虚拟环境作为一种媒介，用于生成式编程、数据与动作捕捉、作曲及现场表演。作为扩展现实表演与展览形式的早期创新者，Adam Nash 曾在世界各地的美术馆、艺术节与线上平台展出和演出，包括 SIGGRAPH、ISEA、01SJ、威尼斯双年展、维多利亚国家美术馆以及澳大利亚国家肖像馆等。',
        },
        'zh-Hant': {
            artist: 'Adam Nash',
            artwork: 'Abject Space',
            medium: '擴增實境 · 生成形態 · 空間音訊',
            summary: '由觀眾身體運動觸發生成的大型擴增實境作品。',
            artworkText: '《Abject Space》是一件大型擴增實境藝術作品，觀眾透過身體動作與移動觸發作品的生成與顯現。觀眾在一個建築空間體量中移動；每一位觀眾的行動路徑都會觸發一系列半透明的三維形態，其色彩、尺度、位置與空間化音訊皆因人而異，並逐漸累積成由人體運動軌跡描繪出的抽象視聽「繪畫」。',
            artistText: 'Adam Nash 創作混合現實中的可玩性藝術。他被國際公認為在數位虛擬環境、聲音藝術、表演與延展實境技術領域最具原創性的藝術家之一。其作品將虛擬環境作為一種媒介，用於生成式程式設計、資料與動作捕捉、作曲及現場表演。作為延展實境表演與展覽形式的早期創新者，Adam Nash 曾在世界各地的美術館、藝術節與線上平台展出和演出，包括 SIGGRAPH、ISEA、01SJ、威尼斯雙年展、維多利亞國家美術館以及澳洲國家肖像館等。',
        },
    },
    {
        id: 'water-spirits',
        tag: 'Memory / Heritage',
        images: [
            `${featuredArtistBaseUrl}06-elke-reinhuber-benjamin-seide-awakening-wide.png`,
            `${featuredArtistBaseUrl}07-elke-reinhuber-benjamin-seide-awakening-square.png`,
        ],
        en: {
            artist: 'Elke Reinhuber & Benjamin Seide',
            artwork: 'Awakening the Water Spirits',
            medium: 'Virtual reality · Cultural memory · Heritage reconstruction',
            summary: 'A meditative underwater reimagining of Hong Kong’s Shek Kip Mei Park.',
            artworkText: 'Riding on the back of a giant turtle, viewers enter an underwater reconstruction of Shek Kip Mei Park, reimagined as a submerged dreamscape built from the image-memory of a now-demolished Hong Kong landmark. Once nestled at the foot of Lion Rock, the park’s paths, pastel-tiled fountain, and pavilion become floating underwater remains, appearing and dissolving in shifting blue light. The turtle guides viewers through this sunken world in a meditative flow, where reality and fiction merge and the silent fountain hovers like a relic suspended in time.',
            artistText: 'Benjamin Seide is a media artist, researcher, and educator at Nanyang Technological University in Singapore. His work explores innovative uses of virtual reality and advanced technologies in interpreting cultural heritage. His projects have been shown internationally, including at V&A Digital Futures, ZKM Karlsruhe, and the United Nations Office at Geneva. As a visual effects specialist, he contributed to award-winning films by Wim Wenders, Roman Polanski, and J.J. Abrams, worked on Martin Scorsese’s Hugo, which won the Academy Award for Best Visual Effects, and received Emmy recognition for Game of Thrones. Elke Reinhuber is Associate Professor of Expanded Photography at City University of Hong Kong. Her artistic research focuses on sustainability, emerging technologies, and cultural heritage, and her award-winning works have been exhibited at major institutions and conferences worldwide.',
        },
        'zh-Hans': {
            artist: 'Elke Reinhuber & Benjamin Seide',
            artwork: '唤醒水灵',
            medium: '虚拟现实 · 文化记忆 · 遗产重构',
            summary: '以水下梦境重构香港石硖尾公园的影像记忆。',
            artworkText: '骑乘巨龟之背，您被邀请进入石硖尾公园的水下重构世界，这里被重新构想为一片水下梦境，由这座现已拆除的香港地标建筑的影像记忆所构建而成。这座公园曾依偎在狮子山山麓，其步道、粉彩瓷砖喷泉和凉亭如今化作漂浮的水下遗迹，在变幻的蓝光中若隐若现。龟在这个沉没的世界中引导您，以冥想般的流动动作穿行。在这个想象中的地下世界里，现实与虚构交融：静默的喷泉宛如一件悬停于时光中的遗迹。',
            artistText: 'Benjamin Seide 本宸玮是一位媒体艺术家、研究者及新加坡南洋理工大学的教育者，他的作品探索虚拟现实与先进技术在文化遗产诠释中的创新应用。他的项目曾在国际上展出，包括 V&A 维多利亚和阿尔伯特博物馆数字未来、卡尔斯鲁厄 ZKM 及联合国欧洲总部等场所。作为视觉特效专家，他参与了温·温德斯、罗曼·波兰斯基、J.J. 艾布拉姆斯的获奖电影制作，并为马丁·斯科塞斯的《雨果》贡献了特效，该片获得了奥斯卡最佳视觉效果奖，同时还因《权力的游戏》获得艾美奖荣誉。Elke Reinhuber 莱因胡伯是香港城市大学扩展摄影的副教授。她的艺术研究专注于可持续性、新兴技术与文化遗产。她曾在国际上教学及研究，包括在新加坡南洋理工大学，且其获奖作品在全球重要机构和会议上展出。',
        },
        'zh-Hant': {
            artist: 'Elke Reinhuber & Benjamin Seide',
            artwork: '喚醒水靈',
            medium: '虛擬實境 · 文化記憶 · 遺產重構',
            summary: '以水下夢境重構香港石硤尾公園的影像記憶。',
            artworkText: '騎乘巨龜之背，您被邀請進入石硤尾公園的水下重構世界，這裡被重新構想為一片水下夢境，由這座現已拆除的香港地標建築的影像記憶所構建而成。這座公園曾依偎在獅子山山麓，其步道、粉彩瓷磚噴泉和涼亭如今化作漂浮的水下遺跡，在變幻的藍光中若隱若現。龜在這個沉沒的世界中引導您，以冥想般的流動動作穿行。在這個想像中的地下世界裡，現實與虛構交融：靜默的噴泉宛如一件懸停於時光中的遺跡。',
            artistText: 'Benjamin Seide 本宸瑋是一位媒體藝術家、研究者及新加坡南洋理工大學的教育者，他的作品探索虛擬實境與先進技術在文化遺產詮釋中的創新應用。他的項目曾在國際上展出，包括 V&A 維多利亞和阿爾伯特博物館數位未來、卡爾斯魯厄 ZKM 及聯合國歐洲總部等場所。作為視覺特效專家，他參與了溫·溫德斯、羅曼·波蘭斯基、J.J. 艾布拉姆斯的獲獎電影製作，並為馬丁·史柯西斯的《雨果》貢獻了特效，該片獲得奧斯卡最佳視覺效果獎，同時還因《權力遊戲》獲得艾美獎榮譽。Elke Reinhuber 萊因胡伯是香港城市大學擴展攝影的副教授。她的藝術研究專注於可持續性、新興技術與文化遺產。她曾在國際上教學及研究，包括在新加坡南洋理工大學，且其獲獎作品在全球重要機構和會議上展出。',
        },
    },
];

function getLocalizedArtist(artist, lang) {
    return artist[lang] || artist.en;
}

function FeaturedArtistsSection({ lang }) {
    const copy = featuredArtistsCopy[lang] || featuredArtistsCopy.en;
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [activeTab, setActiveTab] = useState('artwork');
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        featuredArtists.forEach((artist) => {
            artist.images.forEach((src) => {
                const image = new Image();
                image.src = src;
            });
        });
    }, []);

    const openArtist = (artist) => {
        setSelectedArtist(artist);
        setActiveTab('artwork');
        setActiveImageIndex(0);
    };
    const closeArtist = () => setSelectedArtist(null);
    const modalCopy = selectedArtist ? getLocalizedArtist(selectedArtist, lang) : null;
    const modalImage = selectedArtist?.images[activeImageIndex];

    const showPreviousImage = () => {
        if (!selectedArtist) return;
        setActiveImageIndex((index) => (
            index === 0 ? selectedArtist.images.length - 1 : index - 1
        ));
    };
    const showNextImage = () => {
        if (!selectedArtist) return;
        setActiveImageIndex((index) => (
            index === selectedArtist.images.length - 1 ? 0 : index + 1
        ));
    };

    return (
        <section className="main-section home-featured-artists-section" aria-labelledby="featured-artists-title">
            <Parallax speed={-12} className="home-featured-artists-bg" aria-hidden="true">
                <div
                    className="home-featured-artists-bg__image"
                    style={{ backgroundImage: `url(${featuredArtists[1].images[0]})` }}
                />
            </Parallax>
            <div className="home-featured-artists-overlay" />

            <div className="home-featured-artists-content">
                <Parallax speed={-4} className="home-featured-artists-copy home-featured-artists-parallax">
                    <p className="home-featured-artists-eyebrow">{copy.eyebrow}</p>
                    <h2 id="featured-artists-title" className="home-featured-artists-title">
                        {copy.title}
                    </h2>
                    <p className="home-featured-artists-intro">{copy.intro}</p>
                </Parallax>

                <Parallax speed={-7} className="home-featured-artists-wall home-featured-artists-parallax">
                    {featuredArtists.map((artist) => {
                        const artistCopy = getLocalizedArtist(artist, lang);
                        return (
                            <button
                                className="home-featured-artist-tile"
                                key={artist.id}
                                type="button"
                                onClick={() => openArtist(artist)}
                                aria-label={`${artistCopy.artwork}, ${artistCopy.artist}`}
                            >
                                <img src={artist.images[0]} alt="" loading="lazy" />
                                <span className="home-featured-artist-scrim" />
                                <span className="home-featured-artist-meta">
                                    <span className="home-featured-artist-tag">{artist.tag}</span>
                                    <strong>{artistCopy.artwork}</strong>
                                    <span>{artistCopy.artist}</span>
                                </span>
                            </button>
                        );
                    })}
                </Parallax>
            </div>

            <Modal
                isOpen={Boolean(selectedArtist)}
                onRequestClose={closeArtist}
                overlayClassName="featured-artist-modal-overlay"
                className="featured-artist-modal"
                closeTimeoutMS={160}
            >
                {selectedArtist && modalCopy && (
                    <>
                        <div className="featured-artist-modal-media">
                            <img src={modalImage} alt={`${modalCopy.artwork} - ${modalCopy.artist}`} />
                            {selectedArtist.images.length > 1 && (
                                <div className="featured-artist-modal-arrows" aria-label="Artwork images">
                                    <button type="button" onClick={showPreviousImage} aria-label="Previous image">
                                        <ChevronLeft size={20} aria-hidden="true" />
                                    </button>
                                    <button type="button" onClick={showNextImage} aria-label="Next image">
                                        <ChevronRight size={20} aria-hidden="true" />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="featured-artist-modal-copy">
                            <div className="featured-artist-modal-topbar">
                                <div className="featured-artist-modal-tabs" role="tablist" aria-label={copy.eyebrow}>
                                    <button
                                        type="button"
                                        className={activeTab === 'artwork' ? 'is-active' : ''}
                                        onClick={() => setActiveTab('artwork')}
                                        role="tab"
                                        aria-selected={activeTab === 'artwork'}
                                    >
                                        {copy.artworkTab}
                                    </button>
                                    <button
                                        type="button"
                                        className={activeTab === 'artist' ? 'is-active' : ''}
                                        onClick={() => setActiveTab('artist')}
                                        role="tab"
                                        aria-selected={activeTab === 'artist'}
                                    >
                                        {copy.artistTab}
                                    </button>
                                </div>
                                <button
                                    className="featured-artist-modal-close"
                                    type="button"
                                    onClick={closeArtist}
                                    aria-label="Close"
                                >
                                    <X size={20} aria-hidden="true" />
                                </button>
                            </div>

                            <div className="featured-artist-modal-heading">
                                <p>{selectedArtist.tag}</p>
                                <h3>{modalCopy.artwork}</h3>
                                <h4>{modalCopy.artist}</h4>
                                <span>{modalCopy.medium}</span>
                            </div>

                            <div className="featured-artist-modal-body">
                                <p>{activeTab === 'artwork' ? modalCopy.artworkText : modalCopy.artistText}</p>
                            </div>
                        </div>
                    </>
                )}
            </Modal>
        </section>
    );
}

function ManifestoSection({ lang }) {
    const copy = manifestoCopy[lang] || manifestoCopy.en;

    useEffect(() => {
        const image = new Image();
        image.src = manifestoBgImage;
    }, []);

    return (
        <section
            id="home-manifesto"
            className="main-section home-manifesto-section"
            aria-labelledby="surreality-manifesto-title"
        >
            <Parallax speed={-20} className="home-manifesto-bg" aria-hidden="true">
                <div className="home-manifesto-bg__image" style={{ backgroundImage: `url(${manifestoBgImage})` }} />
            </Parallax>
            <div className="home-manifesto-overlay" />

            <div className="home-manifesto-content">
                <Parallax speed={-5} className="home-manifesto-copy">
                    <h2 id="surreality-manifesto-title" className="home-manifesto-title">
                        {copy.title}
                    </h2>
                    <div className="home-manifesto-body">
                        {copy.paragraphs.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </div>
                </Parallax>

                <Parallax speed={-3} className="home-manifesto-quote-wrap">
                    <figure className="home-manifesto-quote">
                        <div className="home-manifesto-quote-mark" aria-hidden="true">
                            “
                        </div>
                        <blockquote>{copy.quote}</blockquote>
                        <figcaption>{copy.author}</figcaption>
                    </figure>
                </Parallax>
            </div>
        </section>
    );
}

function OpenCallSection({ lang }) {
    const copy = openCallCopy[lang] || openCallCopy.en;

    useEffect(() => {
        const image = new Image();
        image.src = openCallBgImage;
    }, []);

    return (
        <section className="main-section home-open-call-section" aria-labelledby="open-call-title">
            <Parallax speed={-14} className="home-open-call-bg" aria-hidden="true">
                <div className="home-open-call-bg__image" style={{ backgroundImage: `url(${openCallBgImage})` }} />
            </Parallax>
            <div className="home-open-call-overlay" />

            <div className="home-open-call-content">
                <Parallax speed={-4} className="home-open-call-copy home-open-call-parallax">
                    <p className="home-open-call-eyebrow">{copy.eyebrow}</p>
                    <h2 id="open-call-title" className="home-open-call-title">
                        {copy.title}
                    </h2>
                    <p className="home-open-call-intro">{copy.intro}</p>
                    <ul className="home-open-call-list">
                        {copy.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                        ))}
                    </ul>
                </Parallax>

                <Parallax speed={-7} className="home-open-call-metrics home-open-call-parallax" aria-label={copy.eyebrow}>
                    {copy.metrics.map((metric) => (
                        <div className="home-open-call-metric" key={metric.label}>
                            {metric.prefix && <span className="home-open-call-metric__prefix">{metric.prefix}</span>}
                            <strong>{metric.value}</strong>
                            <span>{metric.label}</span>
                        </div>
                    ))}
                </Parallax>
            </div>
        </section>
    );
}

function AnniversaryGiftSection({ lang }) {
    const copy = anniversaryGiftCopy[lang] || anniversaryGiftCopy.en;

    useEffect(() => {
        [
            anniversaryBgImage,
            `${anniversaryAssetBase}institutions-strip.png`,
            ...anniversaryInstitutionLogos.map((logo) => logo.src),
        ].forEach((src) => {
            const image = new Image();
            image.src = src;
        });
    }, []);

    return (
        <section className="main-section home-anniversary-section" aria-labelledby="home-anniversary-title">
            <Parallax speed={-16} className="home-anniversary-bg home-anniversary-parallax" aria-hidden="true">
                <div
                    className="home-anniversary-bg__image home-anniversary-bg__image--campus"
                    style={{ backgroundImage: `url(${anniversaryBgImage})` }}
                />
            </Parallax>
            <div className="home-anniversary-overlay" aria-hidden="true" />

            <div className="home-anniversary-content">
                <Parallax speed={-4} className="home-anniversary-heading home-anniversary-parallax">
                    <p className="home-anniversary-eyebrow">{copy.eyebrow}</p>
                    <h2 id="home-anniversary-title">{copy.title}</h2>
                    <p className="home-anniversary-resonance">“{copy.resonance}”</p>
                </Parallax>

                <Parallax speed={-7} className="home-anniversary-universe home-anniversary-parallax">
                    <div className="home-anniversary-campus home-anniversary-campus--left">
                        <strong>{copy.hkustLabel}</strong>
                        <span>{copy.hkustMode}</span>
                    </div>

                    <div className="home-anniversary-bridge" aria-hidden="true">
                        <span className="home-anniversary-arrow home-anniversary-arrow--left" />
                        <span className="home-anniversary-line" />
                        <span className="home-anniversary-arrow home-anniversary-arrow--right" />
                    </div>

                    <div className="home-anniversary-portal">
                        <span className="home-anniversary-portal__shine" />
                        <strong>{copy.portalTitle}</strong>
                        <span>{copy.portalMode}</span>
                    </div>

                    <div className="home-anniversary-campus home-anniversary-campus--right">
                        <strong>{copy.hkustGzLabel}</strong>
                        <span>{copy.hkustGzMode}</span>
                    </div>
                </Parallax>

                <div className="home-anniversary-description">
                    <p>{copy.description}</p>
                </div>

                <div className="home-anniversary-institutions" aria-label={copy.institutionAlt}>
                    <img
                        className="home-anniversary-institutions-strip"
                        src={`${anniversaryAssetBase}institutions-strip.png`}
                        alt={copy.institutionAlt}
                    />
                    <div className="home-anniversary-institutions-grid">
                        {anniversaryInstitutionLogos.map((logo) => (
                            <img src={logo.src} alt={logo.alt} key={logo.id} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function Home({ lang }) {
    const [heroVideoUrl, setHeroVideoUrl] = useState(getHeroVideoUrl);
    const [heroVideoMuted, setHeroVideoMuted] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        const updateHeroVideo = () => {
            setHeroVideoUrl(mediaQuery.matches ? mobileHeroVideoUrl : desktopHeroVideoUrl);
        };

        updateHeroVideo();
        mediaQuery.addEventListener('change', updateHeroVideo);
        return () => mediaQuery.removeEventListener('change', updateHeroVideo);
    }, []);

    return (
        <>
            <section className="main-section fullpage-clamp">
                <ParallaxSection
                    lang={lang}
                    image={heroVideoCoverImage}
                    videoSrc={heroVideoUrl}
                    videoPoster={heroVideoCoverImage}
                    videoPreload="auto"
                    title="SURREALITY"
                    subtitle="See you in Hong Kong & Guangzhou, 2026"
                    isParallax={false}
                    showCta={false}
                    showScrollHint
                    scrollHintTargetId="home-manifesto"
                    contentPlacement="top-left"
                    videoMuted={heroVideoMuted}
                    showAudioToggle
                    onAudioToggle={() => setHeroVideoMuted((muted) => !muted)}
                />
            </section>

            <ManifestoSection lang={lang} />

            <OpenCallSection lang={lang} />

            <FeaturedArtistsSection lang={lang} />

            <AnniversaryGiftSection lang={lang} />
        </>
    );
}
