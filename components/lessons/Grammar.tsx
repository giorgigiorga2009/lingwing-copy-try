import style from './Grammar.module.scss'
import { FC, useEffect, useRef } from 'react'
import { saveTask } from '@utils/lessons/saveTask'
import {
  CommonProps,
  updateCompletedTasks,
  setLevelColors,
} from '@utils/lessons/taskInputUtils'
import { LevelsBubble } from './chatBubbles/LevelsBubble'
import { useTranslation } from '@utils/useTranslation'

interface Props {
  taskText: string
  onDivHeight?: (height: number) => void
  mistakesByLevel: number[]
}

export const Grammar: FC<Props> = ({
  taskText,
  onDivHeight,
  mistakesByLevel,
}) => {
  const { t } = useTranslation()
  const grammarRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (grammarRef.current && typeof onDivHeight === 'function') {
      const height = grammarRef.current.offsetHeight
      onDivHeight(height + 20)
    }
  }, [grammarRef.current])
  return (
    <div className={style.grammarContainer}>
      <div className={style.title}>{t('LESSONS_GRAMMAR')}</div>
      <LevelsBubble
        mistakesByLevel={mistakesByLevel}
        taskType="grammarOrDialog"
      />
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
  const { t } = useTranslation()
  const handleClick = async () => {
    if (!commonProps.token && !commonProps.userId) return
    const isSaveSuccessful = await saveTask({
      ...commonProps,
      totalMistakes: 0,
      forgivenErrorQuantity: 0,
      error: 0,
    })

    const isMistake = 0
    commonProps.currentTask.answers = setLevelColors({
      answers: commonProps.currentTask.answers,
      currentLevel: commonProps.currentTask.currentLevel,
      learnMode: commonProps.learnMode,
      isMistake: isMistake,
    })

    if (isSaveSuccessful) {
      updateCompletedTasks(commonProps)
    }
  }

  return (
    <div className={style.container}>
      <button onClick={handleClick} className={style.button}>
        {t('LESSONS_NEXT_ENTER')}
      </button>
    </div>
  )
}
