import { ReactElement } from 'react'
import { TaskData } from '../../utils/lessons/getTask'
import { DialogInput } from './Dialog'
import { GrammarButton } from './Grammar'
import { MistakeCorrectionTask } from './MistakeCorrection'
import { TaskInputContainer } from './TaskInputContainer'

type CommonProps = {
  userId: string | null
  token: string | null
  languageTo: string | string[]
  languageFrom: string | string[]
  courseId: string
  setCurrentTaskNumber: (taskNumber: number) => void
  currentTaskNumber: number
  currentTask: TaskData
  completedTasks: TaskData[] | undefined
  setCompletedTasks: (tasks: TaskData[]) => void
}

type CurrentTaskInputProps = {
  commonProps: CommonProps
  setIsHintShown: (isShown: boolean) => void
  setHintText: (text: string) => void
  currentMessageIndex?: number
  setCurrentMessageIndex?: (messageIndex: number) => void
}

const CurrentTaskInput = ({
  commonProps,
  setIsHintShown,
  setHintText,
  currentMessageIndex,
  setCurrentMessageIndex,
}: CurrentTaskInputProps): ReactElement | null => {
  switch (commonProps.currentTask.taskType) {
    case 'translate':
    case 'dictation':
    case 'omittedwords':
    case 'replay':
      return commonProps ? (
        <TaskInputContainer
          {...commonProps}
          taskType={commonProps.currentTask.taskType}
          setIsHintShown={setIsHintShown}
          setHintText={setHintText}
        />
      ) : null
    case 'dialog':
      return commonProps &&
        currentMessageIndex !== undefined &&
        setCurrentMessageIndex ? (
        <DialogInput
          {...commonProps}
          currentMessageIndex={currentMessageIndex}
          setCurrentMessageIndex={setCurrentMessageIndex}
          setIsHintShown={setIsHintShown}
          setHintText={setHintText}
        />
      ) : null
    case 'mistakecorrection':
      return commonProps ? (
        <MistakeCorrectionTask
          {...commonProps}
          setIsHintShown={setIsHintShown}
          setHintText={setHintText}
        />
      ) : null
    case 'grammar':
      return commonProps ? <GrammarButton {...commonProps} /> : null
    default:
      return null
  }
}

export default CurrentTaskInput
