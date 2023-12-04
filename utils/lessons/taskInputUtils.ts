import { TaskData, CourseObject } from '@utils/lessons/getTask'
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
  learnMode: number
}

export const handleChange = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  languageTo: keyof typeof LANGUAGES_MAP_OVERRIDE,
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
    return overriddenText
  } else {
    return event.target.value
  }
}

// export const handleChangeOmittedWords = (
//   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   languageTo: keyof typeof LANGUAGES_MAP_OVERRIDE,
// ) => {
//   const currentCharCode = event.target.value.slice(-1).charCodeAt(0)

//   const overriddenKeyboard = KEYBOARD_OVERRIDE.find(
//     override =>
//       override.geo === currentCharCode ||
//       override.rus === currentCharCode ||
//       override.eng === currentCharCode,
//   )

//   if (overriddenKeyboard) {
//     const overriddenText =
//       event.target.value.slice(0, -1) +
//       String.fromCharCode(
//         overriddenKeyboard[LANGUAGES_MAP_OVERRIDE[languageTo]],
//       )
//     return overriddenText
//   } else {
//     return event.target.value
//   }
// }

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
export const getRecognitionText = ({
  correctText,
  wordsSynonyms,
  finalTranscript,
  textFromKeyboard,
  setIsHintShown,
  setHintText,
  currentWord,
  setIsMistake
}: {
  correctText: string
  finalTranscript: string
  textFromKeyboard: string
  wordsSynonyms: [string[]]
  setIsHintShown: (bool: boolean) => void
  setHintText: (hint: string) => void
  currentWord: string
  setIsMistake: (mistake: boolean) => void

}): string => {
  const correctWordsArray = correctText.split(' ')
  const textFromKeyboardArray = textFromKeyboard.split(' ')
  const transcriptArray = finalTranscript.toLowerCase().split(' ')
  const arrayToSearch = [...textFromKeyboardArray, ...transcriptArray]

  const outputArray = []

  let lastAddedWordIndex = 0
  setIsHintShown(false)

  for (let index = 0; index < correctWordsArray.length; index++) {
    const modifiedWord = correctWordsArray[index]
      .replace(/[.,\/#!$%\^&\*;:{}=\_`~()¡¿]/g, '')
      .toLowerCase()

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

    }else{
      setHintText(currentWord)
      setIsHintShown(true)
      setIsMistake(true)
    }
  }



  return outputArray.join(' ') + ' '
}

const regexp = /^[.,\/#!$%\^&\*;:{}=\-_`~()¡¿]$/

//Used only for dialog and repetition tasks
export const replayInputCheck = ({
  inputText,
  outputText,
  isHintShown,
  correctText,
  // mistakesCount,
  setHintText,
  setIsHintShown,
  setMistakesCount,
  setIsMistake,
}: {
  inputText: string
  outputText: string
  correctText: string
  isHintShown: boolean
  //mistakesCount: number
  setHintText: (text: string) => void
  setIsHintShown: (bool: boolean) => void
  setMistakesCount: (callback: (prev: number) => number) => void
  setIsMistake: (mistake: boolean) => void
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
  }

  if (!isHintShown) {
    setMistakesCount(prev => prev + 1)
    setHintText(currentWord)
    setIsHintShown(true)
  }

  setIsMistake(true)

  return outputText
}

export const textCheck = ({
  inputText,
  outputText,
  currentWord,
  correctText,
  isHintShown,
  // mistakesCount,
  setHintText,
  setIsHintShown,
  setMistakesCount,
  setForgivenErrorQuantity,
  setIsMistake,
}: {
  inputText: string
  outputText: string
  correctText: string
  currentWord: string
  isHintShown: boolean
  //mistakesCount: number
  setHintText: (text: string) => void
  setIsHintShown: (bool: boolean) => void
  setMistakesCount: (callback: (prev: number) => number) => void
  setForgivenErrorQuantity: (callback: (prev: number) => number) => void
  setIsMistake: (mistake: boolean) => void
}) => {
  const firstMarkCheck = /^[¡¿"-]/.test(
    correctText.charAt(inputText.length - 1),
  )
  const index = inputText.length + Number(firstMarkCheck)
  const isSpaceOrMark = /[.,!"-]|\s/
  const isSpaceHit = /\s/.test(inputText.slice(-1))
  const textToCompare = correctText
    .replace(/[àáâäãåā]/gi, 'a')
    .replace(/[èéêëēėę]/gi, 'e')
    .replace(/[ìíîïī]/gi, 'i')
    .replace(/[òóôöõøō]/gi, 'o')
    .replace(/[ùúûüū]/gi, 'u')
    .replace(/[ç]/gi, 'c')
    .replace(/[ß]/gi, 's')
    .charAt(index - 1)

  if (isSpaceHit && isSpaceOrMark.test(textToCompare)) {
    for (let i = 0; i < 5; i++) {
      if (!isSpaceOrMark.test(correctText.charAt(index + i - 1))) {
        setIsHintShown(false)
        return correctText.slice(0, index + i - 1)
      }
    }
  }

  if (inputText.slice(-1).toLowerCase() === textToCompare.toLocaleLowerCase()) {
    setIsHintShown(false)
    return index === correctText.trim().length - 1 &&
      isSpaceOrMark.test(correctText.slice(-1))
      ? correctText.trim()
      : correctText.trim().slice(0, index)
  }

  if (!isHintShown) {
    setMistakesCount(prev => prev + 1)
    setHintText(isSpaceOrMark.test(textToCompare) ? '(Space)' : currentWord)
    setIsHintShown(true)
  } else {
    setForgivenErrorQuantity(prev => prev + 1)
  }

  setIsMistake(true)

  return outputText
}

export const handleOnKeyDown = (
  event: React.KeyboardEvent,
  inputRef:
    | React.RefObject<HTMLTextAreaElement>
    | React.RefObject<HTMLInputElement[]>,
) => {
  if (
    event.key === 'Space' &&
    inputRef.current //&&
    //inputRef.current.value.endsWith(' ')
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

export const updateCompletedTasks = (commonProps: CommonProps) => {
  const newCompletedTasks = commonProps.completedTasks
    ? [...commonProps.completedTasks, commonProps.currentTask]
    : [commonProps.currentTask]
  commonProps.setCompletedTasks(newCompletedTasks)
  commonProps.setCurrentTaskNumber(commonProps.currentTaskNumber + 1)
}

export const setLevelColors = ({
  answers,
  currentLevel,
  learnMode,
  isMistake,
}: {
  answers: number[]
  currentLevel: number
  learnMode: number
  isMistake: number
}) => {
  const setAnswers = (values: number[]) => (answers = values)

  if (!answers) {
    const arr = new Array(learnMode - 1).fill(-1)
    arr.unshift(isMistake)
    answers = arr
  } else {
    if (learnMode === 3) {
      currentLevel === 1 && setAnswers([isMistake, -1, -1])
      currentLevel === 2 && setAnswers([0, isMistake, -1])
      currentLevel === 3 && setAnswers([0, 0, isMistake])
    }

    if (learnMode === 2) {
      currentLevel === 1 && setAnswers([isMistake, -1])
      currentLevel === 2 && setAnswers([0, isMistake])
    }
    if (learnMode === 1) {
      setAnswers([isMistake])
    }
  }
  return answers
}

export const getLevelColors = ({
  currentTask,
  currentCourseObject,
}: {
  currentTask: TaskData
  currentCourseObject: CourseObject
}) => {
  let levelsArray: number[] = []

  if (currentTask && currentCourseObject) {
    if (!currentTask.answers) {
      levelsArray = new Array(currentCourseObject?.learnMode).fill(-1)
    } else {
      const setAnswers = (values: number[]) => (levelsArray = values)
      const level: number = currentTask.currentLevel
      const learnMode: number = currentCourseObject.learnMode
      const lastAnswer =
        currentTask.answers[currentTask.answers.length - 1] === 1 ? 1 : -1

      if (learnMode === 3) {
        level === 1 && setAnswers([lastAnswer, -1, -1])
        level === 2 && setAnswers([0, lastAnswer, -1])
        level === 3 && setAnswers([0, 0, lastAnswer])
      }
      if (learnMode === 2) {
        level === 1 && setAnswers([lastAnswer, -1])
        level === 2 && setAnswers([0, lastAnswer])
      }

      if (learnMode === 1) {
        setAnswers([lastAnswer])
      }
    }
  }
  return levelsArray
}
