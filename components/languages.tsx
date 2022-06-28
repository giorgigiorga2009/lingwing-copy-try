export type ShortSwitchedLanguage =
  | 'eng'
  | 'esp'
  | 'geo'
  | 'rus'
  | 'tur'
  | 'ben'

export type LongSwitchedLanguage =
  | 'English'
  | 'Spanish'
  | 'Georgian'
  | 'Russian'
  | 'Turkish'
  | 'Bengali'

export type SwitchedLanguages = {
  long: LongSwitchedLanguage
  short: ShortSwitchedLanguage
}

export const SWITCHED_LANGUAGES = [
  {
    long: 'English',
    short: 'eng',
  },
  {
    long: 'Russian',
    short: 'rus',
  },
  {
    long: 'Georgian',
    short: 'geo',
  },
  {
    long: 'Turkish',
    short: 'tur',
  },
  {
    long: 'Bengali',
    short: 'ben',
  },
  {
    long: 'Spanish',
    short: 'esp',
  },
] as SwitchedLanguages[]

export type ShortLearnedLanguage =
  | 'eng'
  | 'esp'
  | 'geo'
  | 'rus'
  | 'fre'
  | 'ben'
  | 'ita'

export type LongLearnedLanguage =
  | 'English'
  | 'Spanish'
  | 'Georgian'
  | 'Russian'
  | 'French'
  | 'Bengali'
  | 'Italian'

export type LearnedLanguages = {
  long: LongLearnedLanguage
  short: ShortLearnedLanguage
}

export const LEARNED_LANGUAGES = [
  { long: 'Italian', short: 'ita' },
  {
    long: 'English',
    short: 'eng',
  },
  {
    long: 'Russian',
    short: 'rus',
  },
  {
    long: 'Georgian',
    short: 'geo',
  },
  {
    long: 'French',
    short: 'fre',
  },
  {
    long: 'Bengali',
    short: 'ben',
  },
  {
    long: 'Spanish',
    short: 'esp',
  },
  ...SWITCHED_LANGUAGES,
] as LearnedLanguages[]
