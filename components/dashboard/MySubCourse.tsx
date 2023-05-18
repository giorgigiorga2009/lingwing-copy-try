import { FC } from 'react'
import Link from 'next/link'
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
  index: number
  counter: number
}

const MySubCourse: FC<Props> = ({ subCourse, index, counter }) => {
  const { t } = useTranslation()
  const router = useRouter()

  const locale = router.locale ?? 'en'

  return (
    <>
      <div className={style.container}>
        <div className={style.details}>
          <span className={style.progress}>
            {subCourse.percent}
            <span className={style.percent}>%</span>
          </span>
          <h6 className={style.title}>
            <span className={style.title_name}>{t('wizardCourse')}</span>
            <span className={style.course_level}>
              {subCourse.languageSubStandard.name}
            </span>
          </h6>
          <ActionBtns />
        </div>

        <Link
          href={`${locale}/learn/${subCourse.iLearnFromNameCode}/${subCourse.slug}`}
        >
          <button className={style.start_course_btn}>
            {subCourse.status.continue
              ? t('APP_GENERAL_CONTINUE')
              : subCourse.status.start && t('startButton')}
          </button>
        </Link>
      </div>

      {/* <div className={style.tablet_mobile}>
        <div
          className={
            index === 0
              ? counter === 0
                ? style.wrapper_a1
                : style.wrapper_first
              : style.wrapper
          }
        >
          <div className={style.left_line_box}>
            <span className={style.percent_progress}>
              {subCourse.percent}
              <span className={style.percent}>%</span>
            </span>
            <h6 className={style.title}>
              <span className={style.title_name}>{t('wizardCourse')}</span>
              <span className={style.sub_standard}>
                {subCourse.languageSubStandard.name}
              </span>
            </h6>
          </div>
          <div className={style.right_line_box}>
            <div className={style.go_to_course}>
              <Link
                style={linkStyle}
                href={`${locale}/learn/${subCourse.iLearnFromNameCode}/${subCourse.slug}`}
              >
                <button className={style.start_course_btn}>
                  {subCourse.status.continue
                    ? t('APP_GENERAL_CONTINUE')
                    : subCourse.status.start && t('startButton')}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default MySubCourse
