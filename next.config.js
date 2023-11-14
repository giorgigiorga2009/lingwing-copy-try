/** @type {import('next').NextConfig} */
// next.config.js
const { parsed: taskDefinitionEnv } = process.env;

module.exports = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'bn', 'es', 'ka', 'ru', 'tr'],
  },
  publicRuntimeConfig: {
    // runtime environment variables here
    DEFAULT_URL: taskDefinitionEnv.DEFAULT_URL || process.env.DEFAULT_URL,
    AUDIO_URL: taskDefinitionEnv.AUDIO_URL || process.env.AUDIO_URL,
    FACEBOOK_ID: taskDefinitionEnv.FACEBOOK_ID || process.env.FACEBOOK_ID,
    FACEBOOK_SECRET: taskDefinitionEnv.FACEBOOK_SECRET || process.env.FACEBOOK_SECRET,
    GOOGLE_ID: taskDefinitionEnv.GOOGLE_ID || process.env.GOOGLE_ID,
    GOOGLE_SECRET: taskDefinitionEnv.GOOGLE_SECRET || process.env.GOOGLE_SECRET,
    NEXT_PUBLIC_SLACK_WEBHOOK_URL: taskDefinitionEnv.NEXT_PUBLIC_SLACK_WEBHOOK_URL || process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL,
    SECRET: taskDefinitionEnv.SECRET || process.env.SECRET,
  },
  images: {
    domains: [
      'cdn-dev.lingwing.com',
      'platform-lookaside.fbsbx.com',
      'lh3.googleusercontent.com',
    ],
  },
};
