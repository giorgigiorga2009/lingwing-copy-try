import classNames from "classnames";
import { FC } from "react";
import { LANGUAGES, LearnedLanguage } from "../../utils/languages";
import { useTranslation } from "../../utils/useTranslation";
import style from './WizardTile.module.scss'

interface Props {
  language: LearnedLanguage
}

export const WizardTile: FC<Props> = ({ language }) => {
  const { t } = useTranslation()

  return (
    <div key={language} className={style.container}>
      <div className={style.circle}>
        <div className={classNames(style.flag, style[language])} />
      </div>
      <div className={style.title}>
        {t(LANGUAGES[language])}
      </div>
    </div>
  )
}