import type { NextPage } from 'next'
import { Header } from '../../components/header/Header';
import style from '../wizard/Wizard.module.scss'
import learnLanguagesData from '../../utis/learnLanguages.json'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { Locales, LOCALES_TO_LANGUAGES } from '../../utis/languages';


const getLearnFromLanguages = (language: string): string[] => {
  const languageData = learnLanguagesData.data.find(data => data.nameCode === language)
  return languageData !== undefined
    ? languageData.iLearnFrom.map(language => {
      return language.nameCode
    })
    : []
}

type Sections = 'learnLanguage' | 'fromLanguage' | 'difficulty'

const Wizard: NextPage = () => {
  const router = useRouter()
  const [page, setPage] = useState<Sections>()

  const locale = router.locale ?? 'en'
  const learnLanguage = router.query.learnLang as string
  const learnLanguages = getLearnFromLanguages(learnLanguage)

  useEffect(() => {
    if (learnLanguages.length === 0) {
      setPage('difficulty')
    } else if (learnLanguages.includes(LOCALES_TO_LANGUAGES[locale as Locales])) {
      setPage('difficulty')
    } else {
      setPage('fromLanguage')
    }
  }, [page])

  return (
    <div className={style.container}>
      <Header size='s' />

      {page === 'fromLanguage' && learnLanguages.map(language => (
        <div onClick={() => setPage('difficulty')}>{language}</div>
      ))}

      {page === 'difficulty' && <div>choose difficulty page</div>}

      {page === 'learnLanguage' && <div>choose Language to learn Page</div>}
    </div>
  )
}

export default Wizard