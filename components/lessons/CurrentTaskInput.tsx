import { ReactElement } from 'react'
import { DialogInput } from './Dialog'
import { GrammarButton } from './Grammar'
import { OmittedWords } from './OmittedWords'
import { TaskInputContainer } from './TaskInputContainer'
import { MistakeCorrectionTask } from './MistakeCorrection'
import { CommonProps } from '@utils/lessons/taskInputUtils'

type CurrentTaskInputProps = {
  commonProps: CommonProps
  setIsHintShown: (bool: boolean) => void
  setHintText: (text: string) => void
  isHintShown: boolean
  currentMessageIndex?: number
  setCurrentMessageIndex?: (messageIndex: number) => void
}

const CurrentTaskInput = ({
  commonProps,
  isHintShown,
  setIsHintShown,
  setHintText,
  currentMessageIndex,
  setCurrentMessageIndex,
}: CurrentTaskInputProps): ReactElement | null => {
  switch (commonProps.currentTask.taskType) {
    case 'translate':
    case 'dictation':
    case 'replay':
      return commonProps ? (
        <TaskInputContainer
          commonProps={commonProps}
          isHintShown={isHintShown}
          setHintText={setHintText}
          setIsHintShown={setIsHintShown}
          taskType={commonProps.currentTask.taskType}
        />
      ) : null
    case 'dialog':
      return commonProps &&
        currentMessageIndex !== undefined &&
        setCurrentMessageIndex ? (
        <DialogInput
          setHintText={setHintText}
          isHintShown={isHintShown}
          commonProps={commonProps}
          setIsHintShown={setIsHintShown}
          currentMessageIndex={currentMessageIndex}
          setCurrentMessageIndex={setCurrentMessageIndex}
        />
      ) : null

    case 'omittedwords':
      return commonProps ? (
        <OmittedWords
          isHintShown={isHintShown}
          commonProps={commonProps}
          setHintText={setHintText}
          setIsHintShown={setIsHintShown}
        />
      ) : null
    case 'mistakecorrection':
      return commonProps ? (
        <MistakeCorrectionTask
          commonProps={commonProps}
          setHintText={setHintText}
          setIsHintShown={setIsHintShown}
        />
      ) : null
    case 'grammar':
      return commonProps ? <GrammarButton commonProps={commonProps} /> : null
    default:
      return null
  }
}

export default CurrentTaskInput
