import React from 'react'
import styles from './AboutQuotes.module.scss'
import { useTranslation } from '@utils/useTranslation'
import { AboutQuotesProps } from '@utils/getReadCourse'
import parrot from '@public/assets/images/challengeurself.svg'

const AboutQuotes: React.FC<AboutQuotesProps> = ({ promo }) => {
  const { t } = useTranslation()
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{t("ABOUT_COURSE_YOU'LL_BE_MIGHTY")}</h3>
      <div className={styles.quotesContainer}>
        {promo?.map(quote => (
          <div key={quote} className={styles.quote}>
            {quote}
          </div>
        ))}
      </div>
      <img
        src={parrot.src}
        alt="Parrot holding torch"
        className={styles.engParrot}
      />
    </div>
  )
}

export default AboutQuotes
