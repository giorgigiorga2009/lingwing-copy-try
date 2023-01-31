import { useState, useEffect, FC, useRef } from 'react'
import style from './TaskInput.module.scss'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
import {
  getStringFromRecognition,
  isEqual,
} from '../../utils/lessons/taskInputUtils'

//turn of recognition on second click

interface Props {
  setCorrect: (bool: boolean) => void
  correctText: string
  wordsSynonyms: [string[]]
}

export const TaskInput: FC<Props> = ({
  setCorrect,
  correctText,
  wordsSynonyms,
}) => {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [partialTranscript, setPartialTranscript] = useState<string>('')
  const [textFromKeyboard, setTextFromKeyboard] = useState('')
  const [isRecording, setIsRecording] = useState(true)

  const { finalTranscript } = useSpeechRecognition()
  const inputRef = useRef<HTMLInputElement>(null)

  //only for viceRecognition
  useEffect(() => {
    setPartialTranscript(
      getStringFromRecognition({
        correctText,
        finalTranscript,
        textFromKeyboard,
        wordsSynonyms,
      }),
    )
    setOutputText(
      getStringFromRecognition({
        correctText,
        finalTranscript,
        textFromKeyboard,
        wordsSynonyms,
      }),
    )
    console.log(finalTranscript)
  }, [finalTranscript])

  //only for keyboardInput
  useEffect(() => {
    const index = inputText.length - 1
    const isTextEqual = isEqual({
      correctText,
      textToCompare: inputText,
      index,
    })
    const textToShow = correctText.slice(0, inputText ? inputText.length : 0)
    if (textToShow.length === correctText.length - 1) {
      setOutputText(correctText)
    } else {
      isTextEqual && setOutputText(textToShow)
    }
    // setOutputText(correctText.replace(/\w/g, "_"))
    // console.log(inputRef.current.value, 'inputRef')
  }, [inputText])

  const handleOnKeyDown = (event: React.KeyboardEvent) => {
    if (
      event.key === 'Space' &&
      inputRef.current &&
      inputRef.current.value.endsWith(' ')
    ) {
      event.preventDefault()
      return
    }

    if (event.key === 'Enter') {
      event.preventDefault()
    }

    if (event.key === 'Backspace' || event.key === 'Delete') {
      event.preventDefault()
      setCorrect(true)
    } else {
      setCorrect(false)
    }
  }

  const handleOnFocus = (event: React.FocusEvent<HTMLElement>) => {
    SpeechRecognition.stopListening()

    if (inputRef.current) {
      inputRef.current.focus()
      const length = inputRef.current.value.length
      inputRef.current.setSelectionRange(length, length)
    }

    partialTranscript && setOutputText(partialTranscript)
  }

  const handleMicOnClick = (event: React.MouseEvent<HTMLElement>) => {
    if (inputRef.current) {
      const inputValue = inputRef.current.value
      setTextFromKeyboard(inputValue)
    }
    setIsRecording(!isRecording)
    isRecording
      ? SpeechRecognition.startListening({ continuous: true })
      : SpeechRecognition.stopListening()
    console.log(isRecording, 'isrecording')
  }

  return (
    <div className={style.container}>
      <div className={style.mistakes}> 5 </div>
      <input
        ref={inputRef}
        className={style.input}
        type="text"
        value={outputText}
        placeholder="Type your answer"
        onKeyDown={event => handleOnKeyDown(event)}
        onChange={event => setInputText(event.target.value)}
        onFocus={event => handleOnFocus(event)}
      />
      <span
        className={style.micIcon}
        onClick={event => handleMicOnClick(event)}
      />
    </div>
  )
}
