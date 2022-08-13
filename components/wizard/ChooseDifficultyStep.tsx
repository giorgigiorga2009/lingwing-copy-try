import { FC } from 'react'
import { ContentContainer } from './ContentContainer'
import { DifficultyLevelContainer } from './DifficultyLevelContainer'
import { PageTitle } from './PageTitle'
import style from './ChooseDifficultyStep.module.scss'
import { LanguageLevel } from '../../utils/getDifficultyLevels'
import { useTranslation } from '../../utils/useTranslation'

interface Props {
  levelData: LanguageLevel[]
  languageTo: string | undefined
  languageFrom: string | undefined
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
          <DifficultyLevelContainer level={level} key={index} />
        ))}
      </div>
    </ContentContainer>
  )
}
