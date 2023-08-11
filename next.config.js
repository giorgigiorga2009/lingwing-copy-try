/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'bn', 'es', 'ka', 'ru', 'tr'],
  },
  env: {
    defaultURL: 'http://api-dev.lingwing.com/api/v2',
    audioURL: 'https://cdn.lingwing.com',
  },
}

module.exports = nextConfig
