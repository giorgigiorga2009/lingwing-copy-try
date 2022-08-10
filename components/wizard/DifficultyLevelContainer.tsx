import classNames from 'classnames'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { LanguageLevel, Option } from '../../utils/getDifficultyLevels'
import { LOCALES_TO_LANGUAGES } from '../../utils/languages'
import { Locale } from '../../utils/localization'
import style from './DifficultyLevelContainer.module.scss'
import { LevelOption } from './LevelOption'

interface Props {
  level: LanguageLevel
}

export const DifficultyLevelContainer: FC<Props> = ({ level }) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const locale = (router.locale as Locale) ?? 'en'

  const languageKey = LOCALES_TO_LANGUAGES[locale]
  return (
    <>
      <div className={style.container} onClick={() => setOpen(!open)}>
        <div className={style.levelLetter}>{level.name}</div>

        <div className={style.levelName}>
          {level.smallDescription[languageKey]}
        </div>

        {open && (
          <div className={style.additionalInfo}>
            {level.fullDescription[languageKey]}
          </div>
        )}

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
      {open && (
        <div className={style.options}>
          {level.options.map((option, index) => (
            <LevelOption key={index} option={option} index={index + 1} />
          ))}
        </div>
      )}
    </>
  )
}
