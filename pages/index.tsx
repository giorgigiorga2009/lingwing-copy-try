import type { NextPage } from 'next'
import { Header } from '../components/header/Header'
import { LanguagesBlock } from '../components/LanguagesBlock'
import { FollowButtons } from '../components/FollowButtons'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <div className={styles.heading}>Speak up a new language today!</div>
        <LanguagesBlock />
        <div className={styles.parrot} />
      </div>
      <FollowButtons />
    </div>
  )
}



export default Home
