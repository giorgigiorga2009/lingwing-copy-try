import { NextPage } from 'next'
import style from './lessons.module.scss'

const Lessons: NextPage = () => {
  return (
    <div className={style.container}>
      <div className={style.header}></div>
      <div className={style.progressBar}></div>
      <div className={style.chat}>
        <div className={style.message}></div>
      </div>
    </div>
  )
}
