import axios from 'axios'
import getConfig from 'next/config'
//const { process.env } = getConfig()

export const getUsersAmount = () => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/public/users/count`)
    .then(response => response.data.data)
    .catch(error => console.log(error))
}
