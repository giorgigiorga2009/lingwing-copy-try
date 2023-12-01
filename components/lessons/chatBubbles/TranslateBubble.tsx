import { FC } from 'react'
import dynamic from 'next/dynamic'
import classNames from 'classnames'
import { LevelsBubble } from './LevelsBubble'
import UserAvatar from '../../shared/UserAvatar'
import style from './TranslateBubble.module.scss'

interface Props {
  utteranceType: 'taskDescription' | 'answer'
  taskText: string
  correctText: string
  isCurrentTask: boolean
  sentenceAudioPath?: string
  answers?: number[]
  mistakesByLevel: number[]
  textType:
    | 'dictation'
    | 'translate'
    | 'dialog'
    | 'omittedwords'
    | 'replay'
    | 'mistakecorrection'
    | 'grammar'
}

const WaveSurferNext = dynamic(() => import('../WaveSurferNext'), {
  ssr: false,
})

export const TranslateBubble: FC<Props> = ({
  taskText,
  correctText,
  utteranceType,
  isCurrentTask,
  sentenceAudioPath,
  textType,
  mistakesByLevel,
  // answers,
}) => {
  if (typeof taskText === 'string') {
    taskText = taskText
      .replaceAll('(FR)', '🤗')
      .replaceAll('(SH)', '✂️')
      .replaceAll('(F)', '👧')
      .replaceAll('(M)', '👦')
      .replaceAll('(M/F)', '👦👧')
      .replaceAll(/\((.*?)\)/g, '<span>($1)</span>')
  } else {
    console.error('taskText is not a string:', taskText)
  }

  const audioUrl = `${
    process.env.NEXT_PUBLIC_AUDIO_URL || process.env.AUDIO_URL
  }${sentenceAudioPath}.mp3`

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
        <div className={style.avatar}>
          <UserAvatar />
        </div>

        <span className={style.correctText}>{correctText}</span>

        <div className={style[textType + 'Icon']} />
        {textType !== 'replay' ? (
          <>
            {isCurrentTask && textType === 'dictation' ? (
              <span className={style.waveform}>
                <WaveSurferNext audioURL={audioUrl} />
              </span>
            ) : (
              <span
                className={style.taskText}
                dangerouslySetInnerHTML={{ __html: taskText }}
              ></span>
            )}
          </>
        ) : (
          <span className={style.taskText}>
            {taskText.split(' ').map((word, index) => (
              <span key={word + '-' + index}>{word + ' '}</span>
            ))}
          </span>
        )}
        {utteranceType === 'taskDescription' && (
          <LevelsBubble mistakesByLevel={mistakesByLevel} />
        )}
      </div>
    </div>
  )
}
