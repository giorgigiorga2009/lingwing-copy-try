import { FC } from 'react'
import style from './SoundCheck.module.scss'

const SoundCheck: FC = () => {
  return (
    <div className={style.container}>
      <div className={style.header}></div>
      <div className={style.checkContainer}>
        <div className={style.buttonContainer}>
          <div className={style.button} />
        </div>
        <div className={style.label}></div>
      </div>

      <div className={style.button}></div>
    </div>
  )
}
