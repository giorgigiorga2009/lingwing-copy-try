import styles from './IconFlag.module.scss'
import classnames from 'classnames'
import { FC } from 'react'
import { SwitchedLanguage } from '../../utis/languages'

interface Props {
  language: SwitchedLanguage
}

export const IconFlag: FC<Props> = ({ language }) => {
  return (
    <div className={classnames(styles.flag, styles[language])} />
  )
}