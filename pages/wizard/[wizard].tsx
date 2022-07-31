import type { NextPage } from 'next'
import { Header } from '../../components/header/Header';
import learnLanguagesData from '../../utils/learnLanguages.json'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { Locales, LOCALES_TO_LANGUAGES } from '../../utils/languages'
import style from '../Wizard.module.scss'
import { PageTitle } from '../../components/wizard/PageTitle';
import { LanguageChoiceContainer } from '../../components/wizard/LanguageChoiceContainer';

const getLearnFromLanguages = (language: string): string[] => {
  const languageData = learnLanguagesData.data.find(data => data.nameCode === language)
  return languageData !== undefined
    ? languageData.iLearnFrom.map(language => {
      return language.nameCode
    })
    : []
}

type Sections = 'fromLanguage' | 'difficulty'

const Wizard: NextPage = () => {
  const router = useRouter()
  const [page, setPage] = useState<Sections>()

  const locale = router.locale ?? 'en'
  const learnLanguage = router.query.wizard
  const learnLanguages = learnLanguage !== undefined
    ? getLearnFromLanguages(learnLanguage as string)
    : []

  useEffect(() => {
    if (learnLanguages.length === 0 || learnLanguages.includes(LOCALES_TO_LANGUAGES[locale as Locales])) {
      setPage('difficulty')
    } else {
      setPage('fromLanguage')
    }
  }, [page])

  return (
    <div className={style.container}>
      <Header size='s' />

      {page === 'fromLanguage' &&
        <div className={style.languageContainer}>
          <PageTitle text='Choose language to learn from' />
          <LanguageChoiceContainer languages={learnLanguages} onClick={() => setPage('difficulty')} />
        </div>
      }

      {page === 'difficulty' && <div>choose difficulty page</div>}

    </div>
  )
}

export default Wizard