import classNames from 'classnames'
import { NextPage } from 'next'
import { Carousel } from 'react-responsive-carousel'
import { Header } from '../components/header/Header'
import { FollowButtons } from '../components/home/FollowButtons'
import { Footer } from '../components/wizard/Footer'
import range from '../utils/range'
import style from './logout.module.scss'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useTranslation } from '../utils/useTranslation'
import { FC } from 'react'
import { LOGOUT_SCREENSHOTS } from '../utils/const'

const Stars: FC = () => {
  return (
    <div>
      <div className={classNames(style.google, style.market)} />
      <div className={style.stars}>
        {range(5).map(i => (
          <div key={i} className={style.star} />
        ))}
      </div>
    </div>
  )
}

const Logout: NextPage = () => {
  const { t } = useTranslation()

  return (
    <div className={style.container}>
      <Carousel />
      <Header size="s" />
      <div className={style.content}>
        <div className={style.parrot} />
        <div className={style.textContainer}>
          <div className={style.title}>{t('logout_text1')}</div>
          <div className={style.subTitle}>{t('logout_text2')}</div>
          <div className={style.appLinksContainer}>
            <Stars />
            <Stars />
          </div>
        </div>
        <div className={style.phoneContainer}>
          <div className={style.phone}>
            <div className={style.screen}>
              <Carousel
                showStatus={false}
                autoPlay
                infiniteLoop
                showThumbs={false}
                showIndicators={false}
                showArrows={false}
              >
                {LOGOUT_SCREENSHOTS.map(pic => (
                  <img key={pic} src={`/assets/images/logout/${pic}`} />
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      <FollowButtons />
      <Footer />
    </div>
  )
}

export default Logout
