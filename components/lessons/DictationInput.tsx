import { StringChain } from 'lodash'
import { FC, RefObject } from 'react'
import style from './DictationInput.module.scss'

interface Props {
  inputRef: RefObject<HTMLInputElement>
  outputText: string
  onKeyDown: (event: React.KeyboardEvent) => void
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFocus: (event: React.FocusEvent<HTMLElement>) => void
}

export const DictationInput: FC<Props> = ({
  inputRef,
  outputText,
  onKeyDown,
  onChange,
  onFocus,
}) => {
  return (
    <input
      ref={inputRef}
      className={style.input}
      type="text"
      value={outputText}
      placeholder="Type your answer"
      onKeyDown={onKeyDown}
      onChange={onChange}
      onFocus={onFocus}
      autoFocus
    />
  )
}
