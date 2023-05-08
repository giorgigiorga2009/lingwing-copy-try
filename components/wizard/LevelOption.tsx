import classNames from 'classnames'
import Link from 'next/link'
import { FC } from 'react'
import { Option } from '../../utils/getDifficultyLevels'
import { getNumberWithComa } from '../../utils/getNumberWithComa'
import { LanguageFrom, LanguageTo } from '../../utils/languages'
import { useTranslation } from '../../utils/useTranslation'
import style from './LevelOption.module.scss'

interface Props {
  option: Option
  index: number
  languageTo?: LanguageTo
  languageFrom?: LanguageFrom
}

export const LevelOption: FC<Props> = ({
  option,
  index,
  languageTo,
  languageFrom,
}) => {
  const linkStyles = {
    textDecoration: 'none',
  }
  const { t } = useTranslation()
  const courseName = option.title.toLowerCase().replace(/\s/g, '_')
  return (
    <div className={style.optionContainer}>
      <div className={style.logoContainer}>
        <div
          className={classNames(style.courseLogo, style[`course-${index}`])}
        />
        <span className={style.courseName}>
          {t('wizardCourse')}
          {index}
        </span>
      </div>
      <div className={style.titleContainer}>
        <span className={style.title}>{option.title}</span>
        <span className={style.amountOfStudents}>
          <span className={style.number}>
            {getNumberWithComa(option.studyingTheCourse)}
          </span>
          <span className={style.text}>{t('wizardStudents')}</span>
        </span>
      </div>
      <div className={style.buttons}>
        <div className={style.aboutButton}>
          <Link
            style={linkStyles}
            href={{
              pathname: '/about_lesson',
              query: { languageTo, languageFrom, courseName },
            }}
          >
            {t('wizardAbout')}
          </Link>
        </div>
        <Link
          style={linkStyles}
          className={style.startButton}
          href={{
            pathname: '/lessons',
            query: { languageTo, languageFrom, courseName },
          }}
        >
          {t('startButton')}
        </Link>
      </div>
    </div>
  )
}
