import type { NextPage } from 'next'
import { Header } from '../components/Header'
import { LanguagesBlock} from '../components/LanguagesBlock'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
      <div className={styles.container}>
        <Header />
        <LanguagesBlock />
      </div>
  )
}



export default Home
