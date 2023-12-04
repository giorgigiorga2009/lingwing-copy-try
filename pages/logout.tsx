import { FC } from 'react'
import { NextPage } from 'next'
import range from '@utils/range'
import classNames from 'classnames'
import style from './logout.module.scss'
import {
  APP_STORE_URL,
  GOOGLE_PLAY_URL,
  LOGOUT_SCREENSHOTS,
} from '@utils/const'
import { Header } from '@components/header/Header'
import { Footer } from '@components/wizard/Footer'
import { Carousel } from 'react-responsive-carousel'
import { useTranslation } from '@utils/useTranslation'
import { FollowButtons } from '@components/home/FollowButtons'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Image from 'next/image'
import Link from 'next/link'

const Stars: FC<{ index?: number; href: string }> = ({ index, href }) => {
  return (
    <div>
      <Link href={href}>
        <div
          className={classNames(style.google, style.market, {
            [style.apple]: index === 1,
          })}
        />
        <div className={style.stars}>
          {range(5).map(i => (
            <div key={i} className={style.star} />
          ))}
        </div>
      </Link>
    </div>
  )
}

const Logout: NextPage = () => {
  const { t } = useTranslation()

  return (
    <div className={style.container}>
      <Carousel />
      <Header size="s" setShowTopScores={() => false} showTopScores={false}/>
      <div className={style.content}>
        <div className={style.parrot} />
        <div className={style.textContainer}>
          <div className={style.title}>{t('logout_text1')}</div>
          <div className={style.subTitle}>{t('logout_text2')}</div>
          <div className={style.appLinksContainer}>
            <Stars href={GOOGLE_PLAY_URL} />
            <Stars href={APP_STORE_URL} index={1} />
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
                  <Image
                    key={pic}
                    src={`/assets/images/logout/${pic}`}
                    alt="logoutImage"
                    layout="intrinsic"
                    height={400}
                    width={200}
                  />
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
