import classNames from 'classnames'
import { FC } from 'react'
import { LanguageFrom, LanguageTo } from '../../utils/languages'
import { CircleFlag } from '../CircleFlag'
import style from './PageTitle.module.scss'

interface Props {
  text: string
  languageTo?: LanguageTo
  languageFrom?: LanguageFrom
}

export const PageTitle: FC<Props> = ({ text, languageTo, languageFrom }) => {
  return (
    <div className={style.container}>
      <div className={style.flagsContainer}>
        {languageTo && (
          <CircleFlag language={languageTo} className={style.flag} />
        )}
        {languageFrom && (
          <CircleFlag language={languageFrom} className={style.smallFlag} />
        )}
      </div>
      <div className={style.title}>{text}</div>
    </div>
  )
}
