import { FC } from 'react'
import { WizardTile } from './WizardTile'
import {
  Language,
  LearnedLanguage,
  SwitchedLanguage,
} from '../../utils/languages'
import style from './LanguageChoiceContainer.module.scss'

interface Props {
  languages: Language[]
  onClick?: (language: Language) => void
}

export const LanguageChoiceContainer: FC<Props> = ({
  languages,
  onClick = () => {},
}) => {
  return (
    <div className={style.container}>
      {languages.map(language => (
        <WizardTile
          key={language}
          language={language}
          onClick={() => onClick(language)}
        />
      ))}
    </div>
  )
}
