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
  setCurrentTaskNumber: (number: number) => void
  currentTaskNumber: number
  currentTask: TaskData
}

export const MistakeCorrectionTask: FC<Props> = ({
  token,
  languageTo,
  languageFrom,
  courseId,
  setCurrentTaskNumber,
  currentTaskNumber,
  currentTask,
}) => {
  const mistakeText = currentTask.errorText

  const [inputText, setInputText] = useState(mistakeText)
  const [isCorrect, setIsCorrect] = useState(false)
  const [mistakesCount, setMistakesCount] = useState(0)
  const [mistakeRepeat, setMistakeRepeat] = useState(false)

  const correctText = currentTask.correctText as string
  const wordsSynonyms = currentTask.wordsSynonyms
  const ordinalNumber = currentTask.ordinalNumber

  useEffect(() => {
    if (token === null) return

    if (inputText === correctText) {
      saveTask({ token, languageFrom, languageTo, ordinalNumber, courseId })
      setCurrentTaskNumber(currentTaskNumber + 1)
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

  const checkAnswer = () => {
    if (inputText === correctText) {
      setMistakeRepeat(false)
      setIsCorrect(true)
      if (token === null) return
      saveTask({ token, languageFrom, languageTo, ordinalNumber, courseId })
      setCurrentTaskNumber(currentTaskNumber + 1)
    } else {
      mistakeRepeat === false &&
        (setMistakesCount(mistakesCount + 1), setMistakeRepeat(true))
    }
  }

  return (
    <div className={style.container}>
      <div className={style.mistakes}> {mistakesCount} </div>

      <input type="text" value={inputText} onChange={handleInputChange} />

      <div className={style.checkButton} onClick={checkAnswer}>
        Check
      </div>
    </div>
  )
}
