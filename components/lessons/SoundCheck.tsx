import classNames from 'classnames'
import { FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from '../../utils/useTranslation'
import style from './SoundCheck.module.scss'

export const SoundCheck: FC = () => {
  const [sound, setSound] = useState(false)
  const { t } = useTranslation()
  const [audio, setAudio] = useState<HTMLAudioElement>()
  useEffect(() => {
    setAudio(new Audio(`${process.env.defaultURL}/sounds/intro.mp3`))
  }, [])

  return (
    <div className={style.container}>
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

      <div className={style.startButtonContainer}>
        <div className={classNames(style.testDone, sound && style.slideIn)}>
          {t('hearSound')}
        </div>
        <div className={classNames(style.needTest, sound && style.slideOut)}>
          {t('startButton')}
        </div>
      </div>
    </div>
  )
}
