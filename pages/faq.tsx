import React, { useEffect, useState } from 'react'
import style from './faq.module.scss'
import { Header } from '@components/header/Header'
import { useTranslation } from '@utils/useTranslation'
import { ApiResponse, getFAQs } from '@utils/getFAQ'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { LOCALES_TO_LANGUAGES } from '@utils/languages'
import { Locale } from '@utils/localization'
import classNames from 'classnames'
import { Footer } from '@components/wizard/Footer'
import { FollowButtons } from '@components/home/FollowButtons'


const Faq: NextPage = () => {
  const { t } = useTranslation()
  const [faqData, setFaqData] = useState<ApiResponse>()
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0)
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number | null>(
    null,
  )

  const router = useRouter()
  const locale = router.locale ?? 'eng'
  const locales = LOCALES_TO_LANGUAGES[locale as Locale]

  useEffect(() => {
    const fetchFaqData = async () => {
      try {
        const response = await getFAQs(locales)
        setFaqData(response)
      } catch (error) {
        console.error('Failed to fetch FAQ data:', error)
      }
    }
    fetchFaqData()
  }, [locale])
  

  return (
    <div className={style.wrapper}>
      <Header size="s" loginClassName={style.loginModal} />
      <h1 className={style.titleContainer}>{t('FAQ_TITLE')}</h1>
      <main className={style.mainPart}>
        <aside className={style.buttonContainer}>
          {faqData?.data.map(({ _id }, index) => (
            <button
              key={_id?.id ?? index}
              onClick={() => setActiveCategoryIndex(index)}
              className={classNames(style.buttons, {
                [style.activeButton]: activeCategoryIndex === index,
              })}
            >
              {_id?.name}
            </button>
          ))}
        </aside>
        <section className={style.QAContainer}>
          <h2>{faqData?.data[activeCategoryIndex]._id?.name}</h2>
          {faqData?.data[activeCategoryIndex].objects.map(
            ({ question, answer }, index) => (
              <div key={index}>
                <button
                  className={classNames(
                    style.faq__question,
                    activeQuestionIndex === index && style.faq__question__open,
                  )}
                  onClick={() =>
                    setActiveQuestionIndex(
                      activeQuestionIndex === index ? null : index,
                    )
                  }
                >
                  {question[locales]}
                </button>
                <div
                  className={classNames(
                    style.faq__answer,
                    index === activeQuestionIndex && style.faq__answer__open,
                  )}
                >
                  {answer[locales]}
                </div>
              </div>
            ),
          )}
        </section>
      </main>
      <FollowButtons color="grey" />
      <Footer />
    </div>
  )
}

export default Faq
