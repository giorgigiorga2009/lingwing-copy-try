import classNames from 'classnames'
import { FC, useState } from 'react'
import style from './SoundCheck.module.scss'

export const SoundCheck: FC = () => {
  const [startAnimation, setStartAnimation] = useState(false)
  return (
    <div className={style.container}>
      <div className={style.header}>
        Make sure you hear the sound from your computer
      </div>
      <div className={style.checkContainer}>
        <div className={style.buttonContainer}>
          <div
            className={style.soundButton}
            onClick={() => setStartAnimation(!startAnimation)}
          />
        </div>
        <div className={style.label}>Check the sound</div>
      </div>

      <div
        className={!startAnimation ? style.startButtonContainer : style.active}
      >
        <div className={style.inActive}></div>
        <div className={style.active}></div>
      </div>
    </div>
  )
}
