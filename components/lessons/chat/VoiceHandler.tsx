import React, { FC, useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import style from '../VoiceRecognition.module.scss'


interface IVoiceHandlerProps {
    voiceHandler: (arg: string) => void;
    lang: string
}


const VoiceHandler: FC<IVoiceHandlerProps> = ({ voiceHandler, lang }) => {
    const {
        listening,
        interimTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    const [tempStr, setTempStr] = useState('');

    const voiceParams = { continuous: true, language: lang }

    useEffect(() => {

        if (interimTranscript.length > 0) {
            setTempStr(interimTranscript);
        } else {
            if (tempStr.length > 0) {

                voiceHandler(tempStr);
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
                    listening ? SpeechRecognition.stopListening() : SpeechRecognition.startListening(voiceParams)
                }}
            >
                {listening ? (
                    <div className={style.pulsatingCircle} />
                ) : (
                    <span className={style.micIcon} key="mic" />
                )}
            </button>

        </div>
    );
};

export default VoiceHandler;








/*
  TODO STRING :   i am a table ,  i like coffeee   -  i am happy for you -   btw i am a doctor - I am a doctor


  already inseterd : i am a table ,  i like coffeee 

  VOICE INPUT: I am a doctor
*/























