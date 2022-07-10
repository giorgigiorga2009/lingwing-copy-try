import type { NextPage } from 'next'
import { Header } from '../components/header/Header'
import { LanguagesBlock } from '../components/LanguagesBlock'
import { FollowButtons } from '../components/FollowButtons'
import style from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={style.container}>
      <Header />
      <div className={style.content}>
        <div className={style.title}>
          Speak up a
          <span className={style.subTitle}>new language</span>
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
