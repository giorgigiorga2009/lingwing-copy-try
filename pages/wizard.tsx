import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { Header } from '../components/header/Header';
import { LanguageChoiceContainer } from '../components/wizard/LanguageChoiceContainer';
import { PageTitle } from '../components/wizard/PageTitle';
import { LEARNED_LANGUAGES } from '../utils/languages';
import style from './Wizard.module.scss'

const Wizard: NextPage = () => {
  const router = useRouter()

  return (
    <div className={style.container}>
      <Header size='s' />
      <div className={style.parrot}/>
      <div className={style.languageContainer}>
      <PageTitle text='Choose language to learn' />
      <LanguageChoiceContainer languages={LEARNED_LANGUAGES}/>
      </div>
      <div className={style.ball}/>
    </div>
  )
}

export default Wizard