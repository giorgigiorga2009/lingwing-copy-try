import { FC } from 'react'
import { ContentContainer } from './ContentContainer'
import { DifficultyLevelContainer } from './DifficultyLevelContainer'
import { PageTitle } from './PageTitle'
import style from './ChooseDifficultyStep.module.scss'

export const ChooseDifficultyStep: FC = () => {
  return (
    <ContentContainer>
      <PageTitle text="Choose difficulty level for learning" />
      <div className={style.levelsContainer}>
        <DifficultyLevelContainer />
      </div>
    </ContentContainer>
  )
}
