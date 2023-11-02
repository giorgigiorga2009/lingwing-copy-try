import { useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import style from './packages.module.scss'
import FAQ from '@components/packages/Faq'
import { Locale } from '@utils/localization'
import { Reviews } from '@components/Reviews'
import { FormattedMessage } from 'react-intl'
import { PageHead } from '@components/PageHead'
import Coupon from '@components/packages/Coupon'
import { Header } from '@components/header/Header'
import { Footer } from '@components/wizard/Footer'
import ContactUs from '@components/packages/ContactUs'
import { useTranslation } from '@utils/useTranslation'
import { LOCALES_TO_LANGUAGES } from '@utils/languages'
import PricingCards from '@components/packages/PricingCards'
import { FollowButtons } from '@components/home/FollowButtons'

const Package: NextPage = () => {
  const { t } = useTranslation()
  const [coupon, setCoupon] = useState('')
  const router = useRouter()
  const locale = router.locale ?? 'en'

  return (
    <div className={style.container}>
      <PageHead
        title="META_TAG_PACKAGES_TITLE"
        description="META_TAG_PACKAGES_DESCRIPTION"
        keywords="META_TAG_PACKAGES_KEYWORDS"
      />
      <Header size="s" loginClassName={style.loginModal} />
      <main>
        <header>
          <h1 className={style.title}> {t('APP_PACKAGE_PACKAGES')} </h1>
        </header>
        <p className={style.desc}>
          <FormattedMessage
            id="APP_PACKAGE_DESC"
            values={{
              k: (chunks: React.ReactNode) => (
                <span className={style.fiveTimesFaster}>{chunks}</span>
              ),
            }}
          />
        </p>
        <PricingCards showPackages={[0, 1, 2, 3]} coupon={coupon} />
        <Coupon onClick={couponText => setCoupon(couponText)} />
        <ContactUs />
        <Reviews />
        <FAQ locale={LOCALES_TO_LANGUAGES[locale as Locale]} />
        <FollowButtons color="grey" />
        <Footer />
      </main>
    </div>
  )
}

export default Package
