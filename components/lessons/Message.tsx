import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { FC, useEffect, useState } from 'react'
import { getTask, InitialTasksData } from '../../utils/lessons/getTask'
import style from './Message.module.scss'

const WaveSurferNext = dynamic(() => import('./WaveSurferNext'), {
  ssr: false,
})
interface Props {
  variant: 'question' | 'message'
  type: 'dictation' | 'translate'
  position?: 'left' | 'right'
  taskDescription: string
  taskText: string
  correctText: string
  sentenceAudio: {
    filePath: string
    fileName: string
  }
}

export const Message: FC<Props> = ({
  type,
  variant,
  position = 'left',
  taskDescription,
  taskText,
  correctText,
  sentenceAudio,
}) => {
  // const audioUrl = `https://cdn.lingwing.com${sentenceAudio.filePath}/${sentenceAudio.fileName}.mp3`
  // const audioUrl = 'https://cdn.lingwing.com/audios/3/3522/10020383.mp3?1674661069946'

  return (
    <div
      className={classNames(
        style.container,
        style[type],
        style[variant],
        style[position],
      )}
    >
      <div className={style.header}>{taskDescription}</div>
      <div className={style.content}>
        <span className={style.originalText}>{correctText}</span>
        <span className={style.translation}>{taskText} </span>
        <span className={style.waveform}>
          <WaveSurferNext audioURL="https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3" />
          {/* <WaveSurferNext audioURL={audioUrl} /> */}
        </span>
      </div>
      <div className={style.hint}>
        <span className={style.label}>Hint:</span>
        <span className={style.hintText}>sono</span>
        <div className={style.soundIcon} />
      </div>
    </div>
  )
}
