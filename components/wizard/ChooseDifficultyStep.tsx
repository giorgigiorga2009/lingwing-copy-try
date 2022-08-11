import { FC } from 'react'
import { ContentContainer } from './ContentContainer'
import { DifficultyLevelContainer } from './DifficultyLevelContainer'
import { PageTitle } from './PageTitle'
import style from './ChooseDifficultyStep.module.scss'
import { LanguageLevel } from '../../utils/getDifficultyLevels'

interface Props {
  levelData: LanguageLevel[]
}

export const ChooseDifficultyStep: FC<Props> = ({ levelData }) => {
  return (
    <ContentContainer>
      <PageTitle text="Choose difficulty level for learning" />
      <div className={style.levelsContainer}>
        {levelData.map((level, index) => (
          <DifficultyLevelContainer level={level} key={index} />
        ))}
      </div>
    </ContentContainer>
  )
}