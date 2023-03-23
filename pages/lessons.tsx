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
import { DialogInput } from '../components/lessons/Dialog'
import { useRouter } from 'next/router'
import { MistakeCorrectionTask } from '../components/lessons/MistakeCorrection'
import { GrammarButton } from '../components/lessons/Grammar'
import { SoundCheck } from '../components/lessons/SoundCheck'
import {
  getCurrentLanguageCoursesList,
  LanguageCourse,
} from '../utils/lessons/getLanguageCoursesList'
import { CoursesDropdown } from '../components/lessons/CoursesDropdown'
import ChatHistory from '../components/lessons/ChatHistory'
import ChatCurrentTask from '../components/lessons/ChatCurrentTask'
import ProgressBar from '../components/lessons/ProgressBar'
import CurrentTaskInput from '../components/lessons/CurrentTaskInput'

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
    if (currentTaskNumber === tasksData?.length) {
      getTasks({ languageFrom, languageTo, courseName, token, courseId }).then(
        response => {
          console.log(response, 'RESPONSE')
          const newDataArray = [...tasksData, ...response]
          setTasksData(newDataArray)
        },
      )
    }
  }, [currentTask])

  const arePropsDefined =
    token !== undefined &&
    languageTo !== undefined &&
    languageFrom !== undefined &&
    currentTask !== undefined

  const commonProps = arePropsDefined
    ? {
        token,
        languageTo,
        languageFrom,
        courseId,
        setCurrentTaskNumber,
        currentTaskNumber,
        currentTask,
        completedTasks,
        setCompletedTasks,
      }
    : null

  console.log(commonProps, 'PROPS')
  console.log(token, languageTo, languageFrom, currentTask, completedTasks)

  return (
    <div className={style.container}>
      <Header size="s" />
      <div className={style.content}>
        {/* <SoundCheck setSoundChecked={setSoundChecked} soundChecked={isSoundChecked} /> */}

        {/* <div className={style.foldersContainer}>
          <span className={style.course}>Course</span>
          <span className={style.folderName}>Grammar</span>
          <span className={style.folderName}>Levels</span>
          <span className={style.folderName}>Statistics</span>
        </div> */}

        {currentCourseObject && (
          <ProgressBar
            currentCourseObject={currentCourseObject}
            userScore={userScore}
          />
        )}

        {currentLanguageCoursesList && (
          <CoursesDropdown
            languageCoursesList={currentLanguageCoursesList}
            languageTo={languageTo as string}
          />
        )}
        {/* chat window */}
        <div className={style.chat}>
          <>
            {/* render done tasks */}
            {completedTasks && (
              <ChatHistory
                completedTasks={completedTasks}
                isHintShown={isHintShown}
              />
            )}

            {/* render current task or placeholder */}
            {currentTask && (
              <ChatCurrentTask
                currentTask={currentTask}
                currentMessageIndex={currentMessageIndex}
                isHintShown={isHintShown}
                hintText={hintText}
              />
            )}
            {!currentTask && <div className={style.blankBubble} />}
          </>
        </div>

        {/* Render needed type of input render or placeholder */}

        {!commonProps && (
          <div className={style.loadingInputContainer}>
            <div className={style.mistakes}> 0 </div>
            <input
              className={style.loadingInput}
              type="text"
              placeholder="Loading..."
            />
            <span className={style.micIcon} key="mic" />
          </div>
        )}

        {commonProps && (
          <CurrentTaskInput
            commonProps={commonProps}
            setIsHintShown={setIsHintShown}
            setHintText={setHintText}
            currentMessageIndex={currentMessageIndex}
            setCurrentMessageIndex={setCurrentMessageIndex}
          />
        )}
      </div>
    </div>
  )
}

export default Lessons
