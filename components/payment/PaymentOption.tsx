import React, { useState } from 'react'
import classNames from 'classnames'
import Image from 'next/image'
import { useTranslation } from '@utils/useTranslation'
import styles from './PaymentOption.module.scss'
import purple_tick from '@public/assets/images/tick-check/bon-check-purple.png'
import { PaymentOptionProps } from '@utils/getPayments'
import { paymentSelection } from '@utils/const'
import { DiscountedTotalPrice } from '@components/packages/PromoPrices'
import PayWithMethod from './payWithMethod'
import PaymentButton from './paymentButton'

const PaymentOption: React.FC<PaymentOptionProps> = ({
  currentPackage,
  monthlyPayment,
  selectedCurrency,
  payWithOptions,
}) => {
  const { t } = useTranslation()
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [payWithOption, setPayWithOption] = useState<string>('')
  const {
    oldPrice,
    price,
    _id: { symbol = '' } = {},
  } = currentPackage?.currency[selectedCurrency] || {}
  let duration: number | null = null

  if (typeof window !== 'undefined') {
    const getFromLocalStorage = (key: string) => {
      const data = localStorage.getItem(key)
      return data && data !== 'undefined' ? JSON.parse(data) : null
    }
    duration = getFromLocalStorage('duration')
  }

  const handleOptionChange = (option: string) => {
    setSelectedOption(option)
    {
      payWithOptions && setPayWithOption(payWithOptions[0].nameCode)
    }
  }

  return (
    <div>
      {paymentSelection.map(option => (
        <div key={option.value} className={styles.optionsWrapper}>
          <div
            className={
              selectedOption === option.value ? styles.optionContainer : ''
            }
          >
            <div className={styles.radio} key={option.value}>
              <input
                id={option.value}
                type="radio"
                name="pay"
                value={option.value}
                checked={selectedOption === option.value}
                onChange={() => handleOptionChange(option.value)}
                className={styles.radioInput}
              />
              <label htmlFor={option.value} className={styles.radioLabel}>
                {selectedOption === option.value && (
                  <Image
                    className={styles.purple_tick}
                    src={purple_tick}
                    width={20}
                    height={20}
                    alt=""
                  />
                )}
                <div
                  className={classNames(styles.priceWrapper, {
                    [styles.checked]: selectedOption === option.value,
                  })}
                >
                  <span
                    className={classNames(styles.labelText, {
                      [styles.checked]: selectedOption === option.value,
                    })}
                  >
                    {option.index === 0
                      ? t('PAYMENT_PAY_AT_ONCE')
                      : t('PAYMENT_MONTHLY_PAYMENT')}
                  </span>
                  <span>
                    {currentPackage?.sale > 0 && option.index === 0 ? (
                      <DiscountedTotalPrice
                        oldPrice={oldPrice}
                        symbol={symbol}
                        totalPrice={price}
                        onPaymentPage={selectedOption === option.value}
                      />
                    ) : (
                      <>
                        {option.index === 0
                          ? price
                          : monthlyPayment?.toFixed(1)}{' '}
                        {symbol}
                      </>
                    )}
                  </span>
                </div>
              </label>
            </div>
            {selectedOption === option.value && (
              <PayWithMethod
                options={payWithOptions ?? []}
                selectedOptionIndex={option.index}
                payWithOption={payWithOption}
                setPayWithOption={setPayWithOption}
              />
            )}
          </div>
        </div>
      ))}

      <PaymentButton
        selectedOption={selectedOption}
        payWithOption={payWithOption}
        duration={duration}
      />
    </div>
  )
}

export default PaymentOption
