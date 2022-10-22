import classNames from 'classnames'
import { FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from '../../utils/useTranslation'
import style from './SoundCheck.module.scss'

// const audio = new Audio(`${process.env.defaultURL}/sounds/intro.mp3`)
// audio.src = "https://lingwing.com/sounds/intro.mp3?1666470484334"

export const SoundCheck: FC = () => {
  const [state, setState] = useState(true)
  const { t } = useTranslation()
  // const [audio] = useState(new Audio("https://lingwing.com/sounds/intro.mp3"));

  return (
    <div className={style.container}>
      <div className={style.header}>{t('makeSureHear')}</div>
      <div className={style.checkContainer}>
        <div className={style.buttonContainer}>
          <div
            className={style.soundButton}
            onClick={() => {
              setState(false)
            }}
          />
        </div>
        <div className={style.label}> {t('checkSound')} </div>
      </div>

      <div className={style.startButtonContainer}>
        <div
          className={
            state ? style.testDone : classNames(style.testDone, style.slideIn)
          }
        >
          {' '}
          {t('hearSound')}{' '}
        </div>
        <div
          className={
            state ? style.needTest : classNames(style.needTest, style.slideOut)
          }
        >
          {t('startButton')}
        </div>
      </div>
    </div>
  )
}
