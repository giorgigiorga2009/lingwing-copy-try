import React, {
  useState,
  KeyboardEvent,
  ChangeEvent,
  FC,
  useEffect,
} from 'react'
import { TaskData } from '../../utils/lessons/getTask'
import { saveTask } from '../../utils/lessons/saveTask'
import style from './MistakeCorrection.module.scss'

interface Props {
  token: string | null
  languageTo: string | string[]
  languageFrom: string | string[]
  courseId: string
  userId: string | null
  setCurrentTaskNumber: (number: number) => void
  currentTaskNumber: number
  currentTask: TaskData
  completedTasks: TaskData[] | undefined
  setCompletedTasks: (tasks: TaskData[]) => void
  setIsHintShown: (bool: boolean) => void
  setHintText: (text: string) => void
}

export const MistakeCorrectionTask: FC<Props> = ({
  userId,
  token,
  languageTo,
  languageFrom,
  courseId,
  setCurrentTaskNumber,
  currentTaskNumber,
  currentTask,
  completedTasks,
  setCompletedTasks,
  setIsHintShown,
  setHintText,
}) => {
  const mistakeText = currentTask.errorText

  const [inputText, setInputText] = useState(mistakeText)
  const [mistakesCount, setMistakesCount] = useState(0)
  const [mistakeRepeat, setMistakeRepeat] = useState(false)

  const correctText = currentTask.correctText as string

  useEffect(() => {
    if (token === null && userId === null) return

    if (inputText === correctText) {
      setTimeout(async () => {
        const isSaveSuccessful = await saveTask({
          userId,
          token,
          languageFrom,
          languageTo,
          currentTask,
          courseId,
        })
        if (isSaveSuccessful) {
          setCurrentTaskNumber(currentTaskNumber + 1)
          setIsHintShown(false)
          completedTasks && setCompletedTasks([...completedTasks, currentTask])
          !completedTasks && setCompletedTasks([currentTask])
        }
      }, 1500)
    }
  }, [inputText])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value)
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      checkAnswer()
    }
  }

  const checkAnswer = async () => {
    if (inputText === correctText) {
      setMistakeRepeat(false)
      setIsHintShown(false)
      if (token === null && userId === null) return
      const isSaveSuccessful = await saveTask({
        userId,
        token,
        languageFrom,
        languageTo,
        currentTask,
        courseId,
      })
      if (isSaveSuccessful) {
        setInputText('')
        setCurrentTaskNumber(currentTaskNumber + 1)
        completedTasks && setCompletedTasks([...completedTasks, currentTask])
        !completedTasks && setCompletedTasks([currentTask])
      }
    } else {
      if (mistakeRepeat === false) {
        setMistakesCount(mistakesCount + 1)
        setMistakeRepeat(true)
        setIsHintShown(true)
        setHintText(correctText)
      }
    }
  }

  return (
    <div className={style.container}>
      <div className={style.mistakes}> {mistakesCount} </div>

      <input
        type="text"
        className={style.input}
        value={inputText}
        onChange={handleInputChange}
      />

      <div className={style.checkButton} onClick={checkAnswer}>
        Check
      </div>
    </div>
  )
}
