import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { Header } from '../components/header/Header';
import { LanguageChoiceContainer } from '../components/wizard/LanguageChoiceContainer';
import { PageTitle } from '../components/wizard/PageTitle';
import { LOCALES_TO_LANGUAGES, Locale, LEARN_LANGUAGES, LearnedLanguage, SwitchedLanguage, Language } from '../utils/languages';
import style from './Wizard.module.scss'
import languagesData from '../utils/learnLanguages.json'
import _ from 'lodash'

const getStep2Languages = (language: string): string[] => {
  const languageData = languagesData.data.find(data => data.nameCode === language)
  return languageData !== undefined
    ? languageData.iLearnFrom.map(language => language.nameCode)
    : []
}

export type WizardQuery = 'learnLang' | 'langFrom'
type Sections = 'step1' | 'step2' | 'step3'

const Wizard: NextPage = () => {
  const router = useRouter()
  const [page, setPage] = useState<Sections>()

  const locale = router.locale ?? 'en'

  const query = router.query
  const step2query = query.learnLang

  const step2languages = step2query !== undefined
    ? getStep2Languages(step2query as string) as SwitchedLanguage[]
    : []


  useEffect(() => {
    if (!router.isReady) return

    if (_.isEmpty(query)) {
      setPage('step1')
      return
    }

    if (query.langFrom && query.learnLang) {
      setPage('step3')
      return
    }

    if (step2languages.length === 0
      || step2languages.includes(LOCALES_TO_LANGUAGES[locale as Locale])) {
      setPage('step3')
      router.push({
        query: {
          langFrom: locale,
        }
      })
    } else {
      setPage('step2')
    }

  }, [router.isReady])

  const onStep1Click = (language: Language) => {
    router.push({
      query: {
        ...query,
        learnLang: language,
      }
    })
    setPage('step2')
  }

  const onStep2Click = (language: Language) => {
    router.push({
      query: {
        ...query,
        langFrom: language
      }
    })
    setPage('step3')
  }

  return (
    <div className={style.container}>
      <Header size='s' />

      {page === 'step1' && <div className={style.languageContainer}>
        <PageTitle text='Choose language to learn' />
        <LanguageChoiceContainer languages={[...LEARN_LANGUAGES]} onClick={onStep1Click} />
      </div>}


      {page === 'step2' &&
        <div className={style.languageContainer}>
          <PageTitle text='Choose language to learn from' />
          <LanguageChoiceContainer languages={step2languages} onClick={onStep2Click} />
        </div>
      }

      {page === 'step3' && <div>choose difficulty page</div>}

    </div>
  )
}

export default Wizard