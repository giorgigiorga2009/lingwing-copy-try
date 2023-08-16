import React from 'react'
import { useRouter } from 'next/router'
import style from './aboutCourse.module.scss'
import { Footer } from '@components/wizard/Footer'
import { Header } from '@components/header/Header'
import Scores from '@components/about-course/Scores'
import { getReadCourse } from '@utils/getReadCourse'
import { LOCALES_TO_LANGUAGES } from '@utils/languages'
import CourseInfo from '@components/about-course/CourseInfo'
import AboutQuotes from '@components/about-course/AboutQuotes'
import { useQuery } from 'react-query'

const AboutCourse = () => {
  const router = useRouter()
  const { courseName, languageTo, languageFrom } = router.query

  const currentLanguage =
    router.locale &&
    LOCALES_TO_LANGUAGES[router.locale as keyof typeof LOCALES_TO_LANGUAGES]

  const fetchCourseData = async () => {
    if (currentLanguage && courseName) {
      try {
        const data = await getReadCourse(currentLanguage, courseName)
        return data
      } catch (error) {
        throw new Error(String(error))
      }
    }
  }

  const {
    data: courseData,
    isLoading,
    isError,
  } = useQuery(['courseData', currentLanguage, courseName], fetchCourseData)

  // const queryClient = new QueryClient()
  return (
    // <QueryClientProvider client={queryClient}>
    <div className={style.mainConainer}>
      <Header size="s" loginClassName={style.loginModal} />
      {isLoading ? (
        <div className={style.container}>
          <div className={style.item} style={{ '--i': 0 } as any}></div>
          <div className={style.item} style={{ '--i': 1 } as any}></div>
          <div className={style.item} style={{ '--i': 2 } as any}></div>
          <div className={style.item} style={{ '--i': 3 } as any}></div>
          <div className={style.item} style={{ '--i': 4 } as any}></div>
          <div className={style.item} style={{ '--i': 5 } as any}></div>
          <div className={style.item} style={{ '--i': 6 } as any}></div>
          <div className={style.item} style={{ '--i': 7 } as any}></div>
          <div className={style.item} style={{ '--i': 8 } as any}></div>
          <div className={style.item} style={{ '--i': 9 } as any}></div>
          <div className={style.item} style={{ '--i': 10 } as any}></div>
          <div className={style.item} style={{ '--i': 11 } as any}></div>
          <div className={style.item} style={{ '--i': 12 } as any}></div>
          <div className={style.item} style={{ '--i': 13 } as any}></div>
          <div className={style.item} style={{ '--i': 14 } as any}></div>
          <div className={style.item} style={{ '--i': 15 } as any}></div>
          <div className={style.item} style={{ '--i': 16 } as any}></div>
          <div className={style.item} style={{ '--i': 17 } as any}></div>
          <div className={style.item} style={{ '--i': 18 } as any}></div>
          <div className={style.item} style={{ '--i': 19 } as any}></div>
          <div className={style.item} style={{ '--i': 20 } as any}></div>
        </div>
      ) : isError ? (
        <div>Error fetching course data.</div>
      ) : (
        <>
          <CourseInfo
            info={courseData.info}
            title={courseData.title}
            smallDescription={courseData.smallDescription}
            languageTo={languageTo}
            languageFrom={languageFrom}
            courseName={courseName}
          />
          <Scores
            fullDescription={courseData.fullDescription}
            studyingTheCourse={courseData.studyingTheCourse}
            top={courseData.top}
            languageTo={languageTo}
            languageFrom={languageFrom}
            courseName={courseName}
          />
          <AboutQuotes promo={courseData.promo} />
          <Footer />
        </>
      )}
    </div>
    // </QueryClientProvider>
  )
}

export default AboutCourse
