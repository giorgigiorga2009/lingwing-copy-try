import { FC } from 'react'
import { PageTitle } from './PageTitle'
import { ContentContainer } from './ContentContainer'
import style from './ChooseDifficultyStep.module.scss'
import { LanguageLevel } from '@utils/getDifficultyLevels'
import { useTranslation } from '@utils/useTranslation'
import { LanguageFrom, LanguageTo } from '@utils/languages'
import { DifficultyLevelContainer } from './DifficultyLevelContainer'

interface Props {
  levelData: LanguageLevel[]
  languageTo?: LanguageTo
  languageFrom?: LanguageFrom
}

export const ChooseDifficultyStep: FC<Props> = ({
  levelData,
  languageTo,
  languageFrom,
}) => {
  const { t } = useTranslation()
  return (
    <ContentContainer>
      <PageTitle
        languageFrom={languageFrom}
        languageTo={languageTo}
        text={t('wizardTitle3')}
      />
      <div className={style.levelsContainer}>
        {levelData.map((level, index) => (
          <DifficultyLevelContainer
            level={level}
            key={index}
            languageTo={languageTo}
            languageFrom={languageFrom}
          />
        ))}
      </div>
    </ContentContainer>
  )
}
