import { FC } from 'react'
import { TaskData } from '../../utils/lessons/getTask'
import { DictationBubble } from './chatBubbles/DictationBubble'
import { TranslateBubble } from './chatBubbles/TranslateBubble'
import { Dialog } from './Dialog'
import { Grammar } from './Grammar'
import style from './ChatCurrentTask.module.scss'

interface Props {
  currentTask: TaskData
  isHintShown: boolean
  hintText: string
  currentMessageIndex: number
  onDivHeight: (height: number) => void;
}
const ChatCurrentTask: FC<Props> = ({
  currentTask,
  isHintShown,
  hintText,
  currentMessageIndex,
  onDivHeight
}) => {
  return (
    <>
      {/* render current task  */}
      {(currentTask.taskType === 'translate' ||
        currentTask.taskType === 'omittedwords') && (
          <div className={style.currentTask}>
            <div className={style.bubbleContainer}>
              <TranslateBubble
                utteranceType="taskDescription"
                isCurrentTask={true}
                taskText={currentTask.taskText}
                correctText={currentTask.correctText as string}
                taskDescription={currentTask.taskDescription}
                isHintShown={isHintShown}
              />
              <div className={isHintShown ? style.hint : style.hidden}>
                Hint: {hintText}
              </div>
            </div>
          </div>
        )}

      {currentTask.taskType === 'mistakecorrection' && (
        <div className={style.currentTask}>
          <div className={style.bubbleContainer}>
            <TranslateBubble
              utteranceType="taskDescription"
              isCurrentTask={true}
              taskText={currentTask.mistakeTaskText}
              correctText={currentTask.correctText as string}
              taskDescription={currentTask.taskDescription}
              isHintShown={isHintShown}
            />
            <div className={isHintShown ? style.hint : style.hidden}>
              Hint: {hintText}
            </div>
          </div>

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
            Hint: {hintText}
          </div>
          </div>
        </div>
      )}

      {currentTask.taskType === 'replay' && (
        <div className={style.currentTask}>
          <div className={style.bubbleContainer}>

          <TranslateBubble
            utteranceType="taskDescription"
            textType="replay"
            isCurrentTask={true}
            taskText={currentTask.taskText}
            correctText={currentTask.correctText as string}
            taskDescription={currentTask.taskDescription}
            isHintShown={isHintShown}
          />
          <div className={isHintShown ? style.hint : style.hidden}>
            Hint: {hintText}
          </div>
          </div>
        </div>
      )}

      {currentTask.taskType === 'dictation' && (
        <div className={style.currentTask}>
          <div className={style.bubbleContainer}>

          <DictationBubble
            sentenceAudioPath={currentTask.sentenceAudioPath}
            type="taskDescription"
            isCurrentTask={true}
            taskText={currentTask.taskText}
            correctText={currentTask.correctText as string}
            taskDescription={currentTask.taskDescription}
            isHintShown={isHintShown}
          />
          <div className={isHintShown ? style.hint : style.hidden}>
            Hint: {hintText}
          </div>
          </div>
        </div>
      )}

      {currentTask.taskType === 'grammar' && (
        <div className={style.currentTask}>
          <Grammar onDivHeight={onDivHeight} taskText={currentTask.taskText} />
        </div>
      )}
    </>
  )
}

export default ChatCurrentTask
