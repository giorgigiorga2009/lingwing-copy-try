/** @type {import('next').NextConfig} */
const previousConfig = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'bn', 'es', 'ka', 'ru', 'tr'],
  },
  serverRuntimeConfig: {
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
};

module.exports = {
  ...previousConfig,
  output: 'standalone',
};
