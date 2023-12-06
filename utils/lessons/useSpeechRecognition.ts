import { useState, useEffect } from 'react'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'

export const useSpeechRec = () => {
  const [isRecording, setIsRecording] = useState(false)
  const { transcript, resetTranscript } = useSpeechRecognition()
  // const { transcript } = useSpeechRecognition()

  // const startRecognition = () => {
  //   resetTranscript()
  //   SpeechRecognition.startListening({ continuous: true })
  //   setIsRecording(true)
  //   // console.log(transcript)
  //   console.log('ki iyo')
  // }

  // const stopRecognition = () => {
  //   // SpeechRecognition.abortListening()
  //   setIsRecording(false)
  //   SpeechRecognition.stopListening()
  // }

  // const toggleRecognition = () => {
  //   isRecording ? stopRecognition() : startRecognition()
  // }
  useEffect(() => {
    if (isRecording) {
      SpeechRecognition.startListening({ continuous: true });
    } else {
      SpeechRecognition.stopListening();
    }
  }, [isRecording]);

  const toggleRecognition = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      resetTranscript();
      setIsRecording(true);
    }
  };

  // const handleFinalTranscriptChange = (transcript) => {
  //   setFinalTranscript(transcript);
  //   // You can also process and set the output text here, using any utilities/functions
  //   // Example: setOutputText(processTranscript(transcript, textFromKeyboard));
  // }

  // useEffect(() => {
  //   // Logic to execute when isRecording changes
  //   if (isRecording) {
  //     resetTranscript()
  //     SpeechRecognition.startListening({ continuous: true })
  //   } else {
  //     SpeechRecognition.stopListening()
  //   }
  // }, [isRecording])

  // useEffect(() => {
  //   // Here, you might want to add an event listener to SpeechRecognition for changes in transcript
  //   // Alternatively, you might want to check for updates to `finalTranscript` within the component that uses this hook
  //   // For simplicity, I've added a handleFinalTranscriptChange function above that you can utilize

  //   return () => {
  //     // Cleanup listeners or other resources when the hook is no longer used
  //   }
  // }, [])

  return {
    isRecording,
    transcript,
    toggleRecognition,
  }
}
