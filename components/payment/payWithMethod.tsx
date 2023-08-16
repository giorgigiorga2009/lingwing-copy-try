import React from 'react'
import Image from 'next/image'
import styles from './payWithMethod.module.scss'
import purple_tick from '@public/assets/images/tick-check/bon-check-purple.png'
import { PaymentMethod } from '@utils/getPayments'
import { useTranslation } from '@utils/useTranslation'

interface Props {
  options?: PaymentMethod[]
  selectedOptionIndex: number
  payWithOption: string
  setPayWithOption: (payWithOption: string) => void
}

const PayWithMethod: React.FC<Props> = ({
  options,
  selectedOptionIndex,
  payWithOption,
  setPayWithOption,
}) => {
  const { t } = useTranslation()

  const filteredOptions =
    selectedOptionIndex === 0
      ? (options || []).filter(paymentType =>
          ['geopay', 'paypal'].includes(paymentType.nameCode),
        )
      : (options || []).filter(paymentType => paymentType.recurring)

  return (
    <div className={styles.payWithContainer}>
      <p className={styles.pHeaderPayWith}>{t('PAYMENT_PAY_WITH')}</p>
      <div className={styles.payWithTiles}>
        {filteredOptions.map(option => (
          <div className={styles.payWithTile} key={option.nameCode}>
            <input
              type="radio"
              name="payWithOptions"
              value={option.nameCode}
              checked={payWithOption === option.nameCode}
              onChange={() => setPayWithOption(option.nameCode)}
              className={styles.payWithInput}
              style={{
                backgroundImage: `url('/assets/images/payWithLogos/${option.logo}.png')`,
              }}
            />
            {payWithOption === option.nameCode && (
              <Image
                className={styles.purple_tick_for_payment_option}
                src={purple_tick}
                width={20}
                height={20}
                alt=""
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PayWithMethod
