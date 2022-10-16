import { NextPage } from 'next'
import { FC } from 'react'
import { Header } from '../components/header/Header'
import { Message } from '../components/lessons/Message'
import { SoundCheck } from '../components/lessons/SoundCheck'
import style from './lessons.module.scss'

const Lessons: NextPage = () => {
  return (
    <div className={style.container}>
      <Header size="s" />
      <SoundCheck />
      <div className={style.progressBar} />
      <div className={style.chat}>
        <Message />
      </div>
    </div>
  )
}

export default Lessons
