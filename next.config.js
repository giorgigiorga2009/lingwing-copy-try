/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'bn', 'es', 'ka', 'ru', 'tr'],
  },
  env: {
    defaultURL: 'https://api.lingwing.com/api/v2',
  },
}

module.exports = nextConfig
