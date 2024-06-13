const path = require('path')

const nextI18NextConfig = {
    i18n: {
        defaultLocale: 'ru',
        locales: ['en', 'ru'],
        localeDetection: false,
        localePath: path.resolve('./src/locales/')
    }
}

module.exports = nextI18NextConfig