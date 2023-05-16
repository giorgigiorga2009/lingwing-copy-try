import axios from 'axios'
import { LanguageFrom } from '@utils/languages'

export type FaqData = {
  question: string
  answer: string
  position: number
}

export const getFAQ = (locale: LanguageFrom): Promise<FaqData[]> => {
  console.log(locale)
  return axios
    .get(`${process.env.defaultURL}/public/faqPricing?lang=${locale}`)
    .then(response => response.data.data)

    .catch(error => console.log(error))
}
