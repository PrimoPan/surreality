/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import './News.css';

/* ------------------------------------------------------------------
   SURREALITY press-release – bilingual content fully aligned (zh & en)
------------------------------------------------------------------------ */

const OPENING_IMAGES = [
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00001.jpg',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00002.jpg',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00003.jpg',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00004.jpg',


];
const HIGHLIGHT_IMAGES_AIAGUMENTED = [
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00005.jpg',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/000061.png',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/000062.png',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/000063.jpg',
];

const HIGHLIGHT_IMAGES_EXTEND = [
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00007.png',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00008.png',
];


const HIGHLIGHT_IMAGES_IMMERSIVE = [
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00009.jpg',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00010.jpg',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00011.jpg',
];

const HIGHLIGHT_IMAGES_ZONE = [
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00012.png',
];

const HIGHLIGHT_IMAGES_CEREMONY = [
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00013.jpg',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00014.jpg',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00015.jpg',

];


const HIGHLIGHT_IMAGES_ARTIST = [
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00016.jpg',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00017.jpg',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00018.jpg',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00019.jpg',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00020.jpg',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00021.jpg',
];

const HIGHLIGHT_IMAGES_TOUR = [
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00022.jpg',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00023.jpg',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00024.jpg',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00025.jpg',
];

const HIGHLIGHT_IMAGES_TALK = [
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00026.jpg',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00027.jpg',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00028.jpg',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00029.jpg',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00030.jpg',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00031.jpg',
];

const HIGHLIGHT_IMAGES_ROUND = [
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00032.jpg',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00033.jpg',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00034.jpg',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00035.jpg',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00036.jpg',
];

const HIGHLIGHT_IMAGES_SATELLITE = [
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00037.jpg',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00038.jpg',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00039.JPG',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00040.JPG',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00041.JPG',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00042.JPG',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00043.JPG',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00044.JPG',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00046.JPG',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00047.JPG',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00048.JPG',
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00049.JPG',

];

const HIGHLIGHT_IMAGES_CODER = [
    'https://surreality-1368275305.cos.ap-guangzhou.myqcloud.com/newswebsite/00053.jpg',
];

