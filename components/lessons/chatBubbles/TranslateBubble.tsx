import { FC } from 'react'
import classNames from 'classnames'
import style from './TranslateBubble.module.scss'
import UserAvatar from '@components/shared/UserAvatar'

interface Props {
  utteranceType: 'taskDescription' | 'answer'
  taskText: string
  correctText: string
  isCurrentTask: boolean
  textType:
    | 'dictation'
    | 'translate'
    | 'dialog'
    | 'omittedwords'
    | 'replay'
    | 'mistakecorrection'
    | 'grammar'
}

export const TranslateBubble: FC<Props> = ({
  taskText,
  correctText,
  utteranceType,
  isCurrentTask,
  textType,
}) => {
  taskText = taskText
    .replaceAll('(FR)', '🤗')
    .replaceAll('(SH)', '✂️')
    .replaceAll('(F)', '👧')
    .replaceAll('(M)', '👦')
    .replaceAll(/\((.*?)\)/g, '<span>($1)</span>')

  return (
    <div
      className={classNames(
        style.container,
        style[utteranceType],
        style[textType],
        style[`${isCurrentTask}`],
      )}
    >
      <div className={style.content}>
        {/* <UserAvatar /> */}
        <span className={style.correctText}>{correctText}</span>

        {textType !== 'replay' ? (
          <>
            <div className={style[textType + 'Icon']} />
            <span
              className={style.taskText}
              dangerouslySetInnerHTML={{ __html: taskText }}
            ></span>
          </>
        ) : (
          <span className={style.taskText}>
            {taskText.split(' ').map(word => (
              <span key={word}>{word + ' '}</span>
            ))}
          </span>
        )}
      </div>
    </div>
  )
}
