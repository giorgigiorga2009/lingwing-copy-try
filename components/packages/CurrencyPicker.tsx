import { FC } from 'react'
import classNames from 'classnames'
import style from './CurrencyPicker.module.scss'

interface Props {
  selectedCurrency: number
  identifier: string
  symbol: string
  index: number
  onClick: () => void
}

export const Currency: FC<Props> = ({
  selectedCurrency,
  identifier,
  symbol,
  index,
  onClick,
}) => {
  return (
    <span
      className={classNames(
        style.currency,
        index === selectedCurrency && style.currencyBackground,
      )}
      onClick={onClick}
    >
      {identifier + symbol}
    </span>
  )
}
