import { FC } from 'react'
import style from './Wrapper.module.scss'
import ChangeMode from './ChangeMode'
import AllGrammar from './AllGrammar'

interface ChangeModeProps {
  learnMode: 1 | 2 | 3
  userCourseId: string
  token?: string
  languageFrom: string | string[] | undefined
  tab: 'course' | 'grammar' | 'levels' | 'statistics'
}

const Wrapper: FC<ChangeModeProps> = ({
  learnMode,
  userCourseId,
  token,
  languageFrom,
  tab,
}) => {
  return (
    <div className={style.wrapper}>
      {tab === 'levels' && (
        <ChangeMode
          learnMode={learnMode}
          userCourseId={userCourseId}
          token={token}
        />
      )}
      {tab === 'grammar' && (
        <AllGrammar
          courseId={userCourseId}
          LanguageFrom={languageFrom}
          token={token}
        />
      )}
    </div>
  )
}

export default Wrapper
