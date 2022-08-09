import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Header } from '../components/header/Header'
import { ChooseLanguageContainer } from '../components/wizard/ChooseLanguageContainer'
import { PageTitle } from '../components/wizard/PageTitle'
import {
  LANGUAGES_TO,
  LanguageTo,
  getLanguagesFrom,
  LanguageFrom,
  LOCALES_TO_LANGUAGES,
} from '../utils/languages'
import style from './Wizard.module.scss'
import _ from 'lodash'
import { getLanguageLevels, LanguageLevel } from '../utils/getLanguageLevels'
import { Footer } from '../components/wizard/Footer'
import { BackButton } from '../components/BackButton'
import { Locale } from '../utils/localization'
import { DifficultyLevelContainer } from '../components/wizard/DifficultyLevelContainer'
import { ChooseLanguageStep } from '../components/wizard/ChooseLanguageStep'
import { ChooseDifficultyStep } from '../components/wizard/ChooseDifficultyStep'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return { props: { query } }
}

type Step = 'step1' | 'step2' | 'step3'

interface WizardProps {
  query: {
    languageTo?: LanguageTo
  }
}

const Wizard: NextPage<WizardProps> = params => {
  const router = useRouter()
  const { query } = params
  const locale = router.locale ?? 'en'

  const [step, setStep] = useState<Step>()
  const [languageTo, setLanguageTo] = useState<LanguageTo | undefined>(
    query.languageTo,
  )
  const [languageFrom, setLanguageFrom] = useState<LanguageFrom>()
  const [languagesFrom, setLanguagesFrom] = useState<LanguageFrom[]>()

  const [languageLevelData, setLanguageLevelData] = useState<LanguageLevel[]>()

  useEffect(() => {
    if (step === 'step3') return

    if (languageTo === undefined) {
      setStep('step1')
    } else {
      const languagesFrom = getLanguagesFrom(languageTo)
      setLanguagesFrom(languagesFrom)

      if (languagesFrom.includes(LOCALES_TO_LANGUAGES[locale as Locale])) {
        setStep('step3')
      } else {
        setStep('step2')
      }
    }
  }, [step])

  useEffect(() => {
    if (step !== 'step3') return
    if (languageTo === undefined || languageFrom === undefined) return

    getLanguageLevels(
      languageTo,
      languageFrom,
      LOCALES_TO_LANGUAGES[locale as Locale],
    ).then(setLanguageLevelData)
  }, [step])

  const goBack = () => {
    switch (step) {
      case 'step1':
        router.back()
        break
      case 'step2':
        setStep('step1')
        setLanguageTo(undefined)
        break
      case 'step3':
        setLanguageFrom(undefined)
        languageFrom === undefined ? router.back() : setStep('step2')
        break
    }
  }

  return (
    <div className={style.container}>
      <Header size="s" />
      <BackButton onClick={goBack} />

      {step === 'step1' && (
        <ChooseLanguageStep
          languages={[...LANGUAGES_TO]}
          onClick={language => {
            setLanguageTo(language as LanguageTo)
            setStep('step2')
          }}
          title="Choose language to learn"
        />
      )}

      {step === 'step2' && languagesFrom !== undefined && (
        <ChooseLanguageStep
          languages={languagesFrom}
          onClick={language => {
            setLanguageFrom(language as LanguageFrom)
            setStep('step3')
          }}
          title="Choose language to learn from"
        />
      )}

      {step === 'step3' && languageLevelData && (
        <ChooseDifficultyStep levelData={languageLevelData} />
      )}

      <Footer />
    </div>
  )
}

export default Wizard
