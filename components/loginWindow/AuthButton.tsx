import { FC } from 'react'
import style from './AuthButton.module.scss'

interface Props {
  title: string
  onClick: VoidFunction
}

export const AuthButton: FC<Props> = ({ title, onClick }) => {
  return (
    <button className={style.button} onClick={onClick}>
      {title}
    </button>
  )
}
