import { NextPage } from 'next'
import { FC, useState } from 'react'
import { Header } from '../components/header/Header'
import { CourseDropdown } from '../components/lessons/CourseDropdown'
import { Message } from '../components/lessons/Message'
import { SoundCheck } from '../components/lessons/SoundCheck'
import style from './lessons.module.scss'

const Lessons: NextPage = () => {
  const [start, setStart] = useState(false)
  return (
    <div className={style.container}>
      <Header size="s" variant="task" timerTrigger={start} />
      <div className={style.rating} />
      {/* <SoundCheck /> */}
      <div className={style.progressBar}>
        <span className={style.progress}>25%</span>
        <span className={style.empty} />
      </div>
      <div className={style.content}>
        <div className={style.foldersContainer}>
          <span className={style.course}>Course</span>
          <span className={style.folderName}>Grammar</span>
          <span className={style.folderName}>Dictionary</span>
          <span className={style.folderName}>Learning mode</span>
          <span className={style.folderName}>Progress</span>
        </div>
        <div className={style.chat}>
          <CourseDropdown />
          {/* <Message variant="question" position="right" />
          <Message variant="answer" />
          <Message variant="question" position="right" />
          <Message variant="answer" />
          <Message variant="question" position="center" /> */}
        </div>
        <div className={style.inputContainer} onClick={() => setStart(!start)}>
          <div className={style.input}>Type your answer</div>
          <span className={style.micIcon} />
        </div>
      </div>
    </div>
  )
}

export default Lessons
