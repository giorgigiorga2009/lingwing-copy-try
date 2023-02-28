import axios from 'axios'

export const saveTask = async ({
  languageTo,
  languageFrom,
  courseId,
  token,
  userKey = null,
  ordinalNumber,
}: {
  languageTo: string | string[]
  languageFrom: string | string[]
  token: string
  courseId: string
  userKey?: string | null
  ordinalNumber: number
}): Promise<void> => {
  const url = `${process.env.defaultURL}/public/saveTask/${courseId}/${languageFrom}?lang=${languageTo}`
  const payload = {
    userCourseId: courseId,
    iLearnFromNameCode: languageFrom,
    userKey: userKey,
    ordinalNumber: ordinalNumber,
  }
  const config = {
    headers: { Authorization: token },
  }

  try {
    const response = await axios.post(url, payload, config)
    console.log(response.data.status)
  } catch (error) {
    console.log(error)
  }
}
