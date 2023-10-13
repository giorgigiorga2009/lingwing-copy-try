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

import LessonsFlowPopUps from '@components/lessons/lessonsFlowPopUps/lessonsFlowPopUps'
import { getReadCourse } from '@utils/getReadCourse'
import { LOCALES_TO_LANGUAGES } from '@utils/languages'
import { useQuery } from 'react-query'

import BackgroundParrot from '@components/shared/BackgroundParrot'
import FillProfileForTasks from '@components/lessons/fill-proflie-for-tasks/fillProfileForTasks'
import { ProfileData } from '@utils/profileEdit'
import { getPackages, PackageData } from '@utils/getPackages'
import StatsPagePerOnePercent from '@components/lessons/statsPerOnePercent/statsPagePerOnePercent'
import { getStatsPerPercent, StatsDataProps } from '@utils/lessons/getStatsPerPercent'
import RateLingwingModal from '@components/lessons/rateLingwing/rateLingwing'
import { getUserProfileData } from '@utils/auth'

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
  const [grammarHeight, setGrammarHeight] = useState<number>(0)
  const [isGrammarHeightCalled, setIsGrammarHeightCalled] = useState(false)
  const chatWrapperRef = useRef<HTMLDivElement>(null)
  const chatRef = useRef<HTMLDivElement>(null)
  const [showProfileFiller, setShowProfileFiller] = useState<boolean>(false)
  const [profileData, setPRofileData] = useState<ProfileData | undefined>(
    undefined,
  )
  const [packagesData, setPackagesData] = useState<PackageData>()
  const [dailyTaskLeft, setDailyTaskLeft] = useState<number>(1)
  const [unAuthuserDailyLimit, setunAuthuserDailyLimit] = useState(1)
  const [dailyReachedLimitDate, setDailyReachedLimitDate] = useState<
    Date | string | undefined
  >()
  const [isStatsVisible, setIsStatsVisible] = useState<boolean>(false)
  const [statsData, setStatsData] = useState<StatsDataProps>()
  const previousPercentRef = useRef(1)
  const [isRateLingwingVisible, setIsRateLingwingVisible] =
    useState<boolean>(true)

  const router = useRouter()
  const { courseName, languageTo, languageFrom } = router.query
  const [language, setLanguage] = useState<string>('English')

  // Use localStorage to set the token state
  useEffect(() => {
    setToken(localStorage.getItem('authToken'))
    const getUserId = Cookies.get('userId')
    getUserId && setUserId(getUserId)
  }, [])

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
  }, [languageFrom, languageTo, courseName, token, userId, completedTasks])

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
    })
      .then(currentCoursesList =>
        setCurrentLanguageCoursesList(currentCoursesList),
      )
      .catch(error => {
        console.error('Error fetching user course:', error)
        throw error
      })
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

  // for tasks quantity only
  const isUserLoggedIn = !!token

  const currentLanguage =
    router.locale &&
    LOCALES_TO_LANGUAGES[router.locale as keyof typeof LOCALES_TO_LANGUAGES]

  const fetchCourseData = async () => {
    if (currentLanguage && courseName) {
      try {
        const data = await getReadCourse(currentLanguage, courseName)
        return data
      } catch (error) {
        throw new Error(String(error))
      }
    }
  }

  const { data: courseData } = useQuery(
    ['courseData', currentLanguage, courseName],
    fetchCourseData,
  )
  ///
  /// for FillPRoflieForTasks
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const responseData = await getUserProfileData("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsaW5nd2luZy1hcGkiLCJpYXQiOjE2OTY4NDU4NDA2NTYsImV4cCI6MTc3NjQyMDI0MDY1NiwidXNlcl9pZCI6IjY0Yzc5NDhkZGNlMTkzNmNjNzgxMDM3MSJ9.6qGfba1OT2vViv321FQDEpEdPhwc7kvizqexcM_sMHs")
        setPRofileData(responseData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchProfileData()
  }, [])

  useEffect(() => {
    if (completedTasks?.length === 8 && !profileData?.profile.lastName) {
      setShowProfileFiller(true)
    }
  }, [completedTasks])
  ///

  /// this is for pop ups > N2
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPackages('')
        setPackagesData(response)
      } catch (err) {}
    }

    fetchData()
  }, [])

  /// statsComponent
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accomplishStats = await getStatsPerPercent({
          userCourseId: '652506ec13871d0f3fe1a8bc',
        })
        setStatsData(accomplishStats)
        if (Math.floor(accomplishStats.percent) > previousPercentRef.current) {
          setIsStatsVisible(true)
          previousPercentRef.current = Math.floor(accomplishStats.percent)
        }
      } catch (err) {
        console.error('An error occurred:', err)
      }
    }
    fetchData()
  }, [completedTasks])
  ///

  return (
    <div className={style.container}>
      <Header size="s" />
      {!isUserLoggedIn && completedTasks?.length === unAuthuserDailyLimit && (
        <div className={style.regReminder}>
          <LessonsFlowPopUps
            popUpNumber={1}
            completedTasks={completedTasks.length}
            totalTasksAmount={courseData.info.tasksQuantity}
            languageTo={languageTo}
            languageFrom={languageFrom}
          />
        </div>
      )}
      {isUserLoggedIn && showProfileFiller &&  (
        <div className={style.regReminder}>
          <FillProfileForTasks onClose={() => setShowProfileFiller(false)} />
        </div>
      )}
      {isUserLoggedIn && !dailyTaskLeft && !currentCourseObject?.info.bonus && (
        <div className={style.regReminder}>
          <LessonsFlowPopUps
            popUpNumber={2}
            dailyLimitDate={dailyReachedLimitDate}
            duration={packagesData?.packages[1].duration}
            price={packagesData?.packages[1].currency[0].recurringPrice}
            language={language}
          />
        </div>
      )}

      {isUserLoggedIn && isStatsVisible && (
        <div className={style.perOnePercent}>
          <StatsPagePerOnePercent
            onClose={() => setIsStatsVisible(false)}
            statsData={statsData}
          />
        </div>
      )}

      {completedTasks?.length === 20 && isRateLingwingVisible && (
        <div className={style.rateLingwing}>
          <RateLingwingModal onClose={() => setIsRateLingwingVisible(false)} />
        </div>
      )}

      <BackgroundParrot />
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
                  onDivHeight={handleGrammarHeight}
                />
              )}
              {!currentTask && <div className={style.blankBubble} />}
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
              isHintShown={isHintShown}
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
