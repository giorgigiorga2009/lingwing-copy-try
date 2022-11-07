import { FC } from 'react'
import style from './Prices.module.scss'
import { CurrencySymbol } from './CurrencySymbol'
import { useTranslation } from '../../utils/useTranslation'

interface ReccuringPrice {
  price: number
  duration: number
  symbol: string
}

interface TotalPrice {
  totalPrice: number
  symbol: string
}

export const FreePackagePrice: FC = () => {
  const { t } = useTranslation()

  return <div className={style.freePackage}>{t('APP_PACKAGE_FREE')}</div>
}

export const ReccuringPrice: FC<ReccuringPrice> = ({
  price,
  duration,
  symbol,
}) => {
  const { t } = useTranslation()

  return (
    <div className={style.monthPrice}>
      {(price / duration).toFixed(1)}
      <CurrencySymbol symbol={symbol} />
      <span className={style.monthAndTotal}>{t('APP_PACKAGE_MONTH_ge')}</span>
    </div>
  )
}

export const TotalPrice: FC<TotalPrice> = ({ totalPrice, symbol }) => {
  const { t } = useTranslation()

  return (
    <div className={style.totalPrice}>
      {totalPrice}
      <CurrencySymbol symbol={symbol} />
      <span className={style.monthAndTotal}>{t('APP_PACKAGE_TOTAL')}</span>
    </div>
  )
}
