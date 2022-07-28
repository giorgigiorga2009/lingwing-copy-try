import type { NextPage } from 'next'
import { Header } from '../../../components/header/Header';
import style from '../wizard/Wizard.module.scss'

//"choose language to learn from" page
const Step1: NextPage = () => {
  return (
    <div className={style.container}>
      <Header />
 
    </div>
  )
}

export default Step1