const ImageGrid = ({ imgs }) => (
    <div className="image-grid">
        {imgs.map((src, idx) => <img key={src + '-' + idx} src={src} alt="overview" loading="lazy" />)}
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
                heading: '',
                paragraphs: [
                    `近日，<b>全球首个大空间扩展现实（XR）人工智能（AI）艺术展“SURREALITY·幻实之境”</b>在香港科技大学（广州）隆重开幕，展览将持续两个月至8月26日结束。从体验者的感受来看，这是一场代表世界数字艺术最前沿探索的展览，一场赞叹声不绝于耳的体验，一场多学科、多文化、多视角融合共创的盛宴。即使下面的这个视频，和现场相比，也只能展现出一小部分的震撼。`,
                    `本次展览由港科大（广州）主办，元宇宙与计算创意研究中心（MC²）承办。作为<b>全球首个大规模融合AI艺术创作与大空间扩展现实（XR）的艺术展览</b>，幻实之境应邀纳入2025年“中法文化之春”官方系列活动，并获法国驻广州总领事馆及法国文化中心鼎力支持。当日活动共有150余位参与者亲临现场。其中，<b>香港科技大学（广州）领导</b>、<b>法国驻广州总领事馆领事</b>、<b>本次参展艺术家及媒体记者等30余位嘉宾</b>，及百余位公众参会者来到开幕活动现场，彰显了本次活动对公众开放的广度和深度。本次“SURREALITY”艺术展彰显了开放包容的合作精神，以及期望促进科技与文化两个领域更广泛交流的愿景。`,
                ],
                openingCarousel: OPENING_IMAGES,
            },

            /* 1 展览亮点 */
            {
                heading: '展览亮点',
                bullets: [
                    '人工智能（AI）辅助创作：<br/>人工智能（AI）正成为艺术创作的重要伙伴，越来越多的艺术家通过AI生成文本、图像与音频乃至三维内容，探索“人机共创”的无限可能。如观众所见，展区中来自全球50余位艺术家大多在创作中引入AI技术，大胆重构艺术创作方法和表现形式，拓展艺术的边界。',
                    '扩展现实（XR）技术：<br/>通过融合XR技术，艺术作品得以在多维空间中呈现，模糊了现实与虚拟之间的边界。观众佩戴头显即可进入虚拟场景或在现实场景之中无缝融合虚拟内容，沉浸式体验艺术与科技交融的奇妙氛围。创作团队利用实时渲染与XR技术，打造具象化的“场景式”体验，进一步增强了互动性与代入感。',
                    '沉浸式数字艺术体验：<br/>本次展览结合扩展现实（XR）、大空间定位与智能导览系统，为观众构建出身临其境的观展体验。观众可自由穿梭于现实与虚拟之间，亲身感受科技如何为艺术注入“生命”。这种沉浸式体验让人仿佛置身于一个“混合生命体”之中，亲历艺术与科技深度融合的视觉盛宴，开启对未来艺术与生活的无限畅想。',
                ],
                carousels: [HIGHLIGHT_IMAGES_AIAGUMENTED, HIGHLIGHT_IMAGES_EXTEND, HIGHLIGHT_IMAGES_IMMERSIVE],
            },
            /* 新增：展区介绍 */
            {
                heading: '展区导览：穿越幻实的四重景观',
                paragraphs: [
                    '<b>四大展区叙事</b>：本次展览分为四大主题展区，分别探讨未来创意的不同维度。\n"溯起之海"以 AI 赋能水生生命的起源与隐喻重生，将自然哲学与技术共振融合；"数字花园"以 AI 重构花卉与生命体，技术成为唤醒自然另类状态的媒介，并将"未来记忆"嵌入生态叙事；"共生领域"关注文明、技术与人类的共进，强调全球未来源于感知共鸣与协作重塑；"幻变浮城"则以虚实交融的艺术形态，展现现实与幻想的交汇，拥抱无形以释放艺术的无限变异。',
                ],
                zoneImages: HIGHLIGHT_IMAGES_ZONE,
                paragraphs2: [
                    '<h3 style="margin-top:2.5em;margin-bottom:0.5em;">展区一：溯起之海（室内）</h3> 以 MR 水族馆为主题，模拟生命起源的原始水下生态，追溯生物记忆。\n代表作品：<ul style="padding-left:2em;margin-bottom:0.2em;"><li><b>AquaVerse by 蒋雨洋</b>：以增强现实框架将海洋教育转化为沉浸式互动艺术，用户可通过手势探索数字海洋生命。</li><li><b>NEXT (Jeremy Oury)</b>：AI 渲染的未来遗迹，反思人类环境影响与身份。</li></ul>"数字浪潮，生命新生。"<br/>"深海孕育未来。"<br/>"水的记忆不灭——AI 赋新生。"',
                    '<h3 style="margin-top:2.5em;margin-bottom:0.5em;">展区二：数字花园（户外花园区）</h3> 聚焦 AI 重构的植物与生命体，强调"另类自然"。\n代表作品：<ul style="padding-left:2em;margin-bottom:0.2em;"><li>《兰亭》by 袁正：AI 模拟兰花雕塑，反思生态意识与中国植物哲学。</li><li>Las Awichas by Violeta Ayala：八位机械祖母与灵兽共生，通过声音与投影探讨祖先、循环与生态生存。</li></ul>"AI 不造自然——而是唤醒另一种形态。"<br/>"自然已非昨日，未来在枝叶中重生。"<br/>"技术孕育的不止未来花卉，更有未来记忆。"',
                    '<h3 style="margin-top:2.5em;margin-bottom:0.5em;">展区三：共生领域（红鸟广场）</h3> 探索文明、集体记忆与人类共进。\n代表作品：<ul style="padding-left:2em;margin-bottom:0.2em;"><li>《退化乌托邦》by Taro Narahara：AI 生成的未来城市短片，反思创造、灭绝与重生。</li><li>T.A.E.L. by 任珂 & Joey Verbeke：结合民俗、AI 与记忆衰变的递归新媒体雕塑，质问叙事归属与文化噪声。</li></ul>"文明非被发明——而是被感知与回应。"<br/>"世界非被学习——而是共创。"<br/>"屏幕之外，是意识的边界。"',
                    '<h3 style="margin-top:2.5em;margin-bottom:0.5em;">展区四：幻变浮城（W1 广场）</h3> 虚实交融的未来城市艺术游乐场。\n代表作品：<ul style="padding-left:2em;margin-bottom:0.2em;"><li>《High Sections / Low Leaps》：以深圳龙岗城市更新为灵感，融合 AIGC、声音与 3D 城市模拟，反思感知科技与 AI 对未来城市的塑造。</li></ul>"艺术的未来是无界变奏。"<br/>"未来无需定义——而是释放。"',
                ],
            },



            /* 2 开幕式致辞 */
            {
                heading: '开幕式致辞',
                paragraphs: [
                    '开幕仪式上，港科大（广州）校长倪明选教授在致辞中表示：“SURREALITY·幻实之境”不仅是全球首个融合AI艺术创作的大空间扩展现实展览，更是港科大（广州）跨学科融合教育理念的一次集中体现。他指出：“这不仅是技术层面的革新，更是艺术表达方式的革命——当科技遇见艺术，想象力的边界将被无限拓展。”他也特别强调，展览所汇聚的50位国际和国内艺术家作品，展示了人类对现实与虚拟关系的哲学思考与美学突破。',
                    '信息枢纽院长陈雷教授则通过其“数字人”虚拟形象，以视频方式发表祝贺致辞，这也是开幕式一大科技亮点。他在致辞中提到：“当AI与艺术在物理空间中碰撞出未来宇宙的绚烂图景，我们不仅看到了技术的可能性，更触摸到了人类文明的未来脉搏。”这一致辞形式本身亦呼应展览“幻实融合”的核心主题，赢得全场注目。',
                    '信息枢纽计算媒体与艺术学域（CMA）主任张康教授回顾了学域成立两年多以来的成果。他表示，CMA学域作为校内科技与艺术交叉的学科代表，发展迅速，成果斐然，在人机交互、空间计算和AI艺术等领域占据领先地位。张康教授介绍了学域在AI艺术、空间计算等方向的学术探索，并指出“SURREALITY·幻实之境”正为师生提供校内外交流、教学科研融合的重要平台。CMA学域通过产学研合作，让学生和科研成果走向国际，这场展览和论坛正是学界与产业、教学与科研深度对话的生动实践。',
                    '随后，展览总监、元宇宙与计算创意研究中心（MC²）主任、信息枢纽副院长许彬教授在开幕式中发言。他指出，“SURREALITY”不仅是一次展览，更是一种跨越技术与感知的共同想象与知识协作。展览试图在数据、感知与算法交织的语境中，建构出媒体艺术新的实践路径。许彬教授接着详述展览的核心理念与技术亮点。他介绍，展览由MC²团队打造，在混合现实、人机交互、空间定位与语言模型导览等方面实现系统集成，目标是以“感知—技术—现实”的方式构建多空间、跨媒介的艺术体验。展区涵盖四大MR装置区、VR专属空间，配合SLAM算法与智能导览，使整个校园成为动态叙事的“未来感知地图” 。',
                ],
            },

            /* 3 策展人导览 */
            {
                heading: '策展人导览',
                paragraphs: [
                    '元宇宙与计算创意研究中心策展团队带领嘉宾与媒体深度体验现场作品，详细介绍作品构成、创作背景与技术语境。倪明选校长与多位嘉宾参观展览，现场体验由AI与XR驱动的感知装置，并与艺术家就其研究路径与技术策略展开交流。',
                ],
            },

            /* 4 国际艺术家现场感言 */
            {
                heading: '国际艺术家现场感言',
                paragraphs: [
                    `在开幕式现场，来自玻利维亚、现居澳大利亚的电影制片人、人工智能创新者与创意技术专家 Violeta Ayala 接受了媒体采访。她激动地表示：“看到自己创作的作品能像丝绸一样在空中飞翔，我真的想哭。”她提到，在港科大（广州）校园这个沉浸式开放环境中，作品第一次以如此“轻盈、自由、诗意”的方式“飞”在真实世界中，深深打动了她。`,
                    `Ayala 强调，这不仅是一场展览，更是一次跨文化、跨技术的深度协作。“与港科大（广州）的合作十分有意义，我真心希望粤港澳大湾区在科技艺术融合方面能够持续突破，并在未来成为全球创意科技发展的重要中心。”她的回应正是“SURREALITY”试图激发的深层共鸣：当作品脱离屏幕，进入现实，它也真正进入了人的内心。`
                ],
            },

            /* 5 艺术家讲座 I */
            {
                heading: '艺术家讲座：跨媒介的灵感与实现',
                paragraphs: [
                    '在“艺术家讲座”环节中，Jeremy Oury和Michelle Falcon深入分享了他们从建筑视频投射与大型光影装置转向融合 MR 技术的过程。他们通过分享本次的作品NEXT，展示如何将几何错视、音画共感与自然空间结合，构建出打破现实边界、置观者于虚拟中心的沉浸式空间',
                    'Naima Karim则介绍了其获奖 VR 短片《The Anticipation of Rain》的制作脉络：作为一名传统绘画出身的艺术家，她首次借助 Open Brush VR 工具，将孟加拉季风的记忆与艺术表达结合，通过定制香氛与多感官音效，打造出“身体—叙事—气候”三重共鸣体验 。',
                    'Taro Narahara聚焦在 AI 与架构材料之间的交互潜力，他探讨了如何以思辨方式从材料与结构出发，为建筑空间注入未来叙事能力，提出建筑不仅是结构实体，更是融合算法、感知与环境共生的感官脚本。',
                    'Violeta Ayala分享了其运用 AI 模型重现南美原住民神话视觉的实践，以及如何在文化记忆与技术介入之间保持伦理审视。她指出，开源集体协作能够在技术驱动的艺术创作中提供更广泛的文化代表性与参与机制。',
                    'Joey Verbeke 与 Koi Ren以联合创作项目 T.A.E.L.（Tail Assisted Environmental Learning） 为例，阐述了新媒体艺术如何将古老民间传说、AI 算法与现代声像技术融为一体。他们详述作品生成过程：利用 AI 对口述民间故事进行语义解构，再通过投影和树脂装置展现素材如何在“噪声—记忆”循环中演变，探讨数字文明与文化生态的互动关系。',
                    '袁正（Yuan Zheng）回顾了其从英国皇家艺术学院（RCA）服装设计专业背景向VR艺术跨界探索的历程，讲述了其如何融合人工智能与传统工艺，打破人类中心视角，构建“共生身体”的媒介想象。',
                ],
            },

            /* 6 圆桌讨论  */
            {
                heading: '圆桌讨论：未来生态的构建与连接',
                paragraphs: [
                    '在Ingeborg Reichle 教授主持下，六位艺术家围绕“未来生态”展开一场深度对话。他们不仅探讨了各自作品中技术使用的合理性与审美边界，也就 AI、XR 等新媒介如何参与公共叙事展开讨论。讨论中，艺术家们认为，技术应服务于内容与情感，必须在创作伦理与生态系统的构建中承担更大责任。'
                ],
            },

            /* 7讲座 */
            {
                heading: '艺术讲座：重写未来的物质与记忆',
                paragraphs: [
                    '6月27日上午举行的论坛以“重写未来的物质与记忆”为主题，汇聚六位来自中国高校、活跃于科技艺术领域的学者、艺术家与教授。',
                    `在个人分享环节，来自中国美术学院跨媒体艺术学院的讲师、艺术家曹澍，以“副本”为核心概念，分享其近年的创作：借电子游戏副本机制，比喻在正史之外开辟支线与偶然性，探索历史、记忆、个体经验中被忽视或隐藏的部分，结合中国技术史、人工智能、蚁群算法、辐射等主题，通过跨影像、VR、游戏等形式，呈现多维历史与未来想象。`,
                    `来自香港城市大学的助理教授罗锐（RAY LC）介绍了他在人机互动与叙事空间方面的多个艺术与研究项目，包括用 AI 重构文化遗产图像、通过 XR 与机器人探索语言与历史想象的未来。他分享了展览、论文和作品背后的思考，强调文化遗产与记忆本质上的主观性与流动性——人们如何通过想象与再创造，重新理解与表达文化遗产。`,
                    `来自四川美术学院造型艺术学院雕塑系的教师、艺术家张超分享了“艺术新境中的路径与方法：从庄周梦蝶到AI张超的身份认同”的主题，展示了他的部分雕塑作品，探讨了神话、人工智能和个人身份等主题。他讨论了一系列项目，包括在武汉使用物联网等技术探讨公共空间与私人空间的矛盾、艺术与生活的转换、创作者主体与作为客体的作品之间的关系的一件公共艺术品。他在最后介绍了一位名叫“AI张超”的虛拟艺术家，并阐释Al成为主体，自己成为了“Al张超”的“服务者”的过程。`,
                    `来自广州美术学院数字媒体艺术系的谭亮教授分享了他在艺术中的使用算法和人工智能方面的工作，重点介绍了历史例子和其最近的项目。他还讨论了在美术学院教授生成式人工智能的经历，包括时装设计和互动艺术项目。 除此之外，他还介绍了与华为等公司的商业合作以及在医院设置的沉浸式艺术装置。`,
                    `来自昆山杜克大学计算与设计系的助理教授胡芮分享了他结合游戏引擎与3D渲染制作的作品《矩阵模型与上层建筑》，通过重构2006-2008年A股金融危机与CUDA技术崛起的历史片段，探讨金融市场、AI技术发展与意识形态的交织。他利用显卡和神经网络预测股市，结合哲学文本、影像与声音，呈现一场批判性历史与技术的思辨实验。`,
                    `来自天津美术学院人工智能艺术学院的讲师、艺术家卢思屹分享了其近年在AI与混合现实（MR）创作中的探索，强调MR叙事应注重结构性节奏与观众行为的交互反馈。通过作品案例，他指出MR空间需成为行为判断器，构建行为与意义“回路”，让观众成为叙事引发者，深化沉浸体验——即“当构建空间成为身体的地图”的主题。`
                ],
            },



            /* 9 幻实之间，连接未来 */
            {
                heading: '幻实之间，连接未来',
                paragraphs: [
                    '"SURREALITY·幻实之境"不仅是一次艺术展，更是知识系统、媒介语言与文化生态的交叉实验，以"幻"为感知入口，"实"为现实锚点，描绘未来科技艺术的轮廓与精神。',
                    '📅 展期：2025 年 6 月 26 日 — 8 月 26 日',
                    '📍 地点：香港科技大学（广州）校园内多个空间',
                    '如需参观，请扫描官方微信文章二维码预约。',
                ],
            },
        ],
        acknowledgments: [
            '展览总监｜许彬',
            '策划及执行团队｜赵雅薇、李昊、高沁咏、龙俊坤、李姝玥、梁育齐、毛媛媛、黄绎宁、顾文清、潘东逸杰、陈子轩、张一帅、雷小康、王安芑',
            '志愿者｜蔡文捷、陈泓熹、方凯荣、傅子豪、洪泽生、阮立心、蒋雨洋、李鸣晨、刘博楠、刘诗琪、梁佳欣、罗岚、门云磊、彭晴、齐振超、孙嘉、王雪彤、许文博、杨思敏、杨小羽、杨泽禹、闫哲、尹智卓、于奥、张骞文、张谱、朱一铭、赵卓然',
            '主办｜香港科技大学（广州）',
            '承办｜元宇宙与计算创意研究中心 (MC²)',
            '支持｜信息枢纽、计算媒体与艺术学域、未来技术学院、XR+AI 协会',
            '特别鸣谢｜香港科技大学（广州）校长倪明选',
        ],
    },

    /* ---------------- English ---------------- */
    en: {
        hero: {
            title: 'HKUST(GZ) Launches Ground-breaking "SURREALITY" Tech-Art Exhibition',
            subtitle: 'Where AI, XR and Human Creativity Collide',
            date: 'June 26 – August 26, 2025',
            bgImage: '/assets/news/hero.jpg',
        },
        sections: [
            {
                paragraphs: [
                    `On June 26, 2025, the Hong Kong University of Science and Technology (Guangzhou) proudly launched the technology art exhibition SURREALITY: The Large-Scale AI XR Art Exhibition accompanied by an international forum. Organized by HKUST (Guangzhou) and curated by the Center for Metaverse and Computational Creativity (MC²), the event was invited as part of the <b>2025 Festival Croisements,</b> a vital platform for Sino-French cultural exchange with staunch backing from the <b>Consulate General of France in Guangzhou</b> and the <b>French Cultural Center</b>. French diplomatic representatives attended the opening ceremony in person.`
                ],
                openingCarousel: OPENING_IMAGES,
            },

            {
                heading: 'Highlights',
                bullets: ['<b>AI-Augmented Creativity </b>: Artists across the globe are embracing AI as a creative partner. In SURREALITY, more than 50 creators have integrated AI to generate text, imagery, audio, and 3D forms. These works challenge conventional methods and expand the expressive frontier of art, probing the idea of "co-creation" between human and machine.',
                    '<b>Extended Reality Experiences </b>: XR technologies seamlessly blend virtual elements into physical environments. From wearable headsets to spatial projections, the exhibition presents new modes of perception. Real-time rendering and spatial computing enable scene-based interactivity, redefining how audiences engage with both art and space.',
                    '<b>Immersive Digital Environments </b>: Combined with large-scale SLAM (Simultaneous localization and mapping) positioning and AI-guided storytelling, SURREALITY transforms the campus into a "living map" in hybrid presence. Audiences are invited to wander through layered realities, where data-driven environments animate, breathe, and respond.'
                ],
                carousels: [HIGHLIGHT_IMAGES_AIAGUMENTED, HIGHLIGHT_IMAGES_EXTEND, HIGHLIGHT_IMAGES_IMMERSIVE],
            },

            {
                heading: 'Exhibition Zones: A Journey Through the Hybrid Landscape',
                paragraphs: [
                    '<b>The Story of Four Exhibits</b>: The exhibition unfolds across four thematic zones, each probing distinct dimensions of future-oriented creativity. "Ocean of Origins" meditates on life\'s aquatic genesis and its metaphorical rebirth via AI, fusing natural philosophy with technological resonance. "Digital Garden" presents AI-reconfigured flora and life forms, framing technology as a medium to reawaken nature\'s alternative states while embedding "future memory" into ecological narratives. "Symbiotic Realms" explores the co-evolution of civilization, technology, and humanity, arguing that global futures arise from mutual perception and collaborative redefinition rather than passive observation. "City of Illusions" envisions futuristic art as a realm where reality and fantasy intersect, embracing formlessness to embody art\'s boundless metamorphosis.',
                    '<h3 style="margin-top:2.5em;margin-bottom:0.5em;">Zone 1: Ocean of Origins (Indoor)</h3>This MR aquarium-themed installation simulates a primordial underwater ecosystem, where life is imagined to have emerged. The zone explores evolution\'s beginnings, tracing our biological memory to the sea.<br/><br/><b>Notable works include:</b><ul style="padding-left:2em;margin-bottom:0.2em;">\n<li><b>AquaVerse by Jiang Yuyang</b>: A creative augmented reality framework transforming marine education into an interactive art form. With intuitive gesture-based interaction, users explore vivid digital marine life in a highly immersive environment.</li>\n<li><b>NEXT (Jeremy Oury)</b>: a haunting AI-rendered near-future ruin that interrogates humanity\'s environmental impact and identity in the Anthropocene.</li></ul><em>"Digital Waves, Life Reborn."<br/>"From the deep sea, life grows toward the future."<br/>"The memory of water never fades—it is reborn through AI."</em>',
                    '<h3 style="margin-top:2.5em;margin-bottom:0.5em;">Zone 2: Digital Garden (Outdoor Garden Area)</h3>Featuring botanical and lifeform-based artworks, this zone emphasizes AI-reconstructed "alter-nature."<ul style="padding-left:2em;margin-bottom:0.2em;">\n<li><b>《兰亭》 by Yuan Zheng</b>: An AR-enabled sculpture series of AI-simulated orchids that reflect ecological consciousness and Chinese plant philosophy. The work interrogates how artificial environments reimagine flora in a post-natural context.</li>\n<li><b>Las Awichas by Violeta Ayala</b>: This mixed-reality tale features eight robotic grandmothers, each bonded with a spirit animal. Through soundscapes and projection mapping, the piece explores ancestry, cyclical time, and ecological survival, blending Andean mythology with futuristic robotics.</li></ul><em>"AI does not create nature—it awakens another form of it."<br/>"Nature is no longer what it was; the future is reborn through leaves and limbs."<br/>"Technology builds not only future flora, but future memory."</em>',
                    `<h3 style="margin-top:2.5em;margin-bottom:0.5em;">Zone 3: Symbiotic Realms (Red Bird Plaza)</h3>This philosophical and narrative-rich section focuses on civilization, collective memory, and humanity's co-evolution with knowledge and myth.<ul style="padding-left:2em;margin-bottom:0.2em;"><li><b>《退化乌托邦》 by Taro Narahara</b>: A speculative short film that visualizes modular urban habitats and space elevators. Merging AI-generated visuals and speculative architecture, the piece invites reflection on creation, extinction, and rebirth.</li><li>T.A.E.L. (Tail-end Algorithmic Environmental Learning) by Koi Ren & Joey Verbeke</li></ul><em>"Civilization isn't invented—it is felt and responded to."<br/>"We do not learn the world—we co-create it."<br/>"What lies beyond the screen is the boundary of consciousness."</em>`,
                    `<h3 style="margin-top:2.5em;margin-bottom:0.5em;">Zone 4: City of Illusions (W1 Entrance Plaza)</h3>This speculative urban playground presents futuristic art forms in which physical and virtual realities merge.<ul style="padding-left:2em;margin-bottom:0.2em;"><li><b>《High Sections / Low Leaps》</b>: A CRT-based audiovisual piece inspired by urban redevelopment in Shenzhen's Longgang District. Combining AIGC, sound design, and 3D city simulation, it reflects on sensory technologies and AI's role in shaping future urban perception.</li></ul><em>"The future of art is an unbounded variation."<br/>"It's not about defining the future—but unleashing it."</em>`,
                ],
                carousels: [HIGHLIGHT_IMAGES_ZONE],
            },

            {
                heading: 'Special Appearance: Artists On-Site',
                paragraphs: [
                    '<b>Special Appearance: Artists On-Site</b>',
                    'This day, several acclaimed international artists joined the opening of SURREALITY in person, bringing deep insight and dialogue to the experience:',
                    `<ul style="padding-left:2em;margin-bottom:0.2em;">\n<li><b>Jeremy Oury</b> <i>(France)</i>: Renowned for immersive visual and audio works that challenge spatial perception, Oury brought his environmental AI piece NEXT to life at Zone 1.</li>\n<li><b>Violeta Ayala</b> <i>(Bolivia/Australia)</i>: A Quechua filmmaker and XR artist, Ayala introduced Las Awichas, merging Andean mythology with robotics and AR.</li>\n<li><b>Taro Narahara</b> <i>(Japan/USA)</i>: Architect and theorist, Narahara showcased Degraded Utopia, reflecting on modular space futures through AI cinema.</li>\n<li><b>Zheng Yuan</b> <i>(China)</i>: Artist and AI researcher, Zheng's Orchid Futures examines post-natural plant life through algorithmic sculpture.</li>\n<li><b>Joey Verbeke & Koi Ren</b> <i>(Belgium/China)</i>: Their new media duet T.A.E.L. critiques how folklore and AI intersect in recursive feedback systems.</li>\n<li><b>Naima Karim</b> <i>(Bangladesh/Netherlands)</i>: Known for painting in VR, Karim's sensory-rich narratives expand disability discourse and ecological memory.</li></ul>`,
                ],
            },

            {
                heading: 'Opening Ceremony: Visions from Leadership',
                paragraphs: [
                    'The event opened with remarks from <b>President Lionel Ni</b>, who described SURREALITY as both a technological innovation and a cultural revolution. "This exhibition exemplifies HKUST (GZ)\'s mission for interdisciplinary fusion. When technology meets art, imagination finds infinite expansion," he said.' + `<br/><img src="${HIGHLIGHT_IMAGES_CEREMONY[0]}" style="width:80%;margin:1.5em auto;display:block;"/>`,
                    'Another spotlight in the event comes when <b>Prof. Lei Chen</b>, Dean of the Information Hub, delivered his address through a digital avatar, emphasizing the symbolic convergence of digital identity and artistic imagination.' + `<br/><img src="${HIGHLIGHT_IMAGES_CEREMONY[1]}" style="width:80%;margin:1.5em auto;display:block;"/>`,
                    `<b>Prof. Kang Zhang</b>, Head of Computational Media and Arts Thrust (CMA), reflected on the school's evolution over the past two years and its pioneering role in AI art, spatial computing, and HCI.` + `<br/><img src="${HIGHLIGHT_IMAGES_CEREMONY[2]}" style="width:80%;margin:1.5em auto;display:block;"/>`,
                    `The Director of Exhibition, Associate Dean of the Information Hub, and Chair Professor of Computational Media and Arts, <b>Prof. Pan Hui</b>, shared the vision behind SURREALITY. As the Director of MC², he outlined the integration of XR, spatial tracking, AI narrative engines, and multi-sensory, multimodality design, positioning the exhibition as an experimental interface between data, perception, and new media. We postulate a future paradigm where virtual and physical realms achieve such profound integration through immersive technologies that the ontological boundaries between them become imperceptible. Advanced holographic systems and high-fidelity head-mounted displays will enable seamless interaction with persistent virtual objects embedded within our physical environment, effectively dissolving the conventional dichotomy between digital and material existence. What currently exists as a state of "surreality" - this liminal space between real and virtual - will ultimately emerge as the new baseline reality. The SURREALITY exhibition serves as a conceptual prototype, offering empirical insight into this imminent technological-aesthetic convergence.` + `<br/>`,

                ],
            },

            {
                heading: '✦Guided Tour & Campus-wide Immersion:A Journey Through the Hybrid Landscape',
                paragraphs: [
                    'Following the ceremony, the curatorial team led guests through the immersive zones, where AI-generated guides explained the technologies and stories behind each work. President Ni and invited guests engaged directly with the installations, experiencing how human and machine imagination coalesce.' + '<div id="tour-photo-grid"></div>',
                ],
            },

            {
                heading: '✦ Artist Statement: Flying Art, Emotional Tech',
                paragraphs: [
                    'Renowned Quechua filmmaker and AI artist, Violeta Ayala, remarked during interview, " I almost cried when I saw my artwork flying like silk in the air, I nearly cried." She praised the immersive open campus for allowing her piece to take shape in real space. Calling the collaboration meaningful, she expressed hope that the Greater Bay Area will continue leading global creative-tech innovation.',
                ],
            },

            {
                heading: '✦ Artist Talks: Beyond Media, Beyond Medium',
                paragraphs: [
                    'In the afternoon Artist Talk, six pioneering artists shared their practices: <b>Jeremy Oury and Michelle Falcon</b> presented their transition from architectural projection to MR, using optical illusion and sound geometry in their work NEXT. <b>Naima Karim</b> discussed her award-winning VR short The Anticipation of Rain, crafted with Open Brush VR and multisensory storytelling tools to evoke the monsoon memories of Bangladesh. <b>Taro Narahara</b> explored speculative architecture via AI and material intelligence, showing how algorithms can script ecological futures. <b>Violeta Ayala</b> unveiled her AI-generated interpretations of indigenous myth, emphasizing ethical and collective approaches in computational creativity. <b>Joey Verbeke and Koi Ren</b> described their project T.A.E.L., which blends folk tales, neural networks, and physical sculpture to map noise-memory interactions in AI narratives. <b>Zheng Yuan</b>, an RCA graduate, shared his shift from fashion design to VR art, combining craft and AI to imagine "symbiotic bodies."',
                ],
                talkImages: HIGHLIGHT_IMAGES_TALK,
            },

            {
                heading: 'Roundtable Discussion: Building and Connecting Future Ecosystems',
                paragraphs: [
                    'On the afternoon of June 26, a roundtable discussion titled "Constructing Future Ecologies" was moderated by Prof. Ingeborg Reichle. Six international artists reflected on the ethical and aesthetic implications of using AI and XR in their creative practices. They debated the role of technology in public narratives, emphasizing that tools like AI must serve emotional and content-driven intentions while also contributing to the development of sustainable and inclusive creative ecosystems.' + '<div id="roundtable-carousel"></div>',
                ],
            },

            {
                heading: 'Satellite Forum: Young Voices in Future Art',
                paragraphs: [
                    'On June 27, a satellite forum titled "Young Artists on the Future of Art" gathered emerging scholars and practitioners from China Academy of Art, Guangzhou Academy of Fine Arts, City University of Hong Kong, and more prestigious institutions. In brief but thought-provoking sessions, they explored speculative storytelling, algorithmic memory, and cultural remix as central strategies for reimagining the material and ecological conditions of artmaking.' + '<div id="satellite-carousel"></div>',
                ],
            },

            {
                heading: '✦ Between Reality and Virtuality',
                paragraphs: [
                    'SURREALITY is more than an exhibition—it is a living experiment in art, knowledge, and perception. It asks: how do we feel, think, and imagine through machines? What futures can be co-created when technology becomes a medium of empathy, memory, and world-building.',
                    'The exhibition runs from June 26 to August 26, 2025, across five curated zones within the HKUST (GZ) campus.',
                    'To visit, please scan the QR code embedded in the official HKUST WeChat article for reservation.' + '<div id="between-carousel"></div>',
                ],
            },
        ],
        acknowledgments: [
            '<b>President｜</b>Prof. Lionel Ni',
            '<b>Exhibition Director｜</b>Prof. Pan Hui',
            '<b>Curation & Execution｜</b>Zhao Yawei, Li Hao, Gao Qinyong, Long Junkun, Li Shuyue, Liang Yuqi, Mao Yuanyuan, Huang Yining, Gu Wenqing, Pan Dongyijie, Chen Zixuan, Zhang Yishuai, Lei Xiaokang, Wang Anqi',
            '<b>Volunteers (alphabetical order)｜</b>Chai Wenjye, Chen Hongxi, Fang Kairong, Fu Zihao, Hong Zesheng, Jiang Yuyang, Li Mingchen, Liang Jiaxin, Liu Bonan, Liu Shiqi, Men Yunlei, Pang Ching Christie, Qi Zhenchao, Sun Jia, Wang Xuetong, Xu Wenbo, Yang Simin, Yang Xiaoyu, Yang Zeyu, Yan Zhe, Yin Zhizhuo, Yu Ao, Zhang Qianwen, Zhang Pu, Zhao Zhuoran, Zhu Yiming, and all unnamed volunteers whose dedication made this event possible.',
            '<b>Organized by｜</b>Hong Kong University of Science and Technology(Guangzhou)',
            '<b>Curated by｜</b>Center for Metaverse and Computational Creativity (MC²)',
            '<b>Supported by｜</b>Information Hub, Computational Media and Arts, Academy of Future Technology, XR+AI Association',
            '<b>International Partners｜</b>Consulate General of France in Guangzhou, French Cultural Center',
        ],
    },
};

