import {
  getCurrentLanguageCoursesList,
  LanguageCourse,
} from '@utils/lessons/getLanguageCoursesList'
import { Tabs } from '@pages/lessons_old'
import style from './LearnMenu.module.scss'
import { FC, useState, useEffect } from 'react'
import { useTranslation } from '@utils/useTranslation'
import { CoursesDropdown } from '@components/lessons/learnMenu/CoursesDropdown'

interface Props {
  languageFrom: string | string[] | undefined
  languageTo: string | string[] | undefined
  token: string | null
  languageCourseId: string
  languageId: string
  setTab: (value: Tabs) => void
  tab: string
}

const LearnMenu: FC<Props> = ({
  languageFrom,
  languageTo,
  token,
  languageCourseId,
  languageId,
  setTab,
  tab,
}) => {
  const { t } = useTranslation()
  const [currentLanguageCoursesList, setCurrentLanguageCoursesList] = useState<
    LanguageCourse[] | undefined
  >()
  const [isMouseMoving, setIsMouseMoving] = useState(true)


  // console.log(languageCourseId);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleMouseMove = () => {
      setIsMouseMoving(true)

      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setIsMouseMoving(true)
      }, 5000)
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    if (!languageFrom || !languageTo || !token || !languageCourseId) return

    getCurrentLanguageCoursesList({
      languageFrom,
      languageTo,
      token,
      languageCourseId: languageCourseId,
      languageId: languageId,
    })
      .then(currentCoursesList =>
        setCurrentLanguageCoursesList(currentCoursesList),
      )
      .catch(error => {
        console.error('Error fetching user course:', error)
        throw error
      })
  }, [languageCourseId, token])

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
