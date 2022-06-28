import type { NextPage } from 'next'
import { Header } from '../components/Header'
import { SwitchedLanguages } from '../components/languages'
import { LanguageTile } from '../components/LanguagesBlock'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
      <div className={styles.container}>
        <Header />
        <LanguageTile language={{long: 'English', short: 'eng'} as SwitchedLanguages} />
      </div>
  )
}



export default Home
