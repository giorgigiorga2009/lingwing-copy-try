import React from 'react'

const getLetter = (text: string, index: number): string =>
  text.toLowerCase()[index]

export const isEqual = ({
  correctText,
  textToCompare,
  index,
}: {
  correctText: string
  textToCompare: string
  index: number
}): boolean => getLetter(correctText, index) === getLetter(textToCompare, index)

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
    let index = arrayToSearch.indexOf(synonyms[i], lastAddedWordIndex)
    if (index !== -1) {
      return index
    }
  }
  //result of indexOf function, -1 means that none of the words was found
  return -1
}

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
  const textFromKeyboardArray = textFromKeyboard.split(' ')
  const transcriptArray = finalTranscript.split(' ')
  const arrayToSearch = [...textFromKeyboardArray, ...transcriptArray]

  const outputArray = []

  let lastAddedWordIndex = 0

  for (let index = 0; index < correctWordsArray.length; index++) {
    const modifiedWord = correctWordsArray[index].replace(
      /[.,\/#!$%\^&\*;:{}=\-_`~()]/g,
      '',
    )
    //переменная в которой будут хранится все отрезанные знаки пунктуации
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

export const repetitionInputCheck = ({
  correctText,
  inputText,
  outputText,
  setMistakesCount,
  setMistakeRepeat,
  mistakeRepeat,
  mistakesCount,
  setIsHintShown,
  setHintText,
}: {
  correctText: string
  inputText: string
  outputText: string
  setMistakesCount: (count: number) => void
  setMistakeRepeat: (flag: boolean) => void
  mistakesCount: number
  mistakeRepeat: boolean
  setIsHintShown: (bool: boolean) => void
  setHintText: (text: string) => void
}) => {
  const regexp = /^[.,\/#!$%\^&\*;:{}=\-_`~()]$/

  const outputTextArray = outputText ? outputText.trim().split(' ') : []
  const correctWordsArray = correctText.split(' ')
  const inputTextArray = inputText ? inputText.split(' ') : []

  const index = inputTextArray.length !== 0 ? inputTextArray.length - 1 : 0

  const currentWord = correctWordsArray[index]
  if (currentWord === undefined) return ''

  const equal =
    currentWord.toLowerCase()[0] ===
    inputText.toLowerCase()[inputText.length - 1]

  if (equal) {
    setMistakeRepeat(false)
    setIsHintShown(false)
    outputTextArray.push(currentWord)
    const isPunctuation =
      correctWordsArray[index + 1] !== undefined
        ? correctWordsArray[index + 1].match(regexp)
        : false
    isPunctuation && outputTextArray.push(correctWordsArray[index + 1])
    const modifiedArray = outputTextArray.map(word => word.concat(' '))
    return modifiedArray.join('')
  } else {
    if (mistakeRepeat === false) {
      setMistakesCount(mistakesCount + 1)
      setMistakeRepeat(true)
      setIsHintShown(true)
      setHintText(currentWord)
    }
    return outputText
  }
}

export const standardTextCheck = ({
  inputText,
  correctText,
  setMistakeRepeat,
  mistakeRepeat,
  setMistakesCount,
  mistakesCount,
  outputText,
  setIsHintShown,
  setHintText,
  currentWord,
}: {
  inputText: string
  correctText: string
  setMistakeRepeat: (bool: boolean) => void
  mistakeRepeat: boolean
  setMistakesCount: (values: number) => void
  mistakesCount: number
  outputText: string
  setIsHintShown: (bool: boolean) => void
  setHintText: (text: string) => void
  currentWord: string
}) => {
  const index = inputText.length - 1

  const isTextEqual = isEqual({
    correctText,
    textToCompare: inputText,
    index,
  })

  const isCharPunctuation = (index: number) => {
    if (correctText[index]) {
      return (/[.,\/#!$%\^&\*;:{}=\-_`~()]/.test(correctText[index]))
    }
    else return false
  }

  const isCharSpace = (index: number) => {
    if (correctText[index]) {
      return (/\s/.test(correctText[index]))
    }
    else return false
  }




  let textToShow = correctText.slice(0, inputText ? inputText.length : 0)

  //check if only last punctuation left
  if (inputText.length === correctText.length - 1 && correctText.length > 1 && isCharPunctuation(index + 1)) {
    setIsHintShown(false)
    setMistakeRepeat(false)
    return correctText
  }

  // check if punctuation inside word
  if (isCharPunctuation(index + 1) && !isCharSpace(index + 2) && correctText[index + 2] && isTextEqual) {
    console.log('Check1', isCharSpace(index + 2), correctText[index + 2])
    return correctText.slice(0, inputText ? (inputText.length + 1) : 0)
  }



  //check if current char is punctuation and after it space
  if (isCharPunctuation(index) && isCharSpace(index + 1)) {
    if (inputText.endsWith(' ')) {
      setMistakeRepeat(false)
      setIsHintShown(false)
      if (isCharPunctuation(index + 2) && isCharSpace(index + 3)) {
        return correctText.slice(0, inputText ? (inputText.length + 3) : 0)
      } else {
        textToShow += ' '
        return textToShow
      }
    } else {
      if (mistakeRepeat === false) {
        setIsHintShown(true)
        setHintText('(space)')
        setMistakesCount(mistakesCount + 1)
        setMistakeRepeat(true)
      }
      return outputText
    }
  }

  //check if current char space
  if (isCharSpace(index)) {
    if (inputText.endsWith(' ')) {
      setMistakeRepeat(false)
      setIsHintShown(false)

      return textToShow
    } else {
      if (mistakeRepeat === false) {
        setIsHintShown(true)
        setHintText('(space)')
        setMistakesCount(mistakesCount + 1)
        setMistakeRepeat(true)
      }
      return outputText
    }
  }

  //check if current char punctuation
  if (isCharPunctuation(index) && inputText.endsWith(' ')) {
    setMistakeRepeat(false)
    setIsHintShown(false)
    return textToShow
  }

  //if current char not punctuation
  if (!isCharPunctuation(index) && isTextEqual) {
    setMistakeRepeat(false)
    setIsHintShown(false)
    return textToShow
  } else {
    if (mistakeRepeat === false) {
      setMistakesCount(mistakesCount + 1)
      setMistakeRepeat(true)
      setHintText(currentWord)
      setIsHintShown(true)
    }
    return outputText
  }
}
