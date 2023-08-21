import { Hint } from './Hint'
import dynamic from 'next/dynamic'
import style from './Dialog.module.scss'
import { DictationInput } from './DictationInput'
import { TaskData } from '@utils/lessons/getTask'
import { saveTask } from '@utils/lessons/saveTask'
import { animated, useSpring } from 'react-spring'
import { FC, useEffect, useRef, useState } from 'react'
import {
  getRecognitionText,
  replayInputCheck,
  CommonProps,
  handleChange,
} from '@utils/lessons/taskInputUtils'
import { useSpeechRec } from '@utils/lessons/useSpeechRecognition'
import { DialogMessage } from './DialogMessage'

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
  const audioUrl = `${process.env.audioURL}${currentTask?.dialogLinesArray[currentMessageIndex].sentenceAudioPath}.mp3`

  const dialogContainerRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (dialogContainerRef.current) {
      dialogContainerRef.current.scrollTop = 0 // 2. Set scrollTop to 0
    }
  }, [dialogArrayTo]) //Don't work properly

  return (
    <div>
      <div className={style.title}>Dialog</div>
      <div className={style.dialog} ref={dialogContainerRef}>
        <span className={style.description}>{description}</span>

        {currentMessageIndex >= 0 &&
          !isHistory &&
          dialogArrayTo
            .slice(0, currentMessageIndex)
            .map((message, index) => (
              <DialogMessage
                key={index}
                message={message}
                translation={dialogArrayFrom[index]}
                index={index}
                totalCount={dialogArrayTo.length}
              />
            ))}

        {!isHistory && (
          <div className={style.bubbleContainer}>
            <div className={style.currentTask}>
              <WaveSurferNext audioURL={audioUrl} />
            </div>
            <Hint isHintShown={isHintShown} hintText={hintText} />
          </div>
        )}

        {isHistory &&
          dialogArrayTo &&
          dialogArrayTo.map((message, index) => (
            <DialogMessage
              key={index}
              message={message}
              translation={dialogArrayFrom[index]}
              index={index}
              totalCount={dialogArrayTo.length}
            />
          ))}
      </div>
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
  const { isRecording, finalTranscript, toggleRecognition } = useSpeechRec()

  // set up speech recognition
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [textFromKeyboard, setTextFromKeyboard] = useState('')

  // only for voiceRecognition
  useEffect(() => {
    if (finalTranscript === '') return
    setOutputText(
      getRecognitionText({
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
    if (outputText.slice(0, -1) === dialogArray[currentMessageIndex]) return
    handleChange(
      event,
      commonProps.languageTo as 'geo' | 'eng' | 'rus',
      setInputText,
    )
  }

  useEffect(() => {
    if (!commonProps.token && !commonProps.userId) return
    // If the output text matches the correct text, save the task and move on to the next one
    if (outputText.slice(0, -1) === dialogArray[currentMessageIndex]) {
      setTimeout(async () => {
        if (currentMessageIndex === dialogArray.length - 1) {
          setIsHintShown(false)
          setCurrentMessageIndex(0)
          const isSaved = await saveTask({ ...commonProps })

          if (isSaved) {
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
      }, 2000)
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
    toggleRecognition()
  }

  return (
    <div className={style.container}>
      <div className={style.mistakes}> {mistakesCount} </div>
      {/* <textarea
        ref={inputRef}
        className={style.input}
        autoComplete="off"
        spellCheck="false"
        data-gramm="false"
        value={outputText}
        placeholder="Type your answer"
        onFocus={handleOnFocus}
        onKeyDown={handleOnKeyDown}
        onChange={handleTextareaChange}
        autoFocus
      /> */}
      <DictationInput
        inputRef={inputRef}
        outputText={outputText}
        onFocus={handleOnFocus}
        onKeyDown={handleOnKeyDown}
        onChange={handleTextareaChange}
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
