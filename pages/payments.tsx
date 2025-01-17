import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { PageHead } from '@components/PageHead'
import style from '@pages/payments.module.scss'
import { Header } from '@components/header/Header'
import React, { useEffect, useState } from 'react'
import { useTranslation } from '@utils/useTranslation'
import { PaymentsProps, getUserPayements } from '@utils/getUserPayemnts'

const Payments = () => {
  const { t } = useTranslation()
  const [paymentsData, setPaymentsData] = useState<PaymentsProps | null>(null)
  const router = useRouter()
  const { data: session } = useSession()

  const goBack = () => {
    router.back()
  }
  useEffect(() => {
    const fetchUserPayments = () => {
      if (session) {
        getUserPayements(session.user.accessToken)
          .then(data => {
            setPaymentsData(data)
            return data
          })
          .catch(error => {
            console.error('Error fetching certificate:', error)
          })
      }
    }

    fetchUserPayments()
  }, [session])

  return (
    <div className={style.wrapper}>
      <PageHead
        title="META_TAG_PAYMENTS_TITLE"
        description="META_TAG_PAYMENTS_DESCRIPTION"
        keywords="META_TAG_PAYMENTS_KEYWORDS"
      />
      <Header size="s" loginClassName={style.loginModal} setShowTopScores={() => false} showTopScores={false}/>
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
