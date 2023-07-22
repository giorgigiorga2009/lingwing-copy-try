import { useState, useEffect, FC, useRef } from 'react'
import style from './TaskInputContainer.module.scss'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
import {
  repetitionInputCheck,
  getStringFromRecognition,
  standardTextCheck,
  CommonProps,
} from '@utils/lessons/taskInputUtils'
import { animated, useSpring } from 'react-spring'
import { KEYBOARD_OVERRIDE } from '@utils/const'
import { DictationInput } from './DictationInput'
import { OmittedWords } from './OmittedWords'
import { saveTask } from '@utils/lessons/saveTask'

interface TaskInputProps {
  commonProps: CommonProps
  taskType: string
  setIsHintShown: (bool: boolean) => void
  setHintText: (text: string) => void
}

export const TaskInputContainer: FC<TaskInputProps> = ({
  commonProps,
  taskType,
  setIsHintShown,
  setHintText,
}) => {
  const [inputText, setInputText] = useState('') // the text the user has inputted
  const [outputText, setOutputText] = useState('') // the text that should be displayed as output
  const [partialTranscript, setPartialTranscript] = useState<string>('') // the partial transcript of the user's speech
  const [textFromKeyboard, setTextFromKeyboard] = useState('') // the text inputted by the user from the keyboard
  const [isRecording, setIsRecording] = useState(true) // whether or not the user's voice is being recorded
  const [mistakesCount, setMistakesCount] = useState(0) // the number of mistakes the user has made
  const [mistakeRepeat, setMistakeRepeat] = useState(false) // whether or not we should count new mistakes
  const [isAnimating, setIsAnimating] = useState(false) // whether or not the microphone icon should be animating
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [taskProgress, setTaskProgress] = useState('0%')

  const correctText = commonProps.currentTask.correctText as string
  const wordsSynonyms = commonProps.currentTask.wordsSynonyms
  const iLearnFromNameCode = commonProps.currentTask.iLearnFromNameCode

  // play audio after word is finished
  useEffect(() => {
    if (
      taskType !== 'translate' &&
      taskType !== 'dictation' &&
      taskType !== 'replay'
    )
      return

    const outputArray = outputText.toLowerCase().trim().split(' ')
    const wordIsFinished =
      commonProps.currentTask?.wordsArray[currentWordIndex]?.wordText
        .toLocaleLowerCase()
        .replace(/[^\p{L}\p{M}?]/gu, '')
        .trim() ===
      outputArray[currentWordIndex]?.replace(/[^\p{L}\p{M}?]/gu, '').trim()

    if (wordIsFinished) {
      if (
        commonProps.currentTask?.wordsArray[currentWordIndex]?.wordAudioPath !==
        'undefined/undefined'
      ) {
        const audio = new Audio(
          `https://cdn.lingwing.com${commonProps.currentTask?.wordsArray[currentWordIndex]?.wordAudioPath}.mp3`,
        )
        audio.play()
      }
      setCurrentWordIndex(currentWordIndex + 1)
      setTaskProgress(
        (outputArray.length / commonProps.currentTask.wordsArray.length) * 100 +
          '%',
      )
    }
  }, [outputText])

  // create an animation for the microphone icon
  const { transform, opacity } = useSpring({
    opacity: isAnimating ? 1 : 0.5,
    transform: `scale(${isAnimating ? 1.5 : 1})`,
  })

  // set up speech recognition
  const { finalTranscript } = useSpeechRecognition()
  const inputRef = useRef<HTMLTextAreaElement>(null)

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

  const params = {
    inputText,
    outputText,
    correctText,
    setMistakeRepeat,
    setMistakesCount,
    mistakesCount,
    mistakeRepeat,
    setIsHintShown,
    setHintText,
  }

  //only for keyboardInput
  useEffect(() => {
    // Depending of taskType choosing text check
    ;(taskType === 'dictation' || taskType === 'translate') &&
      setOutputText(
        standardTextCheck({
          ...params,
          currentWord:
            commonProps.currentTask?.wordsArray[currentWordIndex]?.wordText,
        }),
      )

    taskType === 'replay' && setOutputText(repetitionInputCheck({ ...params }))
  }, [inputText])

  useEffect(() => {
    if (commonProps.token === null && commonProps.userId === null) return
    // If the output text matches the correct text, save the task and move on to the next one
    if (outputText.trim() === correctText) {
      setTimeout(async () => {
        setIsHintShown(false)
        const isSaveSuccessful = await saveTask({
          userId: commonProps.userId,
          token: commonProps.token,
          languageFrom: commonProps.languageFrom,
          languageTo: commonProps.languageTo,
          currentTask: commonProps.currentTask,
          courseId: commonProps.courseId,
        })
        if (isSaveSuccessful) {
          setIsHintShown(false)
          setTaskProgress('0%')
          commonProps.setCurrentTaskNumber(commonProps.currentTaskNumber + 1)
          setInputText('')
          setOutputText('')
          setMistakesCount(0)
          setMistakeRepeat(false)
          setCurrentWordIndex(0)
          commonProps.completedTasks &&
            commonProps.setCompletedTasks([
              ...commonProps.completedTasks,
              commonProps.currentTask,
            ])
          !commonProps.completedTasks &&
            commonProps.setCompletedTasks([commonProps.currentTask])
        }
      }, 1500)
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

  const handleOnFocus = () => {
    // Stop listening for speech when the input field is focused
    SpeechRecognition.stopListening()
    // Focus on the input field and move the cursor to the end
    if (inputRef.current) {
      inputRef.current.focus()
      const length = inputRef.current.value.length
      inputRef.current.setSelectionRange(length, length)
    }
    // If there is a partial transcript available, set the output text to the partial transcript
    partialTranscript && setOutputText(partialTranscript)
  }

  const handleMicOnClick = () => {
    setIsAnimating(!isAnimating)
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

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (outputText.trim() === correctText) return

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
            // override the input text with a character from a different keyboard layout
            const overriddenText =
              event.target.value.slice(0, event.target.value.length - 1) +
              String.fromCharCode(KEYBOARD_OVERRIDE[i].array[j].alterCode)
            setInputText(overriddenText)
          }
        }
      }
    }
    skipOverride && setInputText(event.target.value)
    setInputText(event.target.value)
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
            onKeyDown={handleOnKeyDown}
            onChange={handleChange}
            onFocus={handleOnFocus}
          />
        )}

        {(commonProps.token !== null || commonProps.userId !== null) &&
          taskType === 'omittedwords' && (
            <OmittedWords
              sentenceArray={correctText.match(/(\[.*?\])|(\S+)/g) ?? []}
              onKeyDown={handleOnKeyDown}
              setMistakeRepeat={setMistakeRepeat}
              mistakeRepeat={mistakeRepeat}
              setMistakesCount={setMistakesCount}
              mistakesCount={mistakesCount}
              commonProps={commonProps}
              setIsHintShown={setIsHintShown}
              setHintText={setHintText}
            />
          )}

        <animated.div
          className={style.microphoneIcon}
          style={{
            opacity,
            transform,
          }}
          onClick={handleMicOnClick}
        >
          <span className={style.micIcon} key="mic" />
          {isAnimating && <div className={style.pulsatingCircle} />}
        </animated.div>
      </div>
    </>
  )
}
