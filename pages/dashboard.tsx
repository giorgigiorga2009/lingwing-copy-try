import { useRouter } from 'next/router'
import style from './dashboard.module.scss'
import { Locale } from '../utils/localization'
import { FC, useEffect, useState } from 'react'
import { PageHead } from '../components/PageHead'
import { Header } from '../components/header/Header'
import { Footer } from '../components/wizard/Footer'
import MyCourse from '../components/dashboard/MyCourse'
import { useTranslation } from '../utils/useTranslation'
import { getMyCoursesData } from '../utils/getMyCourses'
import NoCourses from '../components/dashboard/NoCourses'
import MyLanguage from '../components/dashboard/MyLanguage'
import PromoSlider from '../components/dashboard/PromoSlider'
import { FollowButtons } from '../components/home/FollowButtons'
import DownloadAppBox from '../components/shared/DownloadAppBox'
import { AddLanguageBtn } from '../components/dashboard/AddLanguageBtn'
import { LOCALES_TO_LANGUAGES, LANGUAGE_NAMES } from '../utils/languages'

interface Language {
  _id: string
  nameCode: string
  standards: any[]
}

const Dashboard: FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const [myLanguages, setMyLanguages] = useState<Language[]>([])
  const [activeLang, setActiveLang] = useState<number>(0)
  const locale = router.locale ?? 'en'

  useEffect(() => {
    handleMyCourses()
    setLoading(false)
  }, [])

  const handleMyCourses = () => {
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem('authToken') as string
      return getMyCoursesData(token).then(response =>
        setMyLanguages(response.data.languages),
      )
    }
  }

  const changeActiveLang = (indexOfLang: number) => {
    setActiveLang(indexOfLang)
  }

  const myCourse = myLanguages.map((item: Language, indexOfLang: number) => {
    if (indexOfLang === activeLang) {
      return (
        <div key={item._id}>
          {item.standards
            .filter(elem => elem.courses.length > 0)
            .map((course, indexOfCourse) => {
              return (
                <MyCourse
                  myLanguage={item}
                  course={course}
                  key={`${course.name}-${indexOfCourse}`}
                  LANGUAGE_NAMES={LANGUAGE_NAMES}
                  indexOfCourse={indexOfCourse}
                />
              )
            })}
        </div>
      )
    }
  })

  return (
    <div className={style.container}>
      <PageHead text="APP_DASHBOARD" />
      <Header size="s" />
      {!loading && myLanguages && myLanguages.length > 0 && (
        <div className={style.content}>
          <div className={style.left_bar}>
            <h1 className={style.title}>{t('APP_DASHBOARD')}</h1>
            <h2 className={style.heading2}>{t('APP_GENERAL_MY_LANGUAGES')}</h2>
            <div>
              {myLanguages &&
                myLanguages.map(
                  (languageItem: Language, indexOfLang: number) => {
                    return (
                      <MyLanguage
                        key={languageItem._id}
                        languageItem={languageItem}
                        changeActiveLang={changeActiveLang}
                        activeLang={activeLang}
                        indexOfLang={indexOfLang}
                        t={t}
                        LANGUAGE_NAMES={LANGUAGE_NAMES}
                        myCourse={myCourse}
                      />
                    )
                  },
                )}
              <AddLanguageBtn />
              <div className={style.promo_slider_bottom}>
                <PromoSlider />
              </div>
              <DownloadAppBox />
            </div>
          </div>
          <div className={style.started_courses}>
            <h2 className={style.heading2}>
              {t('APP_GENERAL_STARTED_COURSES')}
            </h2>
            {myCourse}
          </div>
        </div>
      )}
      {myLanguages.length === 0 && !loading && <NoCourses />}
      <Footer />
      <FollowButtons dashboard={true} />
    </div>
  )
}

export default Dashboard
