import { Header } from '@components/header/Header'
import style from './AboutPage.module.scss'
import Image from 'next/image'
import parrotImg from '../.././public/themes/images/v2/eng-parrot.png'
import waveImg from '../.././public/assets/images/silver-wave.svg'
import flagImg from '../.././public/assets/images/flags/circle/small-languageCode/eng-flag.png'
import { getCourseInfo } from './utils/getCourseInfo'
import { useEffect, useState } from 'react'
import { useTranslation } from '@utils/useTranslation'
import Scores from './Scores'
import ReusableBtn from './utils/Reusable/ReusableBtn'
import Quotes from './Quotes'
import Footer from './Footer'

const AboutPage = () => {
  const { t } = useTranslation()
  const [courseInfo, setCourseInfo] = useState<CourseAdvertisement>()

  const getData = async () => {
    const { data } = await getCourseInfo()
    setCourseInfo(data)
    return data
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div>
      <Header
        size="s"
        loginClassName={'style?.loginModal'}
        setShowTopScores={() => false}
        showTopScores={false}
      />
      <div className={style.mainWrapper}>
        <div className={style.courseWrapper}>
          <div className={style.courseInfo}>
            <Image
              className={style.parrotImg}
              src={parrotImg}
              alt=""
              width={800}
              height={1000}
            />
            <div className={style.courseDetailWrapper}>
              <div className={style.courseTitleSec}>
                <Image className={style.flagImg} src={flagImg} alt="Flag" />
                <h1 className={style.courseTitle}>{courseInfo?.title}</h1>
              </div>
              <h1 className={style.courseSmallDesc}>
                {courseInfo?.smallDescription}
              </h1>
              <div className={style.courseDetailContainer}>
                <div className={style.courseDetail}>
                  <div className={style.detailInfo}>
                    <p className={style.detailInfoNum}>
                      {courseInfo?.info?.tasksQuantity}
                    </p>
                    <p className={style.detailInfoTitle}>
                      {t('ABOUT_COURSE_EXCERCISES')}
                    </p>
                  </div>
                  <div className={style.detailInfo}>
                    <p className={style.detailInfoNum}>
                      {courseInfo?.info?.uniqueWordsQuantity}
                    </p>
                    <p className={style.detailInfoTitle}>
                      {t('ABOUT_COURSE_WORDS')}
                    </p>
                  </div>
                  <div className={style.detailInfo}>
                    <p className={style.detailInfoNum}>
                      {courseInfo?.info?.courseFinishTime}
                    </p>
                    <p className={style.detailInfoTitle}>
                      {t('ABOUT_COURSE_HOURS')}
                    </p>
                  </div>
                </div>
                <Image
                  className={style.smallParrotImg}
                  src={parrotImg}
                  alt="parrot"
                />
              </div>
              <div className={style.startBtn}>
                <ReusableBtn />
              </div>
            </div>
          </div>
        </div>
        <div className={style.courseInfoWave} />
        <Scores
          fullDescription={courseInfo?.fullDescription ?? ''}
          studyingTheCourse={courseInfo?.studyingTheCourse}
          top={courseInfo?.top}
        />
        <Quotes promo={courseInfo?.promo} />
        <Footer/>
      </div>
    </div>
  )
}

export default AboutPage
