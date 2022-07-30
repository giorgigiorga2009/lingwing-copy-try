import { FC } from "react";
import { WizardTile } from "./WizardTile";
import { LANGUAGES, LearnedLanguage, LEARNED_LANGUAGES } from '../../utils/languages'
import style from './LanguageChoiceContainer.module.scss'


export const LanguageChoiceContainer: FC = () => {
  return (
    <div className={style.container}>
      <div className={style.title}>
        Choose language to learn
      </div>
      <div className={style.tilesContainer}>
        {LEARNED_LANGUAGES.map(lang => {
          return (
            <WizardTile language={lang} />
          )
        })}
      </div>
    </div>
  )
}