import type { NextPage } from 'next'
import { Header } from '../components/header/Header'
import { LanguagesBlock } from '../components/LanguagesBlock'
import { FollowButtons } from '../components/FollowButtons'
import style from '../styles/Home.module.scss'
import { useIntl } from 'react-intl'

const Home: NextPage = () => {

  const intl = useIntl()
  
  return (
    <div className={style.container}>
      <Header />
      <div className={style.content}>
        <div className={style.title}>
          Speak up a
          <span className={style.styledTitle}>new language</span>
          today!
        </div>
        <LanguagesBlock />
        <div className={style.subTitle}>
          Join
          <span className={style.usersAmount}> 261 872 </span>
          users!
        </div>
        <div className={style.buttonContainer}>
          <span className={style.bubbleUp} />
          <a className={style.startButton}>START LEARNING BY PRACTICE</a>
          <span className={style.bubbleDown} />
        </div>
        <div className={style.parrot} />
      </div>
      <FollowButtons />
    </div>
  )
}



export default Home
