import { FC } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTranslation } from '../../utils/useTranslation'
import style from './MySubCourse.module.scss'
import ActionBtns from './ActionBtns'

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

interface LinkStyle {
  textDecoration: string
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

  const linkStyle: LinkStyle = {
    textDecoration: 'none',
  }

  return (
    <>
      <div className={style.desktop}>
        <div className={style.wrapper}>
          <div className={style.left_line_box}>
            <div className={style.left_side}>
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
            <ActionBtns />
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
      </div>

      <div className={style.tablet_mobile}>
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
      </div>
    </>
  )
}

export default MySubCourse
