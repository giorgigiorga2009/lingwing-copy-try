import axios from 'axios'

export type ReviewData = {
  _id: string
  review: string
  userName: string
  rating: number
  avatarURL: string
}

export const getReviews = (): Promise<ReviewData[]> => {
  return axios
    .get(`${process.env.DEFAULT_URL}/public/reviews`)
    .then(response => response.data.data)

    .catch(error => console.log(error))
}
