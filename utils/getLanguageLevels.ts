import axios from 'axios'

const URL = 'https://api.lingwing.com/api/v2/public/getLanguageStandard'
export interface LanguageLevel {
  _id: {
    _id: string
    name: string
    smallDescription: {
      eng: string
      geo: string
      esp: string
      rus: string
      tur: string
      ben: string
    }
    fullDescription: {
      eng: string
      geo: string
      esp: string
      rus: string
      tur: string
      ben: string
    }
    uniqueStudentsCount: number
  }
}

export const getLanguageLevels = (
  learnLanguage: string,
  languageFrom: string,
  locale: string,
): Promise<LanguageLevel> => {
  return axios
    .get(`${URL}/${learnLanguage}/${languageFrom}?lang=${locale}`)
    .then(response => response.data.data)
    .catch(error => console.log(error))
}
