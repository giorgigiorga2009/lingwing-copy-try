import classNames from 'classnames'
import { NextPage } from 'next'
import { FC, useEffect, useState } from 'react'
import { Header } from '../components/header/Header'
import { CourseDropdown } from '../components/lessons/CourseDropdown'
import { Message } from '../components/lessons/Message'
import { TaskInputContainer } from '../components/lessons/TaskInputContainer'
import style from './lessons.module.scss'
import { getTasks, getUserCourse, TaskData } from '../utils/lessons/getTask'
import { OmittedWords } from '../components/lessons/OmittedWords'
import { Dialog, DialogInput } from '../components/lessons/Dialog'
import { useRouter } from 'next/router'
import { getToken } from '../utils/auth'
import { DictationInput } from '../components/lessons/DictationInput'

const dialogArray = [
  "Hi, I'm Camilla.",
  "Good morning, Camilla, I'm Bill.",
  'I am an office manager.',
  'Nice, I am a taxi driver.',
  'Nice to meet you, Bill!',
  'Nice to meet you too, Camilla!',
]

const Lessons: NextPage = () => {
  const [start, setStart] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [taskNumber, setTaskNumber] = useState(1)
  const [tasksData, setTasksData] = useState<TaskData[]>()
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [token, setToken] = useState<string | null>(null)

  const router = useRouter()
  const { courseName, languageTo, languageFrom } = router.query

  useEffect(() => {
    setToken(localStorage.getItem('authToken'))
  }, [])

  useEffect(() => {
    if (!languageFrom || !languageTo || !courseName || !token) return

    getUserCourse({ languageFrom, languageTo, courseName, token })
      .then(courseId =>
        getTasks({ languageFrom, languageTo, courseName, token, courseId }),
      )
      .then(response => setTasksData(response))
  }, [languageFrom, languageTo, courseName])

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

        {tasksData !== undefined && (
          <div className={style.chat}>
            {/* <Dialog currentMessageIndex={currentMessageIndex} dialogArray={dialogArray} /> */}
          </div>
        )}

        {tasksData !== undefined && (
          <TaskInputContainer
            setCorrect={setIsCorrect}
            correctText="I am the artist"
            wordsSynonyms={tasksData[2].wordsSynonyms}
            taskType="translate"
          />
        )}
        {/* <OmittedWords setCorrect={setIsCorrect} sentenceArray={("Hello, [dear] Tomas [welcome] to America!").match(/(\[.*?\])|(\S+)/g) ?? []} /> */}
        {/* <DialogInput currentMessageIndex={currentMessageIndex} dialogArray={dialogArray} setCurrentMessageIndex={setCurrentMessageIndex} /> */}
      </div>
    </div>
  )
}

export default Lessons
