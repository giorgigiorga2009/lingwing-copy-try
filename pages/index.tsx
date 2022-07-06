import type { NextPage } from 'next'
import { Header } from '../components/header/Header'
import { LanguagesBlock} from '../components/LanguagesBlock'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <LanguagesBlock />
        <div className={styles.parrot} />
      </div>
      <SocialFollow />
    </div>
  )
}



export default Home
