import { FC } from 'react'
import dynamic from 'next/dynamic'
import classNames from 'classnames'
import { LevelsBubble } from './LevelsBubble'
import UserAvatar from '../../shared/UserAvatar'
import style from './TranslateBubble.module.scss'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

interface Props {
  utteranceType: 'taskDescription' | 'answer'
  taskText: string
  correctText: string
  isCurrentTask: boolean
  sentenceAudioPath?: string
  answers?: number[]
  mistake: number
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
  mistake,
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

  const audioUrl = `${publicRuntimeConfig.audioURL}${sentenceAudioPath}.mp3`

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

        {textType !== 'replay' ? (
          <>
            <div className={style[textType + 'Icon']} />
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
            {
              // answers &&
              utteranceType === 'taskDescription' && (
                <LevelsBubble mistake={mistake} />
              )
            }
          </>
        ) : (
          <span className={style.taskText}>
            {taskText.split(' ').map((word, index) => (
              <span key={word + '-' + index}>{word + ' '}</span>
            ))}
          </span>
        )}
      </div>
    </div>
  )
}
