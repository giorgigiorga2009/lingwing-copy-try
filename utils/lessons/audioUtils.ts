import { useState } from 'react'

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

  const audioPlay = (audioUrl: string) => {
    const audio = new Audio(`${process.env.audioURL}${audioUrl}`)
    audio.play()
  }

  const addWordAudio = (audioUrl: string) => {
    const newAudio = new Audio(audioUrl)
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
    audioPlay,
    addWordAudio,
  }
}
