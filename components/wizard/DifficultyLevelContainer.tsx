import classNames from 'classnames'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { LanguageLevel, Option } from '../../utils/getDifficultyLevels'
import { getNumberWithComa } from '../../utils/getNumberWithComa'
import { LOCALES_TO_LANGUAGES } from '../../utils/languages'
import { Locale } from '../../utils/localization'
import { useTranslation } from '../../utils/useTranslation'
import style from './DifficultyLevelContainer.module.scss'
import { LevelOption } from './LevelOption'

interface Props {
  level: LanguageLevel
}

export const DifficultyLevelContainer: FC<Props> = ({ level }) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const locale = (router.locale as Locale) ?? 'en'
  const { t } = useTranslation()

  const languageKey = LOCALES_TO_LANGUAGES[locale]
  return (
    <>
      <div
        className={classNames(style.container, open && style.open)}
        onClick={() => setOpen(!open)}
      >
        <div className={style.levelLetter}>{level.name}</div>

        <div className={style.levelName}>
          {level.smallDescription[languageKey]}
        </div>

        <div className={style.additionalInfo}>
          {level.fullDescription[languageKey]}
        </div>

        <div className={style.amountOfStudents}>
          <span className={style.number}>
            {getNumberWithComa(level.uniqueStudentsCount)}
          </span>
          <span className={style.text}>{t('wizardStudents')}</span>
        </div>

        <div className={style.outerCircle}>
          <div className={style.innerCircle} />
        </div>

        <span className={style.iconPlane} />

        <div className={style.iconArrowContainer}>
          <span
            className={classNames(
              style.iconArrow,
              open ? style.up : style.down,
            )}
          />
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
