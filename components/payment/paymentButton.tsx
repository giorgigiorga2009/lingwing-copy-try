import React from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from '@utils/useTranslation'
import styles from './paymentButton.module.scss'
import { PaymentButtonProps } from '@utils/getPayments'
import { paymentSelection } from '@utils/const'

const routesMap = {
  geopay: '/wizard',
  paypal: '/',
  recurring: '/paymentSchedule',
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  selectedOption,
  payWithOption,
  duration,
}) => {
  const router = useRouter()
  const { t } = useTranslation()

  const handleButtonClick = () => {
    const route =
      selectedOption === paymentSelection[0].value
        ? routesMap[payWithOption as keyof typeof routesMap]
        : routesMap.recurring

    router.push({
      pathname: route,
      query: { period: duration },
    })
  }

  return (
    <div className={styles.buttonContainer}>
      <button
        className={styles.btn}
        onClick={handleButtonClick}
        disabled={selectedOption === ''}
      >
        {t('APP_GENERAL_CONTINUE')}
      </button>
    </div>
  )
}

export default PaymentButton
