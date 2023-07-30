import { TaskData } from '@utils/lessons/getTask'

export type CommonProps = {
  userId: string | null
  token: string | null
  languageTo: string | string[]
  languageFrom: string | string[]
  courseId: string
  setCurrentTaskNumber: (number: number) => void
  currentTaskNumber: number
  currentTask: TaskData
  completedTasks: TaskData[] | undefined
  setCompletedTasks: (tasks: TaskData[]) => void
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
  finalTranscript,
  textFromKeyboard,
  wordsSynonyms,
}: {
  correctText: string
  finalTranscript: string
  textFromKeyboard: string
  wordsSynonyms: [string[]]
}): string => {
  const correctWordsArray = correctText.split(' ')
  const transcriptArray = finalTranscript.split(' ')
  const textFromKeyboardArray = textFromKeyboard.split(' ')
  const arrayToSearch = [...textFromKeyboardArray, ...transcriptArray]

  const outputArray = []

  let lastAddedWordIndex = 0

  for (let index = 0; index < correctWordsArray.length; index++) {
    const modifiedWord = correctWordsArray[index].replace(
      /[.,\/#!$%\^&\*;:{}=\-_`~()]/g,
      '',
    )
    //a variable that will store all cuted punctuation marks
    const synonyms = wordsSynonyms[index]
      ? [modifiedWord, ...wordsSynonyms[index]]
      : [modifiedWord]

    const transcriptIndex = findMatchedWordIndex({
      synonyms,
      lastAddedWordIndex,
      arrayToSearch,
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
  return outputArray.join(' ')
}

const regexp = /^[.,\/#!$%\^&\*;:{}=\-_`~()]$/

//Used only for dialog and repetition tasks
export const repetitionInputCheck = ({
  correctText,
  inputText,
  outputText,
  isHintShown,
  setMistakesCount,
  mistakesCount,
  setIsHintShown,
  setHintText,
}: {
  correctText: string
  inputText: string
  outputText: string
  isHintShown: boolean
  setMistakesCount: (count: number) => void
  mistakesCount: number
  setIsHintShown: (bool: boolean) => void
  setHintText: (text: string) => void
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
  correctText,
  isHintShown,
  setMistakesCount,
  mistakesCount,
  outputText,
  setIsHintShown,
  setHintText,
  currentWord,
}: {
  inputText: string
  correctText: string
  isHintShown: boolean
  setMistakesCount: (values: number) => void
  mistakesCount: number
  outputText: string
  setIsHintShown: (bool: boolean) => void
  setHintText: (text: string) => void
  currentWord: string
}) => {
  const index = inputText.length
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

// const getLetter = (text: string, index: number): string =>
//   text.toLowerCase()[index]

// const isEqual = ({
//   correctText,
//   textToCompare,
//   index,
// }: {
//   correctText: string
//   textToCompare: string
//   index: number
// }): boolean => getLetter(correctText, index) === getLetter(textToCompare, index)

// //Only used for dictation and translation
// export const standardTextCheck = ({
//   inputText,
//   correctText,
//   setMistakeRepeat,
//   mistakeRepeat,
//   setMistakesCount,
//   mistakesCount,
//   outputText,
//   setIsHintShown,
//   setHintText,
//   currentWord,
// }: {
//   inputText: string
//   correctText: string
//   setMistakeRepeat: (bool: boolean) => void
//   mistakeRepeat: boolean
//   setMistakesCount: (values: number) => void
//   mistakesCount: number
//   outputText: string
//   setIsHintShown: (bool: boolean) => void
//   setHintText: (text: string) => void
//   currentWord: string
// }) => {
//   const index = inputText.length - 1

//   const isTextEqual = isEqual({
//     correctText,
//     textToCompare: inputText,
//     index,
//   })

//   const isCharPunctuation = (index: number) => {
//     if (correctText[index]) {
//       return regexp.test(correctText[index])
//     } else return false
//   }

//   const isCharSpace = (index: number) => {
//     if (correctText[index]) {
//       return /\s/.test(correctText[index])
//     } else return false
//   }

//   //textToShow is Written Text in input + next letter
//   let textToShow = correctText.slice(0, inputText ? inputText.length : 0)

//   //check if only last punctuation left
//   if (
//     inputText.length === correctText.length - 1 &&
//     correctText.length > 1 &&
//     isCharPunctuation(index + 1)
//   ) {
//     setIsHintShown(false)
//     setMistakeRepeat(false)
//     return correctText
//   }

//   // check if punctuation inside word
//   if (
//     isCharPunctuation(index + 1) &&
//     !isCharSpace(index + 2) &&
//     correctText[index + 2] &&
//     isTextEqual
//   ) {
//     //console.log('Check1', isCharSpace(index + 2), correctText[index + 2])
//     return correctText.slice(0, inputText ? inputText.length + 1 : 0)
//   }

//   //check if current char is punctuation and after it space
//   if (isCharPunctuation(index) && isCharSpace(index + 1)) {
//     if (inputText.endsWith(' ')) {
//       setMistakeRepeat(false)
//       setIsHintShown(false)
//       if (isCharPunctuation(index + 2) && isCharSpace(index + 3)) {
//         return correctText.slice(0, inputText ? inputText.length + 3 : 0)
//       } else {
//         textToShow += ' '
//         return textToShow
//       }
//     } else {
//       if (mistakeRepeat === false) {
//         setIsHintShown(true)
//         setHintText('(space)')
//         setMistakesCount(mistakesCount + 1)
//         setMistakeRepeat(true)
//       }
//       return outputText
//     }
//   }

//   //check if current char space
//   if (isCharSpace(index)) {
//     if (inputText.endsWith(' ')) {
//       setMistakeRepeat(false)
//       setIsHintShown(false)

//       return textToShow
//     } else {
//       if (mistakeRepeat === false) {
//         setIsHintShown(true)
//         setHintText('(space)')
//         setMistakesCount(mistakesCount + 1)
//         setMistakeRepeat(true)
//       }
//       return outputText
//     }
//   }

//   //check if current char punctuation
//   if (isCharPunctuation(index) && inputText.endsWith(' ')) {
//     setMistakeRepeat(false)
//     setIsHintShown(false)
//     return textToShow
//   }

//   //if current char not punctuation
//   if (!isCharPunctuation(index) && isTextEqual) {
//     setMistakeRepeat(false)
//     setIsHintShown(false)
//     return textToShow
//   } else {
//     if (mistakeRepeat === false) {
//       setMistakesCount(mistakesCount + 1)
//       setMistakeRepeat(true)
//       setHintText(currentWord)
//       setIsHintShown(true)
//     }
//     return outputText
//   }
// }
