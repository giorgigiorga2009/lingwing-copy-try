import style from './OmittedWords.module.scss'
import { saveTask } from '@utils/lessons/saveTask'
import {
  handleChange,
  CommonProps,
  updateCompletedTasks,
  handleOnKeyDown,
} from '@utils/lessons/taskInputUtils'
import React, { FC, useEffect, useRef, useState } from 'react'

interface Props {
  commonProps: CommonProps
  isHintShown: boolean
  setIsHintShown: (bool: boolean) => void
  setHintText: (text: string) => void
}

export const OmittedWords: FC<Props> = ({
  isHintShown,
  commonProps,
  setIsHintShown,
  setHintText,
}) => {
  const [words, setWords] = useState<string[]>([])
  const [correctWords, setCorrectWords] = useState<string[]>([])
  const [mistakesCount, setMistakesCount] = useState(0)

  const inputRefs = useRef<HTMLInputElement[]>([])
  const currTask = commonProps.currentTask.correctText as string
  const wordsArray = currTask.match(/(\[.*?\])|(\S+)/g) ?? []
  const inputsCount = wordsArray.filter(item => /^\[.*\]$/.test(item)).length

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const inputText = handleChange(
      event,
      commonProps.languageTo as 'geo' | 'eng' | 'rus',
    )

    const missingWord = wordsArray[index].slice(1, -1)
    const newWords = [...words]
    const currentMatch = missingWord.substring(0, inputText.length)
    const isTextValid = inputText.toLowerCase() === currentMatch.toLowerCase()

    if (isTextValid) {
      setIsHintShown(false)
      newWords[index] = currentMatch
      setWords(newWords)

      if (inputText.length === missingWord.length) {
        const nextInputRef = inputRefs.current
          .slice(index + 1)
          .find(element => element !== undefined)

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
    if (!commonProps.token && !commonProps.userId) return
    if (correctWords.length === inputsCount) {
      setTimeout(async () => {
        const isSaved = await saveTask({ ...commonProps })
        if (isSaved) {
          updateCompletedTasks(commonProps)
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
              value={currentValue ?? ''}
              onChange={event => handleInputChange(event, index)}
              onKeyDown={(event: React.KeyboardEvent) =>
                handleOnKeyDown(event, inputRefs)
              }
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
