import classNames from 'classnames'
import { FC } from 'react'
import {LANGUAGES, LearnedLanguage } from './languages'
import style from './LanguagesBlock.module.scss'

interface Props {
  language: LearnedLanguage 
}

export const LanguageTile: FC<Props> = ({ language }) => {
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
