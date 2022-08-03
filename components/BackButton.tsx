import { FC } from 'react'
import style from './BackButton.module.scss'

interface Props {
  onClick: () => void
}

export const BackButton: FC<Props> = ({ onClick }) => {
  return (
    <div className={style.backButton} onClick={onClick}>
      <span className={style.icon} />
      <span>back</span>
    </div>
  )
}
