import { useState, useEffect, FC, useRef } from 'react'
import style from './TaskInputContainer.module.scss'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
import {
  repetitionInputCheck,
  getStringFromRecognition,
  standardTextCheck,
} from '../../utils/lessons/taskInputUtils'
import { animated, useSpring } from 'react-spring'
import { KEYBOARD_OVERRIDE } from '../../utils/const'
import { DictationInput } from './DictationInput'

interface Props {
  setCorrect: (bool: boolean) => void
  correctText: string
  wordsSynonyms: [string[]]
  taskType: string
}

export const TaskInputContainer: FC<Props> = ({
  setCorrect,
  correctText,
  wordsSynonyms,
  taskType,
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

  // only for voiceRecognition
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
  }, [finalTranscript])

  //only for keyboardInput

  useEffect(() => {
    taskType === 'dictation' ||
      ('translate' &&
        setOutputText(
          standardTextCheck({
            inputText,
            correctText,
            setMistakeRepeat,
            mistakeRepeat,
            setMistakesCount,
            mistakesCount,
            outputText,
          }),
        ))
    taskType === 'repetition' &&
      setOutputText(
        repetitionInputCheck({
          inputText,
          outputText,
          correctText,
          setMistakeRepeat,
          setMistakesCount,
          mistakesCount,
          mistakeRepeat,
        }),
      )
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
  }

  // https://api.lingwing.com/api/v2/public/getUserCourse/russian_a1-1?lang=eng&iLearnFrom=geo&userKey=9b253fe0-a580-11ed-bbeb-19ae864e91e7 source of iLearnFromNameCode
  const iLearnFromNameCode = 'nothing'

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

  return (
    <div className={style.container}>
      <div className={style.mistakes}> {mistakesCount} </div>
      <DictationInput
        inputRef={inputRef}
        outputText={outputText}
        onKeyDown={handleOnKeyDown}
        onChange={handleChange}
        onFocus={handleOnFocus}
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
