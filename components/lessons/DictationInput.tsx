import { FC, RefObject } from 'react'
import style from './DictationInput.module.scss'

interface Props {
  inputRef: RefObject<HTMLTextAreaElement>
  outputText: string
  onKeyDown: (event: React.KeyboardEvent) => void
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
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
    <textarea
      ref={inputRef}
      className={style.input}
      autoComplete="off"
      spellCheck="false"
      data-gramm="false"
      value={outputText}
      placeholder="Type your answer"
      onKeyDown={onKeyDown}
      onChange={onChange}
      onFocus={onFocus}
      autoFocus
    />
  )
}
