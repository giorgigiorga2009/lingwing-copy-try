import axios from 'axios'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig();

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
      `${publicRuntimeConfig.DEFAULT_URL}/public/statistics/small/${courseId}?lang=eng`,
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
