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
  updateCompletedTasks,
  handleOnKeyDown,
} from '@utils/lessons/taskInputUtils'
import { useSpeechRec } from '@utils/lessons/useSpeechRecognition'
import { DialogMessage } from './DialogMessage'
import { useTranslation } from '@utils/useTranslation'

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

export const Dialog: FC<DialogProps> = ({
  currentMessageIndex = 0,
  currentTask,
  dialogArrayTo,
  dialogArrayFrom,
  isHistory,
  isHintShown,
  hintText,
}) => {
  const { t } = useTranslation()
  const audioUrl = `${process.env.audioURL}${currentTask?.dialogLinesArray[currentMessageIndex].sentenceAudioPath}.mp3`
  const scrollbarsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (scrollbarsRef.current) {
      scrollbarsRef.current.scrollTop = scrollbarsRef.current.scrollHeight
    }
  }, [currentMessageIndex, hintText])

  return (
    <div className={style.wrapper}>
      <div className={style.title}>{t('DIALOG_TITLE')}</div>
      <div className={style.dialog} ref={scrollbarsRef}>
        <span className={style.description}>
          {t('DIALOG_TYPE_FIRST_LETTERS')
            .split(' ')
            .map((word, index) => (
              <span key={word + index}>{word + ' '}</span>
            ))}
        </span>
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
  const [taskProgress, setTaskProgress] = useState('0%')

  const inputRef = useRef<HTMLTextAreaElement>(null)

  const dialogArray = commonProps.currentTask.correctText as string[]
  const wordsSynonyms = commonProps.currentTask.wordsSynonyms
  const { isRecording, finalTranscript, toggleRecognition } = useSpeechRec()

  // set up speech recognition
  //const [textFromKeyboard, setTextFromKeyboard] = useState('')

  // only for voiceRecognition
  useEffect(() => {
    if (finalTranscript === '') return
    setOutputText(
      getRecognitionText({
        correctText: dialogArray[currentMessageIndex],
        finalTranscript,
        textFromKeyboard: inputRef.current?.value ?? '', //ეს დასატესტია კარგად
        wordsSynonyms,
      }),
    )
  }, [finalTranscript])

  const params = {
    outputText,
    correctText: dialogArray[currentMessageIndex],
    setMistakesCount,
    setIsHintShown,
    setHintText,
    isHintShown,
  }

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (outputText.slice(0, -1) === dialogArray[currentMessageIndex]) return
    const inputText = handleChange(
      event,
      commonProps.languageTo as 'geo' | 'eng' | 'rus',
    )
    setOutputText(replayInputCheck({ inputText, ...params }))
  }

  useEffect(() => {
    if (!commonProps.token && !commonProps.userId) return
    // If the output text matches the correct text, save the task and move on to the next one
    if (outputText.slice(0, -1) === dialogArray[currentMessageIndex]) {
      setTaskProgress(
        ((currentMessageIndex + 1) / dialogArray.length) * 100 + '%',
      )
      setTimeout(async () => {
        if (currentMessageIndex === dialogArray.length - 1) {
          setIsHintShown(false)
          setCurrentMessageIndex(0)
          const isSaved = await saveTask({ ...commonProps })

          if (isSaved) {
            updateCompletedTasks(commonProps)
          }
        } else {
          setCurrentMessageIndex(currentMessageIndex + 1)
        }
        setMistakesCount(0)
        setOutputText('')
        //setInputText('')
      }, 2000)
    }
  }, [outputText])

  const { transform, opacity } = useSpring({
    opacity: isRecording ? 1 : 0.5,
    transform: `scale(${isRecording ? 1.5 : 1})`,
  })

  return (
    <>
      <div className={style.taskProgress} style={{ width: taskProgress }}></div>
      <div className={style.container}>
        <div className={style.mistakes}> {mistakesCount} </div>
        <DictationInput
          inputRef={inputRef}
          outputText={outputText}
          onKeyDown={(event: React.KeyboardEvent) =>
            handleOnKeyDown(event, inputRef)
          }
          onChange={handleTextareaChange}
          taskDone={taskProgress}
          mistake={isHintShown}
        />

        <animated.div
          className={style.microphoneIcon}
          style={{
            opacity,
            transform,
          }}
          onClick={() => toggleRecognition()}
        >
          <span className={style.micIcon} key="mic" />
          {isRecording && <div className={style.pulsatingCircle} />}
        </animated.div>
      </div>
    </>
  )
}
