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
import LearnMenu from '@components/lessons/learnMenu/LearnMenu'
import ChatCurrentTask from '@components/lessons/ChatCurrentTask'
import CurrentTaskInput from '@components/lessons/CurrentTaskInput'
import Wrapper from '@components/lessons/learnMenu/Wrapper'
import Ratings from '@components/lessons/usersRating/Ratings'
import {
  CourseObject,
  getTasks,
  getUserCourse,
  TaskData,
} from '@utils/lessons/getTask'
import { useSession } from 'next-auth/react'
import BackgroundParrot from '@components/shared/BackgroundParrot'
import CombinedModalComponent from '@components/lessons/combinedModals/combinedModals'

const Lessons: NextPage = () => {
  const [tasksData, setTasksData] = useState<TaskData[]>([])
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

  const [tab, setTab] = useState<
    'course' | 'levels' | 'grammar' | 'vocabulary' | 'levels' | 'statistics'
  >('course')

  const [userScore, setUserScore] = useState(0)
  const [currentCourseObject, setCurrentCourseObject] = useState<CourseObject>()
  const [grammarHeight, setGrammarHeight] = useState<number>(0)
  const [isGrammarHeightCalled, setIsGrammarHeightCalled] = useState(false)
  const chatWrapperRef = useRef<HTMLDivElement>(null)
  const chatRef = useRef<HTMLDivElement>(null)

  const [dailyTaskLeft, setDailyTaskLeft] = useState<number>(1)
  const [unAuthuserDailyLimit, setunAuthuserDailyLimit] = useState(1)
  const [dailyReachedLimitDate, setDailyReachedLimitDate] = useState<
    Date | string | undefined
  >()

  const router = useRouter()
  const { data: session } = useSession()
  const { courseName, languageTo, languageFrom } = router.query

  // Use localStorage to set the token state
  useEffect(() => {
    session && setToken(session?.user.accessToken)
    const getUserId = Cookies.get('userId')
    getUserId && setUserId(getUserId)
  }, [session])

  //get userId
  useEffect(() => {
    if (!languageFrom || !languageTo || !courseName) return

    getUserId({ languageFrom, languageTo, courseName, token })
      .then(response => {
        if (!response) return
        setUserId(response)
        Cookies.set('userId', response)
        return response
      })
      .catch(error => {
        console.error('Error fetching user course:', error)
        throw error
      })
  }, [languageTo, token])

  // Use the languageFrom, languageTo, courseName, and token states to get the user's course ID

  useEffect(() => {
    if (!languageFrom || !languageTo || !courseName || (!token && !userId))
      return

    getUserCourse({ languageFrom, languageTo, courseName, token, userId })
      .then(courseObject => {
        if (courseObject) {
          setCurrentCourseObject(courseObject)
          setCourseId(courseObject._id)
          setUserScore(courseObject.score)
          setDailyTaskLeft(courseObject.info.dailyTaskLeft)
          setunAuthuserDailyLimit(
            courseObject.course.configuration.unAuthUserDailyLimit,
          )
          setDailyReachedLimitDate(new Date(courseObject.dailyReachedLimitDate))
        }

        return courseObject
      })
      .catch(error => {
        console.error('Error fetching user course:', error)
        throw error
      })
  }, [languageFrom, languageTo, courseName, token, userId, currentTaskNumber])

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
    })
      .then(response => setTasksData(response))
      .catch(error => {
        console.error('Error fetching user course:', error)
        throw error
      })
  }, [courseId])

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
      })
        .then(response => {
          const newDataArray = [...tasksData, ...response]
          setTasksData(newDataArray)
          return response
        })
        .catch(error => {
          console.error('Error fetching user course:', error)
          throw error
        })
    }
  }, [currentTask])

  // Use the tasksData and currentTaskNumber states to set the current task and its type
  useEffect(() => {
    if (!tasksData) return
    setCurrentTask(tasksData[currentTaskNumber])
  }, [currentTaskNumber, tasksData])

  const handleGrammarHeight = (height: number) => {
    setGrammarHeight(height)
    setIsGrammarHeightCalled(true)
  }

  useEffect(() => {
    if (!chatWrapperRef.current || !chatRef.current) return
    if (isGrammarHeightCalled && grammarHeight === 0) return

    setTimeout(() => {
      if (chatWrapperRef.current && chatRef.current) {
        if (grammarHeight !== 0) {
          chatRef.current.scrollTop =
            chatWrapperRef.current.scrollHeight - grammarHeight
          setGrammarHeight(0)
        } else {
          chatRef.current.scrollTop = chatWrapperRef.current.scrollHeight
        }
      }
    }, 200)

    setIsGrammarHeightCalled(false)
  }, [isHintShown, currentTask, isGrammarHeightCalled])

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

  const isUserLoggedIn = !!token

  return (
    <div className={style.container}>
      <Header size="s" />

      <CombinedModalComponent
        token={token}
        courseName={courseName}
        courseId={courseId}
        isUserLoggedIn={isUserLoggedIn}
        completedTasks={completedTasks}
        unAuthuserDailyLimit={unAuthuserDailyLimit}
        languageTo={languageTo}
        languageFrom={languageFrom}
        dailyTaskLeft={dailyTaskLeft}
        currentCourseObject={currentCourseObject}
        dailyReachedLimitDate={dailyReachedLimitDate}
      />
      {isSoundChecked && currentCourseObject && token && (
        <Ratings
          courseId={currentCourseObject?.course._id}
          userScore={userScore}
          token={token}
        />
      )}
      <BackgroundParrot />

      {!isSoundChecked && (
        <SoundCheck
          setSoundChecked={setSoundChecked}
          soundChecked={isSoundChecked}
        />
      )}

      {isSoundChecked && (
        <>
          <LearnMenu
            languageTo={languageTo}
            languageFrom={languageFrom}
            token={token}
            currentCourseObject={currentCourseObject}
            setTab={setTab}
          />
          <div className={style.content}>
            {currentCourseObject && (
              <ProgressBar
                currentCourseObject={currentCourseObject}
                userScore={userScore}
              />
            )}
            {tab !== 'course' && currentCourseObject && (
              <Wrapper
                token={token ?? ''}
                currentCourseObject={currentCourseObject}
                languageFrom={languageFrom}
                tab={tab}
              />
            )}
            {tab === 'course' && commonProps && (
              <>
                <div ref={chatRef} className={style.chat}>
                  <div ref={chatWrapperRef} className={style.chatWrapper}>
                    {completedTasks && (
                      <ChatHistory
                        completedTasks={completedTasks}
                        isHintShown={isHintShown}
                      />
                    )}
                    {currentTask && (
                      <ChatCurrentTask
                        currentTask={currentTask}
                        currentMessageIndex={currentMessageIndex}
                        isHintShown={isHintShown}
                        hintText={hintText}
                        onDivHeight={handleGrammarHeight}
                      />
                    )}
                    {!currentTask && <div className={style.blankBubble} />}
                  </div>
                </div>
                <CurrentTaskInput
                  commonProps={commonProps}
                  isHintShown={isHintShown}
                  setIsHintShown={setIsHintShown}
                  setHintText={setHintText}
                  currentMessageIndex={currentMessageIndex}
                  setCurrentMessageIndex={setCurrentMessageIndex}
                />
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Lessons
