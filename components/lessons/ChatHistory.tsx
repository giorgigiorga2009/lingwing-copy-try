import { FC } from 'react'
import { Dialog } from './Dialog'
import { Grammar } from './Grammar'
import style from './ChatHistory.module.scss'
import { TaskData } from '@utils/lessons/getTask'
import { TranslateBubble } from './chatBubbles/TranslateBubble'

interface HistoryProps {
  completedTasks: TaskData[]
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
                <TranslateBubble
                  utteranceType="taskDescription"
                  textType={taskType}
                  isCurrentTask={false}
                  taskText={task.taskText}
                  correctText={task.correctText as string}
                  mistakesByLevel={task.answers}
                />
                <TranslateBubble
                  utteranceType="answer"
                  textType={taskType}
                  isCurrentTask={false}
                  taskText={task.taskText}
                  correctText={task.correctText as string}
                  mistakesByLevel={task.answers}
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
                  mistakesByLevel={task.answers}
                />
                <TranslateBubble
                  utteranceType="answer"
                  textType={taskType}
                  isCurrentTask={false}
                  taskText={task.taskText}
                  correctText={task.correctText as string}
                  mistakesByLevel={task.answers}
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
                  mistakesByLevel={task.answers}
                />
                <TranslateBubble
                  utteranceType="answer"
                  textType={taskType}
                  isCurrentTask={false}
                  taskText={task.mistakeTaskText}
                  correctText={task.correctText as string}
                  mistakesByLevel={task.answers}
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
                  mistakesByLevel={task.answers}
                />
                <TranslateBubble
                  utteranceType="answer"
                  textType={taskType}
                  isCurrentTask={false}
                  taskText={task.taskText}
                  correctText={task.correctText as string}
                  mistakesByLevel={task.answers}
                />
              </>
            )}
            {taskType === 'dialog' && (
              <Dialog
                dialogArrayTo={task.correctText as string[]}
                dialogArrayFrom={task.taskText as string}
                isHistory={true}
                mistakesByLevel={task.answers}
              />
            )}
            {taskType === 'grammar' && (
              <Grammar
                taskText={task.taskText}
                mistakesByLevel={task.answers}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ChatHistory
