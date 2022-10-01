import { FC } from 'react'
import style from '../../pages/aboutCompany.module.scss'
import { useTranslation } from '../../utils/useTranslation'

const Certificate: FC = () => {
  const { t } = useTranslation()

  const images = [
    '../themes/images/partners/beka.png',
    '../themes/images/partners/gau.png',
    '../themes/images/partners/liberty.png',
    '../themes/images/partners/magti.jpg',
    '../themes/images/partners/GITA.png',
    '../themes/images/partners/BankOfGergia.png',
    '../themes/images/partners/BTU-GEO.png',
    '../themes/images/partners/TSU.svg.png',
    '../themes/images/partners/terabank.png',
    '../themes/images/partners/TBC.svg.png',
    '../themes/images/partners/Sulkhan-saba.png',
  ]

  return (
    <>
      <h2 className={style.subTitle}>{t('APP_ABOUT_US__OUR_PARTNERS')}</h2>
      <div className={style.imageWrapper}>
        {images.map(image => (
          <div className={style.imageContainer}>
            <img className={style.imagePartner} src={image} />
          </div>
        ))}
      </div>
    </>
  )
}

export default Certificate
