import { FC, useEffect } from 'react'
import style from './VoiceRecognition.module.scss'
import { useSpeechRec } from '@utils/lessons/useSpeechRecognition'
import { useRecognitionActive, getVoiceRecognitionActive } from '@utils/store'
interface VoiceRecognitionProps {
  progress: string
}

export const VoiceRecognition: FC<VoiceRecognitionProps> = ({ progress }) => {
  const { isRecording, toggleRecognition } = useSpeechRec()

  const { isRecordingActive, ToggleRecordingActive } = useRecognitionActive(
    getVoiceRecognitionActive,
  )

  useEffect(() => {
    if (isRecordingActive) {
      progress === '0%' && toggleRecognition()
      progress === '100%' && toggleRecognition()
    }
  }, [progress])

  return (
    <button
      className={style.microphoneContainer}
      onClick={() => {
        ToggleRecordingActive(isRecordingActive)
        toggleRecognition()
      }}
    >
      {isRecording ? (
        <div className={style.pulsatingCircle} />
      ) : (
        <span className={style.micIcon} key="mic" />
      )}
    </button>
  )
}
