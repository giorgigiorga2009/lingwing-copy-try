import React, { FC, useEffect, useState } from 'react'
import style from './faq.module.scss'
import { Header } from '@components/header/Header'
import { useTranslation } from '@utils/useTranslation'
import { ApiResponse, getFAQs } from '@utils/getFAQ'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { LOCALES_TO_LANGUAGES } from '@utils/languages'
import { Locale } from '@utils/localization'
import classNames from 'classnames'

const Faq: NextPage = () => {
  const { t } = useTranslation()
  const [faqData, setFaqData] = useState<ApiResponse>()
  const [typeOfQuestion, setTypeOfQuestion] = useState<number>(0)
  const [clicked, setClicked] = useState(-1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredQuestions, setFilteredQuestions] = useState(
    faqData?.data[typeOfQuestion].objects,
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

  useEffect(() => {
    if (faqData && searchTerm) {
      const lowercasedFilter = searchTerm.toLowerCase()
      const filtered = faqData.data[typeOfQuestion].objects.filter(faq => {
        return (
          faq.question[locales].toLowerCase().includes(lowercasedFilter) ||
          faq.answer[locales].toLowerCase().includes(lowercasedFilter)
        )
      })
      setFilteredQuestions(filtered)
    } else {
      setFilteredQuestions(faqData?.data[typeOfQuestion].objects)
    }
  }, [searchTerm, faqData, typeOfQuestion, locales])

  return (
    <div className={style.wrapper}>
      <Header size="s" loginClassName={style.loginModal} />
      <div className={style.titleContainer}>{t('FAQ_TITLE')}</div>
      <div className={style.mainPart}>
        <div className={style.buttonContainer}>
          {faqData?.data.map((category, index) => (
            <button
              key={index}
              onClick={() => setTypeOfQuestion(index)}
              className={classNames(style.buttons, {
                [style.activeButton]: typeOfQuestion === index,
              })}
            >
              {category._id?.name}
            </button>
          ))}
        </div>
        <div className={style.QAContainer}>
          <div className={style.titleSearchBar}>
            <h2>{faqData?.data[typeOfQuestion]._id?.name}</h2>
              <input
                type="text"
                placeholder={t("FAQ_QUICK_SEARCH")}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className={style.searchBar}
              />
          </div>
          {filteredQuestions?.map((faq, index) => (
            <div key={index}>
              <button
                className={classNames(
                  style.faq__question,
                  clicked === index && style.faq__question__open,
                )}
                onClick={() => setClicked(clicked === index ? -1 : index)}
              >
                {faq.question[locales]}
              </button>
              <div
                className={classNames(
                  style.faq__answer,
                  index === clicked && style.faq__answer__open,
                )}
              >
                {faq.answer[locales]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Faq
