import { FC } from 'react'
import { TaskData } from '../../utils/lessons/getTask'
import { saveTask } from '../../utils/lessons/saveTask'
import style from './Grammar.module.scss'

interface Props {
  taskText: string
}

export const Grammar: FC<Props> = ({ taskText }) => {
  return (
    <div
      className={style.textContainer}
      dangerouslySetInnerHTML={{ __html: taskText }}
    />
  )
}

interface ButtonProps {
  token: string | null
  languageFrom: string | string[]
  languageTo: string | string[]
  currentTask: TaskData
  courseId: string
  setCurrentTaskNumber: (taskNumber: number) => void
  currentTaskNumber: number
  completedTasks: TaskData[] | undefined
  setCompletedTasks: (tasks: TaskData[]) => void
}

export const GrammarButton: FC<ButtonProps> = ({
  token,
  languageFrom,
  languageTo,
  currentTask,
  courseId,
  setCurrentTaskNumber,
  currentTaskNumber,
  completedTasks,
  setCompletedTasks,
}) => {
  const handleClick = () => {
    if (token === null) return
    saveTask({ token, languageFrom, languageTo, currentTask, courseId })
    setCurrentTaskNumber(currentTaskNumber + 1)
    completedTasks && setCompletedTasks([...completedTasks, currentTask])
    !completedTasks && setCompletedTasks([currentTask])
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