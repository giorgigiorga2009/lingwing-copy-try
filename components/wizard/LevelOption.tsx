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
      <div className={style.buttons}>
        <div className={style.aboutButton}>{t('wizardAbout')}</div>
        <Link
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
