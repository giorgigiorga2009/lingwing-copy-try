import React, { useState, KeyboardEvent, ChangeEvent, FC } from 'react'
import style from './MistakeCorrection.module.scss'

interface Props {
  mistakeText: string
  correctText: string
}

export const MistakeCorrectionTask: FC<Props> = ({
  mistakeText,
  correctText,
}) => {
  const [inputText, setInputText] = useState(mistakeText)
  const [isCorrect, setIsCorrect] = useState(false)
  const [mistakesCount, setMistakesCount] = useState(0)
  const [mistakeRepeat, setMistakeRepeat] = useState(false)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value)
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      checkAnswer()
    }
  }

  const checkAnswer = () => {
    if (inputText === correctText) {
      setMistakeRepeat(false)
      setIsCorrect(true)
    } else {
      mistakeRepeat === false &&
        (setMistakesCount(mistakesCount + 1), setMistakeRepeat(true))
    }
  }

  return (
    <div className={style.container}>
      <div className={style.mistakes}> {mistakesCount} </div>

      <input type="text" value={inputText} onChange={handleInputChange} />

      <div className={style.checkButton} onClick={checkAnswer}>
        Check
      </div>
    </div>
  )
}
