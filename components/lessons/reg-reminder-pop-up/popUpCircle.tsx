import React from 'react'
import style from './popUpCircle.module.scss'
import { useTranslation } from '@utils/useTranslation'

interface PopUpCircleProps {
  imageClass: string
  title?: string
  titleClass?: string
  handleOpenLogin: () => void 
}

const PopUpCircle: React.FC<PopUpCircleProps> = ({
  imageClass,
  title,
  titleClass,
  handleOpenLogin,
}) => {
  const { t } = useTranslation()
  return (
    <button className={style.container} onClick={handleOpenLogin}>
      <div className={style.mainPart}>
        <div className={style[imageClass]}></div>
        {title && <p className={style[titleClass || '']}>{t(title)}</p>}
      </div>
      </button>
  )
}

export default PopUpCircle
