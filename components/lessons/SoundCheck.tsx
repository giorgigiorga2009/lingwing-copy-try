import classnames from 'classnames'
import { FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from '@utils/useTranslation'
import style from './SoundCheck.module.scss'

interface Props {
  setSoundChecked: (bool: boolean) => void
  soundChecked: boolean
}

export const SoundCheck: FC<Props> = ({ setSoundChecked, soundChecked }) => {
  const [sound, setSound] = useState(false)
  const { t } = useTranslation()
  const [audio, setAudio] = useState<HTMLAudioElement>()

  useEffect(() => {
    setAudio(new Audio(`https://lingwing.com/sounds/intro.mp3`))
  }, [])

  return (
    <div className={classnames(style.container, style[`${soundChecked}`])}>
      <div className={style.header}>{t('makeSureHear')}</div>
      <div className={style.checkContainer}>
        <div className={style.buttonContainer}>
          <div
            className={style.soundButton}
            onClick={() => {
              audio?.play()
              setSound(true)
            }}
          />
        </div>
        <div className={style.label}> {t('checkSound')} </div>
      </div>

      <div
        className={style.startButtonContainer}
        onClick={() => setSoundChecked(true)}
      >
        <div className={classnames(style.testDone, sound && style.slideIn)}>
          {t('hearSound')}
        </div>
        <div className={classnames(style.needTest, sound && style.slideOut)}>
          {t('startButton')}
        </div>
      </div>
    </div>
  )
}
