import {
  CourseObject,
  getTasks,
  getUserCourse,
  TaskData,
} from '@utils/lessons/getTask'
import { NextPage } from 'next'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import style from './lessons.module.scss'
import { getUserId } from '@utils/getUserId'
import { useSession } from 'next-auth/react'
import { PageHead } from '@components/PageHead'
import { Header } from '@components/header/Header'
import { useEffect, useState, useRef } from 'react'
import ProgressBar from '@components/lessons/ProgressBar'
import ChatHistory from '@components/lessons/ChatHistory'
import { SoundCheck } from '@components/lessons/SoundCheck'
import Wrapper from '@components/lessons/learnMenu/Wrapper'
import Ratings from '@components/lessons/usersRating/Ratings'
import { getLevelColors } from '@utils/lessons/taskInputUtils'
import LearnMenu from '@components/lessons/learnMenu/LearnMenu'
import ChatCurrentTask from '@components/lessons/ChatCurrentTask'
import Feedback from '@components/lessons/combinedModals/Feedback'
import { useSpeechRec } from '@utils/lessons/useSpeechRecognition'
import BackgroundParrot from '@components/shared/BackgroundParrot'
import CurrentTaskInput from '@components/lessons/CurrentTaskInput'
import { useUserStore, useTaskStore, UserInfo } from '@utils/store'
import FeedbackButton from '@components/lessons/combinedModals/FeedbackButton'
import CombinedModalComponent from '@components/lessons/combinedModals/combinedModals'


export type Tabs = 'course' | 'grammar' | 'vocabulary' | 'levels' | 'statistics'

const getUserToken = (state: UserInfo) => ({
  Token: state.Token,
})

