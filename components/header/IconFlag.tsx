import styles from './IconFlag.module.scss'
import classNames from 'classnames'
import { FC } from 'react'
import { SwitchedLanguage } from '../../utils/languages'

interface Props {
  language: SwitchedLanguage
}

export const IconFlag: FC<Props> = ({ language }) => {
  return (
    <div className={classNames(styles.flag, styles[language])} />
  )
}