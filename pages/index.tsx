import type { NextPage } from 'next'
import { Header } from '../components/Header'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'
import Image from 'next/image';

const Home: NextPage = () => {
  return (
    
    <div className={styles.container}>
      <Header />
      <Image
        src="https://lingwing.com/themes/images/v1/avatar-default-medium.png" // Route of the image file
        height={38} // Desired size with correct aspect ratio
        width={38} // Desired size with correct aspect ratio
        alt="Your Name"
      />
    </div>
    
    
  )
}



export default Home
