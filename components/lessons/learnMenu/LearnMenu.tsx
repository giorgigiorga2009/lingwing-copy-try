import style from './LearnMenu.module.scss'
import {
  getCurrentLanguageCoursesList,
  LanguageCourse,
} from '@utils/lessons/getLanguageCoursesList'
import { FC, useState, useEffect } from 'react'
import { CourseObject } from '@utils/lessons/getTask'
import { CoursesDropdown } from '@components/lessons/CoursesDropdown'

interface Props {
  languageFrom: string | string[] | undefined
  languageTo: string | string[] | undefined
  token: string | null
  currentCourseObject: CourseObject | undefined
  setTab: (value: 'course' | 'levels' | 'grammar' | 'statistics') => void
}

const LearnMenu: FC<Props> = ({
  languageFrom,
  languageTo,
  token,
  currentCourseObject,
  setTab,
}) => {
  const [currentLanguageCoursesList, setCurrentLanguageCoursesList] = useState<
    LanguageCourse[] | undefined
  >()

  useEffect(() => {
    if (!languageFrom || !languageTo || !token || !currentCourseObject) return

    getCurrentLanguageCoursesList({
      languageFrom,
      languageTo,
      token,
      languageCourseId: currentCourseObject.course._id,
      languageId: currentCourseObject.course.iLearn._id,
    })
      .then(currentCoursesList =>
        setCurrentLanguageCoursesList(currentCoursesList),
      )
      .catch(error => {
        console.error('Error fetching user course:', error)
        throw error
      })
  }, [currentCourseObject, token])

  return (
    <div className={style.foldersContainer}>
      {currentLanguageCoursesList && (
        <CoursesDropdown
          languageCoursesList={currentLanguageCoursesList}
          languageTo={languageTo as string}
        />
      )}
      <button className={style.folderName} onClick={() => setTab('course')}>
        Course
      </button>
      <button className={style.folderName} onClick={() => setTab('grammar')}>
        Grammar
      </button>
      <button className={style.folderName} onClick={() => setTab('levels')}>
        Levels
      </button>
      <button className={style.folderName} onClick={() => setTab('statistics')}>
        Statistics
      </button>
    </div>
  )
}

export default LearnMenu
