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
import Head from 'next/head'

const Package: NextPage = () => {
  const { t } = useTranslation()
  const [coupon, setCoupon] = useState('')
  const router = useRouter()
  const locale = router.locale ?? 'en'

  return (
    <div className={style.container}>
      <Head>
        <meta name="description" content={t('META_TAG_PACKAGES_DESCRIPTION')} />
        <meta name="keywords" content={t('META_TAG_PACKAGES_KEYWORDS')} />
        <meta property="og:description" content={t('META_TAG_PACKAGES_DESCRIPTION')}></meta>
        <meta property="og:image" content="https://lingwing.com/themes/images/v2/display.png"></meta>
        <meta name="author" content="Lingwing Team"/>
        <meta name="robots" content="index, follow"/>
        <meta name="google-site-verification" content="H2zVlOBKHx916NjSlvNC9RVhe8kyC9aZppkYGVZlUNg"></meta>
        <meta name="facebook-domain-verification" content="tjk8pca0ajrw8hj985o2b6fov52o7h"></meta>
        <meta name="theme-color" content="#692E96"></meta>
        {/* <meta property="og:title" content={t('META_TAG_PACKAGES_TITLE')}></meta> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimum-scale=1, height=device-height, target-densitydpi=device-dpi"/> */}
        {/* <link rel="icon" href="/favicon.ico"></link> */}
        {/* <title>{t('META_TAG_PACKAGES_TITLE')}</title> */}
        
      </Head>
      <PageHead title='META_TAG_PACKAGES_TITLE' />
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
