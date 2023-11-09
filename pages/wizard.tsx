import {
  LANGUAGES_TO,
  LanguageTo,
  getLanguagesFrom,
  LanguageFrom,
  LOCALES_TO_LANGUAGES,
} from '@utils/languages'
import { getDifficultyLevels, LanguageLevel } from '@utils/getDifficultyLevels'
import { useRouter } from 'next/router'
import style from './wizard.module.scss'
import { useEffect, useState } from 'react'
import { Locale } from '@utils/localization'
import { Reviews } from '@components/Reviews'
import { PageHead } from '@components/PageHead'
import { Header } from '@components/header/Header'
import { Footer } from '@components/wizard/Footer'
import { useTranslation } from '@utils/useTranslation'
import type { GetServerSideProps, NextPage } from 'next'
import { ChooseLanguageStep } from '@components/wizard/ChooseLanguageStep'
import { ChooseDifficultyStep } from '@components/wizard/ChooseDifficultyStep'
import BackgroundParrot from '@components/shared/BackgroundParrot'
import { useSession } from 'next-auth/react'

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

  const { data: session } = useSession()
  const token = session?.user.accessToken as string

  useEffect(() => {
    if (!languageTo) return setStep('step1')

    const langsFrom = getLanguagesFrom(languageTo)
    setLanguagesFrom(langsFrom)

    if (langsFrom.includes(LOCALES_TO_LANGUAGES[locale as Locale])) {
      setStep('step3')
      setLanguageFrom(LOCALES_TO_LANGUAGES[locale as Locale])
      return
    }

    setStep('step2')
  }, [languageTo])

  useEffect(() => {
    if (step === 'step3' && languageTo && languageFrom) {
      getDifficultyLevels(
        token as string,
        languageTo,
        languageFrom,
        LOCALES_TO_LANGUAGES[locale as Locale],
      )
        .then(response => setLanguageLevelData(response))
        .catch(error => console.log(error))
    }
  }, [step])

  useEffect(() => {
    if (step) {
      const queries = {
        step1: {},
        step2: { languageTo },
        step3: { languageTo, languageFrom },
      }
      router.push({ pathname: '/wizard', query: queries[step] })
    }
  }, [step])

  useEffect(() => {
    if (step === 'step2' && !router.query.languageTo) {
      setStep('step1')
      setLanguageTo(undefined)
      router.back()
      return
    }

    if (step === 'step3' && !router.query.languageFrom) {
      setLanguageTo(query.languageTo)
      setStep('step2')
      return
    }
    // if (step === 'step3' && router.query.languageFrom === undefined) {
    //   setLanguageFrom(undefined)
    //   setLanguageTo(query.languageTo)

    //   languagesFrom?.includes(LOCALES_TO_LANGUAGES[locale as Locale])
    //     ? router.back()
    //     : setStep('step2')
    //   return
    // }

    if (!step && router.query.languageTo && router.query.languageFrom) {
      setStep('step3')
      return
    }
    setLanguageTo(query.languageTo)
  }, [router.query])

  return (
    <div className={style.container}>
      <PageHead
        title={'wizardPageTitle'}
        description="META_TAG_WIZARD_DESCRIPTION"
        keywords="META_TAG_WIZARD_KEYWORDS"
      />
      <div className={style.ball} />
      <Header size="s" loginClassName={style.loginModal} />

      <div className={style.content}>
        <BackgroundParrot />
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

        {step === 'step2' && languagesFrom && (
          <ChooseLanguageStep
            language={languageTo}
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
