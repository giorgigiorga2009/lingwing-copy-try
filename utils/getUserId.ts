import axios from 'axios'
import getConfig from 'next/config'
//const { process.env } = getConfig()

export const getUserId = async ({
  languageTo,
  languageFrom,
  courseName,
  token,
}: {
  languageTo: string | string[]
  languageFrom: string | string[]
  courseName: string | string[]
  token: string | null
}): Promise<string | undefined> => {
  try {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_DEFAULT_URL}/public/startLearning/${courseName}/${languageFrom}?lang=${languageTo}`,
      headers: {
        authorization: token ?? '',
      },
    })
    return response.data.data.userKey
  } catch (error) {
    console.log(error)
  }
}
