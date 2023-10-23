import React, { useState, useEffect } from 'react'
import style from './profileInput.module.scss'

interface Props {
  required?: boolean
  name: string
  type: string
  text: string
  onFocus: () => void
  onBlur: () => void
  focused: boolean
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ProfileInput: React.FC<Props> = ({
  required,
  name,
  type,
  text,
  onFocus,
  onBlur,
  focused,
  value = '',
}) => {
  const [inputValue, setInputValue] = useState<string>(value)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  return (
    <div className={style.container}>
      <label
        htmlFor={name}
        className={`${focused || inputValue ? style.labelTop : ''}`}
      >
        {text}
      </label>
      <input
        name={name}
        onFocus={onFocus}
        onBlur={onBlur}
        type={type}
        onChange={handleInputChange}
        value={inputValue}
        required={required}
      />
    </div>
  )
}

export default ProfileInput
