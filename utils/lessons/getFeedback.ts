import axios from 'axios'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

interface Props {
  token?: string | null
  feedbackData?: feedback
}

interface FeedbackResponse {
  status: number
  data?: null
}

export interface feedback {
  category: string
  course: string
  device: {
    os: string | null
    browser: string | null
    mobile: boolean
    screenSize: string
  }
  email: string
  image: string
  subCategory: string
  task: {
    id: string
    type: string
    ordinalNumber: number
    level: number
  }
  text: string
  userCourse: string
}

export const getFeedbackCategories = async ({ token }: Props) => {
  const headers = {
    Authorization: token ?? '',
  }

  const url = `${publicRuntimeConfig.DEFAULT_URL}/public/feedback/categories`

  try {
    const response = await axios.get(url, {
      headers: headers,
    })
    return response.data.data
  } catch (error) {
    console.log(error)
    return error
  }
}

export const sendFeedback = async ({
  token,
  feedbackData,
}: Props): Promise<FeedbackResponse> => {
  const url = `${publicRuntimeConfig.DEFAULT_URL}/public/feedbackSend?lang=geo`
  const HEADERS = {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json, text/plain, */*',
  }
  try {
    const config = token
      ? { headers: { ...HEADERS, Authorization: token } }
      : {}

    const response = await axios.post(url, feedbackData, config)
    return response
  } catch (error: any) {
    console.log(error)
    return error
  }
}
