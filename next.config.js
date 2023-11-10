/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'bn', 'es', 'ka', 'ru', 'tr'],
  },
  env: {
    DEFAULT_URL: process.env.NEXT_PUBLIC_DEFAULT_URL,
    audioURL: process.env.NEXT_PUBLIC_AUDIO_URL,
  },
  images: {
    domains: [
      'cdn-dev.lingwing.com',
      'platform-lookaside.fbsbx.com',
      'lh3.googleusercontent.com',
    ],
  },
}

module.exports = nextConfig
