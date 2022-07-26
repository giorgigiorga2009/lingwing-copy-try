export const LANGUAGES = {
  eng: 'English',
  rus: 'Russian',
  geo: 'Georgian',
  tur: 'Turkish',
  ben: 'Bengali',
  esp: 'Spanish',
  fre: 'French',
  ita: 'Italian',
  ger: 'German',
}

export const LOCALES_TO_LANGUAGES = {
  eng: 'en',
  rus: 'ru',
  geo: 'ka',
  tur: 'tr',
  ben: 'bn',
  esp: 'es',
} as const

export const LANGUAGES_TO_LOCALES = {
  en: 'eng',
  ru: 'rus',
  ka: 'geo',
  tr: 'tur',
  bn: 'ben',
  es: 'esp', 
} as const

export const SWITCHED_LANGUAGES = [
  'eng',
  'esp',
  'geo',
  'rus',
  'tur',
  'ben',
] as const

export const LEARNED_LANGUAGES = [
  'eng',
  'esp',
  'geo',
  'rus',
  'fre',
  'ger',
  'ita',
] as const

export type SwitchedLanguage = typeof SWITCHED_LANGUAGES[number]
export type LearnedLanguage = typeof LEARNED_LANGUAGES[number]
export type Locales = typeof LOCALES_TO_LANGUAGES[SwitchedLanguage]
