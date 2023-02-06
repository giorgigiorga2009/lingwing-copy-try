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
    const synonyms = [modifiedWord, ...wordsSynonyms[index]]
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
