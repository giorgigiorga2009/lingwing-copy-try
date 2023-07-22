import style from './Grammar.module.scss'
import { FC, useEffect, useRef } from 'react'
import { saveTask } from '@utils/lessons/saveTask'
import { CommonProps } from '@utils/lessons/taskInputUtils'

interface Props {
  taskText: string
  onDivHeight?: (height: number) => void
}

export const Grammar: FC<Props> = ({ taskText, onDivHeight }) => {
  const grammarRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (grammarRef.current && typeof onDivHeight === 'function') {
      const height = grammarRef.current.offsetHeight
      onDivHeight(height)
    }
  }, [grammarRef.current])

  return (
    <div
      ref={grammarRef}
      className={style.textContainer}
      dangerouslySetInnerHTML={{ __html: taskText }}
    />
  )
}

interface ButtonProps {
  commonProps: CommonProps
}

export const GrammarButton: FC<ButtonProps> = ({ commonProps }) => {
  const handleClick = async () => {
    if (commonProps.token === null && commonProps.userId === null) return
    const isSaveSuccessful = await saveTask({
      userId: commonProps.userId,
      token: commonProps.token,
      languageFrom: commonProps.languageFrom,
      languageTo: commonProps.languageTo,
      currentTask: commonProps.currentTask,
      courseId: commonProps.courseId,
    })
    if (isSaveSuccessful) {
      commonProps.setCurrentTaskNumber(commonProps.currentTaskNumber + 1)
      commonProps.completedTasks &&
        commonProps.setCompletedTasks([
          ...commonProps.completedTasks,
          commonProps.currentTask,
        ])
      !commonProps.completedTasks &&
        commonProps.setCompletedTasks([commonProps.currentTask])
    }
  }

  return (
    <div className={style.container}>
      <div onClick={handleClick} className={style.button}>
        {' '}
        Next (Enter){' '}
      </div>
    </div>
  )
}
