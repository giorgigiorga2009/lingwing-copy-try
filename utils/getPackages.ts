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
  ]

  currencies: [
    {
      identifier: string
      symbol: string
    },
  ]
}

export const getPackages = (coupon: string): Promise<PackageData> => {
  return axios
    .get(
      `${process.env.defaultURL}/public/inter/packages${
        '?coupon=' + (coupon ?? '')
      }`,
    )
    .then(response => response.data.data)

    .catch(error => console.log(error))
}
