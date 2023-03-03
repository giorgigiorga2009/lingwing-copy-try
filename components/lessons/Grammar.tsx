import { FC } from 'react'
import { TaskData } from '../../utils/lessons/getTask'
import { saveTask } from '../../utils/lessons/saveTask'
import style from './Grammar.module.scss'

interface Props {
  taskText: string
}

export const Grammar: FC<Props> = ({ taskText }) => {
  return <div dangerouslySetInnerHTML={{ __html: taskText }} />
}

interface ButtonProps {
  token: string | null
  languageFrom: string | string[]
  languageTo: string | string[]
  currentTask: TaskData
  courseId: string
  setCurrentTaskNumber: (taskNumber: number) => void
  currentTaskNumber: number
}

export const GrammarButton: FC<ButtonProps> = ({
  token,
  languageFrom,
  languageTo,
  currentTask,
  courseId,
  setCurrentTaskNumber,
  currentTaskNumber,
}) => {
  const handleClick = () => {
    if (token === null) return
    saveTask({ token, languageFrom, languageTo, currentTask, courseId })
    setCurrentTaskNumber(currentTaskNumber + 1)
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
