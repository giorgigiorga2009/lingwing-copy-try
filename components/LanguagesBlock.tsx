import classNames from 'classnames'
import { FC } from 'react'
import {LANGUAGES, LearnedLanguage, LEARNED_LANGUAGES } from './languages'
import style from './LanguagesBlock.module.scss'

interface Props {
  language: LearnedLanguage 
}

const LanguageTile: FC<Props> = ({ language }) => {
  return (
    <div className={classNames(style.tileContainer, style[language])}>
      {/* routing by onclick */}
      <span className={style.start}>Start</span>
      <span className={style.title}>{LANGUAGES[language]}</span>
      <span className={classNames(style.languageFlag, style[language])} />
      <span className={classNames(style.parrot, style[language])} />
    </div>
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
