import { ReactElement } from 'react'
import { DialogInput } from './Dialog'
import { GrammarButton } from './Grammar'
import { OmittedWords } from './OmittedWords'
import { TaskInputContainer } from './TaskInputContainer'
import { MistakeCorrectionTask } from './MistakeCorrection'
import { CommonProps } from '@utils/lessons/taskInputUtils'

type CurrentTaskInputProps = {
  commonProps: CommonProps | null
  currentMessageIndex?: number
  setCurrentMessageIndex?: (messageIndex: number) => void
}

const CurrentTaskInput = ({
  commonProps,
  currentMessageIndex,
  setCurrentMessageIndex,
}: CurrentTaskInputProps): ReactElement | null => {
  if (!commonProps) return null
  console.log(
    'commonProps.currentTask.taskType->',
    commonProps.currentTask.taskType,
  )

  switch (commonProps.currentTask.taskType) {
    case 'translate':
    case 'dictation':
    case 'replay':
      return (
        <>
          {/* {console.log('1')} */}
          <TaskInputContainer
            commonProps={commonProps}
            taskType={commonProps.currentTask.taskType}
          />
        </>
      )
    case 'dialog':
      return currentMessageIndex !== undefined && setCurrentMessageIndex ? (
        <>
          {console.log('2')}
          <DialogInput
            commonProps={commonProps}
            currentMessageIndex={currentMessageIndex}
            setCurrentMessageIndex={setCurrentMessageIndex}
          />
        </>
      ) : null

    case 'omittedwords':
      return (
        <>
          {console.log('3')} <OmittedWords commonProps={commonProps} />
        </>
      )
    case 'mistakecorrection':
      return (
        <>
          {console.log('4')} <MistakeCorrectionTask commonProps={commonProps} />
        </>
      )
    case 'grammar':
      return (
        <>
          {console.log('5')}
          <GrammarButton commonProps={commonProps} />
        </>
      )
    default:
      return null
  }
}

export default CurrentTaskInput
