import type { NextPage } from 'next'
import { Header } from '../components/header/Header'
import { LanguagesBlock } from '../components/LanguagesBlock'
import { FollowButtons } from '../components/FollowButtons'
import style from '../styles/Home.module.scss'
import { useIntl } from 'react-intl'

const Home: NextPage = () => {

  const intl = useIntl()
  const speakUp = intl.formatMessage({ id: "APP_NEWLAND_START_TEXT1" })
  const newLanguage = intl.formatMessage({ id: "APP_NEWLAND_START_TEXT2" })
  const today = intl.formatMessage({ id: "APP_NEWLAND_START_TEXT3" })
  const join = intl.formatMessage({ id: "Join-the-customer-1" })
  const users = intl.formatMessage({ id: "Join-the-customer-2" })
  const startLearning = intl.formatMessage({ id: "APP_NEWLAND_START_PRACTICE" })

  
  return (
    <div className={style.container}>
      <Header />
      <div className={style.content}>
        <div className={style.title}>
          {speakUp}
          <span className={style.styledTitle}>{newLanguage}</span>
          {today}
        </div>
        <LanguagesBlock />
        <div className={style.subTitle}>
          {join}
          <span className={style.usersAmount}> 261 872 </span>
          {users}
        </div>
        <div className={style.buttonContainer}>
          <span className={style.bubbleUp} />
          <a className={style.startButton}>{startLearning}</a>
          <span className={style.bubbleDown} />
        </div>
        <div className={style.parrot} />
      </div>
      <FollowButtons />
    </div>
  )
}



export default Home
