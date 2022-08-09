import { FC } from 'react'
import { LanguageFrom, LanguageTo } from '../../utils/languages'
import style from './ChooseLanguageStep.module.scss'
import { ContentContainer } from './ContentContainer'
import { PageTitle } from './PageTitle'
import { WizardTile } from './WizardTile'

interface Props {
  languages: LanguageFrom[] | LanguageTo[]
  onClick: (language: LanguageFrom | LanguageTo) => void
  title: string
}
export const ChooseLanguageStep: FC<Props> = ({
  languages,
  onClick,
  title,
}) => {
  return (
    <ContentContainer>
      <PageTitle text={title} />
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
