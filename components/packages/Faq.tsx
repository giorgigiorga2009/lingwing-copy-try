import { FC, useEffect, useState } from 'react'
import style from './Faq.module.scss'
import { getFAQ, FaqData } from '../../utils/getFAQ'

const FAQ: FC = () => {
  const [faqData, setFaqData] = useState<FaqData[]>()

  useEffect(() => {
    getFAQ().then(response => {
      setFaqData(response)
    })
  }, [])

  if (!faqData) return null

  return (
    <div className={style.faq__container}>
      <h1 className={style.faq__title}>Frequently asked questions</h1>
      <div className={style.faq__row}>
        <div className={style.faq__col}>
          {faqData.map(faq => (
            <div key={faq.position} className={style.faq}>
              <input
                id={faq.position.toString()}
                type="checkbox"
                className={style.faq__input}
              />
              <label
                htmlFor={faq.position.toString()}
                className={style.faq__question}
              >
                {faq.question}
              </label>
              <div className={style.faq__answer}>{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FAQ
