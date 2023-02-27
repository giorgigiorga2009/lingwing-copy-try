import classNames from 'classnames'
import { NextPage } from 'next'
import { FC, useEffect, useState } from 'react'
import { Header } from '../components/header/Header'
import { CourseDropdown } from '../components/lessons/CourseDropdown'
import { Message } from '../components/lessons/Message'
import { TaskInputContainer } from '../components/lessons/TaskInputContainer'
import style from './lessons.module.scss'
import { getTasks, getUserCourse, TaskData } from '../utils/lessons/getTask'
import { Dialog, DialogInput } from '../components/lessons/Dialog'
import { useRouter } from 'next/router'
import { MistakeCorrectionTask } from '../components/lessons/MistakeCorrection'

// const dialogArray = [
//   "Hi, I'm Camilla.",
//   "Good morning, Camilla, I'm Bill.",
//   'I am an office manager.',
//   'Nice, I am a taxi driver.',
//   'Nice to meet you, Bill!',
//   'Nice to meet you too, Camilla!',
// ]

const Lessons: NextPage = () => {
  const [start, setStart] = useState(false)
  const [tasksData, setTasksData] = useState<TaskData[]>()
  const [currentTask, setCurrentTask] = useState<TaskData>()
  const [currentTaskType, setCurrentTaskType] = useState<TaskData['taskType']>()
  const [currentTaskNumber, setCurrentTaskNumber] = useState(0)
  const [token, setToken] = useState<string | null>(null)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [courseId, setCourseId] = useState('')

  const router = useRouter()
  const { courseName, languageTo, languageFrom } = router.query
  useEffect(() => {
    if (!tasksData) return
    setCurrentTask(tasksData[currentTaskNumber])
    setCurrentTaskType(currentTask?.taskType)
  }, [currentTaskNumber])

  useEffect(() => {
    if (!languageFrom || !languageTo || !courseName || !token) return
    getUserCourse({ languageFrom, languageTo, courseName, token }).then(
      courseId => setCourseId(courseId),
    )
  }, [languageFrom, languageTo, courseName])

  useEffect(() => {
    setToken(localStorage.getItem('authToken'))
  }, [])

  useEffect(() => {
    if (!languageFrom || !languageTo || !courseName || !token || !courseId)
      return

    getTasks({ languageFrom, languageTo, courseName, token, courseId }).then(
      response => setTasksData(response),
    )
  }, [courseId])

  // const dialogData = () => {}

  const isShown =
    currentTask !== undefined &&
    languageTo !== undefined &&
    languageFrom !== undefined

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
            <Dialog
              currentMessageIndex={currentMessageIndex}
              dialogArray={currentTask.correctText as string[]}
            />
          </div>
        )}

        {isShown &&
          (currentTaskType === 'translate' ||
            currentTaskType === 'dictation' ||
            currentTaskType === 'omittedwords' ||
            currentTaskType === 'replay') && (
            <TaskInputContainer
              token={token}
              languageTo={languageTo}
              languageFrom={languageFrom}
              ordinalNumber={currentTask.ordinalNumber}
              correctText={currentTask.correctText as string}
              wordsSynonyms={currentTask.wordsSynonyms}
              taskType="translate"
              iLearnFromNameCode="none"
              courseId={courseId}
              setCurrentTaskNumber={setCurrentTaskNumber}
              currentTaskNumber={currentTaskNumber}
            />
          )}
        {isShown && currentTaskType === 'dialog' && (
          <DialogInput
            token={token}
            languageTo={languageTo}
            languageFrom={languageFrom}
            ordinalNumber={currentTask.ordinalNumber}
            currentMessageIndex={currentMessageIndex}
            dialogArray={currentTask.correctText as string[]}
            iLearnFromNameCode="none"
            setCurrentMessageIndex={setCurrentMessageIndex}
            courseId={courseId}
            setCurrentTaskNumber={setCurrentTaskNumber}
            currentTaskNumber={currentTaskNumber}
          />
        )}
        {isShown && currentTaskType === 'mistakecorrection' && (
          <MistakeCorrectionTask
            token={token}
            languageTo={languageTo}
            languageFrom={languageFrom}
            ordinalNumber={currentTask.ordinalNumber}
            mistakeText={currentTask.errorText}
            correctText={currentTask.correctText as string}
            courseId={courseId}
            setCurrentTaskNumber={setCurrentTaskNumber}
            currentTaskNumber={currentTaskNumber}
          />
        )}
      </div>
    </div>
  )
}

export default Lessons
