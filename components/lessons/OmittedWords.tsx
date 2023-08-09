import style from './OmittedWords.module.scss'
import { saveTask } from '@utils/lessons/saveTask'
import {
  handleChangeOmittedWords,
  CommonProps,
} from '@utils/lessons/taskInputUtils'
import React, { FC, useEffect, useRef, useState } from 'react'

interface Props {
  commonProps: CommonProps
  wordsArray: string[]
  onKeyDown: (event: React.KeyboardEvent) => void
  isHintShown: boolean
  setMistakesCount: (values: number) => void
  mistakesCount: number
  setIsHintShown: (bool: boolean) => void
  setHintText: (text: string) => void
}

export const OmittedWords: FC<Props> = ({
  wordsArray,
  onKeyDown,
  isHintShown,
  setMistakesCount,
  mistakesCount,
  commonProps,
  setIsHintShown,
  setHintText,
}) => {
  const [words, setWords] = useState<string[]>([])
  const [correctWords, setCorrectWords] = useState<string[]>([])
  const inputRefs = useRef<HTMLInputElement[]>([])
  const inputsCount = wordsArray.filter(item => /^\[.*\]$/.test(item)).length
  //const [inputText, setInputText] = useState('')

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const inputText = handleChangeOmittedWords(
      event,
      commonProps.languageTo as 'geo' | 'eng' | 'rus',
    )

    console.log(inputText)
    //const inputValue = event.target.value
    const newWords = [...words]
    const missingWord = wordsArray[index].slice(1, -1)

    const isTextValid =
      inputText.toLowerCase() ===
      missingWord.substring(0, inputText.length).toLowerCase()

    if (isTextValid) {
      setIsHintShown(false)
      newWords[index] = missingWord.substring(0, inputText.length)
      setWords(newWords)

      const nextInputRef = inputRefs.current
        .slice(index + 1)
        .find(element => element !== undefined)

      if (inputText.length === missingWord.length) {
        setCorrectWords(prevWords => [...prevWords, missingWord])
        nextInputRef && nextInputRef.focus()
      }
    } else {
      if (!isHintShown) {
        setMistakesCount(mistakesCount + 1)
        setIsHintShown(true)
        setHintText(missingWord)
      }
    }
  }

  useEffect(() => {
    if (commonProps.token === null && commonProps.userId === null) return
    if (correctWords.length === inputsCount) {
      setTimeout(async () => {
        const isSaveSuccessful = await saveTask({
          userId: commonProps.userId,
          token: commonProps.token,
          languageFrom: commonProps.languageFrom,
          languageTo: commonProps.languageTo,
          currentTask: commonProps.currentTask,
          courseId: commonProps.courseId,
        })
        if (isSaveSuccessful) {
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
  }, [correctWords])

  useEffect(() => {
    inputRefs.current.find(element => element !== undefined)?.focus()
  }, [])

  return (
    <div className={style.inputContainer}>
      {wordsArray.map((word, index) => {
        if (word.startsWith('[')) {
          const currentValue = words[index]

          return (
            <input
              className={style.input}
              key={index}
              value={currentValue !== undefined ? currentValue : ''}
              onChange={event => handleInputChange(event, index)}
              onKeyDown={onKeyDown}
              ref={el => (inputRefs.current[index] = el!)}
            />
          )
        } else {
          return <span key={index}>{word} </span>
        }
      })}
    </div>
  )
}
