import React, { ChangeEvent } from 'react'
import InputFields from './Form'

type FormType = {
  type: string
  placeholder: string
  name: string
  value: string | number
  onchange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ type, placeholder, name, value, handleChange }: any) => {
  console.log(value, 'Csa')
  return (
    <div>
      <h1>InputContainer</h1>
      {type === 'input' && (
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={handleChange}
        />
      )}
      {type === 'textarea' && (
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={handleChange}
        />
      )}

    </div>
  )
}

export default Input
