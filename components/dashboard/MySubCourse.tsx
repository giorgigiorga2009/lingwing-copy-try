import Link from 'next/link'
import classNames from 'classnames'
import { FC, useState } from 'react'
import ActionBtns from './ActionBtns'
import style from './MySubCourse.module.scss'
import CertificateBtn from './certificateBtn'
import { useTranslation } from '@utils/useTranslation'

interface SubCourseProps {
  userCourseId?: string
  certificate: boolean
  name: string
  _id: string
  percent: string
  iLearn?: {
    nameCode: string
  }
  languageSubStandard: {
    name: string
  }
  rating: number
  allPassedTasks: number
  slug: string
  status: {
    start: boolean
    continue: boolean
    buy: boolean
  }
  iLearnFromNameCode: string
}

interface Props {
  token?: string
  subCourse: SubCourseProps
  indexOfSubCourse: number
  indexOfCourse: number
}

const MySubCourse: FC<Props> = ({
  token,
  subCourse,
  indexOfSubCourse,
  indexOfCourse,
}) => {
  const { t } = useTranslation()
  const [percent, setPercent] = useState(subCourse.percent)
  const [allPassedTask, setAllPassedTask] = useState<number>(
    subCourse.allPassedTasks,
  )
  // const [continueBtn, setContinueBtn] = useState<boolean>(
  //   subCourse.status.continue,
  // )
  // const [startBtn, setStartBtn] = useState<boolean>(subCourse.status.start)

  const languageTo = subCourse.iLearn?.nameCode
  const languageFrom = subCourse.iLearnFromNameCode
  const courseName = subCourse.slug
  const slug = subCourse.slug
  const handleResetCourse = () => {
    setAllPassedTask(0)
    setPercent('0')
    // setContinueBtn(false)
    // setStartBtn(true)
  }

  return (
    <>
      <div
        className={classNames(
          style.container,
          indexOfSubCourse === 0 && indexOfCourse !== 0
            ? style.container_first_child
            : null,
        )}
      >
        <div className={style.details}>
          <span className={style.progress}>
            {percent ?? subCourse.percent}
            <span className={style.percent}>%</span>
          </span>
          <h6 className={style.title}>
            <span>{t('wizardCourse')}</span>
            <span className={style.course_level}>
              {subCourse.languageSubStandard.name}
            </span>
          </h6>
          <ActionBtns
            token={token}
            slug={slug}
            allPassedTasks={allPassedTask}
            rating={subCourse.rating}
            onResetCourse={handleResetCourse}
          />
        </div>
        {subCourse.certificate ? (
          <CertificateBtn
            userCourseId={subCourse.userCourseId}
            indexOfSubCourse={indexOfSubCourse}
          />
        ) : (
          <Link
            className={style.link}
            href={{
              pathname: '/lessons',
              query: { languageTo, languageFrom, courseName },
            }}
          >
            <button className={style.start_course_btn}>
              {subCourse.status.start === true && t('startButton')}
              {subCourse.status.continue === true && t('APP_GENERAL_CONTINUE')}
              {subCourse.status.buy === true && t('APP_GENERAL_CONTINUE')}
            </button>
          </Link>
        )}
      </div>
    </>
  )
}

export default MySubCourse
