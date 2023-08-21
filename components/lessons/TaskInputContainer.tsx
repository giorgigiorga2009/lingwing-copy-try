import {
  replayInputCheck,
  getRecognitionText,
  textCheck,
  CommonProps,
  handleChange,
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
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [mistakesCount, setMistakesCount] = useState(0)
  const [taskProgress, setTaskProgress] = useState('0%')
  const [currWordIndex, setCurrWordIndex] = useState(0)
  const [textFromKeyboard, setTextFromKeyboard] = useState('')
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
        textFromKeyboard,
      }),
    )
  }, [finalTranscript])

  const params = {
    inputText,
    outputText,
    correctText,
    isHintShown,
    mistakesCount,
    setHintText,
    setIsHintShown,
    setMistakesCount,
  }
  //only for keyboardInput
  useEffect(() => {
    if (taskType === 'dictation' || taskType === 'translate') {
      setOutputText(
        textCheck({
          ...params,
          currentWord: currentWord.wordText,
        }),
      )
    }

    taskType === 'replay' && setOutputText(replayInputCheck({ ...params }))
  }, [inputText])

  const resetTaskState = () => {
    setAudios([])
    setInputText('')
    setOutputText('')
    setMistakesCount(0)
    setCurrWordIndex(0)
    setIsHintShown(false)
    setTaskProgress('0%')
  }

  const updateCompletedTasks = () => {
    const newCompletedTasks = commonProps.completedTasks
      ? [...commonProps.completedTasks, commonProps.currentTask]
      : [commonProps.currentTask]
    commonProps.setCompletedTasks(newCompletedTasks)
    commonProps.setCurrentTaskNumber(commonProps.currentTaskNumber + 1)
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
          updateCompletedTasks()
        }
      }, 2500)
    }
  }, [taskProgress])

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
      // setCorrect(true)
    } else {
      // setCorrect(false)
    }
  }

  const handleOnFocus = () => {
    // Focus on the input field and move the cursor to the end
    if (inputRef.current) {
      inputRef.current.focus()
      const length = inputRef.current.value.length
      inputRef.current.setSelectionRange(length, length)
    }
  }
  const handleMicClick = () => {
    if (inputRef.current) {
      // Store the current input value before starting/stopping speech recognition
      const inputValue = inputRef.current.value
      setTextFromKeyboard(inputValue)
    }
    toggleRecognition()
  }

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (outputText.trim() === correctText.trim()) {
      const audio = new Audio('https://lingwing.com/sounds/false.mp3')
      audio.play()
      return
    }
    handleChange(
      event,
      commonProps.languageTo as 'geo' | 'eng' | 'rus',
      setInputText,
    )
  }

  return (
    <>
      <div className={style.taskProgress} style={{ width: taskProgress }}></div>
      <div className={style.container}>
        <div className={style.mistakes}> {mistakesCount} </div>

        {/* {(taskType === 'dictation' ||
          taskType === 'translate' ||
          taskType === 'replay') && ( */}
        <DictationInput
          inputRef={inputRef}
          outputText={outputText}
          onFocus={handleOnFocus}
          onKeyDown={handleOnKeyDown}
          onChange={handleTextareaChange}
          taskDone={taskProgress}
          mistake={isHintShown}
        />
        {/* )} */}

        {/* {
          //(commonProps.token || commonProps.userId) &&
          taskType === 'omittedwords' && (
            <OmittedWords
              isHintShown={isHintShown}
              commonProps={commonProps}
              setHintText={setHintText}
              setIsHintShown={setIsHintShown}
            />
          )
        } */}

        <animated.div
          className={style.microphoneIcon}
          style={{
            opacity,
            transform,
          }}
          onClick={handleMicClick}
        >
          <span className={style.micIcon} key="mic" />
          {isRecording && <div className={style.pulsatingCircle} />}
        </animated.div>
      </div>
    </>
  )
}
