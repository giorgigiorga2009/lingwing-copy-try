import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { PageHead } from '../components/PageHead'
import { Header } from '../components/header/Header'
import MyLanguage from '../components/dashboard/MyLanguage'
import { AddLanguageBtn } from '../components/dashboard/AddLanguageBtn'
import DownloadAppBox from '../components/shared/DownloadAppBox'
import MyCourse from '../components/dashboard/MyCourse'
import { FollowButtons } from '../components/home/FollowButtons'
import { Footer } from '../components/wizard/Footer'
import { Locale } from '../utils/localization'
import { LOCALES_TO_LANGUAGES, LANGUAGE_NAMES } from '../utils/languages'
import { useTranslation } from '../utils/useTranslation'
import { getMyCoursesData } from '../utils/getMyCourses'
import { getToken } from '../utils/auth'

import style from './dashboard.module.scss'

interface Language {
  _id: string
  nameCode: string
  standards: any[]
}

const Dashboard: FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [myLanguages, setMyLanguages] = useState<Language[]>([])
  const [active, setActive] = useState<number>(0)
  const [token, setToken] = useState<string>('')

  const locale = router.locale ?? 'en'
  useEffect(() => {
    getMyCoursesData(LOCALES_TO_LANGUAGES[locale as Locale]).then(response =>
      setMyLanguages(response.data.languages),
    )
  }, [locale])

  const changeActive = (index: number) => {
    setActive(index)
  }

  const getFromStorage = (key: any) => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(key)
    }
  }

  const myCourse = myLanguages.map((item: Language, index: number) => {
    if (index === active) {
      return (
        <div className={style.started_courses_content} key={item._id}>
          {item.standards
            .filter((elem, counter: number) => elem.courses.length > 0)
            .map((course, i) => {
              return (
                <MyCourse
                  myLanguage={item}
                  course={course}
                  key={`${course.name}-${i}`}
                  LANGUAGE_NAMES={LANGUAGE_NAMES}
                />
              )
            })}
        </div>
      )
    }
  })

  return (
    <>
      <div className={style.wrapper}>
        <PageHead text="APP_DASHBOARD" />
        <Header size="s" />
        <div className={style.content_container}>
          <div className={style.left_side}>
            <h1 className={style.title}>{t('APP_DASHBOARD')}</h1>
            <div className={style.my_languages}>
              <h2 className={style.heading2}>
                {t('APP_GENERAL_MY_LANGUAGES')}
              </h2>
              <div>
                {myLanguages &&
                  myLanguages.map((item: Language, index: number) => {
                    return (
                      <>
                        <MyLanguage
                          key={item._id}
                          item={item}
                          changeActive={changeActive}
                          active={active}
                          index={index}
                          t={t}
                          LANGUAGE_NAMES={LANGUAGE_NAMES}
                          myCourse={myCourse}
                        />
                      </>
                    )
                  })}
                <AddLanguageBtn />
                <DownloadAppBox />
              </div>
            </div>
          </div>
          <div className={style.started_courses}>
            <h2 className={style.heading3}>
              {t('APP_GENERAL_STARTED_COURSES')}
            </h2>
            {myCourse}
          </div>
        </div>
        <div className={style.bottom}>
          <FollowButtons dashboard={true} />
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Dashboard
