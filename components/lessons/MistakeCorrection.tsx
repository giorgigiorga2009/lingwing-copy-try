import React, {
  useState,
  KeyboardEvent,
  ChangeEvent,
  FC,
  useEffect,
} from 'react'
import { saveTask } from '@utils/lessons/saveTask'
import style from './MistakeCorrection.module.scss'
import { CommonProps } from '@utils/lessons/taskInputUtils'

interface Props {
  commonProps: CommonProps
  setIsHintShown: (bool: boolean) => void
  setHintText: (text: string) => void
}

export const MistakeCorrectionTask: FC<Props> = ({
  commonProps,
  setIsHintShown,
  setHintText,
}) => {
  const mistakeText = commonProps.currentTask.errorText

  const [inputText, setInputText] = useState(mistakeText)
  const [mistakesCount, setMistakesCount] = useState(0)
  const [mistakeRepeat, setMistakeRepeat] = useState(false)

  const correctText = commonProps.currentTask.correctText as string

  const saveCurrentTask = async () => {
    try {
      await saveTask({
        userId: commonProps.userId,
        token: commonProps.token,
        languageFrom: commonProps.languageFrom,
        languageTo: commonProps.languageTo,
        currentTask: commonProps.currentTask,
        courseId: commonProps.courseId,
      })
      return true // Indicate that the save was successful
    } catch (error) {
      console.error('Error saving task:', error)
      return false // Indicate that the save was unsuccessful
    }
  }

  useEffect(() => {
    if (commonProps.token === null && commonProps.userId === null) return

    if (inputText === correctText) {
      setTimeout(async () => {
        const isSaveSuccessful = await saveCurrentTask()
        if (isSaveSuccessful) {
          setIsHintShown(false)
          commonProps.setCurrentTaskNumber(commonProps.currentTaskNumber + 1)
          commonProps.completedTasks &&
            commonProps.setCompletedTasks([
              ...commonProps.completedTasks,
              commonProps.currentTask,
            ])
          !commonProps.completedTasks &&
            commonProps.setCompletedTasks([commonProps.currentTask])
        }
      }, 1500)
    }
  }, [inputText])

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value)
    setIsHintShown(false)
    setMistakeRepeat(false)
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      checkAnswer()
    }
  }

  const checkAnswer = async () => {
    if (inputText === correctText) {
      setMistakeRepeat(false)
      setIsHintShown(false)
      if (commonProps.token === null && commonProps.userId === null) return
      const isSaveSuccessful = await saveCurrentTask()
      if (isSaveSuccessful) {
        setInputText('')
        commonProps.setCurrentTaskNumber(commonProps.currentTaskNumber + 1)
        commonProps.completedTasks &&
          commonProps.setCompletedTasks([
            ...commonProps.completedTasks,
            commonProps.currentTask,
          ])
        !commonProps.completedTasks &&
          commonProps.setCompletedTasks([commonProps.currentTask])
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

      <textarea
        //type="text"
        className={style.input}
        value={inputText}
        autoComplete="off"
        spellCheck="false"
        data-gramm="false"
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />

      <button className={style.checkButton} onClick={checkAnswer}>
        Check
      </button>
    </div>
  )
}
