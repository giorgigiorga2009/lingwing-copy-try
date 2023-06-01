import { FC } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import ActionBtns from './ActionBtns'
import { useRouter } from 'next/router'
import style from './MySubCourse.module.scss'
import { useTranslation } from '../../utils/useTranslation'

interface SubCourseProps {
  name: string
  _id: string
  percent: string
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
  const router = useRouter()

  const locale = router.locale ?? 'en'

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
        <Link
          className={style.link}
          href={`${locale}/learn/${subCourse.iLearnFromNameCode}/${subCourse.slug}`}
        >
          <button className={style.start_course_btn}>
            {subCourse.status.continue
              ? t('APP_GENERAL_CONTINUE')
              : subCourse.status.start && t('startButton')}
          </button>
        </Link>
      </div>
    </>
  )
}

export default MySubCourse
