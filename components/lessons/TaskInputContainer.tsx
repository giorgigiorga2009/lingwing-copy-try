import {
  replayInputCheck,
  getRecognitionText,
  textCheck,
  CommonProps,
  handleChange,
} from '@utils/lessons/taskInputUtils'
import { OmittedWords } from './OmittedWords'
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

  const wordsCount = commonProps.currentTask.wordsArray
  const wordsSynonyms = commonProps.currentTask.wordsSynonyms
  const outputArray = outputText.toLowerCase().trim().split(' ')
  const correctText = commonProps.currentTask.correctText as string
  const currentWord = commonProps.currentTask?.wordsArray[currWordIndex]

  useEffect(() => {
    wordAudioPlay(currWordIndex)
  }, [currWordIndex])

  useEffect(() => {
    if (!currentWord) return
    const onlyLetters = /[^\p{L}\p{M}?]/gu
    const currWord = currentWord.wordText.replace(onlyLetters, '').toLowerCase()
    const lastWord = outputArray[currWordIndex]?.replace(onlyLetters, '').trim()

    if (currWord.trim() === lastWord) {
      addAudio(`${currentWord?.wordAudioPath}`)
      setCurrWordIndex(currWordIndex + 1)
      setTaskProgress((outputArray.length / wordsCount.length) * 100 + '%')
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
    if (commonProps.token === null && commonProps.userId === null) return
    if (outputText.trim() === correctText.trim()) {
      if (taskType === 'replay') {
        Play(`${commonProps.currentTask.sentenceAudioPath}`)
      }
      setTimeout(async () => {
        const isSaveSuccessful = await saveTask({
          token: commonProps.token,
          userId: commonProps.userId,
          courseId: commonProps.courseId,
          languageTo: commonProps.languageTo,
          currentTask: commonProps.currentTask,
          languageFrom: commonProps.languageFrom,
        })
        if (isSaveSuccessful) {
          resetTaskState()
          updateCompletedTasks()
        }
      }, 2200)
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
    if (outputText.trim() === correctText.trim()) return
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

        {(taskType === 'dictation' ||
          taskType === 'translate' ||
          taskType === 'replay') && (
          <DictationInput
            inputRef={inputRef}
            outputText={outputText}
            onFocus={handleOnFocus}
            onKeyDown={handleOnKeyDown}
            onChange={handleTextareaChange}
          />
        )}

        {(commonProps.token !== null || commonProps.userId !== null) &&
          taskType === 'omittedwords' && (
            <OmittedWords
              isHintShown={isHintShown}
              commonProps={commonProps}
              setHintText={setHintText}
              onKeyDown={handleOnKeyDown}
              mistakesCount={mistakesCount}
              setIsHintShown={setIsHintShown}
              setMistakesCount={setMistakesCount}
              wordsArray={correctText.match(/(\[.*?\])|(\S+)/g) ?? []}
            />
          )}

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
