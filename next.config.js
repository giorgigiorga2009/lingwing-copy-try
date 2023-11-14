module.exports = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'bn', 'es', 'ka', 'ru', 'tr'],
  },
  publicRuntimeConfig: {
    DEFAULT_URL: process.env.NEXT_PUBLIC_DEFAULT_URL || 'default-value',
    AUDIO_URL: process.env.NEXT_PUBLIC_AUDIO_URL || 'default-value',
    FACEBOOK_ID: process.env.NEXT_PUBLIC_FACEBOOK_ID || 'default-value',
    FACEBOOK_SECRET: process.env.NEXT_PUBLIC_FACEBOOK_SECRET || 'default-value',
    GOOGLE_ID: process.env.NEXT_PUBLIC_GOOGLE_ID || 'default-value',
    GOOGLE_SECRET: process.env.NEXT_PUBLIC_GOOGLE_SECRET || 'default-value',
    NEXT_PUBLIC_SLACK_WEBHOOK_URL: process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL || 'default-value',
    SECRET: process.env.NEXT_PUBLIC_SECRET || 'default-value',
  },
  images: {
    domains: [
      'cdn-dev.lingwing.com',
      'platform-lookaside.fbsbx.com',
      'lh3.googleusercontent.com',
    ],
  },
};
