import { FC } from 'react'
import ChangeMode from './ChangeMode'
import AllGrammar from './AllGrammar'
import Statistics from './Statistics'
import Vocabulary from './Vocabulary'
import { Tabs } from '@pages/lessons_old'
import style from './Wrapper.module.scss'
import { CourseObject } from '@utils/lessons/getTask'

interface ChangeModeProps {
  currentCourseObject: CourseObject
  token?: string
  languageFrom: string | string[] | undefined
  tab: Tabs
  setTab: (tab: Tabs) => void
}

const Wrapper: FC<ChangeModeProps> = ({
  currentCourseObject,
  token,
  languageFrom,
  tab,
  setTab,
}) => {
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        {tab === 'levels' && (
          <ChangeMode
            learnMode={currentCourseObject.learnMode}
            userCourseId={currentCourseObject._id}
            token={token}
            setTab={setTab}
          />
        )}
        {tab === 'grammar' && (
          <AllGrammar
            courseId={currentCourseObject.course._id}
            LanguageFrom={languageFrom}
            token={token}
          />
        )}
        {tab === 'vocabulary' && (
          <Vocabulary
            currentCourseObject={currentCourseObject}
            LanguageFrom={languageFrom}
            token={token}
          />
        )}
        {tab === 'statistics' && (
          <Statistics courseId={currentCourseObject._id} token={token} />
        )}
      </div>
    </div>
  )
}

export default Wrapper
