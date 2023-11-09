import { FC } from 'react'
import style from './Wrapper.module.scss'
import ChangeMode from './ChangeMode'
import AllGrammar from './AllGrammar'
import Statistics from './Statistics'
import Vocabulary from './Vocabulary'
import { CourseObject } from '@utils/lessons/getTask'
import Scrollbars from 'react-custom-scrollbars'

interface ChangeModeProps {
  currentCourseObject: CourseObject
  token?: string
  languageFrom: string | string[] | undefined
  tab: 'course' | 'grammar' | 'vocabulary' | 'levels' | 'statistics'
}

const Wrapper: FC<ChangeModeProps> = ({
  currentCourseObject,
  token,
  languageFrom,
  tab,
}) => {
  return (
    <div className={style.wrapper}>
      {tab === 'levels' && (
        <ChangeMode
          learnMode={currentCourseObject.learnMode}
          userCourseId={currentCourseObject.course._id}
          token={token}
        />
      )}
      {tab === 'grammar' && (
        <Scrollbars>
        <AllGrammar
          courseId={currentCourseObject.course._id}
          LanguageFrom={languageFrom}
          token={token}
        />
        </Scrollbars>
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
  )
}

export default Wrapper
