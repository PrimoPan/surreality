// src/i18n.js
import { Converter } from 'opencc-js';

// 创建一个简体 -> 繁体（台湾用字）的转换器
const s2t = Converter({ from: 'cn', to: 'tw' });

/**
 * 取 obj 上的 key，并根据 lang 决定是否转换成繁体
 * @param {object} obj   数据对象，比如 { title_en, title_cn, description_cn, artist_bio_cn }
 * @param {string} key   字段名，比如 'title'、'description'、'artist_bio'
 * @param {string} lang  'en' | 'zh-Hans' | 'zh-Hant'
 */
export function t(obj, key, lang) {
    // 简体和英文直接映射
    const isEn = lang === 'en';
    const suffix = isEn ? 'en' : 'cn';
    let txt = obj[`${key}_${suffix}`] || '';
    // 繁体环境下，把简体再转换一次
    if (lang === 'zh-Hant' && txt) {
        txt = s2t(txt);
    }
    return txt;
}
