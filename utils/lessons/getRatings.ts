import axios from 'axios'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

interface Props {
  courseId: string
  period: 'topTwenty' | 'daily' | 'weekly'
  token?: string | null
}

export const getRatings = async ({ courseId, period, token }: Props) => {
  const headers = {
    Authorization: token ?? '',
  }
  return await axios
    .get(
      `${publicRuntimeConfig.DEFAULT_URL}/public/rating/${period}/${courseId}?lang=eng`,
      {
        headers: headers,
      },
    )
    .then(response => response.data.data)
    .catch(error => {
      console.log(error)
      return error
    })
}
