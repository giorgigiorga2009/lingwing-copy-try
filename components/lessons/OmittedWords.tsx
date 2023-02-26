import React, { FC, useEffect, useRef, useState } from 'react'
import style from './OmittedWords.module.scss'

interface Props {
  setCorrect: (bool: boolean) => void
  sentenceArray: string[]
}

export const OmittedWords: FC<Props> = ({ sentenceArray, setCorrect }) => {
  const [words, setWords] = useState([''])
  const inputRefs = useRef<HTMLInputElement[]>([])

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const inputValue = event.target.value
    const newWords = [...words]
    const missingWord = sentenceArray[index].slice(1, -1)

    if (
      inputValue.toLowerCase() ===
      missingWord.substring(0, inputValue.length).toLowerCase()
    ) {
      newWords[index] = missingWord.substring(0, inputValue.length)
      setWords(newWords)

      const nextInputRef = inputRefs.current
        .slice(index + 1)
        .find(element => element !== undefined)

      if (inputValue.length === missingWord.length && nextInputRef) {
        nextInputRef.focus()
      }
    }
  }

  const handleOnKeyDown = (event: React.KeyboardEvent) => {
    // if (
    //   event.key === 'Space' &&
    //   inputRef.current &&
    //   inputRef.current.value.endsWith(' ')
    // ) {
    //   event.preventDefault()
    //   return
    // }

    if (
      event.key === 'Space' &&
      inputRefs.current?.[inputRefs.current.length - 1]?.value.endsWith(' ')
    ) {
      event.preventDefault()
      return
    }

    if (event.key === 'Enter') {
      event.preventDefault()
    }

    if (event.key === 'Backspace' || event.key === 'Delete') {
      event.preventDefault()
      setCorrect(true)
    } else {
      setCorrect(false)
    }
  }

  useEffect(() => {
    inputRefs.current.find(element => element !== undefined)?.focus()
  }, [])

  return (
    <div className={style.container}>
      <div className={style.mistakes}> 0 </div>
      <div className={style.inputContainer}>
        {sentenceArray.map((word, index) => {
          if (word.startsWith('[')) {
            const currentValue = words[index]

            return (
              <input
                className={style.input}
                key={index}
                value={currentValue !== undefined ? currentValue : ''}
                onChange={event => handleChange(event, index)}
                onKeyDown={event => handleOnKeyDown(event)}
                ref={el => (inputRefs.current[index] = el!)}
              />
            )
          } else {
            return <span key={index}>{word} </span>
          }
        })}
      </div>
    </div>
  )
}
