import React, { useState, KeyboardEvent, ChangeEvent, FC } from 'react'

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
      setIsCorrect(true)
    }
  }

  return (
    <div>
      <label>
        Correct the mistake:
        <input type="text" value={inputText} onChange={handleInputChange} />
      </label>
      <div>{isCorrect ? 'Correct!' : mistakeText}</div>
    </div>
  )
}
