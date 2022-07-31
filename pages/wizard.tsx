import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { Header } from '../components/header/Header';
import style from './Wizard.module.scss'

const Wizard: NextPage = () => {
  const router = useRouter()

  return (
    <div className={style.container}>
      <Header size='s' />

      <div>choose language to learn Page</div>
    </div>
  )
}

export default Wizard