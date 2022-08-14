import classNames from 'classnames'
import { FC } from 'react'
import style from './PageTitle.module.scss'

interface Props {
  text: string
  languageTo?: string
  languageFrom?: string
}

export const PageTitle: FC<Props> = ({ text, languageTo, languageFrom }) => {
  return (
    <div className={style.container}>
      <div className={style.flags}>
        {languageTo && (
          <div className={classNames(style.flag, style[languageTo])} />
        )}
        {languageFrom && (
          <div className={classNames(style.smallFlag, style[languageFrom])} />
        )}
      </div>
      <div className={style.title}>{text}</div>
    </div>
  )
}
