import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import style from '../VoiceRecognition.module.scss'

const VoiceHandler = ({ voiceHandler }) => {
    const {
        transcript,
        listening,
        resetTranscript,
        finalTranscript,
        interimTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    const [lastSentences, setLastSentences] = useState([]);
    const [holdStr, setHoldStr] = useState('');
    const [tempStr, setTempStr] = useState('');
    // Effect to start listening on mount
    //   useEffect(() => {
    //     SpeechRecognition.startListening({ continuous: true });
    //   }, [SpeechRecognition.startListening]);

    // Effect to capture the last sentence based on finalTranscript updates
    useEffect(() => {
        // if (finalTranscript) {
        //   setLastSentences((prev) => [...prev, finalTranscript]);
        // }

        if (interimTranscript.length > 0) {
            setTempStr(interimTranscript);
        } else {


            if (tempStr.length > 0) {

                voiceHandler(tempStr);
                // resetTranscript()
                // const updatedArr = [...lastSentences];
                // updatedArr.push(tempStr);
                // setLastSentences(updatedArr)
            }
            setTempStr('');
        }

    }, [interimTranscript]);



    if (!browserSupportsSpeechRecognition) {
        return <p>Browser does not support speech recognition.</p>;
    }

    return (
        <div>
            <button
                className={style.microphoneContainer}
                onClick={() => {
                    listening ? SpeechRecognition.stopListening() : SpeechRecognition.startListening({ continuous: true })
                }}
                >
                {listening ? (
                    <div className={style.pulsatingCircle} />
                ) : (
                    <span className={style.micIcon} key="mic" />
                )}
            </button>
            {/* <p>Listening: {listening ? 'Yes' : 'No'}</p> */}
            {/* <button onClick={resetTranscript}>Reset</button> */}
            {/* <button onClick={() => SpeechRecognition.startListening({ continuous: true })}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button> */}
        </div>
    );
};

export default VoiceHandler;








/*
  TODO STRING :   i am a table ,  i like coffeee   -  i am happy for you -   btw i am a doctor - I am a doctor


  already inseterd : i am a table ,  i like coffeee 

  VOICE INPUT: I am a doctor
*/























