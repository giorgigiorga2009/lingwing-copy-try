import { useState, useEffect, FC, useRef } from 'react'
import style from './TaskInput.module.scss'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
import {
  getStringFromRecognition,
  isEqual,
} from '../../utils/lessons/taskInputUtils'
import { animated, useSpring } from 'react-spring'
import { KEYBOARD_OVERRIDE } from '../../utils/const'

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
  const [mistakesCount, setMistakesCount] = useState(0)
  const [mistakeRepeat, setMistakeRepeat] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const { transform, opacity } = useSpring({
    opacity: isAnimating ? 1 : 0.5,
    transform: `scale(${isAnimating ? 1.5 : 1})`,
  })

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
    // console.log(finalTranscript)
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
      isTextEqual && (setOutputText(textToShow), setMistakeRepeat(false))
      isTextEqual === false &&
        mistakeRepeat === false &&
        (setMistakesCount(mistakesCount + 1), setMistakeRepeat(true)) // добавлять только одну ошибку на одну букву
    }
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
    setIsAnimating(!isAnimating)
    if (inputRef.current) {
      const inputValue = inputRef.current.value
      setTextFromKeyboard(inputValue)
    }
    setIsRecording(!isRecording)
    isRecording
      ? SpeechRecognition.startListening({ continuous: true })
      : SpeechRecognition.stopListening()
    // console.log(isRecording, 'isrecording')
  }

  // https://api.lingwing.com/api/v2/public/getUserCourse/russian_a1-1?lang=eng&iLearnFrom=geo&userKey=9b253fe0-a580-11ed-bbeb-19ae864e91e7
  const iLearnFromNameCode = 'rus'

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
            const overridedText =
              event.target.value.slice(0, event.target.value.length - 1) +
              String.fromCharCode(KEYBOARD_OVERRIDE[i].array[j].alterCode)
            setInputText(overridedText)
          }
        }
      }
    }
    skipOverride && setInputText(event.target.value)
  }

  return (
    <div className={style.container}>
      <div className={style.mistakes}> {mistakesCount} </div>
      <input
        ref={inputRef}
        className={style.input}
        type="text"
        value={outputText}
        placeholder="Type your answer"
        onKeyDown={event => handleOnKeyDown(event)}
        onChange={handleChange}
        onFocus={event => handleOnFocus(event)}
      />
      <animated.div
        className={style.microphoneIcon}
        style={{
          opacity,
          transform,
        }}
        onClick={event => handleMicOnClick(event)}
      >
        <span className={style.micIcon} key="mic" />
        {isAnimating && <div className={style.pulsatingCircle} />}
      </animated.div>
    </div>
  )
}
