import { useState } from 'react'
import type { NextPage } from 'next'
import { Header } from '../components/header/Header'
import style from './packages.module.scss'
import PricingCards from '../components/packages/PricingCards'
import Coupon from '../components/packages/Coupon'
import ContactUs from '../components/packages/ContactUs'
import { FollowButtons } from '../components/home/FollowButtons'
import { Footer } from '../components/wizard/Footer'
import { useTranslation } from '../utils/useTranslation'
import FAQ from '../components/packages/Faq'
import { FormattedMessage } from 'react-intl'
import { Reviews } from '../components/Reviews'

const Package: NextPage = () => {
  const { t } = useTranslation()
  const [coupon, setCoupon] = useState('')

  return (
    <div className={style.container}>
      <Header size="s" loginClassName={style.loginModal} />
      <h1 className={style.title}> {t('APP_PACKAGE_PACKAGES')} </h1>
      <p className={style.desc}>
        <FormattedMessage
          id="APP_PACKAGE_DESC"
          values={{
            k: (chunks: string) => (
              <span className={style.fiveTimesFaster}>{chunks}</span>
            ),
          }}
        />
      </p>
      <div className={style.pricingContainer}>
        <PricingCards showPackages={[0, 1, 2, 3]} coupon={coupon} />
      </div>
      <Coupon onClick={couponText => setCoupon(couponText)} />
      <ContactUs />
      <div className={style.reviews__container}>
        <Reviews />
      </div>
      <FAQ />
      <div className={style.followButtons}>
        <FollowButtons color="grey" />
      </div>
      <div className={style.footer}>
        <Footer />
      </div>
    </div>
  )
}

export default Package
