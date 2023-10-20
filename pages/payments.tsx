import React, { useEffect, useState } from 'react'
import style from '@pages/payments.module.scss'
import { getUserPayements, PaymentsProps } from '@utils/getUserPayemnts'
import { Header } from '@components/header/Header'
import { useTranslation } from '@utils/useTranslation'
import { useRouter } from 'next/router'

const Payments = () => {
  const { t } = useTranslation()
  const [paymentsData, setPaymentsData] = useState<PaymentsProps | null>(null)
  const router = useRouter()

  const goBack = () => {
    router.back()
  }
  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    const fetchUserPayments = async () => {
      if (typeof authToken === 'string') {
        try {
          const data = await getUserPayements(authToken)
          setPaymentsData(data)
        } catch (error) {
          console.error('Error fetching certificate:', error)
        }
      }
    }
    fetchUserPayments()
  }, [])

  return (
    <div className={style.wrapper}>
      <Header size="s" loginClassName={style.loginModal} />
      <div className={style.containerWrapper}>
        <div className={style.payments}>{t('APP_HEADER_PAYMENTS')}</div>
        <div className={style.container}>
          <button className={style.cross} onClick={goBack}>
            ✕
          </button>
          <div className={style.firstRow}>
            <div className={style.firstRowContent}>
              <div>{t('PAYMENTS_STATS_REMAINING')}</div>
              <div className={style.statsNum}>
                {paymentsData?.premiumDaysLeft}
              </div>
            </div>
            <div className={style.firstRowContent}>
              <div>{t('PAYMENTS_STATS_TESTS')}</div>
              <div className={style.statsNum}>{paymentsData?.tests}</div>
            </div>
            <div className={style.firstRowContent}>
              <div>{t('PAYMENTS_STATS_TASKS')}</div>
              <div className={style.statsNum}>{paymentsData?.tasks}</div>
            </div>
          </div>
          <div className={style.secondRow}>
            <div className={style.subTitle}>
              {t('PAYMENTS_STATS_YOUR_CARD')}
            </div>
            {paymentsData?.creditCard.isAttached ? (
              <>
                <div>{paymentsData?.creditCard.number}</div>
                <div>{paymentsData?.creditCard.type}</div>
              </>
            ) : (
              <button>{t('PAYMENTS_STATS_ADD_CARD')}</button>
            )}
          </div>
          <div className={style.thirdRow}>
            <div className={style.subTitle}>{t('PAYMENTS_STATS_HISTORY')}</div>
            <div className={style.history}>
              <div>{t('PAYMENTS_STATS_PRODUCT')}</div>
              <div>{t('PAYMENTS_STATS_STATUS')}</div>
              <div>{t('PAYMENTS_STATS_METHOD')}</div>
              <div>{t('PAYMENTS_STATS_AMOUNT')}</div>
              <div>{t('PAYMENTS_STATS_PAYMENT_DATE')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payments