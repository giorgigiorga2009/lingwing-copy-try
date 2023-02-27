import { FC, useEffect, useState } from 'react'
import { KEYBOARD_OVERRIDE } from '../../utils/const'
import { saveTask } from '../../utils/lessons/saveTask'
import { repetitionInputCheck } from '../../utils/lessons/taskInputUtils'
import style from './Dialog.module.scss'

interface DialogProps {
  currentMessageIndex: number
  dialogArray: string[]
}

export const Dialog: FC<DialogProps> = ({
  currentMessageIndex,
  dialogArray,
}) => {
  return (
    <div className={style.dialog}>
      {currentMessageIndex === 0 && (
        <div className={style.dialogStart}>
          <div className={style.title}>Напишите первые буквы слов</div>
          <div className={style.parrots} />
          <div className={style.exapmle}>Например: {dialogArray[0]} </div>
        </div>
      )}

      {currentMessageIndex > 0 &&
        dialogArray.slice(0, currentMessageIndex).map((message, index) => (
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
  dialogArray: string[]
  iLearnFromNameCode: string
  token: string | null
  languageTo: string | string[]
  languageFrom: string | string[]
  ordinalNumber: number
  courseId: string
  setCurrentTaskNumber: (number: number) => void
  currentTaskNumber: number
}

export const DialogInput: FC<DialogInputProps> = ({
  setCurrentMessageIndex,
  currentMessageIndex,
  dialogArray,
  iLearnFromNameCode,
  token,
  languageTo,
  languageFrom,
  ordinalNumber,
  courseId,
  setCurrentTaskNumber,
  currentTaskNumber,
}) => {
  const [outputText, setOutputText] = useState('')
  const [mistakesCount, setMistakesCount] = useState(0)
  const [mistakeRepeat, setMistakeRepeat] = useState(false)
  const [inputText, setInputText] = useState('')

  // useEffect(() => {
  //   if (token === null) return

  //   outputText === correctText &&  saveTask({token, languageFrom, languageTo, ordinalNumber, courseId})

  // }, [outputText])

  useEffect(() => {
    setOutputText(
      repetitionInputCheck({
        inputText,
        outputText,
        correctText: dialogArray[currentMessageIndex],
        setMistakeRepeat,
        setMistakesCount,
        mistakesCount,
        mistakeRepeat,
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
    if (outputText.slice(0, -1) === dialogArray[currentMessageIndex]) {
      setTimeout(() => {
        if (currentMessageIndex === dialogArray.length - 1) {
          setCurrentMessageIndex(0)
          if (token === null) return
          saveTask({ token, languageFrom, languageTo, ordinalNumber, courseId })
          setCurrentTaskNumber(currentTaskNumber + 1)
        } else {
          setCurrentMessageIndex(currentMessageIndex + 1)
        }
        setOutputText('')
        // const audio = new Audio(`/audio/${currentMessageIndex + 1}.mp3`);
        // audio.play();
      }, 1200) // Specify the delay time in milliseconds
    }
  }, [outputText])

  return (
    <div className={style.container}>
      <div className={style.mistakes}> {mistakesCount} </div>
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
