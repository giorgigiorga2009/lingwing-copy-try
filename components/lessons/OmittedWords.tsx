import {
  handleChange,
  CommonProps,
  updateCompletedTasks,
  handleOnKeyDown,
  setLevelColors,
} from '@utils/lessons/taskInputUtils'
import { useTaskStore } from '@utils/store'
import { TaskProgress } from './TaskProgress'
import style from './OmittedWords.module.scss'
import { saveTask } from '@utils/lessons/saveTask'
import { MistakesCounter } from './MistakesCounter'
import { VoiceRecognition } from './VoiceRecognition'
import React, { FC, useEffect, useRef, useState } from 'react'

interface Props {
  commonProps: CommonProps
}

export const OmittedWords: FC<Props> = ({ commonProps }) => {
  const HintShown = useTaskStore(state => state.HintShown)
  const setHintShow = useTaskStore(state => state.SetHintShow)
  const setHintText = useTaskStore(state => state.SetHintText)
  const [words, setWords] = useState<string[]>([])
  const [correctWords, setCorrectWords] = useState<string[]>([])
  const [mistakesCount, setMistakesCount] = useState(0)
  const [taskProgress, setTaskProgress] = useState('0%')
  const [forgivenErrorQuantity, setForgivenErrorQuantity] = useState(0)

  const errorLimit = commonProps.currentTask.errorLimit
  const inputRefs = useRef<HTMLInputElement[]>([])
  const currTask = commonProps.currentTask.correctText as string
  const wordsArray = currTask.match(/(\[.*?\])|(\S+)/g) ?? []
  const inputsCount = wordsArray.filter(item => /^\[.*\]$/.test(item)).length

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (correctWords.length === inputsCount) return
    const inputText = handleChange(
      event,
      commonProps.languageTo as 'geo' | 'eng' | 'rus',
    )

    const missingWord = wordsArray[index].slice(1, -1)
    const newWords = [...words]
    const currentMatch = missingWord.substring(0, inputText.length)
    const isTextValid = inputText.toLowerCase() === currentMatch.toLowerCase()

    if (isTextValid) {
      setHintShow(false)
      newWords[index] = currentMatch
      setWords(newWords)
      setTaskProgress(correctWords.length / wordsArray.length + '%')

      if (inputText.length === missingWord.length) {
        const nextInputRef = inputRefs.current
          .slice(index + 1)
          .find(element => element !== undefined)

        setCorrectWords(prevWords => [...prevWords, missingWord])
        nextInputRef && nextInputRef.focus()
      }
    } else {
      if (!HintShown) {
        setMistakesCount(mistakesCount + 1)
        setHintShow(true)
        setHintText(missingWord)
      }
    }
  }

  useEffect(() => {
    if (!commonProps.Token && !commonProps.userId) return
    if (correctWords.length === inputsCount) {
      setTimeout(async () => {
        const isSaved = await saveTask({
          ...commonProps,
          totalMistakes: mistakesCount,
          forgivenErrorQuantity: forgivenErrorQuantity,
          error: errorLimit - mistakesCount < 0 ? 1 : 0,
        })

        const isMistake = errorLimit - mistakesCount < 0 ? 1 : 0
        commonProps.currentTask.answers = setLevelColors({
          answers: commonProps.currentTask.answers,
          currentLevel: commonProps.currentTask.currentLevel,
          learnMode: commonProps.learnMode,
          isMistake: isMistake,
        })

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
    <>
      <TaskProgress taskProgress={taskProgress} />
      <div className={style.container}>
        <MistakesCounter
          percentage={(1 - mistakesCount / errorLimit) * 100}
          errorLimit={Math.max(errorLimit - mistakesCount, 0)}
        />
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
        <VoiceRecognition />
      </div>
    </>
  )
}
