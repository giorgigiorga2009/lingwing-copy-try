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
