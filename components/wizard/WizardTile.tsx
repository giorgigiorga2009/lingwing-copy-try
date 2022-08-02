import classNames from "classnames";
import { FC } from "react";
import { Language, ALL_LANGUAGES, LearnedLanguage, SwitchedLanguage } from "../../utils/languages";
import { useTranslation } from "../../utils/useTranslation";
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
        <div className={classNames(style.flag, style[language])} />
      </div>
      <div className={style.title}>
        {t(ALL_LANGUAGES[language])}
      </div>
    </div>
  )
}