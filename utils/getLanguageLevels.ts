import axios from 'axios'
import { LanguageFrom, LanguageTo } from './languages'

const URL = 'https://api.lingwing.com/api/v2/public/getLanguageStandard'
export type LanguageLevel = {
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

export const getLanguageLevels = (
  languageTo: LanguageTo,
  languageFrom: LanguageFrom,
  locale: LanguageFrom,
): Promise<LanguageLevel> => {
  return axios
    .get(`${URL}/${languageTo}/${languageFrom}?lang=${locale}`)
    .then(response => response.data.data)
    .catch(error => console.log(error))
}
