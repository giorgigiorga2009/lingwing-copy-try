import { FC } from 'react'
import style from './VoiceRecognition.module.scss'
import { useSpeechRec } from '@utils/lessons/useSpeechRecognition'

export const VoiceRecognition: FC = () => {
  const { isRecording, toggleRecognition } = useSpeechRec()

  return (
    <button className={style.microphoneIcon} onClick={() => toggleRecognition()}>
      {isRecording ? (
        <div className={style.pulsatingCircle} />
      ) : (
        <span className={style.micIcon} key="mic" />
      )}
    </button>
  )
}