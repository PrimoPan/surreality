import React, { useEffect, useState } from 'react';
import ParallaxSection from '../components/ParallaxSection';
import SpeechSectionPanHui from '../components/SpeechSectionPanHui';
import SpeechSectionNi from '../components/SpeechSectionNi';
import SpeechSectionArtist from '../components/SpeechSectionArtist';
import VideoSection from '../components/VideoSection';
import FbxViewer from '../components/FbxViewer/FbxViewer';  // 导入 FbxViewer

const images = [
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/001.jpg',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/002.PNG',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/003.PNG',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/004.PNG',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/005.png',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/006.PNG',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/007.PNG',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/008.PNG',
    'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/bg/009.PNG',
];

export default function Home({ lang }) {
    const [secondPageImage, setSecondPageImage] = useState(images[1]);
    const [thirdPageImage, setThirdPageImage] = useState(images[2]);

    useEffect(() => {
        const interval = setInterval(() => {
            let newSecondPageImage = images[Math.floor(Math.random() * images.length)];
            let newThirdPageImage = images[Math.floor(Math.random() * images.length)];
            while (newSecondPageImage === images[3] || newThirdPageImage === newSecondPageImage) {
                newSecondPageImage = images[Math.floor(Math.random() * images.length)];
                newThirdPageImage = images[Math.floor(Math.random() * images.length)];
            }

            setSecondPageImage(newSecondPageImage);
            setThirdPageImage(newThirdPageImage);
        }, 7500);

        return () => clearInterval(interval);
    }, [secondPageImage, thirdPageImage]);

    return (
        <>
            {/* 第一部分：固定第一页背景，启用视差效果 */}
            <ParallaxSection
                image={images[3]}
                title={lang === 'en' ? 'Surreality' : '幻實之境'}
                subtitle={lang === 'en' ? 'World’s First Large Scale AI XR Art Exhibition' : '全球首個大空間擴展現實AI藝術展'}
                isParallax={true}
            />

            {/* 第二部分：使用第二页轮播图片 */}
            <ParallaxSection
                image={secondPageImage}
                title={lang === 'en' ? 'Redefine Your Senses' : '重塑感官新境'}
                subtitle={lang === 'en' ? 'Break the boundaries between virtual and reality' : '打破虛擬與現實的邊界'}
                isParallax={false}
            />

            {/* 第三部分：使用第三页轮播图片 */}
            <ParallaxSection
                image={thirdPageImage}
                title={lang === 'en' ? 'Ode to Diversity' : '頌揚多元'}
                subtitle={lang === 'en' ? 'A Passionate Showcase by Over 50 Artists from Around the World' : '超過五十位來自世界各地藝術家的傾情獻映'}
                isParallax={false}
            />
            {/* 第五部分：视频播放 */}
            <VideoSection />

            {/* 第六部分：校長演講 */}
            <SpeechSectionNi lang={lang} />

            {/* 第七部分：藝術家發言 */}
            <SpeechSectionArtist lang={lang} />

            {/* 第八部分：許彬教授演講 */}
            <SpeechSectionPanHui lang={lang} />
        </>
    );
}
