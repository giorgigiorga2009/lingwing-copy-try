import type { NextPage } from 'next'
import { Header } from '../components/header/Header'
import { LanguagesBlock } from '../components/LanguagesBlock'
import { FollowButtons } from '../components/FollowButtons'
import style from '../styles/Home.module.scss'
import { useIntl } from 'react-intl'
import { StartButton } from '../components/StartButton'

const Home: NextPage = () => {

  const intl = useIntl()
  const speakUp = intl.formatMessage({ id: "APP_NEWLAND_START_TEXT1" })
  const newLanguage = intl.formatMessage({ id: "APP_NEWLAND_START_TEXT2" })
  const today = intl.formatMessage({ id: "APP_NEWLAND_START_TEXT3" })

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

        <div className={style.parrot} />
      </div>
      <StartButton />
      <FollowButtons />
    </div>
  )
}

export default Home