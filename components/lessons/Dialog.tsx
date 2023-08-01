import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
import style from './Dialog.module.scss'
import { saveTask } from '@utils/lessons/saveTask'
import { FC, useEffect, useRef, useState } from 'react'
import {
  getStringFromRecognition,
  replayInputCheck,
  CommonProps,
  handleChange,
} from '@utils/lessons/taskInputUtils'

interface DialogProps {
  currentMessageIndex?: number
  dialogArray: string[]
  isHistory: boolean
}

export const Dialog: FC<DialogProps> = ({
  currentMessageIndex = 0,
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
  commonProps: CommonProps
  setCurrentMessageIndex: (index: number) => void
  currentMessageIndex: number
  setIsHintShown: (bool: boolean) => void
  setHintText: (text: string) => void
  isHintShown: boolean
}

export const DialogInput: FC<DialogInputProps> = ({
  setCurrentMessageIndex,
  currentMessageIndex,
  commonProps,
  setIsHintShown,
  setHintText,
  isHintShown,
}) => {
  const [outputText, setOutputText] = useState('')
  const [mistakesCount, setMistakesCount] = useState(0)
  const [inputText, setInputText] = useState('')
  const dialogArray = commonProps.currentTask.correctText as string[]
  const wordsSynonyms = commonProps.currentTask.wordsSynonyms

  // set up speech recognition
  const { finalTranscript } = useSpeechRecognition()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [textFromKeyboard, setTextFromKeyboard] = useState('') // the text inputted by the user from the keyboard
  const [isRecording, setIsRecording] = useState(true) // whether or not the user's voice is being recorded

  // only for voiceRecognition
  useEffect(() => {
    setOutputText(
      getStringFromRecognition({
        correctText: dialogArray[currentMessageIndex],
        finalTranscript,
        textFromKeyboard,
        wordsSynonyms,
      }),
    )
  }, [finalTranscript])

  //only for keyboard
  useEffect(() => {
    if (!inputText) return
    setOutputText(
      replayInputCheck({
        inputText,
        outputText,
        correctText: dialogArray[currentMessageIndex],
        setMistakesCount,
        mistakesCount,
        setIsHintShown,
        setHintText,
        isHintShown,
      }),
    )
  }, [inputText])

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    handleChange(
      event,
      commonProps.languageTo as 'geo' | 'eng' | 'rus',
      setInputText,
    )
  }

  useEffect(() => {
    const audio = new Audio(
      `https://cdn.lingwing.com${commonProps.currentTask?.dialogLinesArray[currentMessageIndex].sentenceAudioPath}.mp3`,
    )
    audio.play()
  }, [])

  useEffect(() => {
    if (outputText.slice(0, -1) === dialogArray[currentMessageIndex]) {
      setTimeout(async () => {
        if (currentMessageIndex === dialogArray.length - 1) {
          setIsHintShown(false)
          setCurrentMessageIndex(0)
          if (commonProps.token === null && commonProps.userId === null) return
          const isSaveSuccessful = await saveTask({
            userId: commonProps.userId,
            token: commonProps.token,
            languageFrom: commonProps.languageFrom,
            languageTo: commonProps.languageTo,
            currentTask: commonProps.currentTask,
            courseId: commonProps.courseId,
          })
          if (isSaveSuccessful) {
            commonProps.setCurrentTaskNumber(commonProps.currentTaskNumber + 1)
            commonProps.completedTasks &&
              commonProps.setCompletedTasks([
                ...commonProps.completedTasks,
                commonProps.currentTask,
              ])
            !commonProps.completedTasks &&
              commonProps.setCompletedTasks([commonProps.currentTask])
          }
        } else {
          setCurrentMessageIndex(currentMessageIndex + 1)
        }
        setOutputText('')
        setInputText('')
        if (!commonProps.currentTask?.dialogLinesArray[currentMessageIndex + 1])
          return
        const audio = new Audio(
          `https://cdn.lingwing.com${
            commonProps.currentTask?.dialogLinesArray[currentMessageIndex + 1]
              .sentenceAudioPath
          }.mp3`,
        )
        audio.play()
      }, 1200) // Specify the delay time in milliseconds
    }
  }, [outputText])

  const handleOnFocus = () => {
    // Stop listening for speech when the input field is focused
    SpeechRecognition.stopListening()
    // Focus on the input field and move the cursor to the end
    if (inputRef.current) {
      inputRef.current.focus()
      const length = inputRef.current.value.length
      inputRef.current.setSelectionRange(length, length)
    }
  }

  const handleMicOnClick = () => {
    if (inputRef.current) {
      // Store the current input value before starting/stopping speech recognition
      const inputValue = inputRef.current.value
      setTextFromKeyboard(inputValue)
    }
    setIsRecording(!isRecording)
    // If speech recognition is currently active, stop it. Otherwise, start it.
    isRecording
      ? SpeechRecognition.startListening({ continuous: true })
      : SpeechRecognition.stopListening()
  }

  return (
    <div className={style.container}>
      <div className={style.mistakes}> {mistakesCount} </div>
      <textarea
        onFocus={handleOnFocus}
        ref={inputRef}
        className={style.input}
        //  type="text"
        value={outputText}
        onChange={handleTextareaChange}
      />

      <span
        className={style.micIcon}
        onClick={() => handleMicOnClick}
        key="mic"
      />
    </div>
  )
}
