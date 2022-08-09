import axios from 'axios'
import { LanguageFrom, LanguageTo } from './languages'

const URL_LEVELS = `${process.env.defaultURL}/getLanguageStandard`
const URL_LEVEL_OPTIONS = `${process.env.defaultURL}/getCourses`

type LanguageLevelData = {
  _id: {
    _id: string
    name: string
    smallDescription: {
      [x in LanguageFrom]: string
    }
    fullDescription: {
      [x in LanguageFrom]: string
    }
    uniqueStudentsCount: number
  }
}

interface LevelOptionData {
  _id: string
  slug: string
  title: string
  testAvailable: boolean
  studyingTheCourse: number
  languageSubStandard: string
  iLearnFrom: string
  iLearn: string
  fullDescription: string
  smallDescription: string
  subTotalActiveTask: number
  status: {
    start: boolean
    continue: boolean
    buy: boolean
    retake: boolean
    time: {
      start: null
      end: null
    }
  }
}

export type LanguageLevel = {
  name: string
  smallDescription: {
    [x in LanguageFrom]: string
  }
  fullDescription: {
    [x in LanguageFrom]: string
  }
  uniqueStudentsCount: number
  options: {
    title: string
    studyingTheCourse: number
    fullDescription: string
    smallDescription: string
  }[]
}

const getLevelOptions = (
  id: string,
  languageTo: LanguageTo,
  languageFrom: LanguageFrom,
  locale: LanguageFrom,
): Promise<LevelOptionData[]> => {
  return axios
    .get(
      `${URL_LEVEL_OPTIONS}/${languageTo}/${languageFrom}/${id}?lang=${locale}`,
    )
    .then(response => response.data.data)
    .catch(error => console.log(error))
}

const getFormattedLevels = (
  level: LanguageLevelData,
  options: LevelOptionData[],
): LanguageLevel => {
  console.log(options)
  return {
    name: level._id.name,
    smallDescription: level._id.smallDescription,
    fullDescription: level._id.fullDescription,
    uniqueStudentsCount: level._id.uniqueStudentsCount,
    options: options.map(option => {
      return {
        title: option.title,
        studyingTheCourse: option.studyingTheCourse,
        fullDescription: option.fullDescription,
        smallDescription: option.smallDescription,
      }
    }),
  }
}

export const getLanguageLevels = (
  languageTo: LanguageTo,
  languageFrom: LanguageFrom,
  locale: LanguageFrom,
): Promise<LanguageLevel[]> => {
  return axios
    .get(`${URL_LEVELS}/${languageTo}/${languageFrom}?lang=${locale}`)
    .then(response => {
      return response.data.data.map((level: LanguageLevelData) => {
        const result: Promise<LanguageLevel> = getLevelOptions(
          level._id._id,
          languageTo,
          languageFrom,
          locale,
        ).then(response => {
          return getFormattedLevels(level, response)
        })

        return result
      })
    })
    .catch(error => console.log(error))
}
