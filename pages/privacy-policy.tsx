import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import style from './privacy-policy.module.scss'
import { Header } from '@components/header/Header'
import { Footer } from '@components/wizard/Footer'
import { useTranslation } from '@utils/useTranslation'
import { FollowButtons } from '@components/home/FollowButtons'
import { usePrivacyPolicyData, HTMLRenderer } from '@utils/htmlRenderer'

const PrivacyPolicy: NextPage = () => {
  const { t } = useTranslation()
  const { isLoading, isError, data: fetchedData } = usePrivacyPolicyData()
  const [data, setData] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoading && !isError && fetchedData) {
      setData(fetchedData)
    }
  }, [isLoading, isError, fetchedData])

  return (
    <div className={style.background}>
      <Header setShowTopScores={() => false} showTopScores={false}/>
      <div className={style.container}>
        <h1 className={style.title}>{t('menuPrivacyPolicy')}</h1>
        <div className={style.content}>
          <HTMLRenderer htmlContent={data || ''} />
        </div>
      </div>
      <div className={style.footer}>
        <FollowButtons color="grey" />
        <Footer />
      </div>
    </div>
  )
}

export default PrivacyPolicy
