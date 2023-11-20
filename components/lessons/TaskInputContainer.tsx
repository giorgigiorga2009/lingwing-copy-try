import {
  replayInputCheck,
  getRecognitionText,
  textCheck,
  CommonProps,
  handleChange,
  updateCompletedTasks,
  handleOnKeyDown,
} from '@utils/lessons/taskInputUtils'
import { TaskProgress } from './TaskProgress'
import { DictationInput } from './DictationInput'
import { saveTask } from '@utils/lessons/saveTask'
import { MistakesCounter } from './MistakesCounter'
import { useAudio } from '@utils/lessons/audioUtils'
import style from './TaskInputContainer.module.scss'
import { VoiceRecognition } from './VoiceRecognition'
import { useState, useEffect, FC, useRef } from 'react'
import { useSpeechRec } from '@utils/lessons/useSpeechRecognition'

interface TaskInputProps {
  commonProps: CommonProps
  taskType: string
  isHintShown: boolean
  setHintText: (text: string) => void
  setIsHintShown: (bool: boolean) => void
  // setMistake: (number: number) => void
}

export const TaskInputContainer: FC<TaskInputProps> = ({
  taskType,
  isHintShown,
  commonProps,
  setHintText,
  setIsHintShown,
  // setMistake
}) => {
  const [outputText, setOutputText] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [mistakesCount, setMistakesCount] = useState(0)
  const [isMistake, setIsMistake] = useState(false)
  const [forgivenErrorQuantity, setForgivenErrorQuantity] = useState(0)
  const [taskProgress, setTaskProgress] = useState('0%')
  const [currWordIndex, setCurrWordIndex] = useState(0)
  const { finalTranscript } = useSpeechRec()
  const { audioIndex, setAudios, wordAudioPlay, addAudio, Play } = useAudio()

  const onlyLetters = /[^\p{L}\p{M}?"]/gu
  const currTask = commonProps.currentTask
  const errorLimit = commonProps.currentTask.errorLimit
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
    setForgivenErrorQuantity,
  }

  const resetTaskState = () => {
    setAudios([])
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
        const isSaved = await saveTask({
          ...commonProps,
          totalMistakes: mistakesCount,
          forgivenErrorQuantity: forgivenErrorQuantity,
          error: errorLimit - mistakesCount < 0 ? 1 : 0,
        })
        const isError = errorLimit - mistakesCount < 0 ? 1 : 0
        if (!commonProps.currentTask.answers) {
          commonProps.currentTask.answers = [isError, -1, -1]
        } else {
          if ((commonProps.currentTask.currentLevel = 1)) {
            commonProps.currentTask.answers = [1, isError, -1]
          }
          if ((commonProps.currentTask.currentLevel = 2)) {
            commonProps.currentTask.answers = [0, 0, isError]
          }
          if ((commonProps.currentTask.currentLevel = 2)) {
            commonProps.currentTask.answers = [0, 0, 0]
          }
        }

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
      ? setOutputText(textCheck({ inputText, ...params, setIsMistake }))
      : setOutputText(replayInputCheck({ inputText, ...params }))
  }

  return (
    <>
      <TaskProgress taskProgress={taskProgress} />
      <div className={style.container}>
        <MistakesCounter
          percentage={(1 - mistakesCount / errorLimit) * 100}
          errorLimit={Math.max(errorLimit - mistakesCount, 0)}
        />
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
        <VoiceRecognition />
      </div>
    </>
  )
}
