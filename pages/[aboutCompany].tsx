import type { NextPage } from 'next'
import { Header } from '../components/header/Header'
import style from './aboutCompany.module.scss'
import { FollowButtons } from '../components/home/FollowButtons'
import { Footer } from '../components/wizard/Footer'
import { useTranslation } from '../utils/useTranslation'
import { ABOUT_COMPANY_LINKS } from '../utils/const'
import { useRouter } from 'next/router'
import AboutTabs from '../components/aboutPage/AboutTabs'
import AboutUs from '../components/aboutPage/AboutUs'
import Certificate from '../components/aboutPage/Certificate'
import Jobs from '../components/aboutPage/Jobs'
import Partners from '../components/aboutPage/Partners'

const AboutCompany: NextPage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const activeTab = router.query.page as string

  return (
    <div className={style.container}>
      <Header size="s" loginClassName={style.loginModal} />
      <div className={style.content}>
        <h1 className={style.title}>{t('APP_ABOUT_US_COMPANY')}</h1>
        <AboutTabs activeTab={activeTab} />
        <div className={style.mainBlock}>
          {activeTab === ABOUT_COMPANY_LINKS.whyWithUs && <AboutUs />}
          {activeTab === ABOUT_COMPANY_LINKS.certificate && <Certificate />}
          {activeTab === ABOUT_COMPANY_LINKS.partners && <Partners />}
          {activeTab === ABOUT_COMPANY_LINKS.jobs && <Jobs />}
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
