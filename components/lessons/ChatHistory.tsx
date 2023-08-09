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

const ChatHistory: FC<HistoryProps> = ({ completedTasks }) => {
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
                />
                <DictationBubble
                  type="answer"
                  isCurrentTask={false}
                  taskText={task.taskText}
                  correctText={task.correctText as string}
                />
              </>
            )}
            {(taskType === 'translate' || taskType === 'omittedwords') && (
              <>
                <TranslateBubble
                  utteranceType="taskDescription"
                  textType={taskType}
                  isCurrentTask={false}
                  taskText={task.taskText}
                  correctText={task.correctText as string}
                />
                <TranslateBubble
                  utteranceType="answer"
                  textType={taskType}
                  isCurrentTask={false}
                  taskText={task.taskText}
                  correctText={task.correctText as string}
                />
              </>
            )}

            {taskType === 'mistakecorrection' && (
              <>
                <TranslateBubble
                  utteranceType="taskDescription"
                  textType={taskType}
                  isCurrentTask={false}
                  taskText={task.mistakeTaskText}
                  correctText={task.correctText as string}
                />
                <TranslateBubble
                  utteranceType="answer"
                  textType={taskType}
                  isCurrentTask={false}
                  taskText={task.mistakeTaskText}
                  correctText={task.correctText as string}
                />
              </>
            )}

            {taskType === 'replay' && (
              <>
                <TranslateBubble
                  utteranceType="taskDescription"
                  textType={taskType}
                  isCurrentTask={false}
                  taskText={task.taskText}
                  correctText={task.correctText as string}
                />
                <TranslateBubble
                  utteranceType="answer"
                  textType={taskType}
                  isCurrentTask={false}
                  taskText={task.taskText}
                  correctText={task.correctText as string}
                />
              </>
            )}
            {taskType === 'dialog' && (
              <Dialog
                dialogArrayTo={task.correctText as string[]}
                dialogArrayFrom={task.taskText as string}
                isHistory={true}
                isHintShown={false}
                hintText={''}
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
