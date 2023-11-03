import type { NextPage } from 'next'
import style from '@styles/Home.module.scss'
import { PageHead } from '@components/PageHead'
import { Header } from '@components/header/Header'
import { useTranslation } from '@utils/useTranslation'
import { StartButton } from '@components/home/StartButton'
import { FollowButtons } from '@components/home/FollowButtons'
import { LanguagesBlock } from '@components/home/LanguagesBlock'

const Home: NextPage = () => {
  const { t } = useTranslation()

  return (
    <div className={style.container}>
      <PageHead title="indexPageTitle" description='META_TAG_INDEX_DESCRIPTION' keywords='META_TAG_INDEX_KEYWORDS'/>
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
