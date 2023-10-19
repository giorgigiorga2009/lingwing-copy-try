import { FC } from 'react'
import style from './Wrapper.module.scss'
import ChangeMode from './ChangeMode'

interface ChangeModeProps {
  learnMode: 1 | 2 | 3
  userCourseId: string
  token?: string
  tab: 'course' | 'grammar' | 'levels' | 'statistics'
}

const Wrapper: FC<ChangeModeProps> = ({
  learnMode,
  userCourseId,
  token,
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
    </div>
  )
}

export default Wrapper
