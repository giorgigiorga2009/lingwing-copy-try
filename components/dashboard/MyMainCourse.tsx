import React, { FC } from 'react'
import { useTranslation } from '../../utils/useTranslation'
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
    <div className={style.my_main_course}>
      <div className={style.title_and_icon}>
        <FlagIcon
          item={myLanguage}
          size="big"
          LANGUAGE_NAMES={LANGUAGE_NAMES}
        />
        <h2 className={style.title}>
          <span>{t(LANGUAGE_NAMES[myLanguage.nameCode])}</span>
          <span>{course.name}</span>
        </h2>
      </div>
      <div className={style.students_info}>
        {/* <div className={style.total_students}>
          <span>{getNumberWithComa(course.uniqueStudentsCount)}</span>
          <span>{t('wizardStudents')}</span>
        </div> */}
        <div className={style.icons_in_background}>
          <div className={style.icon_sun_transparent}>
            <div className={style.icon_sun}>
              <div className={style.icon_fly}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyMainCourse
