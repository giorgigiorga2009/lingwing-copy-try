import classNames from 'classnames'
import { FC } from 'react'
import { Language, LANGUAGE_NAMES } from '../../utils/languages'
import { useTranslation } from '../../utils/useTranslation'
import { CircleFlag } from '../CircleFlag'
import style from './WizardTile.module.scss'

interface Props {
  language: Language
  onClick?: () => void
}

export const WizardTile: FC<Props> = ({ language, onClick }) => {
  const { t } = useTranslation()

  return (
    <div className={style.container} onClick={onClick}>
      <div className={style.circle}>
        <CircleFlag language={language} className={style.flag} />
      </div>
      <div className={style.title}>{t(LANGUAGE_NAMES[language])}</div>
    </div>
  )
}
