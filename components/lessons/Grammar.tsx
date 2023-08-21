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
      onDivHeight(height + 20)
    }
  }, [grammarRef.current])

  return (
    <div>
      <div className={style.title}>Grammar</div>
      <div
        ref={grammarRef}
        className={style.textContainer}
        dangerouslySetInnerHTML={{ __html: taskText }}
      />
    </div>
  )
}

interface ButtonProps {
  commonProps: CommonProps
}

export const GrammarButton: FC<ButtonProps> = ({ commonProps }) => {
  const updateCompletedTasks = () => {
    const newCompletedTasks = commonProps.completedTasks
      ? [...commonProps.completedTasks, commonProps.currentTask]
      : [commonProps.currentTask]
    commonProps.setCompletedTasks(newCompletedTasks)
    commonProps.setCurrentTaskNumber(commonProps.currentTaskNumber + 1)
  }

  const handleClick = async () => {
    if (!commonProps.token && !commonProps.userId) return
    const isSaveSuccessful = await saveTask({ ...commonProps })
    if (isSaveSuccessful) {
      updateCompletedTasks()
    }
  }

  return (
    <div className={style.container}>
      <button onClick={handleClick} className={style.button}>
        Next (Enter)
      </button>
    </div>
  )
}
