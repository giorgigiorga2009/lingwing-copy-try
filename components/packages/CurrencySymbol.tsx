import { FC } from 'react'
import style from './CurrencySymbol.module.scss'

interface Props {
  symbol: string
}

export const CurrencySymbol: FC<Props> = ({ symbol }) => {
  return <span className={style.symbol}>{symbol}</span>
}
