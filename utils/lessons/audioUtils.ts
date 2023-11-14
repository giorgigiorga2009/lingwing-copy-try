import { useState } from 'react'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig();

export const useAudio = () => {
  const [audios, setAudios] = useState<HTMLAudioElement[]>([])
  const [audioIndex, setAudioIndex] = useState<number>(0)

  const wordAudioPlay = (wordIndex: number) => {
    if (audios.length > 0) {
      const currentAudio = audios[wordIndex - 1]
      if (currentAudio) {
        currentAudio.play()
      }
    }
  }

  const Play = (audioUrl: string) => {
    const audio = new Audio(`${publicRuntimeConfig.audioURL}${audioUrl}.mp3`)
    audio.play()
  }

  const addAudio = (audioUrl: string) => {
    if (audioUrl === 'undefined/undefined') return
    const newAudio = new Audio(`${publicRuntimeConfig.audioURL}${audioUrl}.mp3`)
    newAudio.onended = () => {
      setAudioIndex(prevIndex => prevIndex + 1)
    }
    setAudios(prevAudios => [...prevAudios, newAudio])
  }

  return {
    audios,
    audioIndex,
    setAudios,
    wordAudioPlay,
    Play,
    addAudio,
  }
}
