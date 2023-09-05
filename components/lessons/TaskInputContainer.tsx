import {
  replayInputCheck,
  getRecognitionText,
  textCheck,
  CommonProps,
  handleChange,
  updateCompletedTasks,
  handleOnKeyDown,
} from '@utils/lessons/taskInputUtils'
import { DictationInput } from './DictationInput'
import { saveTask } from '@utils/lessons/saveTask'
import { animated, useSpring } from 'react-spring'
import { useAudio } from '@utils/lessons/audioUtils'
import style from './TaskInputContainer.module.scss'
import { useState, useEffect, FC, useRef } from 'react'
import { useSpeechRec } from '@utils/lessons/useSpeechRecognition'

interface TaskInputProps {
  commonProps: CommonProps
  taskType: string
  isHintShown: boolean
  setHintText: (text: string) => void
  setIsHintShown: (bool: boolean) => void
}

export const TaskInputContainer: FC<TaskInputProps> = ({
  taskType,
  isHintShown,
  commonProps,
  setHintText,
  setIsHintShown,
}) => {
  // const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [mistakesCount, setMistakesCount] = useState(0)
  const [taskProgress, setTaskProgress] = useState('0%')
  const [currWordIndex, setCurrWordIndex] = useState(0)
  //const [textFromKeyboard, setTextFromKeyboard] = useState('')
  const { isRecording, finalTranscript, toggleRecognition } = useSpeechRec()
  const { audioIndex, setAudios, wordAudioPlay, addAudio, Play } = useAudio()

  const onlyLetters = /[^\p{L}\p{M}?]/gu
  const currTask = commonProps.currentTask
  const wordsSynonyms = currTask.wordsSynonyms
  const correctText = currTask.correctText as string
  const writtenWordsArray = outputText.trim().split(' ')
  const outputArray = writtenWordsArray.filter(item => item !== '-')
  const wordsArray = currTask.wordsArray.filter(item => item.wordText !== '-')
  const currentWord = wordsArray[currWordIndex]

  useEffect(() => {
    wordAudioPlay(currWordIndex)
  }, [currWordIndex])

  useEffect(() => {
    if (!currentWord) return

    const writtenWord = outputArray[currWordIndex]?.replace(onlyLetters, '')
    const currWord = currentWord.wordText.replace(onlyLetters, '')

    if (currWord.trim().toLowerCase() === writtenWord?.trim().toLowerCase()) {
      addAudio(`${currentWord?.wordAudioPath}`)
      setCurrWordIndex(currWordIndex + 1)
      setTaskProgress((outputArray.length / wordsArray.length) * 100 + '%')
    }
  }, [outputText, audioIndex])

  // create an animation for the microphone icon
  const { transform, opacity } = useSpring({
    opacity: isRecording ? 1 : 0.5,
    transform: `scale(${isRecording ? 1.5 : 1})`,
  })

  // only for voiceRecognition
  useEffect(() => {
    if (finalTranscript === '') return

    setOutputText(
      getRecognitionText({
        correctText,
        wordsSynonyms,
        finalTranscript,
        textFromKeyboard: inputRef.current?.value ?? '', //ეს დასატესტია კარგად.
      }),
    )
  }, [finalTranscript])

  const params = {
    outputText,
    correctText,
    isHintShown,
    //mistakesCount,
    currentWord: currentWord?.wordText,
    setHintText,
    setIsHintShown,
    setMistakesCount,
  }

  const resetTaskState = () => {
    setAudios([])
    //setInputText('')
    setOutputText('')
    setMistakesCount(0)
    setCurrWordIndex(0)
    setIsHintShown(false)
    setTaskProgress('0%')
  }

  useEffect(() => {
    if (!commonProps.token && !commonProps.userId) return
    if (outputText.trim() === correctText.trim()) {
      if (taskType === 'replay') {
        Play(`${commonProps.currentTask.sentenceAudioPath}`)
      }
      setTimeout(async () => {
        const audio = new Audio('https://lingwing.com/sounds/true.mp3')
        audio.play()
        const isSaved = await saveTask({ ...commonProps })
        if (isSaved) {
          resetTaskState()
          updateCompletedTasks(commonProps)
        }
      }, 2500)
    }
  }, [taskProgress])

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (outputText.trim() === correctText.trim()) return

    const inputText = handleChange(
      event,
      commonProps.languageTo as 'geo' | 'eng' | 'rus',
    )

    taskType === 'dictation' || taskType === 'translate'
      ? setOutputText(textCheck({ inputText, ...params }))
      : setOutputText(replayInputCheck({ inputText, ...params }))
  }

  return (
    <>
      <div className={style.taskProgress} style={{ width: taskProgress }}></div>
      <div className={style.container}>
        <div className={style.mistakes}> {mistakesCount} </div>
        <DictationInput
          inputRef={inputRef}
          outputText={outputText}
          // onFocus={handleOnFocus}
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
