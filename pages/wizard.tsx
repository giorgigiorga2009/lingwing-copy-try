import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Header } from '../components/header/Header'
import { LanguageChoiceContainer } from '../components/wizard/LanguageChoiceContainer'
import { PageTitle } from '../components/wizard/PageTitle'
import {
  LOCALES_TO_LANGUAGES,
  Locale,
  LEARN_LANGUAGES,
  LearnedLanguage,
  Language,
  SwitchedLanguage,
} from '../utils/languages'
import style from './Wizard.module.scss'
import languagesData from '../utils/learnLanguages.json'
import _ from 'lodash'
import { getLanguageLevels, LanguageLevel } from '../utils/getLanguageLevels'
import { Footer } from '../components/wizard/Footer'

const getLearnFromLanguages = (
  language: LearnedLanguage,
): SwitchedLanguage[] => {
  const languageData = languagesData.data.find(
    data => data.nameCode === language,
  )
  return languageData !== undefined
    ? languageData.iLearnFrom.map(
        language => language.nameCode as SwitchedLanguage,
      )
    : []
}

export type WizardQuery = 'learnLang' | 'langFrom'
type Step = 'step1' | 'step2' | 'step3'

const Wizard: NextPage = () => {
  const router = useRouter()
  const [step, setStep] = useState<Step>()
  const [levelData, setLevelData] = useState<LanguageLevel>()

  const locale = router.locale ?? 'en'

  const query = router.query
  const learnLang = query.learnLang
  const langFrom = query.langFrom

  const step2languages =
    learnLang !== undefined
      ? getLearnFromLanguages(learnLang as LearnedLanguage)
      : []

  useEffect(() => {
    if (!router.isReady) return

    if (_.isEmpty(query)) {
      setStep('step1')
      return
    }

    if (langFrom && learnLang) {
      setStep('step3')
      return
    }

    if (
      step2languages.length === 0 ||
      step2languages.includes(LOCALES_TO_LANGUAGES[locale as Locale])
    ) {
      setStep('step3')
      router.push({
        query: {
          ...query,
          langFrom: locale,
        },
      })
    } else {
      setStep('step2')
    }
  }, [router.isReady])

  useEffect(() => {
    if (step !== 'step3') return
    if (!learnLang || !langFrom) return

    getLanguageLevels(
      learnLang as string,
      langFrom as string,
      LOCALES_TO_LANGUAGES[locale as Locale],
    ).then(response => setLevelData(response))
  }, [step, router.asPath])

  const onStep1Click = (language: Language) => {
    router.push({
      query: {
        ...query,
        learnLang: language,
      },
    })
    setStep('step2')
  }

  const onStep2Click = (language: Language) => {
    router.push({
      query: {
        ...query,
        langFrom: language,
      },
    })
    setStep('step3')
  }

  return (
    <div className={style.container}>
      <Header size="s" />

      {step === 'step1' && (
        <div className={style.languageContainer}>
          <PageTitle text="Choose language to learn" />
          <LanguageChoiceContainer
            languages={[...LEARN_LANGUAGES]}
            onClick={onStep1Click}
          />
        </div>
      )}

      {step === 'step2' && (
        <div className={style.languageContainer}>
          <PageTitle text="Choose language to learn from" />
          <LanguageChoiceContainer
            languages={step2languages}
            onClick={onStep2Click}
          />
        </div>
      )}

      {step === 'step3' && <div>choose difficulty page</div>}

      <Footer />
    </div>
  )
}

export default Wizard
