import { FC, useEffect, useRef, useState } from 'react'
import { KEYBOARD_OVERRIDE } from '../../utils/const'
import { TaskData } from '../../utils/lessons/getTask'
import { saveTask } from '../../utils/lessons/saveTask'
import { getStringFromRecognition, repetitionInputCheck } from '../../utils/lessons/taskInputUtils'
import style from './Dialog.module.scss'
import { SoundCheck } from './SoundCheck'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'

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
  setCurrentMessageIndex: (index: number) => void
  currentMessageIndex: number
  token: string | null | undefined
  languageTo: string | string[]
  languageFrom: string | string[]
  courseId: string
  setCurrentTaskNumber: (number: number) => void
  currentTaskNumber: number
  currentTask: TaskData
  completedTasks: TaskData[] | undefined
  setCompletedTasks: (tasks: TaskData[]) => void
  setIsHintShown: (bool: boolean) => void
  setHintText: (text: string) => void
}

export const DialogInput: FC<DialogInputProps> = ({
  setCurrentMessageIndex,
  currentMessageIndex,
  token,
  languageTo,
  languageFrom,
  courseId,
  setCurrentTaskNumber,
  currentTaskNumber,
  currentTask,
  completedTasks,
  setCompletedTasks,
  setIsHintShown,
  setHintText,
}) => {
  const [outputText, setOutputText] = useState('')
  const [mistakesCount, setMistakesCount] = useState(0)
  const [mistakeRepeat, setMistakeRepeat] = useState(false)
  const [inputText, setInputText] = useState('')
  const [isSoundChecked, setSoundChecked] = useState(false)

  const dialogArray = currentTask.correctText as string[]
  const wordsSynonyms = currentTask.wordsSynonyms
  const iLearnFromNameCode = currentTask.iLearnFromNameCode

  // set up speech recognition
  const { finalTranscript } = useSpeechRecognition()
  const inputRef = useRef<HTMLInputElement>(null)
  const [partialTranscript, setPartialTranscript] = useState<string>('') // the partial transcript of the user's speech
  const [textFromKeyboard, setTextFromKeyboard] = useState('') // the text inputted by the user from the keyboard
  const [isRecording, setIsRecording] = useState(true) // whether or not the user's voice is being recorded




  // only for voiceRecognition
  useEffect(() => {
    setPartialTranscript(
      getStringFromRecognition({
        correctText: dialogArray[currentMessageIndex],
        finalTranscript,
        textFromKeyboard,
        wordsSynonyms,
      }),
    )
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
      repetitionInputCheck({
        inputText,
        outputText,
        correctText: dialogArray[currentMessageIndex],
        setMistakeRepeat,
        setMistakesCount,
        mistakesCount,
        mistakeRepeat,
        setIsHintShown,
        setHintText,
      }),
    )
  }, [inputText])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
            const overriddenText =
              event.target.value.slice(0, event.target.value.length - 1) +
              String.fromCharCode(KEYBOARD_OVERRIDE[i].array[j].alterCode)
            setInputText(overriddenText)
          }
        }
      }
    }
    skipOverride && setInputText(event.target.value)
  }

  useEffect(() => {
    const audio = new Audio(
      `https://cdn.lingwing.com${currentTask?.dialogLinesArray[currentMessageIndex].sentenceAudioPath}.mp3`,
    )
    audio.play()
  }, [])

  useEffect(() => {
    if (outputText.slice(0, -1) === dialogArray[currentMessageIndex]) {
      setTimeout(async () => {
        if (currentMessageIndex === dialogArray.length - 1) {
          setIsHintShown(false)
          setCurrentMessageIndex(0)
          if (token === null || token === undefined) return
          const isSaveSuccessful = await saveTask({
            token,
            languageFrom,
            languageTo,
            currentTask,
            courseId,
          })
          if (isSaveSuccessful) {
            setCurrentTaskNumber(currentTaskNumber + 1)
            completedTasks &&
              setCompletedTasks([...completedTasks, currentTask])
            !completedTasks && setCompletedTasks([currentTask])
          }
        } else {
          setCurrentMessageIndex(currentMessageIndex + 1)
        }
        setOutputText('')
        setInputText('')
        if (!currentTask?.dialogLinesArray[currentMessageIndex + 1]) return
        const audio = new Audio(
          `https://cdn.lingwing.com${currentTask?.dialogLinesArray[currentMessageIndex + 1]
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
    // If there is a partial transcript available, set the output text to the partial transcript
    partialTranscript && setOutputText(partialTranscript)
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
      {/* <div className={!isSoundChecked ? style.soundCheck : style.hidden}>
        <SoundCheck
          setSoundChecked={setSoundChecked}
          soundChecked={isSoundChecked}
        />
      </div> */}
      <div className={style.mistakes}> {mistakesCount} </div>
      <input
        onFocus={handleOnFocus}
        ref={inputRef}
        className={style.input}
        type="text"
        value={outputText}
        onChange={handleChange}
      />

      <span className={style.micIcon} key="mic" />
    </div>
  )
}
