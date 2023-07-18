import classnames from 'classnames'
import { FC, useEffect, useState } from 'react'
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
          <button
            className={style.soundButton}
            onClick={() => {
              audio?.play()
              setSound(true)
            }}
          />
        </div>
        <div className={style.label}> {t('checkSound')} </div>
      </div>
      <button
        className={classnames(style.startButton, sound && style.slideOut)}
        onClick={() => setSoundChecked(true)}
      >
        {sound ? t('hearSound') : t('startButton')}
      </button>
    </div>
  )
}
