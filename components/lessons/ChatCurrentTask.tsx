import { FC } from 'react'
import { Hint } from './Hint'
import { Dialog } from './Dialog'
import { Grammar } from './Grammar'
import { TaskData } from '@utils/lessons/getTask'
import style from './ChatCurrentTask.module.scss'
import { TranslateBubble } from './chatBubbles/TranslateBubble'

interface Props {
  currentTask: TaskData
  isHintShown: boolean
  hintText: string
  currentMessageIndex: number
  onDivHeight: (height: number) => void
  mistakesByLevel: number[]
  finalTranscript: string
}

const ChatCurrentTask: FC<Props> = ({
  currentTask,
  isHintShown,
  hintText,
  currentMessageIndex,
  onDivHeight,
  mistakesByLevel,
  finalTranscript
}) => {
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
                // answers={currentTask.answers}
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
            <Hint isHintShown={isHintShown} hintText={hintText} />
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
            isHintShown={isHintShown}
            hintText={hintText}
            mistakesByLevel={mistakesByLevel}
          />
        </div>
      
      )}
      <div className={style.prompts}>{finalTranscript}</div>
    </>
  )
}

export default ChatCurrentTask
