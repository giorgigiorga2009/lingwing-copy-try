import classNames from 'classnames'
import { FC } from 'react'
import { LanguageFrom, LanguageTo } from '../utils/languages'
import style from './CircleFlag.module.scss'

interface Props {
  language: LanguageFrom | LanguageTo
  className: string
  modifier?: 'small' | 'big'
}

export const CircleFlag: FC<Props> = ({
  language,
  className,
  modifier = 'big',
}) => {
  return (
    <span
      className={classNames(
        style.flag,
        style[language],
        style[modifier],
        className,
      )}
    />
  )
}
