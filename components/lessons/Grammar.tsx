import style from './Grammar.module.scss'
import { FC, useEffect, useRef } from 'react'
import { saveTask } from '@utils/lessons/saveTask'
import {
  CommonProps,
  updateCompletedTasks,
} from '@utils/lessons/taskInputUtils'
import { useTranslation } from '@utils/useTranslation'


interface Props {
  taskText: string
  onDivHeight?: (height: number) => void
}

export const Grammar: FC<Props> = ({ taskText, onDivHeight }) => {
  const {t} = useTranslation()
  const grammarRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (grammarRef.current && typeof onDivHeight === 'function') {
      const height = grammarRef.current.offsetHeight
      onDivHeight(height + 20)
    }
  }, [grammarRef.current])

  return (
    <div>
      <div className={style.title}>{t("LESSONS_GRAMMAR")}</div>
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
  const {t} = useTranslation()
  const handleClick = async () => {
    if (!commonProps.token && !commonProps.userId) return
    const isSaveSuccessful = await saveTask({ ...commonProps })
    if (isSaveSuccessful) {
      updateCompletedTasks(commonProps)
    }
  }

  return (
    <div className={style.container}>
      <button onClick={handleClick} className={style.button}>
       {t("LESSONS_NEXT_ENTER")}
      </button>
    </div>
  )
}
