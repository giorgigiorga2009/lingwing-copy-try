import classNames from 'classnames'
import { FC } from 'react'
import style from './Message.module.scss'

interface Props {
  variant: 'question' | 'answer'
  position?: 'left' | 'center' | 'right'
}

export const Message: FC<Props> = ({ variant, position = 'left' }) => {
  return (
    <div
      className={classNames(style.container, style[variant], style[position])}
    >
      <div className={style.header}>
        <div className={style.answerCaption}>Your answer</div>
        <div className={style.questionCaption}>Question</div>
        <div className={style.dots}> * * *</div>
      </div>
      <div className={style.content}>
        <span className={style.translation}> Translation of the text</span>
        <span className={style.originalText}>Original text to translate </span>
      </div>
      <div className={style.hint}>
        <span className={style.label}>Hint:</span>
        <span className={style.hintText}>
          This span will help u in difficult times.
        </span>
        <div className={style.soundIcon} />
      </div>
    </div>
  )
}
