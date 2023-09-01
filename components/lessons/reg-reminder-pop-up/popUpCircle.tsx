import React from 'react'
import style from './popUpCircle.module.scss'
import { useTranslation } from '@utils/useTranslation'
import Link from 'next/link'

interface PopUpCircleProps {
  imageClass: string
  title?: string
  titleClass?: string
}

const PopUpCircle: React.FC<PopUpCircleProps> = ({
  imageClass,
  title,
  titleClass,
}) => {
  const { t } = useTranslation()
  return (
    <div className={style.container}>
      <Link href={'/'}>
        <div className={style.mainPart}>
          <div className={style[imageClass]}></div>
          {title && <p className={style[titleClass || '']}>{t(title)}</p>}
        </div>
      </Link>
    </div>
  )
}

export default PopUpCircle
