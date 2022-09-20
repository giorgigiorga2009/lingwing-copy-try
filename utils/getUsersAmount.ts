import axios from 'axios'

export const getUsersAmount = () => {
  return axios
    .get(`${process.env.defaultURL}/public/users/count`)
    .then(response => response.data.data)
    .catch(error => console.log(error))
}
