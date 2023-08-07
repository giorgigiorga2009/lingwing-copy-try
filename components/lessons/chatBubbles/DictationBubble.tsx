import { FC } from 'react'
import dynamic from 'next/dynamic'
import classNames from 'classnames'
import style from './DictationBubble.module.scss'

const WaveSurferNext = dynamic(() => import('../WaveSurferNext'), {
  ssr: false,
})

interface Props {
  type: 'taskDescription' | 'answer'
  taskText: string
  correctText: string
  sentenceAudioPath?: string
  isCurrentTask: boolean
}

export const DictationBubble: FC<Props> = ({
  taskText,
  correctText,
  sentenceAudioPath,
  type,
  isCurrentTask,
}) => {
  const audioUrl = `https://cdn.lingwing.com${sentenceAudioPath}.mp3`

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
        style[type],
        style[`${isCurrentTask}`],
      )}
    >
      <div className={style.content}>
        <span className={style.correctText}>{correctText}</span>
        {isCurrentTask && (
          <span className={style.waveform}>
            <WaveSurferNext audioURL={audioUrl} />
          </span>
        )}
        <span
          className={style.taskText}
          dangerouslySetInnerHTML={{ __html: taskText }}
        ></span>
      </div>
    </div>
  )
}
