export const LANGUAGES = {
  eng: 'English',
  rus: 'Russian',
  geo: 'Georgian',
  tur: 'Turkish',
  ben: 'Bengali',
  esp: 'Spanish',
  fre: 'French',
  ita: 'Italian',
  deu: 'German',
}

export const LANGUAGES_TO_LOCALES = {
  eng: 'en',
  rus: 'ru',
  geo: 'ka',
  tur: 'tr',
  ben: 'bn',
  esp: 'es',
} as const

export const LOCALES_TO_LANGUAGES = {
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
  'deu',
  'ita',
] as const

export type SwitchedLanguage = typeof SWITCHED_LANGUAGES[number]
export type LearnedLanguage = typeof LEARNED_LANGUAGES[number]
export type Locale = typeof LANGUAGES_TO_LOCALES[SwitchedLanguage]
export type Language = keyof typeof LANGUAGES
