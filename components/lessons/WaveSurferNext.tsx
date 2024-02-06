import WaveSurfer from 'wavesurfer.js'
import style from './WaveSurferNext.module.scss'
import React, { useState, useEffect, useRef, useCallback, FC } from 'react'
import { useVoiceActive } from '@utils/store'

const formWaveSurferOptions = (ref: HTMLElement) => ({
  container: '#' + ref.id,
  waveColor: '#eee',
  progressColor: '#B692E3',
  cursorColor: '#ffffff00',
  barWidth: 4,
  barRadius: 3,
  responsive: true,
  height: 15,
  normalize: true,
  partialRender: true,
  hideScrollbar: true,
})

interface WaveSurferNextProps {
  audioURL: string
}

const WaveSurferNext: FC<WaveSurferNextProps> = ({ audioURL }) => {
  const waveformRef = useRef<HTMLDivElement>(null)
  const wavesurfer = useRef<WaveSurfer | null>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const { isVoicePlaying, ToggleVoicePlaying } = useVoiceActive()

  const proxyURL = `/api/audioProxy?url=${encodeURIComponent(audioURL)}`

  const create = useCallback(() => {
    if (!wavesurfer.current) {
      const options = formWaveSurferOptions(waveformRef.current!)
      wavesurfer.current = WaveSurfer.create(options)
      wavesurfer.current.load(proxyURL)

      wavesurfer.current.on('audioprocess', () => {
        const currentTime = wavesurfer.current!.getCurrentTime()
        setProgress(currentTime)
      })

      wavesurfer.current.on('ready', () => {
        const length = wavesurfer.current!.getDuration()
        setDuration(length)
        setPlaying(true)
        ToggleVoicePlaying(true)
        wavesurfer.current!.play()
      })

      wavesurfer.current.on('finish', () => {
        setPlaying(false)
        ToggleVoicePlaying(false)
      })

      wavesurfer.current.on('error', message => {
        console.error('WaveSurfer error:', message)
      })
    }
  }, [proxyURL])

  useEffect(() => {
    create()
    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy()
        wavesurfer.current = null
      }
    }
  }, [create])

  const handlePlayPause = () => {
    setPlaying(!playing)
    ToggleVoicePlaying(!isVoicePlaying)
    wavesurfer.current!.playPause()
  }

  return (
    <div className={style.container}>
      <div>
        <button
          onClick={handlePlayPause}
          className={!playing ? style.playButton : style.pauseButton}
        />
      </div>
      <div className={style.waveform}>
        <div id="waveform" ref={waveformRef} />
      </div>
      <div className={style.progress}>{(duration - progress).toFixed(0)}</div>
    </div>
  )
}

export default WaveSurferNext
