module.exports = {
  locales: ['de', 'bn', 'en', 'es', 'ka-GE', 'ru', 'tr', 'pseudo'],
  pseudoLocale: 'pseudo',
  sourceLocale: 'en',
  fallbackLocales: {
    default: 'en-US'
  },
  catalogs: [
    {
      path: 'src/translations/locales/{locale}/messages',
      include: ['src/pages', 'src/components']
    }
  ],
  format: 'json'
}