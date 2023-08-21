import React, {
  useState,
  KeyboardEvent,
  ChangeEvent,
  FC,
  useEffect,
} from 'react'
import { saveTask } from '@utils/lessons/saveTask'
import style from './MistakeCorrection.module.scss'
import { CommonProps, handleChange } from '@utils/lessons/taskInputUtils'

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
  const correctText = commonProps.currentTask.correctText as string

  const [inputText, setInputText] = useState(mistakeText)
  const [mistakesCount, setMistakesCount] = useState(0)
  const [mistakeRepeat, setMistakeRepeat] = useState(false)

  const saveCurrentTask = async () => {
    try {
      await saveTask({ ...commonProps })
      return true
    } catch (error) {
      console.error('Error saving task:', error)
      return false
    }
  }

  useEffect(() => {
    if (!commonProps.token && !commonProps.userId) return

    if (inputText.replace(/\s+/g, ' ') === correctText) {
      setInputText(inputText.replace(/\s+/g, ' '))
      setTimeout(async () => {
        const isSaved = await saveCurrentTask()
        if (isSaved) {
          setIsHintShown(false)
          updateCompletedTasks()
        }
      }, 1500)
    }
  }, [inputText])

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (inputText === correctText) return

    handleChange(
      event,
      commonProps.languageTo as 'geo' | 'eng' | 'rus',
      setInputText,
    )

    setIsHintShown(false)
    setMistakeRepeat(false)
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      checkAnswer()
    }
  }

  const updateCompletedTasks = () => {
    const newCompletedTasks = commonProps.completedTasks
      ? [...commonProps.completedTasks, commonProps.currentTask]
      : [commonProps.currentTask]
    commonProps.setCompletedTasks(newCompletedTasks)
    commonProps.setCurrentTaskNumber(commonProps.currentTaskNumber + 1)
  }

  const checkAnswer = async () => {
    if (inputText === correctText) {
      setMistakeRepeat(false)
      setIsHintShown(false)
      if (!commonProps.token && !commonProps.userId) return
      const isSaved = await saveCurrentTask()
      if (isSaved) {
        setInputText('')
        updateCompletedTasks()
      }
    } else if (!mistakeRepeat) {
      setMistakesCount(prev => prev + 1)
      setMistakeRepeat(true)
      setIsHintShown(true)
      setHintText(correctText)
    }
  }

  return (
    <div className={style.container}>
      <div className={style.mistakes}> {mistakesCount} </div>
      <textarea
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
