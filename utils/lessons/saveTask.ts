import axios from 'axios'
import { TaskData } from './getTask'

export const saveTask = async ({
  languageTo,
  languageFrom,
  courseId,
  token,
  // userKey = null,
  currentTask,
}: {
  languageTo: string | string[]
  languageFrom: string | string[]
  token: string
  courseId: string
  // userKey?: string | null
  currentTask: TaskData
}): Promise<void> => {
  const url = `${process.env.defaultURL}/public/saveTask/${courseId}/${languageFrom}?lang=${languageTo}`
  const payload = {
    userCourseId: courseId,
    iLearnFromNameCode: languageFrom,
    symbols: [],
    task: {
      _id: currentTask.id,
      segment: '',
      error: 0,
      ordinalNumber: currentTask.ordinalNumber,
      timeSpent: 22,
      totalMistakes: 0,
      taskMistakes: [],
      percent: 0.6078288353999514,
      forgivenErrorQuantity: 0,
      notForgivenErrorQuantity: 0,
      usedRecognition: 0,
      totalTypedWithRecognition: 0,
      totalTypedWithoutRecognition: 9,
      mistakeWithRecognition: 0,
      saveType: 0,
      taskType: currentTask.taskType,
    },
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
