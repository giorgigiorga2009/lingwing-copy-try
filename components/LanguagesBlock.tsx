import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useIntl } from 'react-intl'
import {LANGUAGES, LearnedLanguage, LEARNED_LANGUAGES } from './languages'
import style from './LanguagesBlock.module.scss'

interface Props {
  language: LearnedLanguage 
}

const LanguageTile: FC<Props> = ({ language }) => {

  const intl = useIntl()
  const start = intl.formatMessage({ id: "WIZARD_START_BUTTON" })
  const intlElement = intl.formatMessage({ id: LANGUAGES[language] })
  const router = useRouter()

  return (
    <Link href={`${router.locale === 'en' && 'en'}/wizard/${language}`} locale={router.locale} >
    <div className={classNames(style.tileContainer, style[language])}>
      {/* routing by onclick */}
      <span className={style.start}>{start}</span>
      <span className={style.title}>{intlElement}</span>
      <span className={classNames(style.languageFlag, style[language])} />
      <span className={classNames(style.parrot, style[language])} />
    </div>
    </Link>
  )
}

export const LanguagesBlock: FC = () => {
  return (
    <div className={style.block}>
      {LEARNED_LANGUAGES.map(language => (
        <LanguageTile language={language} key={language} />
      ))}
    </div>
  )
}
