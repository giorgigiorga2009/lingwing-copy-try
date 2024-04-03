import { FC } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import style from './LevelOption.module.scss'
import { Option } from '@utils/getDifficultyLevels'
import { useTranslation } from '@utils/useTranslation'
import { getNumberWithComa } from '@utils/getNumberWithComa'
import { LanguageFrom, LanguageTo } from '@utils/languages'

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
      <div className={classNames(style.buttons)}>
        <Link
          className={classNames(style.link, style.aboutButton)}
          href={{
            pathname: '/aboutCourse',
            query: { languageTo, languageFrom, courseName },
          }}
        >
          {t('wizardAbout')}
        </Link>
        <Link
          className={classNames(style.link, style.startButton)}
          href={{
            pathname: '/lessons/soundcheck',
            query: { languageTo, languageFrom, courseName },
          }}
        >
          {option.status.continue ? (
            <>{t('APP_GENERAL_CONTINUE')}</>
          ) : option.status.start ? (
            <>{t('startButton')}</>
          ) : option.status.retake ? (
            <>{t('retake')}</>
          ) : (
            <>{t('buy')}</>
          )}
        </Link>
      </div>
    </div>
  )
}
