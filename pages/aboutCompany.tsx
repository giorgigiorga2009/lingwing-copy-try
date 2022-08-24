import type { NextPage } from 'next'
import { Header } from '../components/header/Header'
import style from './aboutCompany.module.scss'
import _ from 'lodash'
import { FollowButtons } from '../components/home/FollowButtons'
import { Footer } from '../components/wizard/Footer'
import { useTranslation } from '../utils/useTranslation'

const AboutCompany: NextPage = params => {
  const { t } = useTranslation()

  return (
    <div className={style.container}>
      <Header size="s" loginClassName={style.loginModal} />
      <div className={style.content}>
        <h1 className={style.title}>{t('APP_ABOUT_US_COMPANY')}</h1>
        <nav className={style.nav}>
          <ul className={style.ulNav}>
            <li className={style.liNav}>{t('menuWhyWithUs')}</li>
            <li className={style.liNav}>{t('menuCertificate')}</li>
            <li className={style.liNav}>{t('menuPartners')}</li>
            <li className={style.liNav}>{t('menuJobs')}</li>
          </ul>
        </nav>

        <div className={style.mainBlock}>
          <h2 className={style.subTitle}>{t('APP_ABOUT_US_TITLE_1')}</h2>
          <p>{t('APP_ABOUT_US_TEXT_1')}</p>
          <p>{t('APP_ABOUT_US_TEXT_1_b')}</p>
          <p>{t('APP_ABOUT_US_TEXT_1_c')}</p>
          <h2 className={style.subTitle}>{t('APP_ABOUT_US_TITLE_2')}</h2>
          <p>{t('APP_ABOUT_US_TEXT_2_b')}</p>
          <p>{t('APP_ABOUT_US_TEXT_2_c')}</p>
          <p>{t('APP_ABOUT_US_TEXT_2_d')}</p>
          <h2 className={style.subTitle}>{t('APP_ABOUT_US_TITLE_3')}</h2>
          <p>{t('APP_ABOUT_US_TEXT_3')}</p>
          <p>{t('APP_ABOUT_US_TEXT_3_b')}</p>
          <h2 className={style.subTitle}>{t('APP_ABOUT_US_TITLE_4')}</h2>
          <p>{t('APP_ABOUT_US_TEXT_4')}</p>
          <h2 className={style.subTitle}>{t('APP_ABOUT_US_TITLE_5')}</h2>
          <p>{t('APP_ABOUT_US_TEXT_5')}</p>
          <h2 className={style.subTitle}>{t('APP_ABOUT_US_TITLE_6')}</h2>
          <p>{t('APP_ABOUT_US_TEXT_6')}</p>
        </div>
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

export default AboutCompany
