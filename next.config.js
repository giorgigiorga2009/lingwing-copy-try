/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'bn', 'es', 'ka', 'ru', 'tr'],
  },
  publicRuntimeConfig: {
    // Your runtime environment variables here
    DEFAULT_URL: process.env.DEFAULT_URL,
    audioURL: process.env.AUDIO_URL,

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
