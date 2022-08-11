import { FC } from 'react'
import style from './Input.module.scss'

interface Props {
  type: 'email' | 'password'
  placeholder: string
}

export const Input: FC<Props> = ({ type, placeholder }) => {
  return <input className={style.input} type={type} placeholder={placeholder} />
}
