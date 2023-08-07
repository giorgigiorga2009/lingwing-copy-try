import { FC } from 'react'
import style from './Hint.module.scss'

interface Props {
  isHintShown: boolean
  hintText: string
}

export const Hint: FC<Props> = ({ isHintShown, hintText }) => {
  return (
    <div className={isHintShown ? style.hint : style.hidden}>
      Hint: <span className={style.hintText}>{hintText}</span>
    </div>
  )
}
