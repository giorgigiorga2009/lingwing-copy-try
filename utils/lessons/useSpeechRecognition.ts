// hooks/useSpeechRecognitionLogic.js
import { useState, useEffect } from 'react'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'

export const useSpeechRec = () => {
  const [isRecording, setIsRecording] = useState(false)
  const { finalTranscript, resetTranscript } = useSpeechRecognition()

  const startRecognition = () => {
    SpeechRecognition.startListening({ continuous: true })
    setIsRecording(true)
    resetTranscript()
  }

  const stopRecognition = () => {
    SpeechRecognition.stopListening()
    setIsRecording(false)
  }

  const toggleRecognition = () => {
    isRecording ? stopRecognition() : startRecognition()
  }

  // const handleFinalTranscriptChange = (transcript) => {
  //   setFinalTranscript(transcript);
  //   // You can also process and set the output text here, using any utilities/functions
  //   // Example: setOutputText(processTranscript(transcript, textFromKeyboard));
  // }

  useEffect(() => {
    // Here, you might want to add an event listener to SpeechRecognition for changes in transcript
    // Alternatively, you might want to check for updates to `finalTranscript` within the component that uses this hook
    // For simplicity, I've added a handleFinalTranscriptChange function above that you can utilize

    return () => {
      // Cleanup listeners or other resources when the hook is no longer used
    }
  }, [])

  return {
    isRecording,
    finalTranscript,
    toggleRecognition,
  }
}
