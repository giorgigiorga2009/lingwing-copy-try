import type { NextPage } from 'next'
import { Header } from '../components/header/Header'
import { LanguagesBlock } from '../components/LanguagesBlock'
import { FollowButtons } from '../components/FollowButtons'
import style from '../styles/Home.module.scss'
import { StartButton } from '../components/StartButton'
import { useTranslation } from '../utils/useTranslation'

const Home: NextPage = () => {
  const { t } = useTranslation()

  return (
    <div className={style.container}>
      <Header />

      <div className={style.content}>
        <div className={style.title}>
          {t('APP_NEWLAND_START_TEXT1')}
          <span className={style.styledTitle}>
            {t('APP_NEWLAND_START_TEXT2')}
          </span>
          {t('APP_NEWLAND_START_TEXT3')}
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
