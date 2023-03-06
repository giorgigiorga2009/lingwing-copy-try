import classNames from 'classnames'
import { NextPage } from 'next'
import { use, useEffect, useState } from 'react'
import { Header } from '../components/header/Header'
import { CourseDropdown } from '../components/lessons/CourseDropdown'
import { TaskInputContainer } from '../components/lessons/TaskInputContainer'
import style from './lessons.module.scss'
import { getTasks, getUserCourse, TaskData } from '../utils/lessons/getTask'
import { Dialog, DialogInput } from '../components/lessons/Dialog'
import { useRouter } from 'next/router'
import { MistakeCorrectionTask } from '../components/lessons/MistakeCorrection'
import { Grammar, GrammarButton } from '../components/lessons/Grammar'
import { DictationBubble } from '../components/lessons/chatBubbles/DictationBubble'
import { TranslateBubble } from '../components/lessons/chatBubbles/TranslateBubble'

const Lessons: NextPage = () => {
  const [start, setStart] = useState(false)
  const [tasksData, setTasksData] = useState<TaskData[]>()
  const [currentTask, setCurrentTask] = useState<TaskData>()
  const [currentTaskType, setCurrentTaskType] = useState<TaskData['taskType']>()
  const [currentTaskNumber, setCurrentTaskNumber] = useState(0)
  const [token, setToken] = useState<string | null>(null)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [courseId, setCourseId] = useState('')
  const [completedTasks, setCompletedTasks] = useState<TaskData[]>()

  const router = useRouter()
  const { courseName, languageTo, languageFrom } = router.query // Destructure courseName, languageTo, and languageFrom from the router query object

  // Use the tasksData and currentTaskNumber states to set the current task and its type
  useEffect(() => {
    if (!tasksData) return
    setCurrentTask(tasksData[currentTaskNumber])
    setCurrentTaskType(currentTask?.taskType)
  }, [currentTaskNumber, tasksData])

  useEffect(() => {
    if (!currentTask) return
    setCurrentTaskType(currentTask.taskType)
  }, [currentTask])

  // Use the languageFrom, languageTo, courseName, and token states to get the user's course ID
  useEffect(() => {
    if (!languageFrom || !languageTo || !courseName || !token) return
    getUserCourse({ languageFrom, languageTo, courseName, token }).then(
      courseId => setCourseId(courseId),
    )
  }, [languageFrom, languageTo, courseName])

  // Use localStorage to set the token state
  useEffect(() => {
    setToken(localStorage.getItem('authToken'))
  }, [])

  // Use the languageFrom, languageTo, courseName, token, and courseId states to get the tasks data
  useEffect(() => {
    if (!languageFrom || !languageTo || !courseName || !token || !courseId)
      return

    getTasks({ languageFrom, languageTo, courseName, token, courseId }).then(
      response => setTasksData(response),
    )
  }, [courseId])

  // const dialogData = () => {}

  // Constant for conditional rendering
  const isShown =
    currentTask !== undefined &&
    languageTo !== undefined &&
    languageFrom !== undefined

  console.log(currentTask, 'currentTask')
  // console.log(tasksData, 'tasksData')
  // console.log(isShown, 'ISSHOWN')
  // console.log(currentTaskType, 'currentTaskType')

  return (
    <div className={style.container}>
      <Header size="s" variant="task" timerTrigger={start} />
      <div className={style.rating} />

      {/* <SoundCheck /> */}
      <div className={style.content}>
        <div className={style.foldersContainer}>
          <span className={style.course}>Course</span>
          <span className={style.folderName}>Grammar</span>
          <span className={style.folderName}>Levels</span>
          <span className={style.folderName}>Statistics</span>
        </div>
        <div className={classNames(style.progressBar, style.ratingStyle)}>
          <div className={style.scoreContainer}>
            <span className={style.count}> 1/3140</span>
            <span className={style.scoreText}>
              Score: <span className={style.scoreNumber}>12 450</span>{' '}
            </span>
            <span className={style.percent}>0.1%</span>
          </div>
          <div className={style.progressContainer}>
            <span className={style.progress} />
          </div>
        </div>

        {isShown && (
          <div className={style.chat}>
            {/* render completedTasks */}
            {completedTasks &&
              completedTasks.map(task => {
                const taskType = task.taskType
                return (
                  <>
                    {taskType === 'dictation' && (
                      <div
                        className={style.chatHistory}
                        key={task.ordinalNumber}
                      >
                        <DictationBubble
                          sentenceAudioPath={task.sentenceAudioPath}
                          type="taskDescription"
                          currentTask={false}
                          taskText={task.taskText}
                          correctText={task.correctText as string}
                          taskDescription={task.taskDescription}
                        />
                        <DictationBubble
                          sentenceAudioPath={currentTask.sentenceAudioPath}
                          type="answer"
                          currentTask={false}
                          taskText={task.taskText}
                          correctText={task.correctText as string}
                          taskDescription={task.taskDescription}
                        />
                      </div>
                    )}
                    {(taskType === 'translate' ||
                      taskType === 'omittedwords' ||
                      taskType === 'mistakecorrection') && (
                      <div
                        className={style.chatHistory}
                        key={task.ordinalNumber}
                      >
                        <TranslateBubble
                          utteranceType="taskDescription"
                          currentTask={false}
                          taskText={task.taskText}
                          correctText={task.correctText as string}
                          taskDescription={task.taskDescription}
                        />
                        <TranslateBubble
                          utteranceType="answer"
                          currentTask={false}
                          taskText={task.taskText}
                          correctText={task.correctText as string}
                          taskDescription={task.taskDescription}
                        />
                      </div>
                    )}
                    {taskType === 'replay' && (
                      <div
                        className={style.chatHistory}
                        key={task.ordinalNumber}
                      >
                        <TranslateBubble
                          utteranceType="taskDescription"
                          textType="replay"
                          currentTask={false}
                          taskText={task.taskText}
                          correctText={task.correctText as string}
                          taskDescription={task.taskDescription}
                        />
                        <TranslateBubble
                          utteranceType="answer"
                          textType="replay"
                          currentTask={false}
                          taskText={task.taskText}
                          correctText={task.correctText as string}
                          taskDescription={task.taskDescription}
                        />
                      </div>
                    )}
                    {taskType === 'dialog' && (
                      <div
                        className={style.chatHistory}
                        key={task.ordinalNumber}
                      >
                        <Dialog
                          currentMessageIndex={currentMessageIndex}
                          dialogArray={task.correctText as string[]}
                          isHistory={true}
                        />
                      </div>
                    )}
                    {taskType === 'grammar' && (
                      <div
                        className={style.chatHistory}
                        key={task.ordinalNumber}
                      >
                        <Grammar taskText={task.taskText} />
                      </div>
                    )}
                  </>
                )
              })}

            {/* render current task  */}

            {(currentTaskType === 'translate' ||
              currentTaskType === 'omittedwords' ||
              currentTaskType === 'mistakecorrection') && (
              <TranslateBubble
                utteranceType="taskDescription"
                currentTask={true}
                taskText={currentTask.taskText}
                correctText={currentTask.correctText as string}
                taskDescription={currentTask.taskDescription}
              />
            )}

            {currentTaskType === 'dialog' && (
              <Dialog
                isHistory={false}
                currentMessageIndex={currentMessageIndex}
                dialogArray={currentTask.correctText as string[]}
              />
            )}

            {currentTaskType === 'replay' && (
              <TranslateBubble
                utteranceType="taskDescription"
                textType="replay"
                currentTask={true}
                taskText={currentTask.taskText}
                correctText={currentTask.correctText as string}
                taskDescription={currentTask.taskDescription}
              />
            )}

            {currentTaskType === 'dictation' && (
              <DictationBubble
                sentenceAudioPath={currentTask.sentenceAudioPath}
                type="taskDescription"
                currentTask={true}
                taskText={currentTask.taskText}
                correctText={currentTask.correctText as string}
                taskDescription={currentTask.taskDescription}
              />
            )}

            {currentTaskType === 'grammar' && (
              <Grammar taskText={currentTask.taskText} />
            )}
          </div>
        )}

        {/* Determine what type of input render  */}
        {isShown &&
          (currentTaskType === 'translate' ||
            currentTaskType === 'dictation' ||
            currentTaskType === 'omittedwords' ||
            currentTaskType === 'replay') && (
            <TaskInputContainer
              token={token}
              languageTo={languageTo}
              languageFrom={languageFrom}
              taskType={currentTaskType}
              currentTask={currentTask}
              courseId={courseId}
              completedTasks={completedTasks}
              setCompletedTasks={setCompletedTasks}
              setCurrentTaskNumber={setCurrentTaskNumber}
              currentTaskNumber={currentTaskNumber}
            />
          )}

        {isShown && currentTaskType === 'dialog' && (
          <DialogInput
            token={token}
            languageTo={languageTo}
            languageFrom={languageFrom}
            currentMessageIndex={currentMessageIndex}
            setCurrentMessageIndex={setCurrentMessageIndex}
            courseId={courseId}
            setCurrentTaskNumber={setCurrentTaskNumber}
            currentTaskNumber={currentTaskNumber}
            currentTask={currentTask}
            completedTasks={completedTasks}
            setCompletedTasks={setCompletedTasks}
          />
        )}

        {isShown && currentTaskType === 'mistakecorrection' && (
          <MistakeCorrectionTask
            token={token}
            languageTo={languageTo}
            languageFrom={languageFrom}
            courseId={courseId}
            setCurrentTaskNumber={setCurrentTaskNumber}
            currentTaskNumber={currentTaskNumber}
            currentTask={currentTask}
            completedTasks={completedTasks}
            setCompletedTasks={setCompletedTasks}
          />
        )}

        {isShown && currentTaskType === 'grammar' && (
          <GrammarButton
            token={token}
            languageTo={languageTo}
            languageFrom={languageFrom}
            courseId={courseId}
            setCurrentTaskNumber={setCurrentTaskNumber}
            currentTaskNumber={currentTaskNumber}
            currentTask={currentTask}
            completedTasks={completedTasks}
            setCompletedTasks={setCompletedTasks}
          />
        )}
      </div>
    </div>
  )
}

export default Lessons
