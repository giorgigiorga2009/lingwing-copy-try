import classNames from 'classnames'
import { FC, useEffect, useState } from 'react'
import { getFAQ, FaqData } from '@utils/getFAQ'
import { LanguageFrom } from '@utils/languages'
import { useTranslation } from '@utils/useTranslation'
import style from '@components/packages/Faq.module.scss'

interface Props {
  locale: LanguageFrom
}

const FAQ: FC<Props> = ({ locale }) => {
  const { t } = useTranslation()
  const [clicked, setClicked] = useState(-1)
  const [faqData, setFaqData] = useState<FaqData[]>()

  useEffect(() => {
    getFAQ(locale).then(response => {
      setFaqData(response)
    })
  }, [locale])

  if (!faqData) return null

  return (
    <div className={style.faq__container}>
      <h1 className={style.faq__title}>{t('APP_PACKAGES_FAQ_TITLE')}</h1>
      {faqData.map((faq, index) => (
        <div key={index}>
          <div
            className={classNames(
              style.faq__question,
              clicked === index && style.faq__question__open,
            )}
            onClick={() => setClicked(clicked === index ? -1 : index)}
          >
            {faq.question}
          </div>
          <div
            className={classNames(
              style.faq__answer,
              index === clicked && style.faq__answer__open,
            )}
          >
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  )
}

export default FAQ
