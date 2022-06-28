import type { NextPage } from 'next'
import { Header } from '../components/Header'
import { Language } from '../components/languages'
import { LanguageTile } from '../components/LanguagesBlock'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
      <div className={styles.container}>
        <Header />
        <LanguageTile language={{long: 'English', short: 'eng'} as Language} />
      </div>
  )
}



export default Home
