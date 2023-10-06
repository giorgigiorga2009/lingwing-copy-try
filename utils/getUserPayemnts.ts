import axios from 'axios'

export interface PaymentsProps {
    premiumDaysLeft: number
    tests: number
    tasks: number
    creditCard: any
  }

export const getUserPayements = (authToken: string) => {
    return axios 
        .get(`${process.env.DEFAULT_URL}/user/userPaymentsList`,{
            headers : {
                authorization: authToken
            }
        })
        .then(response => response.data.data )
        .catch(error => console.log(error))
}