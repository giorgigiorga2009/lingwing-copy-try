/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: "en",
    locales: ["en", "bn", "es", "ka", "ru", "tr",],
  },

  i18n: {
    locales: ['de', 'bn', 'en', 'es', 'ka-GE', 'ru', 'tr', 'pseudo'],
    defaultLocale: 'en'
  }
}

module.exports = nextConfig

