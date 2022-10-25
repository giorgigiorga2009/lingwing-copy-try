import type { NextPage } from 'next'
import { Header } from '../components/header/Header'
import style from './packages.module.scss'
import Pricing from '../components/packages/Pricing'
import { FollowButtons } from '../components/home/FollowButtons'
import { Footer } from '../components/wizard/Footer'
import { useTranslation } from '../utils/useTranslation'
import FAQ from '../components/packages/Faq'
import { FormattedMessage } from 'react-intl'

const Package: NextPage = props => {
  const { t } = useTranslation()

  return (
    <div className={style.container}>
      <Header size="s" loginClassName={style.loginModal} />
      <div className={style.content}>
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
          <Pricing />
        </div>
        <div className={style.contactUs}>
          <span className={style.moreInfo}>{t('APP_PACKAGE_CONTACT_US')}</span>
          <a className={style.phoneNumber} href="tel:995598484912">
            598-484-912
          </a>
        </div>
        <FAQ />
      </div>
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
