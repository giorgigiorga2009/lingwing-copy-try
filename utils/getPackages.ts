import axios from 'axios'

export type PackageData = {
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

      discountUsers: {
        active: boolean
        percent: number
      }
    },
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
export interface PackagesInfoProps {
  header: string
  paragraph: string
  buttonText: string
  index: number | string
  fromGelText?: string
}

export const getPackages = (coupon: string): Promise<PackageData> => {
  return axios
    .get(
      `${process.env.DEFAULT_URL}/public/inter/packages${
        '?coupon=' + (coupon ?? '')
      }`,
    )
    .then(response => response.data.data)

    .catch(error => console.log(error))
}
