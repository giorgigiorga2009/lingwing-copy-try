import axios from 'axios'

export type FaqData = {
  question: string
  answer: string
  position: number
}

export const getFAQ = (): Promise<FaqData[]> => {
  return axios
    .get(`${process.env.defaultURL}/public/faqPricing`)
    .then(response => response.data.data)

    .catch(error => console.log(error))
}
