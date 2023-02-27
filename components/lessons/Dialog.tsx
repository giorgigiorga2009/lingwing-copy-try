import { FC, useEffect, useState } from 'react'
import { KEYBOARD_OVERRIDE } from '../../utils/const'
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
      {dialogArray.slice(0, currentMessageIndex).map((message, index) => (
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
}

// need to add override
export const DialogInput: FC<DialogInputProps> = ({
  setCurrentMessageIndex,
  currentMessageIndex,
  dialogArray,
  iLearnFromNameCode,
}) => {
  const [outputText, setOutputText] = useState('')
  const [mistakesCount, setMistakesCount] = useState(0)
  const [mistakeRepeat, setMistakeRepeat] = useState(false)
  const [inputText, setInputText] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    // const currentCharCode = event.target.value.charCodeAt(
    //   event.target.value.length - 1,
    // )
    // let skipOverride = true

    // for (let i = 0; i < KEYBOARD_OVERRIDE.length; i++) {
    //   if (KEYBOARD_OVERRIDE[i].languageNameCode === iLearnFromNameCode) {
    //     skipOverride = false
    //     for (let j = 0; j < KEYBOARD_OVERRIDE[i].array.length; j++) {
    //       if (
    //         currentCharCode === KEYBOARD_OVERRIDE[i].array[j].originalCode ||
    //         currentCharCode === KEYBOARD_OVERRIDE[i].array[j].alterCode
    //       ) {
    //         const overriddenText =
    //           event.target.value.slice(0, event.target.value.length - 1) +
    //           String.fromCharCode(KEYBOARD_OVERRIDE[i].array[j].alterCode)
    //         setInputText(overriddenText)
    //       }
    //     }
    //   }
    // }
    // skipOverride && setInputText(event.target.value)

    setOutputText(
      repetitionInputCheck({
        inputText: value,
        outputText,
        correctText: dialogArray[currentMessageIndex],
        setMistakeRepeat,
        setMistakesCount,
        mistakesCount,
        mistakeRepeat,
      }),
    )
  }
  useEffect(() => {
    if (outputText.slice(0, -1) === dialogArray[currentMessageIndex]) {
      if (currentMessageIndex === dialogArray.length - 1) {
        setCurrentMessageIndex(0)
      } else {
        setCurrentMessageIndex(currentMessageIndex + 1)
      }
      setOutputText('')
      // const audio = new Audio(`/audio/${currentMessageIndex + 1}.mp3`);
      // audio.play();
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
