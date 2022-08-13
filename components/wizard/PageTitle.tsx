import classNames from 'classnames'
import { FC } from 'react'
import style from './PageTitle.module.scss'

interface Props {
  text: string
  languageTo: string | undefined
  languageFrom: string | undefined
}

export const PageTitle: FC<Props> = ({ text, languageTo, languageFrom }) => {
  return (
    <div className={style.container}>
      <div className={style.flags}>
        {languageTo ? (
          <div className={classNames(style.flag, style[languageTo])} />
        ) : undefined}
        {languageFrom ? (
          <div className={classNames(style.smallFlag, style[languageFrom])} />
        ) : undefined}
      </div>
      <div className={style.title}>{text}</div>
    </div>
  )
}
