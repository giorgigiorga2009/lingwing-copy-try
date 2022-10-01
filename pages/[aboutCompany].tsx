import type { NextPage } from 'next'
import { Header } from '../components/header/Header'
import style from './aboutCompany.module.scss'
import { FollowButtons } from '../components/home/FollowButtons'
import { Footer } from '../components/wizard/Footer'
import { useTranslation } from '../utils/useTranslation'
import AboutCompanyHeader from '../components/aboutcompany/AboutCompanyHeader'
import AboutUs from '../components/aboutcompany/AboutUs'
import Certificate from '../components/aboutcompany/Certificate'
import Partners from '../components/aboutcompany/Partners'
import Jobs from '../components/aboutcompany/Jobs'
import { useRouter } from 'next/router'

const AboutCompany: NextPage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const activeMenu = router.query

  return (
    <div className={style.container}>
      <Header size="s" loginClassName={style.loginModal} />
      <div className={style.content}>
        <h1 className={style.title}>{t('APP_ABOUT_US_COMPANY')}</h1>
        <AboutCompanyHeader currentMenu={activeMenu.page} />
        <div className={style.mainBlock}>
          {activeMenu.page == 'WhyWithUs' && <AboutUs />}
          {activeMenu.page == 'Certificate' && <Certificate />}
          {activeMenu.page == 'Partners' && <Partners />}
          {activeMenu.page == 'Jobs' && <Jobs />}
        </div>
        <div className={style.followButtons}>
          <FollowButtons color="grey" />
        </div>
        <div className={style.footer}>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default AboutCompany
