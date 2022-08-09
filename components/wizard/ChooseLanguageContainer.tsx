import { FC } from 'react'
import { WizardTile } from './WizardTile'
import { LanguageFrom, LanguageTo } from '../../utils/languages'
import style from './ChooseLanguageContainer.module.scss'

interface Props {
  languages: LanguageFrom[] | LanguageTo[]
  onClick?: (language: LanguageFrom | LanguageTo) => void
}

export const ChooseLanguageContainer: FC<Props> = ({
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
