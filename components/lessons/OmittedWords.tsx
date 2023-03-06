import React, { FC, useEffect, useRef, useState } from 'react'
import { TaskData } from '../../utils/lessons/getTask'
import { saveTask } from '../../utils/lessons/saveTask'
import style from './OmittedWords.module.scss'

interface Props {
  // setCorrect: (bool: boolean) => void
  sentenceArray: string[]
  onKeyDown: (event: React.KeyboardEvent) => void
  setMistakeRepeat: (bool: boolean) => void
  mistakeRepeat: boolean
  setMistakesCount: (values: number) => void
  mistakesCount: number
  token: string | null
  languageTo: string | string[]
  languageFrom: string | string[]
  courseId: string
  setCurrentTaskNumber: (number: number) => void
  currentTaskNumber: number
  currentTask: TaskData
  completedTasks: TaskData[] | undefined
  setCompletedTasks: (tasks: TaskData[]) => void
}

export const OmittedWords: FC<Props> = ({
  sentenceArray,
  // setCorrect,
  onKeyDown,
  setMistakeRepeat,
  mistakeRepeat,
  setMistakesCount,
  mistakesCount,
  token,
  languageTo,
  languageFrom,
  courseId,
  setCurrentTaskNumber,
  currentTaskNumber,
  currentTask,
  completedTasks,
  setCompletedTasks,
}) => {
  const [words, setWords] = useState([''])
  const [correctWords, setCorrectWords] = useState([''])
  const inputRefs = useRef<HTMLInputElement[]>([])
  const inputsCount = sentenceArray
    .map(item => (/^\[.*\]$/.test(item) ? 1 : 0))
    .filter(Boolean).length

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const inputValue = event.target.value
    const newWords = [...words]
    const missingWord = sentenceArray[index].slice(1, -1)

    if (
      inputValue.toLowerCase() ===
      missingWord.substring(0, inputValue.length).toLowerCase()
    ) {
      setMistakeRepeat(false)
      newWords[index] = missingWord.substring(0, inputValue.length)
      setWords(newWords)

      const nextInputRef = inputRefs.current
        .slice(index + 1)
        .find(element => element !== undefined)

      if (inputValue.length === missingWord.length) {
        const newCorrectWords = [...correctWords]
        newCorrectWords.push(missingWord)
        setCorrectWords(newCorrectWords)
        nextInputRef && nextInputRef.focus()
      }
    } else {
      mistakeRepeat === false &&
        (setMistakesCount(mistakesCount + 1), setMistakeRepeat(true))
    }
  }

  useEffect(() => {
    if (token === null) return
    if (correctWords.length === inputsCount) {
      saveTask({ token, languageFrom, languageTo, currentTask, courseId })
      setCurrentTaskNumber(currentTaskNumber + 1)
      completedTasks && setCompletedTasks([...completedTasks, currentTask])
      !completedTasks && setCompletedTasks([currentTask])
    }
  }, [correctWords])

  useEffect(() => {
    inputRefs.current.find(element => element !== undefined)?.focus()
  }, [])

  return (
    <div className={style.inputContainer}>
      {sentenceArray.map((word, index) => {
        if (word.startsWith('[')) {
          const currentValue = words[index]

          return (
            <input
              className={style.input}
              key={index}
              value={currentValue !== undefined ? currentValue : ''}
              onChange={event => handleChange(event, index)}
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
