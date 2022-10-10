import axios from 'axios'

export type PackageData = {
  _id: string
  title: string
  duration: number
  sale: number
  mostPopular: boolean

  currency: [{ price: number; recurringPrice: number }]

  feature: {
    tasks: number
    tests: number
    certificate: boolean
    grammarAndStatistics: boolean
    voiceRecognition: boolean
  }

  discountUsers: {
    active: boolean
    percent: number
  }
}

export const getPackages = (): Promise<PackageData[]> => {
  return axios
    .get(`${process.env.defaultURL}/public/inter/packages`)
    .then(response => response.data.data.packages)

    .catch(error => console.log(error))
}
