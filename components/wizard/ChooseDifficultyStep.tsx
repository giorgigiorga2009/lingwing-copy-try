import { FC } from 'react'
import { ContentContainer } from './ContentContainer'
import { DifficultyLevelContainer } from './DifficultyLevelContainer'
import { PageTitle } from './PageTitle'
import style from './ChooseDifficultyStep.module.scss'
import { LanguageLevel } from '../../utils/getDifficultyLevels'
import { useTranslation } from '../../utils/useTranslation'

interface Props {
  levelData: LanguageLevel[]
}

export const ChooseDifficultyStep: FC<Props> = ({ levelData }) => {
  const { t } = useTranslation()
  return (
    <ContentContainer>
      <PageTitle text={t('WIZARD_SECOND_HEADER')} />
      <div className={style.levelsContainer}>
        {levelData.map((level, index) => (
          <DifficultyLevelContainer level={level} key={index} />
        ))}
      </div>
    </ContentContainer>
  )
}
