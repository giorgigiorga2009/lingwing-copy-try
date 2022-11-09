import { FC, useEffect, useState } from 'react'
import style from './Faq.module.scss'
import classNames from 'classnames'
import { getFAQ, FaqData } from '../../utils/getFAQ'

const FAQ: FC = () => {
  const [faqData, setFaqData] = useState<FaqData[]>()
  const [clicked, setClicked] = useState(-1)

  useEffect(() => {
    getFAQ().then(response => {
      setFaqData(response)
    })
  }, [])

  if (!faqData) return null

  return (
    <div className={style.faq__container}>
      <h1 className={style.faq__title}>Frequently asked questions</h1>
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
