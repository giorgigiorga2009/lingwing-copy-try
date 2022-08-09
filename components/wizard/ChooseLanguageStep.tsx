import { FC } from 'react'
import { LanguageFrom, LanguageTo } from '../../utils/languages'
import { ChooseLanguageContainer } from './ChooseLanguageContainer'
import style from './ChooseLanguageStep.module.scss'
import { ContentContainer } from './ContentContainer'
import { PageTitle } from './PageTitle'

interface Props {
  languages: LanguageFrom[] | LanguageTo[]
  onClick?: (language: LanguageFrom | LanguageTo) => void
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
      <ChooseLanguageContainer languages={languages} onClick={onClick} />
    </ContentContainer>
  )
}
