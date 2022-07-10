import type { NextPage } from 'next'
import { Header } from '../components/header/Header'
import { LanguagesBlock } from '../components/LanguagesBlock'
import { FollowButtons } from '../components/FollowButtons'
import style from '../styles/Home.module.scss'
import classnames from 'classnames'

const Home: NextPage = () => {
  return (
    <div className={style.container}>
      <Header />
      <div className={style.content}>
        <div className={style.heading}>
          Speak up a
          <span className={style.colorText}>new language</span>
          today!
        </div>
        <LanguagesBlock />
        <div className={style.parrot} />
      </div>
      <FollowButtons />
    </div>
  )
}



export default Home
