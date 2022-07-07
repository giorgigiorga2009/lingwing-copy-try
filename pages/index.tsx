import type { NextPage } from 'next'
import { Header } from '../components/header/Header'
import { LanguagesBlock } from '../components/LanguagesBlock'
import { NetworkButtons } from '../components/NetworkButtons'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <div className={styles.heading}>Speak up a new language today!</div>
        <LanguagesBlock />
        <div className={styles.parrot} />
      </div>
      <NetworkButtons />
    </div>
  )
}



export default Home
