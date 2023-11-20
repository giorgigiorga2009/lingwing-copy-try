import { FC } from 'react'
import style from './LessonsSideMenu.module.scss'
import Ratings from '@components/lessons/usersRating/Ratings'
import AllGrammar from '@components/lessons/learnMenu/AllGrammar'
import ChangeMode from '@components/lessons/learnMenu/ChangeMode'
import Statistics from '@components/lessons/learnMenu/Statistics'
import Vocabulary from '@components/lessons/learnMenu/Vocabulary'

interface Props {
  courseId: string
  token?: string | null
}

export const LessonsSideMenu: FC<Props> = ({ courseId, token }) => {
  return (
    <>
      <div className={style.footerMenu}>
        <div className={style.statisticsIcon}/>
        <div className={style.grammarIcon}/>
        <div className={style.vocabularyIcon}/>
        <div className={style.changeModeIcon}/>
      </div>
      <Ratings courseId={courseId} token={token} />
    </>
  )
}
