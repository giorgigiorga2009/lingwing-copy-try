import axios from "axios"

export const getUserId = async ({
    languageTo,
    languageFrom,
    courseName,
  }: {
    languageTo: string | string[]
    languageFrom: string | string[]
    courseName: string | string[]
  }): Promise<string | undefined> => {
    try {
      const response = await axios ({
        url: `${process.env.defaultURL}/public/startLearning/${courseName}/${languageFrom}?lang=${languageTo}`,
      })
      return response.data.data.userKey
    } catch (error) {
      console.log(error)
    }
  }