import { FC } from 'react'
import style from './AirplaneIcon.module.scss'

const AirplaneIcon: FC = () => {
  return (
    <div className={style.container}>
      <div className={style.icon_circle_transparent}>
        <div className={style.icon_circle}>
          <div className={style.icon_airplane}></div>
        </div>
      </div>
    </div>
  )
}

export default AirplaneIcon
