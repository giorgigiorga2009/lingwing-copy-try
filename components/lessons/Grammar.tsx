import style from './Grammar.module.scss'
import { FC, useEffect, useRef } from 'react'
import { TaskData } from '@utils/lessons/getTask'
import { saveTask } from '@utils/lessons/saveTask'

interface Props {
  taskText: string
  onDivHeight?: (height: number) => void
}

export const Grammar: FC<Props> = ({ taskText, onDivHeight }) => {
  const grammarRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
<<<<<<< HEAD
    if (grammarRef.current && typeof onDivHeight === 'function') {
      const height = grammarRef.current.offsetHeight
      onDivHeight(height)
    }
=======
    grammarRef.current &&
      console.log(grammarRef.current?.scrollHeight, 'grammar')
>>>>>>> 69af685ab9feb98c64a41598127e317b99f82997
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
  userId: string | null
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
  userId,
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
  const handleClick = async () => {
    if (token === null && userId === null) return
    const isSaveSuccessful = await saveTask({
      userId,
      token,
      languageFrom,
      languageTo,
      currentTask,
      courseId,
    })
    if (isSaveSuccessful) {
      setCurrentTaskNumber(currentTaskNumber + 1)
      completedTasks && setCompletedTasks([...completedTasks, currentTask])
      !completedTasks && setCompletedTasks([currentTask])
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
