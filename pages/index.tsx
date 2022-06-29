import type { NextPage } from 'next'
import { Header } from '../components/Header'
import { LanguageTile } from '../components/LanguagesBlock'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
      <div className={styles.container}>
        <Header />
        <LanguageTile language= 'eng' />
      </div>
  )
}



export default Home
