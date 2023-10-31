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
import Head from 'next/head'

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
  }, [locale, locales])

  // const faqSchema = {
  //   "@context": "https://schema.org",
  //   "@type": "FAQPage",
  //   "mainEntity": {
  //     "@type": "Question",
  //     "name": faqData?.data[0].objects[0].question[locales] || 'default question here ...',
  //     "acceptedAnswer": {
  //       "@type": "Answer",
  //       "text": "www.lingwing.com is an online language-learning platform, created with the use of the newest technologies and algorithms. It is intended for everyone who wishes to learn a new language and start speaking at once, revise previously taught language, improve his or her knowledge and prepare for exams."
  //     }
  //   }
  // }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData?.data
      .map(category => {
        return category.objects.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question[locales] || 'question here ...',
          acceptedAnswer: {
            '@type': 'Answer',
            text: answer[locales] || 'answer here ...',
          },
        }))
      })
      .flat(),
  }

  console.log(faqData?.data)
  return (
    <div className={style.wrapper}>
      <Head>
        <meta
          name="description"
          content="Find answers to frequently asked questions about our services, products, and processes. Get clarity and support on common topics and inquiries."
        />
        <meta
          name="keywords"
          content="FAQ, frequently asked questions, support, answers, services, products"
        />
        <title>{t('FAQ_TITLE')}</title>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        {/* <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": {
    "@type": "Question",
    "name": "What is www.lingwing.com and who is it intended for?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "www.lingwing.com is an online language-learning platform, created with the use of the newest technologies and algorithms. It is intended for everyone who wishes to learn a new language and start speaking at once, revise previously taught language, improve his or her knowledge and prepare for exams."
    }
  }
}
` }} /> */}
      </Head>
      <Header size="s" loginClassName={style.loginModal} />
      <main>
        <header>
          <h1 className={style.titleContainer}>{t('FAQ_TITLE')}</h1>
        </header>
        <div className={style.mainPart}>
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
                <article key={index}>
                  <button
                    className={classNames(
                      style.faq__question,
                      activeQuestionIndex === index &&
                        style.faq__question__open,
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
                </article>
              ),
            )}
          </section>
        </div>
      </main>
      <FollowButtons color="grey" />
      <Footer />
    </div>
  )
}

export default Faq
