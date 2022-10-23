import { FC } from 'react'
import style from './aboutPage.module.scss'
import { useTranslation } from '../../utils/useTranslation'
import { IMAGES_FOR_PARTNERS_PAGE } from '../../utils/const'

const Certificate: FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <h2 className={style.subTitle}>{t('APP_ABOUT_US__OUR_PARTNERS')}</h2>
      <div className={style.imageWrapper}>
        {IMAGES_FOR_PARTNERS_PAGE.map(image => (
          <div className={style.imageContainer}>
            <img className={style.imagePartner} src={image} />
          </div>
        ))}
      </div>
    </>
  )
}

export default Certificate
