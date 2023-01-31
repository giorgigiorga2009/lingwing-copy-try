import { useState, useEffect, FC, use, useRef } from 'react'
import style from './TaskInput.module.scss'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'

const getLetter = (text: string, index: number): string =>
  text.toLowerCase()[index]

const isEqual = ({
  correctText,
  textToCompare,
  index,
}: {
  correctText: string
  textToCompare: string
  index: number
}): boolean => getLetter(correctText, index) === getLetter(textToCompare, index)

const findMatchedElement = ({
  synonyms,
  arrayToSearch,
  lastAddedWordIndex,
}: {
  synonyms: string[]
  arrayToSearch: string[]
  lastAddedWordIndex: number
}) => {
  for (let i = 0; i < synonyms.length; i++) {
    let index = arrayToSearch.indexOf(synonyms[i], lastAddedWordIndex)
    if (index !== -1) {
      return index
    }
  }
  return -1
}

const getStringFromRecognition = ({
  correctText,
  finalTranscript,
  textFromKeyboard,
  wordsSynonyms,
}: {
  correctText: string
  finalTranscript: string
  textFromKeyboard: string
  wordsSynonyms: [string[]]
}): string => {
  const correctWordsArray = correctText.split(' ')
  const textFromKeyboardArray = textFromKeyboard.split(' ')
  const transcriptArray = finalTranscript.split(' ')
  const arrayToSearch = [...textFromKeyboardArray, ...transcriptArray]

  const outputArray = []

  let lastAddedWordIndex = 0

  for (let index = 0; index < correctWordsArray.length; index++) {
    const modifiedWord = correctWordsArray[index].replace(
      /[.,\/#!$%\^&\*;:{}=\-_`~()]/g,
      '',
    )
    const synonyms = [modifiedWord, ...wordsSynonyms[index]]
    const transcriptIndex = findMatchedElement({
      synonyms,
      lastAddedWordIndex,
      arrayToSearch,
    })
    // const transcriptIndex = arrayToSearch.indexOf(modifiedWord, lastAddedWordIndex)
    if (
      transcriptIndex !== -1 &&
      transcriptIndex >= lastAddedWordIndex &&
      outputArray.length >= index
    ) {
      lastAddedWordIndex = transcriptIndex
      outputArray.push(correctWordsArray[index])
    }
  }
  return outputArray.join(' ')
}

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
  const [textFromKeyboard, setTextFromKeyboard] = useState(' ')

  const { listening, finalTranscript } = useSpeechRecognition()
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
    if (event.key === 'Space' && inputRef.current.value.endsWith(' ')) {
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
    SpeechRecognition.startListening({ continuous: true })
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
