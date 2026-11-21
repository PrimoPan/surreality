export const articleUrl = 'https://mp.weixin.qq.com/s/mXlgRGcAH5YVrY4zH7PXaA';
export const fiestaUrl = 'https://35a.hkust.edu.hk/events/hkust-35th-anniversary-impact-fiesta';
export const filmUrl = 'https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/surreality-aia-central-2026/hong-kong-observation-wheel-556fd704.mp4';

const copy = {
    en: {
        location: 'Central, Hong Kong', heroPlace: 'Central, Hong Kong', dates: '27–28 November 2026',
        venue: 'AIA Vitality Park', wheel: 'Hong Kong Observation Wheel',
        medium: 'Mixed reality exhibition', film: 'Watch the film', close: 'Close film',
        filmTitle: 'Hong Kong Observation Wheel exhibition film', pause: 'Pause preview', resume: 'Play preview',
        title: 'Three works for the Observation Wheel',
        intro: 'SURREALITY comes to the Central waterfront for HKUST’s 35th Anniversary Impact Fiesta. Look up through a mixed reality headset to see how the artists have used the wheel’s hub, its moving cabins and the sky above the harbour.',
        captions: [
            'Echoing the rhythm of the bow through the Ferris wheel\'s circular motion, a winding S-shaped pathway of light connects a floating stage to a translucent Earth, while Dunhuang flying apsaras dance along its course.',
            'A Memory of the Stars uses the Hong Kong Observation Wheel as its real-world anchor, spreading blue-and-gold galaxies and starlight across the city sky.',
            'Particles gather into a holographic Earth, while digital rings intertwine with the wheel\'s physical cabins, reimagining the familiar landmark through light and geometry.',
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
        filmTitle: '香港摩天轮展览宣传片', pause: '暂停预览', resume: '播放预览',
        title: '为香港摩天轮而作',
        intro: '今年11月，幻实之境来到中环海滨，参加香港科技大学35周年成果共享节。观众站在摩天轮下，透过混合现实头显，可以看见艺术家如何把轮心、座舱和维港上空写进作品。',
        captions: [
            '作品以摩天轮的循环运动呼应弓弦节奏，通过蜿蜒的 S 形光径连接漂浮舞台与轮心的半透明地球，敦煌飞天沿光径翩然起舞。',
            '《星空》以香港摩天轮为现实锚点，让涡旋的蓝金色星云与闪烁星光铺展在城市上空。',
            '光粒凝聚成全息地球，数码环带与真实座舱相互交织，通过光与几何形态，让熟悉的城市地标呈现另一重面貌。',
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
        filmTitle: '香港摩天輪展覽宣傳片', pause: '暫停預覽', resume: '播放預覽',
        title: '為香港摩天輪而作',
        intro: '今年11月，幻實之境來到中環海濱，參與香港科技大學35周年成果共享節。觀眾站在摩天輪下，透過混合實境頭戴裝置，可以看見藝術家如何把輪心、座艙和維港上空寫進作品。',
        captions: [
            '作品以摩天輪的循環運動呼應弓弦節奏，通過蜿蜒的 S 形光徑連接漂浮舞台與輪心的半透明地球，敦煌飛天沿光徑翩然起舞。',
            '《星空》以香港摩天輪為現實錨點，讓渦旋的藍金色星雲與閃爍星光鋪展在城市上空。',
            '光粒凝聚成全息地球，數碼環帶與真實座艙相互交織，通過光與幾何形態，讓熟悉的城市地標呈現另一重面貌。',
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
