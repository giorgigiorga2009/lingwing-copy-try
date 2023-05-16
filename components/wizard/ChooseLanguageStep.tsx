import { FC } from 'react'
import { PageTitle } from './PageTitle'
import { WizardTile } from './WizardTile'
import style from './ChooseLanguageStep.module.scss'
import { ContentContainer } from './ContentContainer'
import { LanguageFrom, LanguageTo } from '@utils/languages'

interface Props {
  languages: LanguageFrom[] | LanguageTo[]
  onClick: (language: LanguageFrom | LanguageTo) => void
  title: string
  languageTo?: LanguageTo
}
export const ChooseLanguageStep: FC<Props> = ({
  languages,
  onClick,
  title,
  languageTo,
}) => {
  return (
    <ContentContainer>
      <PageTitle languageTo={languageTo} text={title} />
      <div className={style.container}>
        {languages.map(language => (
          <WizardTile
            key={language}
            language={language}
            onClick={() => onClick(language)}
          />
        ))}
      </div>
    </ContentContainer>
  )
}
