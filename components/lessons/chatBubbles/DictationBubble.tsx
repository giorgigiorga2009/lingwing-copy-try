import { is } from '@react-spring/shared'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { FC, useEffect, useRef, useState } from 'react'
import style from './DictationBubble.module.scss'

const WaveSurferNext = dynamic(() => import('../WaveSurferNext'), {
  ssr: false,
})

interface Props {
  type: 'taskDescription' | 'answer'
  taskDescription: string
  taskText: string
  correctText: string
  sentenceAudioPath?: string
  isCurrentTask: boolean
  isHintShown: boolean
}

export const DictationBubble: FC<Props> = ({
  taskDescription,
  taskText,
  correctText,
  sentenceAudioPath,
  type,
  isCurrentTask,
  isHintShown,
}) => {
  const audioUrl = `https://cdn.lingwing.com${sentenceAudioPath}.mp3`

  return (
    <div
      className={classNames(
        style.container,
        style[type],
        style[`${isCurrentTask}`],
      )}
    >
      <div className={style.header}>{taskDescription}</div>
      <div className={style.content}>
        <span className={style.correctText}>{correctText}</span>
        {isCurrentTask && (
          <span className={style.waveform}>
            <WaveSurferNext audioURL={audioUrl}  />
          </span>
        )}
        <span className={style.taskText}>{taskText} </span>
      </div>
    </div>
  )
}
