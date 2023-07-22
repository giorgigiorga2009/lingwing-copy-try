import { FC } from 'react'
import { Dialog } from './Dialog'
import { Grammar } from './Grammar'
import style from './ChatHistory.module.scss'
import { TaskData } from '@utils/lessons/getTask'
import { DictationBubble } from './chatBubbles/DictationBubble'
import { TranslateBubble } from './chatBubbles/TranslateBubble'

interface HistoryProps {
  completedTasks: TaskData[]
  isHintShown: boolean
}

const ChatHistory: FC<HistoryProps> = ({ completedTasks, isHintShown }) => {
  return (
    <div className={style.chatHistoryContainer}>
      {completedTasks.map(task => {
        const taskType = task.taskType
        return (
          <div key={task.ordinalNumber} className={style.chatHistory}>
            {taskType === 'dictation' && (
              <>
                <DictationBubble
                  type="taskDescription"
                  isCurrentTask={false}
                  taskText={task.taskText}
                  correctText={task.correctText as string}
                  // isHintShown={isHintShown}
                />
                <DictationBubble
                  type="answer"
                  isCurrentTask={false}
                  taskText={task.taskText}
                  correctText={task.correctText as string}
                  //isHintShown={isHintShown}
                />
              </>
            )}
            {(taskType === 'translate' || taskType === 'omittedwords') && (
              <>
                <TranslateBubble
                  utteranceType="taskDescription"
                  isCurrentTask={false}
                  taskText={task.taskText}
                  correctText={task.correctText as string}
                  // isHintShown={isHintShown}
                />
                <TranslateBubble
                  utteranceType="answer"
                  isCurrentTask={false}
                  taskText={task.taskText}
                  correctText={task.correctText as string}
                  // isHintShown={isHintShown}
                />
              </>
            )}

            {taskType === 'mistakecorrection' && (
              <>
                <TranslateBubble
                  utteranceType="taskDescription"
                  isCurrentTask={false}
                  taskText={task.mistakeTaskText}
                  correctText={task.correctText as string}
                  //isHintShown={isHintShown}
                />
                <TranslateBubble
                  utteranceType="answer"
                  isCurrentTask={false}
                  taskText={task.mistakeTaskText}
                  correctText={task.correctText as string}
                  //isHintShown={isHintShown}
                />
              </>
            )}

            {taskType === 'replay' && (
              <>
                <TranslateBubble
                  utteranceType="taskDescription"
                  textType="replay"
                  isCurrentTask={false}
                  taskText={task.taskText}
                  correctText={task.correctText as string}
                  //isHintShown={isHintShown}
                />
                <TranslateBubble
                  utteranceType="answer"
                  textType="replay"
                  isCurrentTask={false}
                  taskText={task.taskText}
                  correctText={task.correctText as string}
                  //isHintShown={isHintShown}
                />
              </>
            )}
            {taskType === 'dialog' && (
              <Dialog
                dialogArray={task.correctText as string[]}
                isHistory={true}
              />
            )}
            {taskType === 'grammar' && <Grammar taskText={task.taskText} />}
          </div>
        )
      })}
    </div>
  )
}

export default ChatHistory
