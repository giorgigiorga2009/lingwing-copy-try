import { FC } from 'react'
import { Hint } from './Hint'
import { Dialog } from './Dialog'
import { Grammar } from './Grammar'
import { TaskData } from '@utils/lessons/getTask'
import style from './ChatCurrentTask.module.scss'
import { TranslateBubble } from './chatBubbles/TranslateBubble'
import { useVoiceRecognition, getVoiceRecognition } from '@utils/store'

interface Props {
  currentTask: TaskData
  currentMessageIndex: number
  onDivHeight: (height: number) => void
  mistakesByLevel: number[]
}

const ChatCurrentTask: FC<Props> = ({
  currentTask,
  currentMessageIndex,
  onDivHeight,
  mistakesByLevel,
}) => {
  const { transcript } = useVoiceRecognition(getVoiceRecognition)

  return (
    <>
      {currentTask.taskType !== 'grammar' && currentTask.taskType !== 'dialog' && (
        <div className={style.currentTask}>
          <div className={style.header}>{currentTask.taskDescription}</div>
          <div className={style.arrowDown}></div>
          <div className={style.bubbleContainer}>
            {(currentTask.taskType === 'translate' ||
              currentTask.taskType === 'omittedwords') && (
              <TranslateBubble
                utteranceType="taskDescription"
                textType={currentTask.taskType}
                isCurrentTask={true}
                taskText={currentTask.taskText}
                correctText={currentTask.correctText as string}
                mistakesByLevel={mistakesByLevel}
              />
            )}
            {currentTask.taskType === 'dictation' && (
              <TranslateBubble
                sentenceAudioPath={currentTask.sentenceAudioPath}
                utteranceType="taskDescription"
                textType={currentTask.taskType}
                isCurrentTask={true}
                taskText={currentTask.taskText}
                correctText={currentTask.correctText as string}
                mistakesByLevel={mistakesByLevel}
              />
            )}
            {currentTask.taskType === 'mistakecorrection' && (
              <TranslateBubble
                utteranceType="taskDescription"
                textType={currentTask.taskType}
                isCurrentTask={true}
                taskText={currentTask.mistakeTaskText}
                correctText={currentTask.correctText as string}
                mistakesByLevel={mistakesByLevel}
              />
            )}
            {currentTask.taskType === 'replay' && (
              <TranslateBubble
                utteranceType="taskDescription"
                textType={currentTask.taskType}
                isCurrentTask={true}
                taskText={currentTask.taskText}
                correctText={currentTask.correctText as string}
                mistakesByLevel={mistakesByLevel}
              />
            )}
            <Hint />
          </div>
        </div>
      )}

      {currentTask.taskType === 'grammar' && (
        <div className={style.currentTask}>
          <Grammar
            onDivHeight={onDivHeight}
            taskText={currentTask.taskText}
            mistakesByLevel={mistakesByLevel}
          />
        </div>
      )}

      {currentTask.taskType === 'dialog' && (
        <div className={style.currentTask}>
          <Dialog
            isHistory={false}
            currentTask={currentTask}
            currentMessageIndex={currentMessageIndex}
            dialogArrayTo={currentTask.correctText as string[]}
            dialogArrayFrom={currentTask.taskText as string}
            mistakesByLevel={mistakesByLevel}
          />
        </div>
      )}
      <div className={style.prompts}>{transcript}</div>
    </>
  )
}

export default ChatCurrentTask
