import classNames from 'classnames'
import { FC } from 'react'
import style from './Message.module.scss'

interface Props {
  variant: 'question' | 'answer'
}

export const Message: FC<Props> = ({ variant }) => {
  return (
    <div className={classNames(style.container, style[variant])}>
      <div className={style.header}>
        <div className={style.caption}>Your answer</div>
        <div className={style.dots}> * * *</div>
      </div>
      <div className={style.content}>
        <span className={style.originalText}>Original text to translate </span>
        <span className={style.translation}> Translation of the text</span>
        <span className={style.soundIcon} />
      </div>
      <div className={style.hint}>
        <span className={style.label}>Hint:</span>
        <span className={style.hintText}>
          This span will help u in difficult times.
        </span>
        <div className={style.soundIcon}>ICO</div>
      </div>
    </div>
  )
}
