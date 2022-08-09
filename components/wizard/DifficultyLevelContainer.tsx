import { useRouter } from 'next/router'
import { FC } from 'react'
import { LanguageLevel } from '../../utils/getLanguageLevels'
import { LOCALES_TO_LANGUAGES } from '../../utils/languages'
import { Locale } from '../../utils/localization'
import style from './DifficultyLevelContainer.module.scss'

interface Props {
  level: LanguageLevel
}

export const DifficultyLevelContainer: FC<Props> = ({ level }) => {
  const router = useRouter()
  const locale = (router.locale as Locale) ?? 'en'

  const languageKey = LOCALES_TO_LANGUAGES[locale]
  return (
    <div className={style.container}>
      <div className={style.levelLetter}>{level.name}</div>

      <div className={style.levelName}>
        {level.smallDescription[languageKey]}
      </div>

      <div className={style.amountOfStudents}>
        <span className={style.number}>{level.uniqueStudentsCount}</span>
        <span className={style.text}>Students</span>
      </div>

      <div className={style.outerCircle}>
        <div className={style.innerCircle} />
      </div>

      <span className={style.iconPlane} />

      <div className={style.iconArrowContainer}>
        <span className={style.iconArrow} />
      </div>
    </div>
  )
}
