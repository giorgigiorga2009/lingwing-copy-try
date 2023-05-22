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
import style from './wizard.module.scss'
import {
  getDifficultyLevels,
  LanguageLevel,
} from '../utils/getDifficultyLevels'
import { Footer } from '../components/wizard/Footer'
import { BackButton } from '../components/BackButton'
import { Locale } from '../utils/localization'
import { ChooseLanguageStep } from '../components/wizard/ChooseLanguageStep'
import { ChooseDifficultyStep } from '../components/wizard/ChooseDifficultyStep'
import { useTranslation } from '../utils/useTranslation'
import { PageHead } from '../components/PageHead'
import { Reviews } from '../components/Reviews'

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
  const { t } = useTranslation()
  const router = useRouter()
  const { query } = params
  const locale = router.locale ?? 'en'

  const [step, setStep] = useState<Step>()
  const [languageTo, setLanguageTo] = useState<LanguageTo | undefined>(
    query.languageTo,
  )
  const [languageFrom, setLanguageFrom] = useState<LanguageFrom | undefined>(
    router.query.languageFrom as LanguageFrom | undefined,
  )
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

  useEffect(() => {
    switch (step) {
      case 'step1':
        router.push({
          pathname: '/wizard',
        })
        break
      case 'step2':
        router.push({
          pathname: '/wizard',
          query: { languageTo: languageTo },
        })
        break
      case 'step3':
        router.push({
          pathname: '/wizard',
          query: { languageTo: languageTo, languageFrom: languageFrom },
        })
        break
    }
  }, [step])

  useEffect(() => {
    if (step === 'step2') {
      if (router.query.languageTo === undefined) {
        setStep('step1')
        router.back()
        setLanguageTo(undefined)
        return
      }

      if (
        languageFrom === undefined &&
        router.query.languageFrom !== undefined
      ) {
        setLanguageTo(undefined)
        router.replace({ pathname: `/` })
        return
      }
    }

    if (step === 'step3' && router.query.languageFrom === undefined) {
      setLanguageFrom(undefined)
      languagesFrom?.includes(LOCALES_TO_LANGUAGES[locale as Locale])
        ? router.back()
        : setStep('step2')
      return
    }

    if (
      step === undefined &&
      router.query.languageTo !== undefined &&
      router.query.languageFrom !== undefined
    ) {
      setStep('step3')
      return
    }
  }, [router.query])

  const goBack = () => {
    switch (step) {
      case 'step1':
        router.push({
          pathname: '/',
        })
        break
      case 'step2':
        //setStep('step1')
        router.push({
          pathname: '/',
        })
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
      <div className={style.ball} />
      <Header size="s" loginClassName={style.loginModal} />
      <PageHead text={'wizardPageTitle'} />

      <div className={style.content}>
        <BackButton onClick={goBack} />
        <div className={style.parrot} />

        {step === 'step1' && (
          <ChooseLanguageStep
            languages={[...LANGUAGES_TO]}
            onClick={language => {
              setLanguageTo(language as LanguageTo)
              setStep('step2')
            }}
            title={t('wizardTitle1')}
          />
        )}

        {step === 'step2' && languagesFrom !== undefined && (
          <ChooseLanguageStep
            languageTo={languageTo}
            languages={languagesFrom}
            onClick={language => {
              setLanguageFrom(language as LanguageFrom)
              setStep('step3')
            }}
            title={t('wizardTitle2')}
          />
        )}

        {step === 'step3' && languageLevelData && (
          <ChooseDifficultyStep
            languageTo={languageTo}
            languageFrom={languageFrom}
            levelData={languageLevelData}
          />
        )}

        {step !== 'step3' && <Reviews />}
      </div>
      <Footer />
    </div>
  )
}

export default Wizard
