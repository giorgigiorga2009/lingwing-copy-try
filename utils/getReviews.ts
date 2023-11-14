import axios from 'axios'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig();

export type ReviewData = {
  _id: string
  review: string
  userName: string
  rating: number
  avatarURL: string
}

export const getReviews = (): Promise<ReviewData[]> => {
  return axios
    .get(`${publicRuntimeConfig.DEFAULT_URL}/public/reviews`)
    .then(response => response.data.data)

    .catch(error => console.log(error))
}