/* ------------------------------------------------------------------
   News component
------------------------------------------------------------------------ */
export default function News({ lang = 'en' }) {
    const t = content[lang] || content.en;
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);

    useEffect(() => {
        const onScroll = () => {
            const scrollPos = window.scrollY + window.innerHeight / 2;
            let current = 0;
            sectionRefs.current.forEach((el, idx) => {
                if (el && el.offsetTop < scrollPos) current = idx;
            });
            setActiveSection(current);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // 指定右侧导航栏的短标题
    const navTitles = lang === 'zh' ? [
        '展览亮点',
        '展区导览',
        '开幕式致辞',
        '策展人导览',
        '国际艺术家现场感言',
        '艺术家讲座：跨媒介的灵感与实现',
        '圆桌讨论：未来生态的构建与连接',
        '艺术讲座：重写未来的物质与记忆',
        '幻实之间，连接未来',
    ] : [
        'Highlights',
        'Exhibition Zones',
        'Special Appearance',
        'Opening Ceremony',
        'Guided Tour',
        'Artist Statement',
        'Artist Talks',
        'Roundtable',
        'Forum',
        'Booking',
    ];

    return (
        <main className="news-page">
            <section className="news-hero" style={{ backgroundImage: `url(${t.hero.bgImage})` }}>
                <div className="news-hero__overlay"><h1>{t.hero.title}</h1><h2>{t.hero.subtitle}</h2><p className="news-date">{t.hero.date}</p></div>
            </section>

            {/* 右侧锚点导航栏 */}


            {t.sections.map((sec, i) => (
                <section key={i} className="news-section" ref={el => sectionRefs.current[i] = el}>
                    <h2 id={`section-${i}`}>{sec.heading}</h2>
                    {/* 开幕式致辞部分：只用自定义渲染，跳过主循环段落渲染 */}
                    {lang === 'zh' && sec.heading === '开幕式致辞' ? (
                        <>
                            {sec.paragraphs && sec.paragraphs.slice(0, 3).map((p, j) => (
                                <React.Fragment key={j}>
                                    <div dangerouslySetInnerHTML={{ __html: p }} />
                                    <div className="image-grid" style={{margin: '1.5rem 0'}}>
                                        <img src={HIGHLIGHT_IMAGES_CEREMONY[j]} alt="ceremony" loading="lazy" />
                                    </div>
                                </React.Fragment>
                            ))}
                            {sec.paragraphs && sec.paragraphs[3] && (
                                <>
                                    <div dangerouslySetInnerHTML={{ __html: sec.paragraphs[3] }} />
                                    <div className="artist-image-grid-2x3" style={{margin: '2rem 0'}}>
                                        {HIGHLIGHT_IMAGES_ARTIST.map((src, idx) => (
                                            <img key={src + '-' + idx} src={src} alt="artist" loading="lazy" />
                                        ))}
                                    </div>
                                </>
                            )}
                            {sec.paragraphs && sec.paragraphs.slice(4).map((p, j) =>
                                <div key={j+4} dangerouslySetInnerHTML={{ __html: p }} />
                            )}
                        </>
                    ) : lang === 'zh' && sec.heading === '策展人导览' ? (
                        <>
                            {sec.paragraphs && sec.paragraphs.map((p, j) => (
                                <div key={j} dangerouslySetInnerHTML={{ __html: p }} />
                            ))}
                            <div style={{ width: '80%', margin: '2rem auto' }}>
                                <Carousel imgs={HIGHLIGHT_IMAGES_TOUR} auto={true} />
                            </div>
                        </>
                    ) : lang === 'zh' && sec.heading === '艺术家讲座：跨媒介的灵感与实现' ? (
                        <>
                            {sec.paragraphs && sec.paragraphs.map((p, j) => (
                                <div key={j} className="artist-talk-paragraph" dangerouslySetInnerHTML={{ __html: p }} />
                            ))}
                            <div className="talk-image-grid-3x2">
                                {HIGHLIGHT_IMAGES_TALK.map((src, idx) => (
                                    <img key={src + '-' + idx} src={src} alt="artist talk" loading="lazy" />
                                ))}
                            </div>
                        </>
                    ) : lang === 'zh' && sec.heading === '圆桌讨论：未来生态的构建与连接' ? (
                        <>
                            {sec.paragraphs && sec.paragraphs.map((p, j) => (
                                <div key={j} className="artist-talk-paragraph" dangerouslySetInnerHTML={{ __html: p }} />
                            ))}
                            <div style={{ width: '80%', margin: '2rem auto' }}>
                                <Carousel imgs={HIGHLIGHT_IMAGES_ROUND} auto={true} />
                            </div>
                        </>
                    ) : lang === 'zh' && sec.heading === '艺术讲座：重写未来的物质与记忆' ? (
                        <>
                            {sec.paragraphs && sec.paragraphs.map((p, j) => (
                                <div key={j} className="artist-talk-paragraph" dangerouslySetInnerHTML={{ __html: p }} />
                            ))}
                            <div style={{ width: '80%', margin: '2rem auto' }}>
                                <Carousel imgs={HIGHLIGHT_IMAGES_SATELLITE} auto={true} />
                            </div>
                        </>
                    ) : (
                        <>
                            {sec.carousels && sec.carousels.map((imgs, idx) => (
                                <React.Fragment key={idx}>
                                    {sec.bullets && sec.bullets[idx] && (
                                        <div className="carousel-description" dangerouslySetInnerHTML={{ __html: sec.bullets[idx] }} />
                                    )}
                                    {imgs.length > 1
                                        ? (sec.heading === 'Highlights' && lang === 'en'
                                            ? <div style={{ width: '80%', margin: '0 auto' }}><Carousel imgs={imgs} auto={true} /></div>
                                            : (imgs === OPENING_IMAGES
                                                ? <ImageGrid imgs={imgs} />
                                                : <Carousel imgs={imgs} auto={true} />))
                                        : <ImageGrid imgs={imgs} />}
                                </React.Fragment>
                            ))}
                            {sec.openingCarousel && ((lang === 'en' && i === 0) || (lang === 'zh' && i === 0)) && (
                                <div className="opening-image-grid-2x2">
                                    <ImageGrid imgs={sec.openingCarousel} />
                                </div>
                            )}
                            {sec.openingCarousel && !((lang === 'en' && i === 0) || (lang === 'zh' && i === 0)) && <ImageGrid imgs={sec.openingCarousel} />}
                            {sec.paragraphs && !((lang === 'zh' && sec.heading === '幻实之间，连接未来') || (lang === 'en' && sec.heading === '✦ Between Reality and Virtuality')) &&
                                sec.paragraphs.map((p, j) =>
                                    p.includes('<')
                                        ? <div key={j} dangerouslySetInnerHTML={{ __html: p }} />
                                        : <p key={j}>{p}</p>
                                )
                            }
                            {lang === 'en' && sec.heading === 'Roundtable Discussion: Building and Connecting Future Ecosystems' && (
                                <div style={{ width: '80%', margin: '2rem auto' }}>
                                    <Carousel imgs={HIGHLIGHT_IMAGES_ROUND} auto={true} />
                                </div>
                            )}
                            {lang === 'en' && sec.heading === 'Satellite Forum: Young Voices in Future Art' && (
                                <div style={{ width: '80%', margin: '2rem auto' }}>
                                    <Carousel imgs={HIGHLIGHT_IMAGES_SATELLITE} auto={true} />
                                </div>
                            )}
                            {lang === 'zh' && sec.zoneImages && (
                                <div className="image-grid" style={{marginTop: '2rem', marginBottom: '2rem'}}>
                                    {sec.zoneImages.map((src, idx) => (
                                        <img key={src + '-' + idx} src={src} alt="zone" loading="lazy" />
                                    ))}
                                </div>
                            )}
                            {lang === 'zh' && sec.paragraphs2 && sec.paragraphs2.map((p, j) => (
                                <div key={j} dangerouslySetInnerHTML={{ __html: p }} />
                            ))}
                            {sec.talkImages && lang === 'en' && (
                                <div className="talk-image-grid-3x2">
                                    {sec.talkImages.map((src, idx) => (
                                        <img key={src + '-' + idx} src={src} alt="artist talk" loading="lazy" />
                                    ))}
                                </div>
                            )}
                            {lang === 'en' && sec.heading === 'Opening Ceremony: Visions from Leadership' && (
                                <div className="artist-image-grid-2x3" style={{margin: '2rem 0'}}>
                                    {HIGHLIGHT_IMAGES_ARTIST.map((src, idx) => (
                                        <img key={src + '-' + idx} src={src} alt="artist" loading="lazy" />
                                    ))}
                                </div>
                            )}
                            {lang === 'en' && sec.heading === '✦Guided Tour & Campus-wide Immersion:A Journey Through the Hybrid Landscape' && (
                                <div style={{ width: '80%', margin: '2rem auto' }}>
                                    <Carousel imgs={HIGHLIGHT_IMAGES_TOUR} auto={true} />
                                </div>
                            )}
                            {(lang === 'zh' && sec.heading === '幻实之间，连接未来') || (lang === 'en' && sec.heading === '✦ Between Reality and Virtuality') ? (
                                <>
                                    {sec.paragraphs && sec.paragraphs.map((p, j) => (
                                        <div key={j} className="artist-talk-paragraph" dangerouslySetInnerHTML={{ __html: p }} />
                                    ))}
                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
                                        <div style={{ width: '50%' }}>
                                            <Carousel imgs={HIGHLIGHT_IMAGES_CODER} auto={true} />
                                        </div>
                                    </div>
                                </>
                            ) : null}
                        </>
                    )}
                </section>
            ))}

            <section className="news-ack"><h2>{lang === 'zh' ? '鸣谢' : 'Acknowledgments'}</h2><ul>{lang === 'en'
                ? t.acknowledgments.map((a, i) => <li key={i} dangerouslySetInnerHTML={{ __html: a }} />)
                : t.acknowledgments.map(a => <li key={a}>{a}</li>)}</ul></section>
        </main>
    );
}
