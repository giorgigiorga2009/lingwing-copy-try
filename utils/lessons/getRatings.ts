import axios from 'axios'
import getConfig from 'next/config'
// //const { process.env } = getConfig()

interface Props {
  courseId: string
  period: 'topTwenty' | 'daily' | 'weekly'
  token?: string | null
}

export const getRatings = async ({ courseId, period, token }: Props) => {
  const headers = {
    Authorization: token ?? '',
  }
  console.log(process.env.NEXT_PUBLIC_DEFAULT_URL ||process.env.DEFAULT_URL)
  return await axios
    .get(
      `${process.env.NEXT_PUBLIC_DEFAULT_URL ||process.env.DEFAULT_URL}/public/rating/${period}/${courseId}?lang=eng`,
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
