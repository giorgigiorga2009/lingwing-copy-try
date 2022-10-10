import type { NextPage } from 'next'
import { Header } from '../components/header/Header'
import style from './aboutCompany.module.scss'
import { FollowButtons } from '../components/home/FollowButtons'
import { Footer } from '../components/wizard/Footer'
import { useTranslation } from '../utils/useTranslation'
import { ABOUT_COMPANY_LINKS } from '../utils/const'
import AboutCompanyHeader from '../components/aboutCompany/AboutCompanyHeader'
import AboutUs from '../components/aboutCompany/AboutUs'
import Certificate from '../components/aboutCompany/Certificate'
import Partners from '../components/aboutCompany/Partners'
import Jobs from '../components/aboutCompany/Jobs'
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
          {activeMenu.page === ABOUT_COMPANY_LINKS.whyWithUs && <AboutUs />}
          {activeMenu.page === ABOUT_COMPANY_LINKS.certificate && (
            <Certificate />
          )}
          {activeMenu.page === ABOUT_COMPANY_LINKS.partners && <Partners />}
          {activeMenu.page === ABOUT_COMPANY_LINKS.jobs && <Jobs />}
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
