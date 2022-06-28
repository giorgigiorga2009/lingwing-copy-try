import styles from './IconFlag.module.scss'
import classnames from 'classnames'
import { FC } from 'react'
import { ShortSwitchedLanguage } from './languages'

interface Props {
    language: ShortSwitchedLanguage
}

export const IconFlag:FC<Props> = ({language}) => {
    return (
        <div className={classnames(styles.flag, styles[language])}/>
        
    )
}