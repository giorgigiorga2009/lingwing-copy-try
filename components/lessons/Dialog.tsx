import { FC, useEffect, useState } from 'react'
import { KEYBOARD_OVERRIDE } from '../../utils/const'
import { TaskData } from '../../utils/lessons/getTask'
import { saveTask } from '../../utils/lessons/saveTask'
import { repetitionInputCheck } from '../../utils/lessons/taskInputUtils'
import style from './Dialog.module.scss'
import { SoundCheck } from './SoundCheck'

interface DialogProps {
  currentMessageIndex: number
  dialogArray: string[]
  isHistory: boolean
}

export const Dialog: FC<DialogProps> = ({
  currentMessageIndex,
  dialogArray,
  isHistory,
}) => {
  return (
    <div className={style.dialog}>
      {currentMessageIndex === 0 && !isHistory && (
        <div className={style.dialogStart}>
          <div className={style.title}>Напишите первые буквы слов</div>
          <div className={style.parrots} />
          <div className={style.example}>
            например:{' '}
            <span className={style.exampleText}> {dialogArray[0]}</span>{' '}
          </div>
        </div>
      )}

      {currentMessageIndex > 0 &&
        !isHistory &&
        dialogArray.slice(0, currentMessageIndex).map((message, index) => (
          <div
            key={index}
            className={index % 2 === 0 ? style.messageRight : style.messageLeft}
          >
            {message}
          </div>
        ))}

      {isHistory &&
        dialogArray.map((message, index) => (
          <div
            key={index}
            className={index % 2 === 0 ? style.messageRight : style.messageLeft}
          >
            {message}
          </div>
        ))}
    </div>
  )
}

interface DialogInputProps {
  setCurrentMessageIndex: (index: number) => void
  currentMessageIndex: number
  token: string | null
  languageTo: string | string[]
  languageFrom: string | string[]
  courseId: string
  setCurrentTaskNumber: (number: number) => void
  currentTaskNumber: number
  currentTask: TaskData
  completedTasks: TaskData[] | undefined
  setCompletedTasks: (tasks: TaskData[]) => void
  setIsHintShown: (bool: boolean) => void
  setHintText: (text: string) => void
}

export const DialogInput: FC<DialogInputProps> = ({
  setCurrentMessageIndex,
  currentMessageIndex,
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
  const [outputText, setOutputText] = useState('')
  const [mistakesCount, setMistakesCount] = useState(0)
  const [mistakeRepeat, setMistakeRepeat] = useState(false)
  const [inputText, setInputText] = useState('')
  const [isSoundChecked, setSoundChecked] = useState(false)

  const dialogArray = currentTask.correctText as string[]
  const wordsSynonyms = currentTask.wordsSynonyms
  const iLearnFromNameCode = currentTask.iLearnFromNameCode

  useEffect(() => {
    if (!inputText) return
    setOutputText(
      repetitionInputCheck({
        inputText,
        outputText,
        correctText: dialogArray[currentMessageIndex],
        setMistakeRepeat,
        setMistakesCount,
        mistakesCount,
        mistakeRepeat,
        setIsHintShown,
        setHintText,
      }),
    )
  }, [inputText])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentCharCode = event.target.value.charCodeAt(
      event.target.value.length - 1,
    )
    let skipOverride = true

    for (let i = 0; i < KEYBOARD_OVERRIDE.length; i++) {
      if (KEYBOARD_OVERRIDE[i].languageNameCode === iLearnFromNameCode) {
        skipOverride = false
        for (let j = 0; j < KEYBOARD_OVERRIDE[i].array.length; j++) {
          if (
            currentCharCode === KEYBOARD_OVERRIDE[i].array[j].originalCode ||
            currentCharCode === KEYBOARD_OVERRIDE[i].array[j].alterCode
          ) {
            const overriddenText =
              event.target.value.slice(0, event.target.value.length - 1) +
              String.fromCharCode(KEYBOARD_OVERRIDE[i].array[j].alterCode)
            setInputText(overriddenText)
          }
        }
      }
    }
    skipOverride && setInputText(event.target.value)
  }

  useEffect(() => {
    const audio = new Audio(
      `https://cdn.lingwing.com${currentTask?.dialogLinesArray[currentMessageIndex].sentenceAudioPath}.mp3`,
    )
    audio.play()
  }, [isSoundChecked])

  useEffect(() => {
    if (outputText.slice(0, -1) === dialogArray[currentMessageIndex]) {
      setTimeout(() => {
        if (currentMessageIndex === dialogArray.length - 1) {
          setIsHintShown(false)
          setCurrentMessageIndex(0)
          if (token === null) return
          saveTask({ token, languageFrom, languageTo, currentTask, courseId })
          setCurrentTaskNumber(currentTaskNumber + 1)
          completedTasks && setCompletedTasks([...completedTasks, currentTask])
          !completedTasks && setCompletedTasks([currentTask])
        } else {
          setCurrentMessageIndex(currentMessageIndex + 1)
        }
        setOutputText('')
        if (!currentTask?.dialogLinesArray[currentMessageIndex + 1]) return
        const audio = new Audio(
          `https://cdn.lingwing.com${
            currentTask?.dialogLinesArray[currentMessageIndex + 1]
              .sentenceAudioPath
          }.mp3`,
        )
        audio.play()
      }, 1200) // Specify the delay time in milliseconds
    }
  }, [outputText])

  return (
    <div className={style.container}>
      <div className={!isSoundChecked ? style.soundCheck : style.hidden}>
        <SoundCheck
          setSoundChecked={setSoundChecked}
          soundChecked={isSoundChecked}
        />
      </div>
      <div className={style.mistakes}> {mistakesCount} </div>
      {/* <audio  src={`https://cdn.lingwing.com${currentTask?.dialogLinesArray[currentMessageIndex].sentenceAudioPath}.mp3`} controls></audio> */}
      <input
        className={style.input}
        type="text"
        value={outputText}
        onChange={handleChange}
      />

      <span className={style.micIcon} key="mic" />
    </div>
  )
}
