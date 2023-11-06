import axios from 'axios'

interface Props {
  courseId: string
  token?: string | null
}

export const getStatistics = async ({ courseId, token }: Props) => {
  const headers = {
    Authorization: token ?? '',
  }
  return await axios
    .get(
      `${process.env.DEFAULT_URL}/public/statistics/small/${courseId}?lang=eng`,
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
