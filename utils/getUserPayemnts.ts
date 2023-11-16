import axios from 'axios'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export interface PaymentsProps {
  premiumDaysLeft: number
  tests: number
  tasks: number
  creditCard: any
}

export const getUserPayements = (authToken: string) => {
  return axios
    .get(`${publicRuntimeConfig.DEFAULT_URL}/user/userPaymentsList`, {
      headers: {
        authorization: authToken,
      },
    })
    .then(response => response.data.data)
    .catch(error => console.log(error))
}
