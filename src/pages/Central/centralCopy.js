export const articleUrl = 'https://mp.weixin.qq.com/s/mXlgRGcAH5YVrY4zH7PXaA';
export const fiestaUrl = 'https://35a.hkust.edu.hk/events/hkust-35th-anniversary-impact-fiesta';
export const filmUrl = 'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/surreality-aia-central-2026/surreality-aia-central-2026.mp4';

const copy = {
    en: {
        location: 'Central, Hong Kong', heroPlace: 'Central, Hong Kong', dates: '27–28 November 2026',
        venue: 'AIA Vitality Park', wheel: 'Hong Kong Observation Wheel',
        medium: 'Mixed reality exhibition', film: 'Watch the film', close: 'Close film',
        credit: 'Film courtesy of HKUST News', pause: 'Pause preview', resume: 'Play preview',
        title: 'Three works for the Observation Wheel',
        intro: 'SURREALITY comes to the Central waterfront for HKUST’s 35th Anniversary Impact Fiesta. Look up through a mixed reality headset to see how the artists have used the wheel’s hub, its moving cabins and the sky above the harbour.',
        captions: [
            'A ribbon of light rises from Guogan’s bow. Two flying figures follow it towards the hub of the wheel.',
            'Blue and gold stars curl around the wheel, bringing a painted night sky to the waterfront.',
            'Particles gather into a globe at the hub. Bands of light pass between the moving gondolas.',
        ],
        all: 'Explore the works', visit: 'Plan your visit', hours: 'Exhibition hours',
        friday: 'Friday, 27 November', saturday: 'Saturday, 28 November',
        admission: 'Free admission', address: '33 Man Kwong Street, Central, Hong Kong',
        directions: 'Beside the Observation Wheel, near Central Ferry Piers 9 and 10.',
        event: 'HKUST 35th Anniversary Impact Fiesta', read: 'Read the exhibition announcement',
        archive: 'Past exhibitions', campuses: 'Hong Kong & Guangzhou', firstCampus: 'Guangzhou', localTime: 'Hong Kong time',
    },
    'zh-Hans': {
        location: '香港中环', heroPlace: '幻实之境 · 香港中环', dates: '2026年11月27–28日',
        venue: 'AIA Vitality 公园', wheel: '香港摩天轮',
        medium: '混合现实艺术展', film: '观看展览短片', close: '关闭短片',
        credit: '视频来源：香港科技大学快讯', pause: '暂停预览', resume: '播放预览',
        title: '为香港摩天轮而作',
        intro: '今年11月，幻实之境来到中环海滨，参加香港科技大学35周年成果共享节。观众站在摩天轮下，透过混合现实头显，可以看见艺术家如何把轮心、座舱和维港上空写进作品。',
        captions: [
            '果敢拉起二胡，一道光从琴弓前蜿蜒向上。两位敦煌飞天沿光轨飞向轮心。',
            '蓝色和金色的星光绕着摩天轮打旋，给眼前的维港添上一片画中的夜空。',
            '光粒在轮心聚成地球，一圈圈光带从转动的座舱之间穿过。',
        ],
        all: '浏览展出作品', visit: '参观信息', hours: '展览开放时间',
        friday: '11月27日 星期五', saturday: '11月28日 星期六',
        admission: '免费入场', address: '香港中环民光街33号',
        directions: '香港摩天轮旁，邻近中环9号及10号码头。',
        event: '香港科技大学35周年成果共享节', read: '阅读展览原文',
        archive: '往届展览', campuses: '香港 · 广州', firstCampus: '广州', localTime: '香港时间',
    },
    'zh-Hant': {
        location: '香港中環', heroPlace: '幻實之境 · 香港中環', dates: '2026年11月27–28日',
        venue: 'AIA Vitality 公園', wheel: '香港摩天輪',
        medium: '混合實境藝術展', film: '觀看展覽短片', close: '關閉短片',
        credit: '影片來源：香港科技大學快訊', pause: '暫停預覽', resume: '播放預覽',
        title: '為香港摩天輪而作',
        intro: '今年11月，幻實之境來到中環海濱，參與香港科技大學35周年成果共享節。觀眾站在摩天輪下，透過混合實境頭戴裝置，可以看見藝術家如何把輪心、座艙和維港上空寫進作品。',
        captions: [
            '果敢拉起二胡，一道光從琴弓前蜿蜒向上。兩位敦煌飛天沿光軌飛向輪心。',
            '藍色和金色的星光繞着摩天輪打旋，給眼前的維港添上一片畫中的夜空。',
            '光粒在輪心聚成地球，一圈圈光帶從轉動的座艙之間穿過。',
        ],
        all: '瀏覽展出作品', visit: '參觀資訊', hours: '展覽開放時間',
        friday: '11月27日 星期五', saturday: '11月28日 星期六',
        admission: '免費入場', address: '香港中環民光街33號',
        directions: '香港摩天輪旁，鄰近中環9號及10號碼頭。',
        event: '香港科技大學35周年成果共享節', read: '閱讀展覽原文',
        archive: '往屆展覽', campuses: '香港 · 廣州', firstCampus: '廣州', localTime: '香港時間',
    },
};

export const getCopy = lang => copy[lang] || copy.en;
