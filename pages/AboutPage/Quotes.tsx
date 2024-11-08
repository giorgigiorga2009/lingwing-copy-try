import Image from 'next/image'
import style from './Quotes.module.scss'
import parrotImg from '@public/assets/images/challengeurself.svg'
import { useTranslation } from '@utils/useTranslation'

const Quotes: React.FC<any> = ({ promo }) => {
  const { t } = useTranslation()
  return (
    <div className={style.quotesWave}>
      <h3 className={style.quoteTitle}>{t("ABOUT_COURSE_YOU'LL_BE_MIGHTY")}</h3>
      <div className={style.quoteContainer}>
        {promo?.map((item: string, index: number) => {
          return (
            <div className={style.quote} key={index}>
              {item}
            </div>
          )
        })}
      </div>
      <Image className={style.parrotImg} src={parrotImg} alt="parrot" width={150} height={200} />
    </div>
  )
}

export default Quotes
