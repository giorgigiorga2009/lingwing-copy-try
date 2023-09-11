import axios from 'axios'

export interface PackagesInfoProps {
  header: string
  paragraph: string
  buttonText: string
  index: number | string
  fromGelText?: string
}

export interface PackageResponse {
  monthlyPayment: number
}

let authToken = ''
if (typeof window !== 'undefined') {
  authToken = localStorage.getItem('authToken') || ''
}
const authConfig = {
  headers: {
    Authorization: authToken,
  },
}

export const getCheckedPackageInfo = async (): Promise<any> => {
  try {
    const response = await axios.post(
      `${process.env.defaultURL}/public/package/check`,
      {
        packageId: '5900c0aef4938479f8ebbd4a',
        selectedCurrency: 'GEL',
      },
      authConfig,
    )
    return response.data.data
  } catch (error) {
    console.error(error)
    return {}
  }
}

export const getPackageDataByIdInfo = async (
  id: string | number,
): Promise<PackageResponse | undefined> => {
  try {
    const res = await axios.get(`
      ${process.env.defaultURL}/public/getorder/${id}`)
    return res.data.data
  } catch (error) {
    console.error(error)
  }
}
