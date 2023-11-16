import axios from 'axios'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export const getUsersAmount = () => {
  return axios
    .get(`${publicRuntimeConfig.DEFAULT_URL}/public/users/count`)
    .then(response => response.data.data)
    .catch(error => console.log(error))
}
