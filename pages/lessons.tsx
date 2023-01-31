import classNames from 'classnames'
import { NextPage } from 'next'
import { FC, useEffect, useState } from 'react'
import { Header } from '../components/header/Header'
import { Message } from '../components/lessons/Message'
import { TaskInput } from '../components/lessons/TaskInput'
import style from './lessons.module.scss'
import { getTask, TaskData } from '../utils/lessons/getTask'

const Lessons: NextPage = () => {
  const [start, setStart] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [taskNumber, setTaskNumber] = useState(1)
  const [tasksData, setTasksData] = useState<TaskData[]>()

  useEffect(() => {
    getTask().then(response => {
      setTasksData(response)
      console.log(response)
    })
  }, [])

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
            <Message
              variant="message"
              position="right"
              type={tasksData[0].taskType}
              taskDescription={tasksData[0].taskDescription}
              taskText={tasksData[0].taskText}
              correctText={tasksData[0].correctText}
              sentenceAudio={tasksData[0].sentenceAudio}
            />

            <Message
              variant="question"
              type={tasksData[0].taskType}
              taskDescription={tasksData[0].taskDescription}
              taskText={tasksData[0].taskText}
              correctText={tasksData[0].correctText}
              sentenceAudio={tasksData[0].sentenceAudio}
            />

            {/* { tasksData !== undefined && <Message 
          variant="question" 
          type={tasksData[3].taskType}
          taskDescription={tasksData[3].taskDescription}  
          taskText={tasksData[3].taskText} 
          correctText={tasksData[3].correctText}
          sentenceAudio={tasksData[3].sentenceAudio} /> }
          { tasksData !== undefined && <Message 
          variant="message" 
          position='right'
          type={tasksData[3].taskType} 
          taskDescription={tasksData[3].taskDescription}  
          taskText={tasksData[3].taskText} 
          correctText={tasksData[3].correctText}
          sentenceAudio={tasksData[3].sentenceAudio} /> } */}
          </div>
        )}

        {tasksData !== undefined && (
          <TaskInput
            setCorrect={setIsCorrect}
            correctText={tasksData[0].correctText}
            wordsSynonyms={tasksData[0].wordsSynonyms}
          />
        )}
      </div>
    </div>
  )
}

export default Lessons
