import { ReactElement } from 'react'
import { DialogInput } from './Dialog'
import { GrammarButton } from './Grammar'
import { TaskInputContainer } from './TaskInputContainer'
import { MistakeCorrectionTask } from './MistakeCorrection'
import { CommonProps } from '@utils/lessons/taskInputUtils'

type CurrentTaskInputProps = {
  commonProps: CommonProps
  setIsHintShown: (bool: boolean) => void
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
          commonProps={commonProps}
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
          commonProps={commonProps}
          currentMessageIndex={currentMessageIndex}
          setCurrentMessageIndex={setCurrentMessageIndex}
          setIsHintShown={setIsHintShown}
          setHintText={setHintText}
        />
      ) : null
    case 'mistakecorrection':
      return commonProps ? (
        <MistakeCorrectionTask
          commonProps={commonProps}
          setIsHintShown={setIsHintShown}
          setHintText={setHintText}
        />
      ) : null
    case 'grammar':
      return commonProps ? <GrammarButton commonProps={commonProps} /> : null
    default:
      return null
  }
}

export default CurrentTaskInput
