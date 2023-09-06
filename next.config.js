/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'bn', 'es', 'ka', 'ru', 'tr'],
  },
  env: {
    DEFAULT_URL: process.env.DEFAULT_URL,
    audioURL: process.env.AUDIO_URL,
  },
}

module.exports = nextConfig
