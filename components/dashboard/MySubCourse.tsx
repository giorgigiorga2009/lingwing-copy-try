import { FC } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from '../../utils/useTranslation'
import style from './MySubCourse.module.scss'

interface SubCourseProps {
  name: string
  _id: string
  percent: string
  languageSubStandard: {
    name: string
  }
  languageStandard: {
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
}

const MySubCourse: FC<Props> = ({ subCourse }) => {
  const { t } = useTranslation()
  const router = useRouter()

  const locale = router.locale ?? 'en'

  const linkStyle: LinkStyle = {
    textDecoration: 'none',
  }
  {
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
                <span>{t('wizardCourse')}</span>
                <span className={style.sub_standard}>
                  {subCourse.languageSubStandard.name}
                </span>
              </h6>
            </div>
            <Link
              style={linkStyle}
              href={`${locale}/tests/${subCourse.iLearnFromNameCode}/${subCourse.slug}`}
            >
              <>
                <button className={style.test}>{t('APP_TEST_TEST')}</button>
              </>
            </Link>
          </div>
          <div className={style.right_line_box}>
            <div className={style.action_btns}>
              <Link style={linkStyle} href={`learn/geo/${subCourse.slug}`}>
                <button className={style.statistics}></button>
              </Link>
              <Link style={linkStyle} href={`learn/geo/${subCourse.slug}`}>
                <button className={style.reset}></button>
              </Link>
              <Link style={linkStyle} href={`learn/geo/${subCourse.slug}`}>
                <button className={style.info}></button>
              </Link>
            </div>

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
        <div className="desktop">
          <div className={style.wrapper}>
            <div className={style.left_line_box}>
              <div className={style.top_side}>
                <span className={style.percent_progress}>
                  {subCourse.percent}
                  <span className={style.percent}>%</span>
                </span>
                <h6 className={style.title}>
                  <span>{subCourse.languageStandard.name}</span>
                  <Image
                    src="/themes/images/v2/arrow-right-purple-bigger.png"
                    alt="Arrow right icon"
                    width="20"
                    height="20"
                  ></Image>

                  <span className={style.sub_standard}>
                    {subCourse.languageSubStandard.name}
                  </span>
                </h6>
              </div>
              <div className={style.bottom_side}>
                <div className={style.action_btns}>
                  <Link style={linkStyle} href={`learn/geo/${subCourse.slug}`}>
                    <button className={style.statistics}></button>
                  </Link>
                  <Link style={linkStyle} href={`learn/geo/${subCourse.slug}`}>
                    <button className={style.reset}></button>
                  </Link>
                  <Link style={linkStyle} href={`learn/geo/${subCourse.slug}`}>
                    <button className={style.info}></button>
                  </Link>
                </div>
              </div>
            </div>
            <div className={style.right_line_box}>
              <div className={style.top_side}>
                <Link
                  style={linkStyle}
                  href={`${locale}/tests/${subCourse.iLearnFromNameCode}/${subCourse.slug}`}
                >
                  <>
                    <button className={style.test}>{t('APP_TEST_TEST')}</button>
                  </>
                </Link>
              </div>
              <div className={style.bottom_side}>
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
        </div>
      </div>
    </>
  )
}

export default MySubCourse
