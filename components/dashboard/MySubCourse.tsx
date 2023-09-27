import { FC } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import ActionBtns from './ActionBtns'
import style from './MySubCourse.module.scss'
import { useTranslation } from '../../utils/useTranslation'
import CertificateBtn from './certificateBtn'

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
  slug: string
  status: {
    start: boolean
    continue: boolean
  }
  iLearnFromNameCode: string
}

interface Props {
  subCourse: SubCourseProps
  indexOfSubCourse: number
  indexOfCourse: number
}

const MySubCourse: FC<Props> = ({
  subCourse,
  indexOfSubCourse,
  indexOfCourse,
}) => {
  const { t } = useTranslation()

  const languageTo = subCourse.iLearn?.nameCode
  const languageFrom = subCourse.iLearnFromNameCode
  const courseName = subCourse.slug

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
            {subCourse.percent}
            <span className={style.percent}>%</span>
          </span>
          <h6 className={style.title}>
            <span>{t('wizardCourse')}</span>
            <span className={style.course_level}>
              {subCourse.languageSubStandard.name}
            </span>
          </h6>
          <ActionBtns />
        </div>
        {subCourse.certificate ? (
          <CertificateBtn userCourseId={subCourse.userCourseId}/>
        ) : (
          <Link
            className={style.link}
            href={{
              pathname: '/lessons',
              query: { languageTo, languageFrom, courseName },
            }}
          >
            <button className={style.start_course_btn}>
              {subCourse.status.continue
                ? t('APP_GENERAL_CONTINUE')
                : subCourse.status.start && t('startButton')}
            </button>
          </Link>
        )}
      </div>
    </>
  )
}

export default MySubCourse
