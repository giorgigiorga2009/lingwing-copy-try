export const LANGUAGE_NAMES = {
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

export const SWITCHED_LANGUAGES = Object.keys(
  LANGUAGES_TO_LOCALES,
) as SwitchedLanguage[]

export const LEARN_LANGUAGES = [
  'eng',
  'esp',
  'geo',
  'rus',
  'fre',
  'deu',
  'ita',
] as const

export type SwitchedLanguage = keyof typeof LANGUAGES_TO_LOCALES
export type LearnedLanguage = typeof LEARN_LANGUAGES[number]
export type Locale = keyof typeof LOCALES_TO_LANGUAGES
export type Language = keyof typeof LANGUAGE_NAMES
