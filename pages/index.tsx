import type { NextPage } from 'next'
import { Header } from '../components/header/Header'
<<<<<<< HEAD
import { LanguagesBlock} from '../components/LanguagesBlock'
import styles from '../styles/Home.module.scss'
=======
import { LanguagesBlock } from '../components/LanguagesBlock'
import { NetworkButtons } from '../components/NetworkButtons'
import styles from '../styles/Home.module.css'
>>>>>>> 3a2d5b8 (fixes)

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <LanguagesBlock />
        <div className={styles.parrot} />
      </div>
      <NetworkButtons />
    </div>
  )
}



export default Home
