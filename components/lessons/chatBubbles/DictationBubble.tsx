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
  sentenceAudioPath: string
  currentTask: boolean
  isHintShown: boolean
}

export const DictationBubble: FC<Props> = ({
  taskDescription,
  taskText,
  correctText,
  sentenceAudioPath,
  type,
  currentTask,
  isHintShown,
}) => {
  const audioUrl = `https://cdn.lingwing.com${sentenceAudioPath}.mp3`
  // console.log(audioUrl, 'sentenceAudioPath')
  const audioRef = useRef(null)

  // useEffect(() => {
  //   audioRef.current !== null && audioRef.current.play()
  // }, [])

  return (
    <div
      className={classNames(
        style.container,
        style[type],
        style[`${currentTask}`],
        { [style.hint]: isHintShown && currentTask },
      )}
    >
      <div className={style.header}>{taskDescription}</div>
      <div className={style.content}>
        <span className={style.correctText}>{correctText}</span>
        {currentTask && (
          <span className={style.waveform}>
            <WaveSurferNext audioURL={audioUrl} />
            <audio src={audioUrl} ref={audioRef} controls></audio>
          </span>
        )}
        <span className={style.taskText}>{taskText} </span>
      </div>
    </div>
  )
}