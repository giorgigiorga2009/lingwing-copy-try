import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Jobs from '@components/aboutPage/Jobs'
import style from './about-company.module.scss'
import { Footer } from '@components/wizard/Footer'
import { ABOUT_COMPANY_LINKS } from '@utils/const'
import { Header } from '@components/header/Header'
import AboutUs from '@components/aboutPage/AboutUs'
import Partners from '@components/aboutPage/Partners'
import { useTranslation } from '@utils/useTranslation'
import AboutTabs from '@components/aboutPage/AboutTabs'
import Certificate from '@components/aboutPage/Certificate'
import { FollowButtons } from '@components/home/FollowButtons'

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
          {activeTab === ABOUT_COMPANY_LINKS.About && <AboutUs />}
          {activeTab === ABOUT_COMPANY_LINKS.Certificate && <Certificate />}
          {activeTab === ABOUT_COMPANY_LINKS.Partners && <Partners />}
          {activeTab === ABOUT_COMPANY_LINKS.Jobs && <Jobs />}
        </div>
        <FollowButtons color="grey" />
        <Footer />
      </div>
    </div>
  )
}

export default AboutCompany
