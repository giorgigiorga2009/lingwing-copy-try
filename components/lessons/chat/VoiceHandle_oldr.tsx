import { useSpeechRec } from '@utils/lessons/useSpeechRecognition'
import { getVoiceRecognition, getVoiceRecognitionActive, useRecognitionActive, useTaskStore, useVoiceActive, useVoiceRecognition } from '@utils/store'
import React, { useEffect } from 'react'
import { useSpeechRecognition } from 'react-speech-recognition'


const VoiceHandler: React.FC<any> = ({ task, voiceHandler }) => {

    const { transcript, resetTranscript } = useSpeechRecognition()

    const { isRecordingActive } = useRecognitionActive(
        getVoiceRecognitionActive
    )

    const { isVoicePlaying, ToggleVoicePlaying } = useVoiceActive()


    useEffect(() => {

        if (!isRecordingActive && transcript.trim() !== '') {

            if (transcript.split(' ').length > 1) {

                transcript.split(' ').forEach(item => {
                    voiceHandler(item);

                })
            } else {
                voiceHandler(transcript);

            }

            ToggleVoicePlaying(isVoicePlaying)
            resetTranscript();
        }
    }, [transcript, isRecordingActive])

    return (
        <div>
            <h1> {transcript} </h1>
        </div>
    )
}

export default VoiceHandler
