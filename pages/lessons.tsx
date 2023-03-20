import classNames from 'classnames'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Header } from '../components/header/Header'
import { TaskInputContainer } from '../components/lessons/TaskInputContainer'
import style from './lessons.module.scss'
import {
  CourseObject,
  getTasks,
  getUserCourse,
  TaskData,
} from '../utils/lessons/getTask'
import { Dialog, DialogInput } from '../components/lessons/Dialog'
import { useRouter } from 'next/router'
import { MistakeCorrectionTask } from '../components/lessons/MistakeCorrection'
import { Grammar, GrammarButton } from '../components/lessons/Grammar'
import { DictationBubble } from '../components/lessons/chatBubbles/DictationBubble'
import { TranslateBubble } from '../components/lessons/chatBubbles/TranslateBubble'
import { SoundCheck } from '../components/lessons/SoundCheck'
import {
  getCurrentLanguageCoursesList,
  LanguageCourse,
} from '../utils/lessons/getLanguageCoursesList'
import { CoursesDropdown } from '../components/lessons/CoursesDropdown'

const Lessons: NextPage = () => {
  const [tasksData, setTasksData] = useState<TaskData[]>()
  const [currentTask, setCurrentTask] = useState<TaskData>()
  const [currentTaskType, setCurrentTaskType] = useState<TaskData['taskType']>()
  const [currentTaskNumber, setCurrentTaskNumber] = useState(0)
  const [token, setToken] = useState<string | null>(null)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [courseId, setCourseId] = useState('')
  const [completedTasks, setCompletedTasks] = useState<TaskData[]>()
  const [isSoundChecked, setSoundChecked] = useState(false)
  const [isHintShown, setIsHintShown] = useState(false)
  const [hintText, setHintText] = useState('')
  const [currentLanguageCoursesList, setCurrentLanguageCoursesList] = useState<
    LanguageCourse[] | undefined
  >()
  const [userScore, setUserScore] = useState(0)
  const [currentCourseObject, setCurrentCourseObject] = useState<CourseObject>()

  const router = useRouter()
  const { courseName, languageTo, languageFrom } = router.query // Destructure courseName, languageTo, and languageFrom from the router query object

  // Use localStorage to set the token state
  useEffect(() => {
    setToken(localStorage.getItem('authToken'))
  }, [])

  // Use the languageFrom, languageTo, courseName, and token states to get the user's course ID
  useEffect(() => {
    if (!languageFrom || !languageTo || !courseName || !token) return
    getUserCourse({ languageFrom, languageTo, courseName, token }).then(
      courseObject => {
        if (courseObject) {
          setCurrentCourseObject(courseObject)
          setCourseId(courseObject._id)
          setUserScore(courseObject.score)
        }
      },
    )
  }, [languageFrom, languageTo, courseName, token])

  // Use the languageFrom, languageTo, courseName, token, and courseId states to get the tasks data
  useEffect(() => {
    if (!languageFrom || !languageTo || !courseName || !token || !courseId)
      return
    getTasks({ languageFrom, languageTo, courseName, token, courseId }).then(
      response => setTasksData(response),
    )
  }, [courseId])

  useEffect(() => {
    if (
      !languageFrom ||
      !languageTo ||
      !courseName ||
      !token ||
      !courseId ||
      !currentCourseObject
    )
      return
    getCurrentLanguageCoursesList({
      languageFrom,
      languageTo,
      token,
      languageCourseId: currentCourseObject.course._id,
      languageId: currentCourseObject.course.iLearn._id,
    }).then(currentCoursesList =>
      setCurrentLanguageCoursesList(currentCoursesList),
    )
  }, [courseId])

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

  //fetch new portion of tasks
  useEffect(() => {
    if (
      !languageFrom ||
      !languageTo ||
      !courseName ||
      !token ||
      !courseId ||
      !tasksData
    )
      return
    if (currentTaskNumber === tasksData?.length - 1) {
      getTasks({ languageFrom, languageTo, courseName, token, courseId }).then(
        response => {
          console.log(response, 'RESPONSE')
          const slicedResponse = response.slice(1)
          const newDataArray =
            response.length > 1
              ? [...tasksData, ...slicedResponse]
              : [...tasksData, ...response]
          setTasksData(newDataArray)
        },
      )
    }
  }, [currentTaskNumber])

  // Constant for conditional rendering
  const isShown =
    currentTask !== undefined &&
    languageTo !== undefined &&
    languageFrom !== undefined

  // console.log(currentTask, 'currentTask')
  // console.log(currentTaskNumber, 'currentTaskNumber')
  // console.log(tasksData?.length, 'tasksLength')
  // console.log(tasksData, 'tasksData')

  // console.log(isShown, 'ISSHOWN')
  // console.log(currentTaskType, 'currentTaskType')

  return (
    <div className={style.container}>
      <Header size="s" />
      <div className={style.rating} />
      <div className={style.content}>
        {/* <SoundCheck setSoundChecked={setSoundChecked} soundChecked={isSoundChecked} /> */}

        {/* <div className={style.foldersContainer}>
          <span className={style.course}>Course</span>
          <span className={style.folderName}>Grammar</span>
          <span className={style.folderName}>Levels</span>
          <span className={style.folderName}>Statistics</span>
        </div> */}
        {currentCourseObject && (
          <div className={classNames(style.progressBar, style.ratingStyle)}>
            <div className={style.scoreContainer}>
              <span className={style.scoreText}>
                Score: <span className={style.scoreNumber}>{userScore}</span>{' '}
              </span>
              <span className={style.percent}>
                {parseFloat(currentCourseObject.percent).toFixed(1)}%
              </span>
            </div>
            <div className={style.progressContainer}>
              <span className={style.progress} />
            </div>
          </div>
        )}
        {currentLanguageCoursesList && (
          <CoursesDropdown
            languageCoursesList={currentLanguageCoursesList}
            languageTo={languageTo as string}
          />
        )}

        {isShown && (
          <div className={style.chat}>
            {/* render completedTasks */}
            {completedTasks &&
              completedTasks.map(task => {
                const taskType = task.taskType
                return (
                  <div key={task.ordinalNumber} className={style.chatHistory}>
                    {taskType === 'dictation' && (
                      <>
                        <DictationBubble
                          sentenceAudioPath={task.sentenceAudioPath}
                          type="taskDescription"
                          currentTask={false}
                          taskText={task.taskText}
                          correctText={task.correctText as string}
                          taskDescription={task.taskDescription}
                          isHintShown={isHintShown}
                        />
                        <DictationBubble
                          sentenceAudioPath={currentTask.sentenceAudioPath}
                          type="answer"
                          currentTask={false}
                          taskText={task.taskText}
                          correctText={task.correctText as string}
                          taskDescription={task.taskDescription}
                          isHintShown={isHintShown}
                        />
                      </>
                    )}
                    {(taskType === 'translate' ||
                      taskType === 'omittedwords') && (
                      <>
                        <TranslateBubble
                          utteranceType="taskDescription"
                          currentTask={false}
                          taskText={task.taskText}
                          correctText={task.correctText as string}
                          taskDescription={task.taskDescription}
                          isHintShown={isHintShown}
                        />
                        <TranslateBubble
                          utteranceType="answer"
                          currentTask={false}
                          taskText={task.taskText}
                          correctText={task.correctText as string}
                          taskDescription={task.taskDescription}
                          isHintShown={isHintShown}
                        />
                      </>
                    )}

                    {taskType === 'mistakecorrection' && (
                      <>
                        <TranslateBubble
                          utteranceType="taskDescription"
                          currentTask={false}
                          taskText={task.mistakeTaskText}
                          correctText={task.correctText as string}
                          taskDescription={task.taskDescription}
                          isHintShown={isHintShown}
                        />
                        <TranslateBubble
                          utteranceType="answer"
                          currentTask={false}
                          taskText={task.mistakeTaskText}
                          correctText={task.correctText as string}
                          taskDescription={task.taskDescription}
                          isHintShown={isHintShown}
                        />
                      </>
                    )}

                    {taskType === 'replay' && (
                      <>
                        <TranslateBubble
                          utteranceType="taskDescription"
                          textType="replay"
                          currentTask={false}
                          taskText={task.taskText}
                          correctText={task.correctText as string}
                          taskDescription={task.taskDescription}
                          isHintShown={isHintShown}
                        />
                        <TranslateBubble
                          utteranceType="answer"
                          textType="replay"
                          currentTask={false}
                          taskText={task.taskText}
                          correctText={task.correctText as string}
                          taskDescription={task.taskDescription}
                          isHintShown={isHintShown}
                        />
                      </>
                    )}
                    {taskType === 'dialog' && (
                      <>
                        <Dialog
                          currentMessageIndex={currentMessageIndex}
                          dialogArray={task.correctText as string[]}
                          isHistory={true}
                        />
                      </>
                    )}
                    {taskType === 'grammar' && (
                      <>
                        <Grammar taskText={task.taskText} />
                      </>
                    )}
                  </div>
                )
              })}

            {/* render current task  */}
            {(currentTaskType === 'translate' ||
              currentTaskType === 'omittedwords') && (
              <div className={style.currentTask}>
                <TranslateBubble
                  utteranceType="taskDescription"
                  currentTask={true}
                  taskText={currentTask.taskText}
                  correctText={currentTask.correctText as string}
                  taskDescription={currentTask.taskDescription}
                  isHintShown={isHintShown}
                />
                <div className={isHintShown ? style.hint : style.hidden}>
                  Hint: {hintText}
                </div>
              </div>
            )}

            {currentTaskType === 'mistakecorrection' && (
              <div className={style.currentTask}>
                <TranslateBubble
                  utteranceType="taskDescription"
                  currentTask={true}
                  taskText={currentTask.mistakeTaskText}
                  correctText={currentTask.correctText as string}
                  taskDescription={currentTask.taskDescription}
                  isHintShown={isHintShown}
                />
                <div className={isHintShown ? style.hint : style.hidden}>
                  Hint: {hintText}
                </div>
              </div>
            )}

            {currentTaskType === 'dialog' && (
              <div className={style.currentTask}>
                <Dialog
                  isHistory={false}
                  currentMessageIndex={currentMessageIndex}
                  dialogArray={currentTask.correctText as string[]}
                />
                <div className={isHintShown ? style.hint : style.hidden}>
                  Hint: {hintText}
                </div>
              </div>
            )}

            {currentTaskType === 'replay' && (
              <div className={style.currentTask}>
                <TranslateBubble
                  utteranceType="taskDescription"
                  textType="replay"
                  currentTask={true}
                  taskText={currentTask.taskText}
                  correctText={currentTask.correctText as string}
                  taskDescription={currentTask.taskDescription}
                  isHintShown={isHintShown}
                />
                <div className={isHintShown ? style.hint : style.hidden}>
                  Hint: {hintText}
                </div>
              </div>
            )}

            {currentTaskType === 'dictation' && (
              <div className={style.currentTask}>
                <DictationBubble
                  sentenceAudioPath={currentTask.sentenceAudioPath}
                  type="taskDescription"
                  currentTask={true}
                  taskText={currentTask.taskText}
                  correctText={currentTask.correctText as string}
                  taskDescription={currentTask.taskDescription}
                  isHintShown={isHintShown}
                />
                <div className={isHintShown ? style.hint : style.hidden}>
                  Hint: {hintText}
                </div>
              </div>
            )}

            {currentTaskType === 'grammar' && (
              <div className={style.currentTask}>
                <Grammar taskText={currentTask.taskText} />
              </div>
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
              setIsHintShown={setIsHintShown}
              setHintText={setHintText}
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
            setIsHintShown={setIsHintShown}
            setHintText={setHintText}
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
            setIsHintShown={setIsHintShown}
            setHintText={setHintText}
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
