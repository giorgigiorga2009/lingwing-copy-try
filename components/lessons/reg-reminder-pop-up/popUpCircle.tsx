import React from 'react'
import style from './popUpCircle.module.scss'
import { useTranslation } from '@utils/useTranslation'

interface PopUpCircleProps {
  isRegReminder: boolean
  imageClass: string
  title?: string
  titleClass?: string
  handleOpenLogin: () => void 
}

const PopUpCircle: React.FC<PopUpCircleProps> = ({
  isRegReminder,
  imageClass,
  title,
  titleClass,
  handleOpenLogin,
}) => {
  const { t } = useTranslation()
  return (
    <button className={style.container} onClick={handleOpenLogin}>
      <div className={style.mainPart}>
       {isRegReminder ? <div className={style[imageClass]}></div>: 
          <div className={style[imageClass + 'AfterPayment']}></div>
       }
        {title && <p className={style[titleClass || '']}>{t(title)}</p>}
      </div>
      </button>
  )
}

export default PopUpCircle
