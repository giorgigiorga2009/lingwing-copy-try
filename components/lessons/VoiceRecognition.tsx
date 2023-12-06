import { FC } from 'react'
import style from './VoiceRecognition.module.scss'
import { useSpeechRec } from '@utils/lessons/useSpeechRecognition'

export const VoiceRecognition: FC = () => {
  const { isRecording, transcript, toggleRecognition } = useSpeechRec()

  return (
    <>
      <button className={style.microphoneContainer} onClick={toggleRecognition}>
        {isRecording ? (
          <div className={style.pulsatingCircle} />
        ) : (
          <span className={style.micIcon} key="mic" />
        )}
      </button>
      <p>{transcript}</p>
    </>
  )
}
