import axios from 'axios'

export type PackageData = {
<<<<<<< HEAD
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
=======
  packages: [
    {
      _id: string
      title: string
      duration: number
      sale: number
      mostPopular: boolean

      currency: [
        {
          price: number
          oldPrice: number
          recurringPrice: number
          _id: { symbol: string }
        },
      ]

      feature: {
        tasks: number
        certificate: boolean
        grammarAndStatistics: boolean
        voiceRecognition: boolean
      }
>>>>>>> 4e38685 (Work in progress)

      discountUsers: {
        active: boolean
        percent: number
      }
    },
  ]

  currencies: [
    {
      identifier: string
      symbol: string
    },
  ]
}

export const getPackages = (): Promise<PackageData> => {
  return axios
    .get(`${process.env.defaultURL}/public/inter/packages`)
<<<<<<< HEAD
    .then(response => response.data.data.packages)
=======
    .then(response => response.data.data)

>>>>>>> 4e38685 (Work in progress)
    .catch(error => console.log(error))
}
