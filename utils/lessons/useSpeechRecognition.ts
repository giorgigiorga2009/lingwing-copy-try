import { useState, useEffect } from 'react'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
import {
  useVoiceRecognition,
  getVoiceRecognition,
  useRecognitionActive,
  getVoiceRecognitionActive,
} from '@utils/store'

export const useSpeechRec = () => {
  const [isRecording, setIsRecording] = useState(false)
  const { transcript, resetTranscript } = useSpeechRecognition()
  const { SetTranscript } = useVoiceRecognition(getVoiceRecognition)
  const { isRecordingActive } = useRecognitionActive(getVoiceRecognitionActive)

  useEffect(() => {
    if (isRecordingActive) {
      isRecording
        ? SpeechRecognition.startListening({ continuous: true })
        : SpeechRecognition.stopListening()
    } else {
      SpeechRecognition.stopListening()
    }
  }, [isRecording, isRecordingActive])

  const toggleRecognition = () => {
    if (isRecording) {
      setIsRecording(false)
    } else {
      resetTranscript()
      setIsRecording(true)
    }
  }

  useEffect(() => {
    SetTranscript(transcript)
  }, [transcript])

  return {
    isRecordingActive,
    isRecording,
    transcript,
    toggleRecognition,
  }
}
