/** @type {import('next').NextConfig} */
const previousConfig = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'bn', 'es', 'ka', 'ru', 'tr'],
  },
  publicRuntimeConfig: {
    DEFAULT_URL: process.env.DEFAULT_URL,
    AUDIO_URL: process.env.AUDIO_URL,
    FACEBOOK_ID: process.env.FACEBOOK_ID,
    FACEBOOK_SECRET: process.env.FACEBOOK_SECRET,
    GOOGLE_ID : process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    NEXT_PUBLIC_SLACK_WEBHOOK_URL: process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL,
    SECRET : process.env.SECRET,
  },
  images: {
    domains: [
      'cdn-dev.lingwing.com',
      'platform-lookaside.fbsbx.com',
      'lh3.googleusercontent.com',
    ],
  },
}

module.exports = {
  ...previousConfig,
  output: 'standalone',
}
