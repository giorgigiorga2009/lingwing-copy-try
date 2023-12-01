import style from './LearnMenu.module.scss'
import {
  getCurrentLanguageCoursesList,
  LanguageCourse,
} from '@utils/lessons/getLanguageCoursesList'
import { FC, useState, useEffect } from 'react'
import { CourseObject } from '@utils/lessons/getTask'
import { useTranslation } from '@utils/useTranslation'
import { CoursesDropdown } from '@components/lessons/learnMenu/CoursesDropdown'

interface Props {
  languageFrom: string | string[] | undefined
  languageTo: string | string[] | undefined
  token: string | null
  currentCourseObject: CourseObject | undefined
  setTab: (
    value: 'course' | 'levels' | 'grammar' | 'vocabulary' | 'statistics',
  ) => void
  tab: string
}

const LearnMenu: FC<Props> = ({
  languageFrom,
  languageTo,
  token,
  currentCourseObject,
  setTab,
  tab,
}) => {
  const { t } = useTranslation()
  const [currentLanguageCoursesList, setCurrentLanguageCoursesList] = useState<
    LanguageCourse[] | undefined
  >()
  const [isMouseMoving, setIsMouseMoving] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleMouseMove = () => {
      setIsMouseMoving(true)

      // Reset the timeout
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setIsMouseMoving(false)
      }, 5000) // 5000 milliseconds (5 seconds)
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(timeoutId)
    }
  }, [])

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
    <div
      className={`${style.foldersContainer} ${
        isMouseMoving ? style.visible : ''
      }`}
    >
      {currentLanguageCoursesList && (
        <CoursesDropdown
          languageCoursesList={currentLanguageCoursesList}
          languageTo={languageTo as string}
        />
      )}
      <button
        className={`${style.folderName} ${
          tab === 'course' && style.activeButton
        }`}
        onClick={() => setTab('course')}
      >
        {t('LEARN_MENU_COURSE')}
      </button>
      <button
        className={`${style.folderName} ${
          tab === 'grammar' && style.activeButton
        }`}
        onClick={() => setTab('grammar')}
      >
        {t('LEARN_MENU_GRAMMAR')}
      </button>
      <button
        className={`${style.folderName} ${
          tab === 'vocabulary' && style.activeButton
        }`}
        onClick={() => setTab('vocabulary')}
      >
        {t('LEARN_MENU_VOCABULARY')}
      </button>
      <button
        className={`${style.folderName} ${
          tab === 'levels' && style.activeButton
        }`}
        onClick={() => setTab('levels')}
      >
        {t('LEARN_MENU_MODE')}
      </button>
      <button
        className={`${style.folderName} ${
          tab === 'statistics' && style.activeButton
        }`}
        onClick={() => setTab('statistics')}
      >
        {t('LEARN_MENU_STATISTICS')}
      </button>
    </div>
  )
}

export default LearnMenu
