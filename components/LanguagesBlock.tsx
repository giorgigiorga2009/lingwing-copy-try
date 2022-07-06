import classNames from 'classnames'
import { FC } from 'react'
import {LANGUAGES, LearnedLanguage, LEARNED_LANGUAGES } from './languages'
import styles from './LanguagesBlock.module.scss'

interface Props {
  language: LearnedLanguage 
}

const LanguageTile: FC<Props> = ({ language }) => {
  return (
    <div className={classNames(styles.tileContainer, styles[language])}>
      {/* routing by onclick */}
      <span className={styles.start}>Start</span>
      <span className={styles.title}>{LANGUAGES[language]}</span>
      <span className={classNames(styles.languageFlag, styles[language])} />
      <span className={classNames(styles.parrot, styles[language])} />
    </div>
  )
}

export const LanguagesBlock: FC = () => {
  return (
    <div className={styles.block}>
      {LEARNED_LANGUAGES.map(language => (
        <LanguageTile language={language} key={language} />
      ))}
    </div>
  )
}
