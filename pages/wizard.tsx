import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Header } from '../components/header/Header'
import {
  LANGUAGES_TO,
  LanguageTo,
  getLanguagesFrom,
  LanguageFrom,
  LOCALES_TO_LANGUAGES,
} from '../utils/languages'
import style from './Wizard.module.scss'
import _ from 'lodash'
import {
  getDifficultyLevels,
  LanguageLevel,
} from '../utils/getDifficultyLevels'
import { Footer } from '../components/wizard/Footer'
import { BackButton } from '../components/BackButton'
import { Locale } from '../utils/localization'
import { ChooseLanguageStep } from '../components/wizard/ChooseLanguageStep'
import { ChooseDifficultyStep } from '../components/wizard/ChooseDifficultyStep'

type Step = 'step1' | 'step2' | 'step3'

interface WizardProps {
  query: {
    languageTo?: LanguageTo
  }
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return { props: { query } }
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
        setLanguageFrom(LOCALES_TO_LANGUAGES[locale as Locale])
      } else {
        setStep('step2')
      }
    }
  }, [step])

  useEffect(() => {
    if (step !== 'step3') return
    if (languageTo === undefined || languageFrom === undefined) return

    getDifficultyLevels(
      languageTo,
      languageFrom,
      LOCALES_TO_LANGUAGES[locale as Locale],
    )
      .then(response => setLanguageLevelData(response))
      .catch(error => console.log(error))
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
        languagesFrom?.includes(LOCALES_TO_LANGUAGES[locale as Locale])
          ? router.back()
          : setStep('step2')
        break
    }
  }

  return (
    <div className={style.container}>
      <div className={style.content}>
        <Header size="s" loginClassName={style.loginModal} />
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
      </div>
      <Footer />
    </div>
  )
}

export default Wizard
