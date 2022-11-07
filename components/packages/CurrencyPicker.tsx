import { FC } from 'react'
import classNames from 'classnames'
import style from './CurrencyPicker.module.scss'

interface Props {
  selectedCurrency: number
  identifier: string
  symbol: string
  index: number
  switchHandler: VoidFunction
}

export const Currency: FC<Props> = ({
  selectedCurrency,
  identifier,
  symbol,
  index,
  switchHandler,
}) => {
  return (
    <span
      className={classNames(
        style.currency,
        index === selectedCurrency && style.currencyBackground,
      )}
      onClick={switchHandler}
    >
      {identifier + symbol}
    </span>
  )
}
