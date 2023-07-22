import { FC } from 'react'
import { Dialog } from './Dialog'
import { Grammar } from './Grammar'
import { TaskData } from '@utils/lessons/getTask'
import style from './ChatCurrentTask.module.scss'
import { DictationBubble } from './chatBubbles/DictationBubble'
import { TranslateBubble } from './chatBubbles/TranslateBubble'

interface Props {
  currentTask: TaskData
  isHintShown: boolean
  hintText: string
  currentMessageIndex: number
  onDivHeight: (height: number) => void
}

const ChatCurrentTask: FC<Props> = ({
  currentTask,
  isHintShown,
  hintText,
  currentMessageIndex,
  onDivHeight,
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
                isCurrentTask={true}
                taskText={currentTask.taskText}
                correctText={currentTask.correctText as string}
                //isHintShown={isHintShown}
              />
            )}
            {currentTask.taskType === 'dictation' && (
              <DictationBubble
                sentenceAudioPath={currentTask.sentenceAudioPath}
                type="taskDescription"
                isCurrentTask={true}
                taskText={currentTask.taskText}
                correctText={currentTask.correctText as string}
                //isHintShown={isHintShown}
              />
            )}
            {currentTask.taskType === 'mistakecorrection' && (
              <TranslateBubble
                utteranceType="taskDescription"
                isCurrentTask={true}
                taskText={currentTask.mistakeTaskText}
                correctText={currentTask.correctText as string}
                // isHintShown={isHintShown}
              />
            )}
            {currentTask.taskType === 'replay' && (
              <TranslateBubble
                utteranceType="taskDescription"
                textType="replay"
                isCurrentTask={true}
                taskText={currentTask.taskText}
                correctText={currentTask.correctText as string}
                //isHintShown={isHintShown}
              />
            )}
            <div className={isHintShown ? style.hint : style.hidden}>
              Hint: <span className={style.hintText}>{hintText}</span>
            </div>
          </div>
        </div>
      )}

      {currentTask.taskType === 'grammar' && (
        <div className={style.currentTask}>
          <Grammar onDivHeight={onDivHeight} taskText={currentTask.taskText} />
        </div>
      )}

      {currentTask.taskType === 'dialog' && (
        <div className={style.currentTask}>
          <div className={style.bubbleContainer}>
            <Dialog
              isHistory={false}
              currentMessageIndex={currentMessageIndex}
              dialogArray={currentTask.correctText as string[]}
            />
            <div className={isHintShown ? style.hint : style.hidden}>
              Hint: <span className={style.hintText}>{hintText}</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatCurrentTask
