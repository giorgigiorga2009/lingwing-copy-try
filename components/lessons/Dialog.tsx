import { FC, useEffect, useState } from 'react'
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
}

export const DialogInput: FC<DialogInputProps> = ({
  setCurrentMessageIndex,
  currentMessageIndex,
  dialogArray,
}) => {
  const [outputText, setOutputText] = useState('')
  const [mistakesCount, setMistakesCount] = useState(0)
  const [mistakeRepeat, setMistakeRepeat] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
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
