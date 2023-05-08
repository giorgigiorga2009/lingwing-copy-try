import type { NextPage } from 'next'
import { Header } from '../components/header/Header'
import style from '../styles/Home.module.scss'
import { useTranslation } from '../utils/useTranslation'
import { PageHead } from '../components/PageHead'
import { FollowButtons } from '../components/home/FollowButtons'
import { LanguagesBlock } from '../components/home/LanguagesBlock'
import { StartButton } from '../components/home/StartButton'
import { FormattedMessage } from 'react-intl'

const Home: NextPage = () => {
  const { t } = useTranslation()

  return (
    <div className={style.container}>
      <PageHead text="indexPageTitle" />
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
