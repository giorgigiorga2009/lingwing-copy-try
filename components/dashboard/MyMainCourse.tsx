import React, { FC } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useTranslation } from '../../utils/useTranslation'
import { getNumberWithComa } from '../../utils/getNumberWithComa'

import style from './MyMainCourse.module.scss'

interface Course {
  name: string
  uniqueStudentsCount: number
}

interface Props {
  course: Course
  myLanguage: {
    nameCode: string
  }
  LANGUAGE_NAMES: {
    [key: string]: string
  }
}

interface KaTextStyle {
  fontFamily: string
  fontWeight: string
}

const MyMainCourse: FC<Props> = ({ course, myLanguage, LANGUAGE_NAMES }) => {
  const router = useRouter()

  const { t } = useTranslation()

  const locale = router.locale ?? 'en'

  const kaTextStyle: KaTextStyle = {
    fontFamily: 'bpg_arial_2009',
    fontWeight: '500',
  }

  return (
    <div className={style.my_main_course}>
      <div className={style.left_line_box}>
        <Image
          className={style.flag_img}
          src={`/assets/images/flags/circle/big/${
            LANGUAGE_NAMES[myLanguage.nameCode]
          }.png`}
          alt={`${LANGUAGE_NAMES[myLanguage.nameCode]} icon`}
          width={68}
          height={67}
        />
        <h2 className={style.my_main_course_title}>
          {locale === 'ka' ? (
            <span style={kaTextStyle}>
              {t(LANGUAGE_NAMES[myLanguage.nameCode])}
            </span>
          ) : (
            <span>{t(LANGUAGE_NAMES[myLanguage.nameCode])}</span>
          )}{' '}
          <span>{course.name}</span>
        </h2>
      </div>
      <div className={style.right_line_box}>
        <div className={style.total_students}>
          <span>{getNumberWithComa(course.uniqueStudentsCount)}</span>
          {locale === 'ka' ? (
            <span style={kaTextStyle}>{t('wizardStudents')}</span>
          ) : (
            <span>{t('wizardStudents')}</span>
          )}
        </div>
        <div className={style.background}>
          <div className={style.standart_icon_transparent}>
            <div className={style.standart_icon_bg}>
              <div className={style.icon_bg}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyMainCourse
