import React, { useState, useEffect, useRef, FC, MutableRefObject } from 'react'
import style from './WaveSurferNext.module.scss'
import WaveSurfer from 'wavesurfer.js'

const formWaveSurferOptions = (ref: string) => ({
  container: ref,
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

interface Props {
  audioURL: string
}

const WaveSurferNext: FC<Props> = ({ audioURL }) => {
  const waveformRef = useRef(null)
  const wavesurfer = useRef<null | WaveSurfer>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  wavesurfer.current &&
    wavesurfer.current.on('finish', function () {
      setPlaying(false)
    })

  const create = () => {
    const options = formWaveSurferOptions(waveformRef.current)

    wavesurfer.current = WaveSurfer.create(options)
    console.log(audioURL)
    wavesurfer.current.load(audioURL)

    wavesurfer.current.on('audioprocess', function () {
      const currentTime = wavesurfer.current.getCurrentTime()
      setProgress(currentTime)
    })

    audioDuration()
  }

  useEffect(() => {
    create()

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy()
      }
    }
  }, [])

  const handlePlayPause = () => {
    setPlaying(!playing)
    wavesurfer.current !== null && wavesurfer.current.playPause()
  }

  const audioDuration = () => {
    wavesurfer.current.on('ready', function () {
      const length = wavesurfer.current?.getDuration()
      length && setDuration(length)
    })
  }

  return (
    <div className={style.container}>
      <div>
        <div
          onClick={handlePlayPause}
          className={!playing ? style.playButton : style.pauseButton}
        />
      </div>
      <div className={style.waveform}>
        {' '}
        <div id="waveform" ref={waveformRef} />{' '}
      </div>
      <div className={style.progress}>{(duration - progress).toFixed(2)}</div>
    </div>
  )
}

export default WaveSurferNext
