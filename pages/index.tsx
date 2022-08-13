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
          {t('homeTitle1')}
          <span className={style.styledTitle}>{t('homeTitle2')}</span>
          {t('homeTitle3')}
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
