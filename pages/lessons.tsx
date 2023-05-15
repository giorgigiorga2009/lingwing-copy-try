import {
  CourseObject,
  getTasks,
  getUserCourse,
  TaskData,
} from '@utils/lessons/getTask'
import {
  getCurrentLanguageCoursesList,
  LanguageCourse,
} from '@utils/lessons/getLanguageCoursesList'
import { NextPage } from 'next'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import style from './lessons.module.scss'
import { getUserId } from '@utils/getUserId'
import { Header } from '@components/header/Header'
import { useEffect, useState, useRef } from 'react'
import ProgressBar from '@components/lessons/ProgressBar'
import ChatHistory from '@components/lessons/ChatHistory'
import { SoundCheck } from '@components/lessons/SoundCheck'
import ChatCurrentTask from '@components/lessons/ChatCurrentTask'
import CurrentTaskInput from '@components/lessons/CurrentTaskInput'
import { CoursesDropdown } from '@components/lessons/CoursesDropdown'

const Lessons: NextPage = () => {
  const [tasksData, setTasksData] = useState<TaskData[]>()
  const [currentTask, setCurrentTask] = useState<TaskData>()
  const [currentTaskNumber, setCurrentTaskNumber] = useState(0)
  const [token, setToken] = useState<string | null>(null)
  const [userId, setUserId] = useState<string>('')
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

  const chatWrapperRef = useRef<HTMLDivElement>(null)
  const chatRef = useRef<HTMLDivElement>(null)

  const router = useRouter()
  const { courseName, languageTo, languageFrom } = router.query // Destructure courseName, languageTo, and languageFrom from the router query object

  // Use localStorage to set the token state
  useEffect(() => {
    setToken(localStorage.getItem('authToken'))
    const userId = Cookies.get('userId')
    userId && setUserId(userId)
  }, [])

  //get userId
  useEffect(() => {
    if (!languageFrom || !languageTo || !courseName || token || userId) return
    getUserId({ languageFrom, languageTo, courseName }).then(response => {
      if (!response) return
      setUserId(response)
      Cookies.set('userId', response)
    })
  }, [languageTo])

  // Use the languageFrom, languageTo, courseName, and token states to get the user's course ID
  useEffect(() => {
    if (!languageFrom || !languageTo || !courseName || (!token && !userId))
      return
    getUserCourse({ languageFrom, languageTo, courseName, token, userId }).then(
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
    if (!languageFrom || !languageTo || !courseName || (!token && !courseId))
      return
    getTasks({
      languageFrom,
      languageTo,
      courseName,
      token,
      courseId,
      userId,
    }).then(response => setTasksData(response))
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
  }, [currentTaskNumber, tasksData])

  useEffect(() => {
    if (!currentTask) return
  }, [currentTask])

  //fetch new portion of tasks
  useEffect(() => {
    if (
      !languageFrom ||
      !languageTo ||
      !courseName ||
      (!token && !userId) ||
      !courseId ||
      !tasksData
    )
      return
    if (currentTaskNumber === tasksData?.length) {
      getTasks({
        languageFrom,
        languageTo,
        courseName,
        token,
        courseId,
        userId,
      }).then(response => {
        const newDataArray = [...tasksData, ...response]
        setTasksData(newDataArray)
      })
    }
  }, [currentTask])

  useEffect(() => {
    if (chatWrapperRef.current && chatRef.current) {
      console.log(chatRef.current.scrollHeight, 'chatRef')
      console.log(chatWrapperRef.current.scrollHeight, 'chatWrap')

      chatRef.current.scrollTop = chatWrapperRef.current.scrollHeight
    }
    // if (taskRef.current) {
    //   console.log('useEffect')
    //   taskRef.current.scrollIntoView({ behavior: "smooth" });
    // }
  }, [completedTasks, isHintShown])

  const arePropsDefined =
    (token !== undefined || userId !== undefined) &&
    languageTo !== undefined &&
    languageFrom !== undefined &&
    currentTask !== undefined

  const commonProps = arePropsDefined
    ? {
        userId,
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

  return (
    <div className={style.container}>
      <Header size="s" />

      {!isSoundChecked && (
        <SoundCheck
          setSoundChecked={setSoundChecked}
          soundChecked={isSoundChecked}
        />
      )}

      {isSoundChecked && (
        <div className={style.content}>
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
          <div ref={chatRef} className={style.chat}>
            <div ref={chatWrapperRef} className={style.chatWrapper}>
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
              {/* {!currentTask && <div className={style.blankBubble} />} */}
            </div>
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
      )}
    </div>
  )
}

export default Lessons
