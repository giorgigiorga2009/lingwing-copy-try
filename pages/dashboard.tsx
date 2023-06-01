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
  const locale = router.locale ?? 'en'

  useEffect(() => {
    getData(
      `https://api.lingwing.com/api/v2/user/getStartedCourses?lang=${
        LOCALES_TO_LANGUAGES[locale as Locale]
      }`,
    ).then(data => {
      setMyLanguages(data.data.languages)
    })
  }, [locale])

  async function getData(url: string) {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsaW5nd2luZy1hcGkiLCJpYXQiOjE2ODEyODQwODEzNjEsImV4cCI6MTc4NjUxOTI4MTM2MSwidXNlcl9pZCI6IjY0MzY1YmYxNDRiNDVkMGYzZmU0NDkzYyJ9.bmkmoLNbxNUjzodWwNFkMqhVL8MdEj6iL8rnxxPOG_o',
      },
      referrerPolicy: 'strict-origin-when-cross-origin',
    })
    return response.json()
  }

  const changeActive = (index: number) => {
    setActive(index)
  }

  return (
    <>
      <div className={style.wrapper}>
        <PageHead text="dashboardPageTitle" />
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
                      <MyLanguage
                        key={item._id}
                        item={item}
                        changeActive={changeActive}
                        active={active}
                        index={index}
                        t={t}
                        LANGUAGE_NAMES={LANGUAGE_NAMES}
                      />
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
            {myLanguages.map((item: Language, index: number) => {
              if (index === active) {
                return (
                  <div className={style.started_courses_content} key={item._id}>
                    {item.standards
                      .filter(
                        (elem, counter: number) => elem.courses.length > 0,
                      )
                      .map((course, i) => {
                        return (
                          <MyCourse
                            myLanguage={item}
                            course={course}
                            key={course.name}
                            LANGUAGE_NAMES={LANGUAGE_NAMES}
                          />
                        )
                      })}
                  </div>
                )
              }
            })}
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
