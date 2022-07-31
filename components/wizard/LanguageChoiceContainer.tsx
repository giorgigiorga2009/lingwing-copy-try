import { FC } from "react";
import { WizardTile } from "./WizardTile";
import { LearnedLanguage } from '../../utils/languages'
import style from './LanguageChoiceContainer.module.scss'

interface Props {
  languages: LearnedLanguage[]
  onClick?: () => void
}

export const LanguageChoiceContainer: FC<Props> = ({ languages, onClick }) => {
  return (
    <div className={style.container}>
      {languages.map(language => (
        <WizardTile language={language} onClick={onClick} />
      ))}
    </div>

  )
}