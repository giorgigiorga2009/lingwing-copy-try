import { Hint } from './Hint'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
import dynamic from 'next/dynamic'
import style from './Dialog.module.scss'
import { saveTask } from '@utils/lessons/saveTask'
import { TaskData } from '@utils/lessons/getTask'
import { animated, useSpring } from 'react-spring'
import { FC, useEffect, useRef, useState } from 'react'
import {
  getStringFromRecognition,
  replayInputCheck,
  CommonProps,
  handleChange,
} from '@utils/lessons/taskInputUtils'

const WaveSurferNext = dynamic(() => import('./WaveSurferNext'), {
  ssr: false,
})

interface DialogProps {
  currentMessageIndex?: number
  currentTask?: TaskData
  dialogArrayTo: string[]
  dialogArrayFrom: string
  isHistory: boolean
  isHintShown: boolean
  hintText: string
}

const description = 'Напишите первые буквы слов'
  .split(' ')
  .map(word => <span key={word}>{word + ' '}</span>)

export const Dialog: FC<DialogProps> = ({
  currentMessageIndex = 0,
  currentTask,
  dialogArrayTo,
  dialogArrayFrom,
  isHistory,
  isHintShown,
  hintText,
}) => {
  const audioUrl = `https://cdn.lingwing.com${currentTask?.dialogLinesArray[currentMessageIndex].sentenceAudioPath}.mp3`
  return (
    <>
      <div className={style.title}>Dialog</div>
      <div className={style.dialog}>
        <span className={style.description}>{description}</span>
        {currentMessageIndex >= 0 &&
          !isHistory &&
          dialogArrayTo.slice(0, currentMessageIndex).map((message, index) => (
            <div
              key={index}
              className={
                index % 2 === 0 ? style.messageRight : style.messageLeft
              }
            >
              <span className={style.counter}>
                {index + 1 + '/' + dialogArrayTo.length}
              </span>
              <p>{message}</p>
              <p
                className={
                  index % 2 === 0
                    ? style.translationRight
                    : style.translationLeft
                }
              >
                {dialogArrayFrom[index]}
              </p>
            </div>
          ))}

        {!isHistory && (
          <div className={style.bubbleContainer}>
            <div className={style.currentTask}>
              <p>
                <WaveSurferNext audioURL={audioUrl} />
              </p>
            </div>
            <Hint isHintShown={isHintShown} hintText={hintText} />
          </div>
        )}

        {isHistory &&
          dialogArrayTo &&
          dialogArrayTo.map((message, index) => (
            <div
              key={index}
              className={
                index % 2 === 0 ? style.messageRight : style.messageLeft
              }
            >
              <span className={style.counter}>
                {index + 1 + '/' + dialogArrayTo.length}
              </span>
              <p>{message}</p>
              <p
                className={
                  index % 2 === 0
                    ? style.translationRight
                    : style.translationLeft
                }
              >
                {dialogArrayFrom[index]}
              </p>
            </div>
          ))}
      </div>
    </>
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
  const { finalTranscript, resetTranscript } = useSpeechRecognition()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [textFromKeyboard, setTextFromKeyboard] = useState('') // the text inputted by the user from the keyboard
  const [isRecording, setIsRecording] = useState(false) // whether or not the user's voice is being recorded

  // only for voiceRecognition
  useEffect(() => {
    if (finalTranscript === '') return
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
    //console.log(dialogArray[currentMessageIndex])
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
    if (commonProps.token === null && commonProps.userId === null) return
    // If the output text matches the correct text, save the task and move on to the next one
    if (outputText.slice(0, -1) === dialogArray[currentMessageIndex]) {
      setTimeout(async () => {
        if (currentMessageIndex === dialogArray.length - 1) {
          setIsHintShown(false)
          setCurrentMessageIndex(0)
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
            const updatedTasks = commonProps.completedTasks
              ? [...commonProps.completedTasks, commonProps.currentTask]
              : [commonProps.currentTask]
            commonProps.setCompletedTasks(updatedTasks)
          }
        } else {
          setCurrentMessageIndex(currentMessageIndex + 1)
        }
        setMistakesCount(0)
        setOutputText('')
        setInputText('')
      }, 2000) // Specify the delay time in milliseconds
    }
  }, [outputText])

  const handleOnKeyDown = (event: React.KeyboardEvent) => {
    // If the spacebar is pressed and the input field ends with a space, prevent the default action (i.e. adding another space)
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
      // setCorrect(true)
    } else {
      // setCorrect(false)
    }
  }

  const { transform, opacity } = useSpring({
    opacity: isRecording ? 1 : 0.5,
    transform: `scale(${isRecording ? 1.5 : 1})`,
  })

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

    !isRecording
      ? SpeechRecognition.startListening({ continuous: true })
      : SpeechRecognition.stopListening()

    !isRecording && resetTranscript()

    setIsRecording(!isRecording)
  }

  return (
    <div className={style.container}>
      <div className={style.mistakes}> {mistakesCount} </div>
      <textarea
        onFocus={handleOnFocus}
        ref={inputRef}
        className={style.input}
        autoComplete="off"
        spellCheck="false"
        data-gramm="false"
        value={outputText}
        onKeyDown={handleOnKeyDown}
        onChange={handleTextareaChange}
        placeholder="Type your answer"
        autoFocus
      />

      <animated.div
        className={style.microphoneIcon}
        style={{
          opacity,
          transform,
        }}
        onClick={handleMicOnClick}
      >
        <span className={style.micIcon} key="mic" />
        {isRecording && <div className={style.pulsatingCircle} />}
      </animated.div>
    </div>
  )
}
