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
    .get(`${process.env.defaultURL}/reviews`)
    .then(response => {
      console.log(response)
      return response.data.data
    })

    .catch(error => console.log(error))
}
