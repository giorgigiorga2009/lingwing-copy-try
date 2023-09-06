import axios from 'axios'
import { TaskData } from './getTask'

export const saveTask = async ({
  languageTo,
  languageFrom,
  courseId,
  token,
  userId,
  currentTask,
}: {
  languageTo: string | string[]
  languageFrom: string | string[]
  token: string | null
  courseId: string
  userId: string | null
  currentTask: TaskData
}): Promise<boolean> => {
  let url = `${process.env.DEFAULT_URL}/public/saveTask/${courseId}/${languageFrom}?lang=${languageTo}`
  if (token === null) {
    url = `${url}&userKey=${userId}`
  }
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
      percent: 0.06078288353999514,
      forgivenErrorQuantity: 1,
      notForgivenErrorQuantity: 1,
      usedRecognition: 0,
      totalTypedWithRecognition: 0,
      totalTypedWithoutRecognition: 1,
      mistakeWithRecognition: 0,
      saveType: 0,
      taskType: currentTask.taskType,
    },
  }
  const config = token ? { headers: { Authorization: token } } : {}

  try {
    await axios.post(url, payload, config)
    return true
  } catch (error) {
    console.error('An error occurred while saving task:', error)
    return false
  }
}
