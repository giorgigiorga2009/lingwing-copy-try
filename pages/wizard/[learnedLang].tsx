import type { NextPage } from 'next'
import { Header } from '../../components/header/Header';
import { LanguageChoiceContainer } from '../../components/wizard/LanguageChoiceContainer';
import style from '../wizard/Wizard.module.scss'

//"choose language to learn from" page
const Step1: NextPage = () => {
  return (
    <div className={style.container}>
      <Header size='s'/>
      <div className={style.parrot}/>
      <LanguageChoiceContainer />
      <div className={style.ball}/>
      
    </div>
  )
}

export default Step1