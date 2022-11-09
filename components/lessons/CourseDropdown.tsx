import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import {
  LANGUAGES_TO,
  LanguageTo,
  getLanguagesFrom,
  LanguageFrom,
  LOCALES_TO_LANGUAGES,
} from '../../utils/languages'
import {
  getDifficultyLevels,
  LanguageLevel,
} from '../../utils/getDifficultyLevels'
import { Locale } from '../../utils/localization'
import { getCourseTable } from '../../utils/lessons/getCourseTable'
import style from './CourseDropdown.module.scss'

export const CourseDropdown: FC = () => {
  const router = useRouter()
  const locale = router.locale ?? 'en'
  const [languageLevelData, setLanguageLevelData] = useState<LanguageLevel[]>()

  useEffect(() => {
    getDifficultyLevels('eng', 'rus', LOCALES_TO_LANGUAGES[locale as Locale])
      .then(response => setLanguageLevelData(response))
      .catch(error => console.log(error))
  }, [])
  const table = languageLevelData && getCourseTable(languageLevelData)
  return (
    <div className={style.container}>
      {table && table.map(line => <div className={style.option}>{line}</div>)}
    </div>
  )
}
