const localeSuffix = { en: 'en', 'zh-Hans': 'cn', 'zh-Hant': 'hk' };

export function centralArtworkText(work, field, lang) {
    return work[field + '_' + (localeSuffix[lang] || 'en')];
}
