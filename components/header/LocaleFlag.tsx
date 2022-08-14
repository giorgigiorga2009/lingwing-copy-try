import styles from './LocaleFlag.module.scss'
import classNames from 'classnames'
import { FC } from 'react'
import { LanguageFrom } from '../../utils/languages'

interface Props {
  language: LanguageFrom
}

export const LocaleFlag: FC<Props> = ({ language }) => {
  return <div className={classNames(styles.flag, styles[language])} />
}
