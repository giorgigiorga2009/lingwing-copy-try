import { FC, useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'

const formWaveSurferOptions = () => ({
  container: document.querySelector('#waveform'),
  waveColor: '#eee',
  progressColor: '#0178FF',
  cursorColor: 'OrangeRed',
  barWidth: 4,
  barRadius: 3,
  responsive: true,
  height: 15,
  normalize: true,
  partialRender: true,
})

interface Props {
  audioUrl: string
}

const AudioPlayer: FC<Props> = ({ audioUrl }) => {
  const [playing, setPlaying] = useState(false)

  const waveformRef = useRef<HTMLDivElement>(null)
  let wavesurfer: WaveSurfer | null = null
  useEffect(() => {
    const options = formWaveSurferOptions()
    wavesurfer = new WaveSurfer(options)

    wavesurfer.load(audioUrl)

    return () => {
      wavesurfer?.destroy()
      wavesurfer = null
    }
  }, [])

  const handlePlayPause = () => {
    setPlaying(!playing)
    wavesurfer.current.playPause()
  }

  return (
    <div>
      <div id="waveform" ref={waveformRef}></div>
      <div onClick={handlePlayPause}>{!playing ? 'Play' : 'Pause'}</div>
    </div>
  )
}
export default AudioPlayer
