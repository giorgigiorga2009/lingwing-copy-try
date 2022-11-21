import { useRouter } from 'next/router'
import { FC, use, useEffect, useState } from 'react'
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
import Foco from 'react-foco'

export const CourseDropdown: FC = () => {
  const router = useRouter()
  const locale = router.locale ?? 'en'
  // const [languageLevelData, setLanguageLevelData] = useState<LanguageLevel[]>()
  const [open, setOpen] = useState(false)

  const languageLevelData = use(
    getDifficultyLevels('eng', 'rus', LOCALES_TO_LANGUAGES[locale as Locale]),
  )
  const table = getCourseTable(languageLevelData)
  // useEffect(() => {
  //   getDifficultyLevels('eng', 'rus', LOCALES_TO_LANGUAGES[locale as Locale])
  //     .then(response => setLanguageLevelData(response))
  //     .catch(error => console.log(error))
  // }, [])
  // const table = languageLevelData && getCourseTable(languageLevelData)
  return (
    <Foco
      component="div"
      onClickOutside={() => setOpen(false)}
      className={style.container}
    >
      <div className={style.button} onClick={() => setOpen(!open)}>
        'languageTo flag ' 'current course'
      </div>
      {open && table.map(line => <div className={style.option}>{line}</div>)}
    </Foco>
  )
}