const Lessons: NextPage = () => {
  const screenshotRef = useRef<HTMLDivElement>(null)
  const [tasksData, setTasksData] = useState<TaskData[]>([])
  const [currentTask, setCurrentTask] = useState<TaskData>()
  const [currentTaskNumber, setCurrentTaskNumber] = useState(0)
  const [userId, setUserId] = useState<string>('')
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [courseId, setCourseId] = useState('')
  const [completedTasks, setCompletedTasks] = useState<TaskData[]>()
  const [isSoundChecked, setSoundChecked] = useState(false)
  const [openFeedback, setOpenFeedback] = useState(false)
  const [showTopScores, setShowTopScores] = useState(true)

  const [tab, setTab] = useState<Tabs>('course')

  const [userScore, setUserScore] = useState(0)
  const [currentCourseObject, setCurrentCourseObject] = useState<CourseObject>()
  const [grammarHeight, setGrammarHeight] = useState<number>(0)
  const [isGrammarHeightCalled, setIsGrammarHeightCalled] = useState(false)
  const chatWrapperRef = useRef<HTMLDivElement>(null)
  const chatRef = useRef<HTMLDivElement>(null)
  const [mistake, setMistake] = useState(-1)

  const [dailyTaskLeft, setDailyTaskLeft] = useState<number>(1)
  const [unAuthuserDailyLimit, setunAuthuserDailyLimit] = useState(1)
  const [dailyReachedLimitDate, setDailyReachedLimitDate] = useState<
    Date | string | undefined
  >()

  const { transcript } = useSpeechRec()
  const HintShown = useTaskStore(state => state.HintShown)

  const router = useRouter()
  const locale = router.locale
  const { Token } = useUserStore(getUserToken)
  const { data: session } = useSession()
  console.log(Token + '???')

  const { courseName, languageTo, languageFrom, task } = router.query

  // Use localStorage to set the token state
  useEffect(() => {
    const getUserId = Cookies.get('userId')
    getUserId && setUserId(getUserId)
  }, [])

  //get userId
  useEffect(() => {
    if (!languageFrom || !languageTo || !courseName) return

    getUserId({ languageFrom, languageTo, courseName, Token })
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
  }, [languageTo, Token])

  // Use the languageFrom, languageTo, courseName, and token states to get the user's course ID

  useEffect(() => {
    console.log(userId + '???')
    if (!languageFrom || !languageTo || !courseName || (!Token && !userId))
      return

    getUserCourse({ languageFrom, languageTo, courseName, Token, userId })
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
  }, [
    languageFrom,
    languageTo,
    courseName,
    Token,
    userId,
    currentTaskNumber,
    tab,
  ])
  // Use the languageFrom, languageTo, courseName, token, and courseId states to get the tasks data
  useEffect(() => {
    if (!languageFrom || !languageTo || !courseName || (!Token && !courseId))
      return

    getTasks({
      languageFrom,
      languageTo,
      Token,
      courseId,
      userId,
      task,
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
      (!Token && !userId) ||
      !courseId ||
      !tasksData
    )
      return
    if (currentTaskNumber === tasksData?.length) {
      getTasks({
        languageFrom,
        languageTo,
        Token,
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
  }, [HintShown, currentTask, isGrammarHeightCalled, currentMessageIndex])

  const arePropsDefined =
    (Token !== undefined || userId !== undefined) &&
    languageTo !== undefined &&
    languageFrom !== undefined &&
    currentTask !== undefined &&
    currentCourseObject !== undefined

  const commonProps = arePropsDefined
    ? {
        userId,
        Token,
        languageTo,
        languageFrom,
        courseId,
        setCurrentTaskNumber,
        currentTaskNumber,
        currentTask,
        completedTasks,
        mistake,
        setCompletedTasks,
        learnMode: currentCourseObject.learnMode,
      }
    : null

  const isUserLoggedIn = !!Token

  return (
    <div>
      <PageHead
        title={'META_TAG_ABOUTCOURSE_TITLE_' + (languageTo || 'geo')}
        description={
          'META_TAG_ABOUTCOURSE_DESCRIPTION_' + (languageTo || 'geo')
        }
        keywords={'META_TAG_ABOUTCOURSE_KEYWORDS_' + (languageTo || 'geo')}
      />
      {openFeedback && currentCourseObject && (
        <Feedback
          setOpenFeedback={() => setOpenFeedback(false)}
          currentCourseObject={currentCourseObject}
          currentTaskData={currentTask}
          screenshotRef={screenshotRef}
          token={Token}
          UserEmail={session?.user.email}
          locale={locale}
        />
      )}
      <div className={style.container} ref={screenshotRef}>
        <Header
          size="s"
          currentCourseObject={currentCourseObject}
          token={Token}
          setShowTopScores={setShowTopScores}
          showTopScores={showTopScores}
        />
        <CombinedModalComponent
          token={Token}
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
        {isSoundChecked && currentCourseObject && Token && (
          <Ratings
            userCourseId={currentCourseObject?._id}
            courseId={currentCourseObject?.course._id}
            userScore={userScore}
            token={Token}
            showTopScores={showTopScores}
          />
        )}
        <BackgroundParrot />
        <FeedbackButton
          setOpenFeedback={setOpenFeedback}
          openFeedback={openFeedback}
        />
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
              token={Token}
              currentCourseObject={currentCourseObject}
              setTab={setTab}
              tab={tab}
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
                  token={Token ?? ''}
                  currentCourseObject={currentCourseObject}
                  languageFrom={languageFrom}
                  tab={tab}
                  setTab={setTab}
                />
              )}
              {tab === 'course' && (
                <div className={style.chatContainer}>
                  <div className={style.chat} ref={chatRef}>
                    <div ref={chatWrapperRef} className={style.chatWrapper}>
                      {completedTasks && (
                        <ChatHistory completedTasks={completedTasks} />
                      )}
                      {currentTask && currentCourseObject && (
                        <ChatCurrentTask
                          currentTask={currentTask}
                          currentMessageIndex={currentMessageIndex}
                          onDivHeight={handleGrammarHeight}
                          mistakesByLevel={getLevelColors({
                            currentTask: currentTask,
                            currentCourseObject: currentCourseObject,
                          })}
                          finalTranscript={transcript}
                        />
                      )}
                      {!currentTask && <div className={style.blankBubble} />}
                    </div>
                  </div>
                  {commonProps && (
                    <CurrentTaskInput
                      commonProps={commonProps}
                      currentMessageIndex={currentMessageIndex}
                      setCurrentMessageIndex={setCurrentMessageIndex}
                    />
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Lessons
