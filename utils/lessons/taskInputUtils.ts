import { TaskData } from '@utils/lessons/getTask'
import { KEYBOARD_OVERRIDE, LANGUAGES_MAP_OVERRIDE } from '@utils/const'

export type CommonProps = {
  courseId: string
  token: string | null
  userId: string | null
  currentTask: TaskData
  currentTaskNumber: number
  languageTo: string | string[]
  languageFrom: string | string[]
  completedTasks: TaskData[] | undefined
  setCurrentTaskNumber: (number: number) => void
  setCompletedTasks: (tasks: TaskData[]) => void
}

export const handleChange = (
  event: React.ChangeEvent<HTMLTextAreaElement>,
  languageTo: keyof typeof LANGUAGES_MAP_OVERRIDE,
  setInputText: (text: string) => void,
) => {
  const currentCharCode = event.target.value.slice(-1).charCodeAt(0)

  const overriddenKeyboard = KEYBOARD_OVERRIDE.find(
    override =>
      override.geo === currentCharCode ||
      override.rus === currentCharCode ||
      override.eng === currentCharCode,
  )

  if (overriddenKeyboard) {
    const overriddenText =
      event.target.value.slice(0, -1) +
      String.fromCharCode(
        overriddenKeyboard[LANGUAGES_MAP_OVERRIDE[languageTo]],
      )
    setInputText(overriddenText)
  } else {
    setInputText(event.target.value)
  }
}

//Only For voice recognition
const findMatchedWordIndex = ({
  synonyms,
  arrayToSearch,
  lastAddedWordIndex,
}: {
  synonyms: string[]
  arrayToSearch: string[]
  lastAddedWordIndex: number
}) => {
  for (let i = 0; i < synonyms.length; i++) {
    const index = arrayToSearch.indexOf(synonyms[i], lastAddedWordIndex)
    if (synonyms[i] === '-') {
      return lastAddedWordIndex + 1
    }
    if (index !== -1) {
      return index
    }
  }
  //result of indexOf function, -1 means that none of the words was found
  return -1
}

//Only For voice recognition
export const getStringFromRecognition = ({
  correctText,
  wordsSynonyms,
  finalTranscript,
  textFromKeyboard,
}: {
  correctText: string
  finalTranscript: string
  textFromKeyboard: string
  wordsSynonyms: [string[]]
}): string => {
  const correctWordsArray = correctText.split(' ')
  const textFromKeyboardArray = textFromKeyboard.split(' ')
  const transcriptArray = finalTranscript.toLowerCase().split(' ')
  const arrayToSearch = [...textFromKeyboardArray, ...transcriptArray]

  // console.log(correctWordsArray + ' correctWordsArray')
  // console.log(transcriptArray + ' transcriptArray')
  // console.log(textFromKeyboardArray + ' textFromKeyboardArray')
  // console.log(arrayToSearch + ' arrayToSearch')

  const outputArray = []

  let lastAddedWordIndex = 0

  for (let index = 0; index < correctWordsArray.length; index++) {
    const modifiedWord = correctWordsArray[index]
      .replace(/[.,\/#!$%\^&\*;:{}=\_`~()¡¿]/g, '')
      .toLowerCase()
    //a variable that will store all cuted punctuation marks

    const synonyms = wordsSynonyms[index]
      ? [modifiedWord, ...wordsSynonyms[index]]
      : [modifiedWord]

    const transcriptIndex = findMatchedWordIndex({
      synonyms,
      arrayToSearch,
      lastAddedWordIndex,
    })

    if (
      transcriptIndex !== -1 &&
      transcriptIndex >= lastAddedWordIndex &&
      outputArray.length >= index
    ) {
      lastAddedWordIndex = transcriptIndex
      outputArray.push(correctWordsArray[index])
    }
  }
  return outputArray.join(' ') + ' '
}

const regexp = /^[.,\/#!$%\^&\*;:{}=\-_`~()]$/

//Used only for dialog and repetition tasks
export const replayInputCheck = ({
  inputText,
  outputText,
  isHintShown,
  correctText,
  mistakesCount,
  setHintText,
  setIsHintShown,
  setMistakesCount,
}: {
  inputText: string
  outputText: string
  correctText: string
  isHintShown: boolean
  mistakesCount: number
  setHintText: (text: string) => void
  setIsHintShown: (bool: boolean) => void
  setMistakesCount: (count: number) => void
}) => {
  const correctWordsArray = correctText.split(' ')
  const outputTextArray = outputText ? outputText.trim().split(' ') : []
  const inputTextArray = inputText ? inputText.replace(/ $/, '').split(' ') : []

  const index = inputTextArray.length - 1
  const currentWord = correctWordsArray[index]
  const punctuations = correctWordsArray[index + 1]

  if (!currentWord) return ''

  const correctFirsLetter = currentWord.charAt(0).toLowerCase()
  const writtenFirsLetter = inputText.charAt(inputText.length - 1).toLowerCase()

  if (correctFirsLetter === writtenFirsLetter) {
    outputTextArray.push(currentWord)
    punctuations?.match(regexp) && outputTextArray.push(punctuations)
    setIsHintShown(false)
    return outputTextArray.map(word => word.concat(' ')).join('')
  } else {
    if (!isHintShown) {
      setMistakesCount(mistakesCount + 1)
      setHintText(currentWord)
      setIsHintShown(true)
    }
    return outputText
  }
}

export const standardTextCheck = ({
  inputText,
  outputText,
  currentWord,
  correctText,
  isHintShown,
  mistakesCount,
  setHintText,
  setIsHintShown,
  setMistakesCount,
}: {
  inputText: string
  outputText: string
  correctText: string
  currentWord: string
  isHintShown: boolean
  mistakesCount: number
  setHintText: (text: string) => void
  setIsHintShown: (bool: boolean) => void
  setMistakesCount: (values: number) => void
}) => {
  const firstMarkCheck = /^[¡¿]/.test(correctText.charAt(inputText.length - 1))
  const index = inputText.length + Number(firstMarkCheck)
  const isSpaceOrMark = /[.,!-]|\s/
  const isSpaceHit = /\s/.test(inputText.slice(-1))
  const textToCompare = correctText.charAt(index - 1)

  const isLastLetterCorrect =
    inputText.slice(-1).toLowerCase() === textToCompare.toLocaleLowerCase()

  if (isSpaceHit && isSpaceOrMark.test(textToCompare)) {
    for (let i = 0; i < 5; i++) {
      if (!isSpaceOrMark.test(correctText.slice(index + i - 1, index + i))) {
        setIsHintShown(false)
        return correctText.slice(0, index + i - 1)
      }
    }
  }

  if (isLastLetterCorrect) {
    setIsHintShown(false)
    if (
      index === correctText.trim().length - 1 &&
      isSpaceOrMark.test(correctText.slice(-1))
    ) {
      return correctText.trim()
    }
    return correctText.trim().slice(0, index)
  }

  if (!isHintShown) {
    setMistakesCount(mistakesCount + 1)
    setHintText(isSpaceOrMark.test(textToCompare) ? '(Space)' : currentWord)
    setIsHintShown(true)
  }
  return outputText
}
