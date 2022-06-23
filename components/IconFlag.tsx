import styles from './IconFlag.module.scss'
import classnames from 'classnames'
import { FC } from 'react'

export const LANG = [
    {
         long:'English',
         short: "eng",
    },
    {
        long:'Russian',
        short: "rus",
    },
    {
        long:'Georgian',
        short: "geo",
    },
    {
        long:'Turkish',
        short: "tur",
    },
    {
        long:'Bengali',
        short: "ben",
    },
    {
        long:'Spanish',
        short: "esp",
    },
] as Lang[]

export type ShortLang = 'eng' | 'esp' | 'geo' |'rus' |'tur' | 'ben'
export type LongLang = "English" | "Spanish" | "Georgian" | "Russian" | "Turkish" | "Bengali"
export type Lang = {
    long: LongLang
    short: ShortLang
}

interface Props {
    lang: ShortLang
}

export const IconFlag:FC<Props> = ({lang}) => {
    return (
        <div className={classnames(styles.flag, styles[lang])}/>
        
    )
}