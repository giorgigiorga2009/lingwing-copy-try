import styles from './IconFlag.module.scss'
import classNames from 'classnames'
import { FC } from 'react'
import { Locale } from '../../utils/languages'

interface Props {
  language: Locale
}

export const IconFlag: FC<Props> = ({ language }) => {
  return (
    <div className={classNames(styles.flag, styles[language])} />
  )
}