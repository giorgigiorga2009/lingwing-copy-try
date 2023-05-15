import React, { FC } from 'react'
import { useTranslation } from '../../utils/useTranslation'
import { getNumberWithComa } from '../../utils/getNumberWithComa'
import FlagIcon from './FlagIcon'

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

const MyMainCourse: FC<Props> = ({ course, myLanguage, LANGUAGE_NAMES }) => {
  const { t } = useTranslation()

  return (
    <div className={style.wrapper}>
      <div className={style.left_line_box}>
        <FlagIcon
          item={myLanguage}
          size="big"
          LANGUAGE_NAMES={LANGUAGE_NAMES}
        />
        <h2 className={style.title}>
          <span>{t(LANGUAGE_NAMES[myLanguage.nameCode])}</span>{' '}
          <span>{course.name}</span>
        </h2>
      </div>
      <div className={style.right_line_box}>
        <div className={style.total_students}>
          <span>{getNumberWithComa(course.uniqueStudentsCount)}</span>
          <span>{t('wizardStudents')}</span>
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
