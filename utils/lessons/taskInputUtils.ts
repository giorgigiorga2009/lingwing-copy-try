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
  const isNextCharPunctuation = /[.,\/#!$%\^&\*;:{}=\-_`~()]/.test(
    correctText[index],
  )

  const isNextCharSpace = correctText[index] && /\s/.test(correctText[index])

  const isAfterNextCharSpace =
    correctText[index + 1] && /\s/.test(correctText[index + 1])

  let textToShow = correctText.slice(0, inputText ? inputText.length : 0)

  if (inputText.length === correctText.length - 1 && correctText.length > 1) {
    setIsHintShown(false)
    setMistakeRepeat(false)
    return correctText
  }

  if (isNextCharPunctuation && isAfterNextCharSpace) {
    if (inputText.endsWith(' ')) {
      setMistakeRepeat(false)
      setIsHintShown(false)
      textToShow += ' '
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

  if (isNextCharSpace) {
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

  if (isNextCharPunctuation && inputText.endsWith(' ')) {
    setMistakeRepeat(false)
    setIsHintShown(false)
    return textToShow
  }

  if (!isNextCharPunctuation && isTextEqual) {
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
