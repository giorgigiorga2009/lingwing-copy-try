import languagesFromData from '../utils/languagesFrom.json'
import _ from 'lodash'

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

export const LANGUAGES_TO = [
  'eng',
  'esp',
  'geo',
  'rus',
  'fre',
  'deu',
  'ita',
] as const

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

export const LANGUAGE_FROM = _.keys(LANGUAGES_TO_LOCALES) as LanguageFrom[]

export type LanguageTo = typeof LANGUAGES_TO[number]
export type Language = keyof typeof LANGUAGE_NAMES
export type LanguageFrom = keyof typeof LANGUAGES_TO_LOCALES

export const getLanguagesFrom = (language: string): LanguageFrom[] => {
  const languageData = languagesFromData.data.find(
    data => data.nameCode === language,
  )
  return languageData !== undefined
    ? languageData.iLearnFrom.map(language => language.nameCode as LanguageFrom)
    : []
}
