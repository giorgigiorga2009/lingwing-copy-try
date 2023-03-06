import { is } from '@react-spring/shared'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { FC, useEffect, useState } from 'react'
import style from './DictationBubble.module.scss'

const WaveSurferNext = dynamic(() => import('../WaveSurferNext'), {
  ssr: false,
})
interface Props {
  type: 'taskDescription' | 'answer'
  taskDescription: string
  taskText: string
  correctText: string
  sentenceAudioPath: string
  currentTask: boolean
}

export const DictationBubble: FC<Props> = ({
  taskDescription,
  taskText,
  correctText,
  sentenceAudioPath,
  type,
  currentTask,
}) => {
  const audioUrl = `https://cdn.lingwing.com${sentenceAudioPath}.mp3`
  console.log(sentenceAudioPath, 'sentenceAudioPath')

  return (
    <div
      className={classNames(
        style.container,
        style[type],
        style[`${currentTask}`],
      )}
    >
      <div className={style.header}>{taskDescription}</div>
      <div className={style.content}>
        <span className={style.correctText}>{correctText}</span>
        <span className={style.waveform}>
          <WaveSurferNext audioURL={audioUrl} />
        </span>
        <span className={style.taskText}>{taskText} </span>
      </div>
      {/* <div className={style.hint}>
        <span className={style.label}>Hint:</span>
        <span className={style.hintText}>sono</span>
        <div className={style.soundIcon} />
      </div> */}
    </div>
  )
}
