import { FC, useState, useEffect } from 'react'
import { useTranslation } from '../../utils/useTranslation'
import style from './PromoSlider.module.scss'
import classNames from 'classnames'

const PromoSlider: FC = () => {
  const { t } = useTranslation()

  const [activeIndex, setActiveIndex] = useState<number>(0)
  const sliderLength = 3

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prevIndex =>
        prevIndex === sliderLength - 1 ? 0 : prevIndex + 1,
      )
    }, 7000)
    return () => clearInterval(interval)
  })

  return (
    <div className={style.promo_slider}>
      {/* slide 1 */}
      <div
        className={classNames(
          style.slide,
          activeIndex === 0 ? style.slide_active : '',
        )}
      >
        <h6>{t('APP_DASHBOARD_BANNER1_TEXT')}</h6>
        <button>Get Tasks</button>
        <div className={style.parrot}></div>
        <div className={style.add_friends}></div>
      </div>

      {/* slide 2 */}
      <div
        className={classNames(
          style.slide,
          activeIndex === 1 ? style.slide_active : '',
        )}
      >
        <h6>
          Learn <span>5 times</span> faster!
        </h6>

        <button>
          <img
            src={'/themes/images/v2/banner-link-star.png'}
            alt="Premium star icon"
          />
          Become premium
        </button>
        <div className={style.parrot}></div>
        <div className={style.premium}></div>
      </div>

      {/* slide 3 */}
      <div
        className={classNames(
          style.slide,
          style.slide_liberty,
          activeIndex === 2 ? style.slide_active : '',
        )}
      >
        <h6>A joint project of Liberty and Lingwing</h6>
        <button>Learn Georgian</button>
        <div className={style.liberty}></div>
      </div>
    </div>
  )
}

export default PromoSlider
