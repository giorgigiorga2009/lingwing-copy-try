import React, { useEffect, useState } from 'react'
import style from './licensing-agreement.module.scss'
import { Header } from '@components/header/Header'
import { Footer } from '@components/wizard/Footer'
import { useTranslation } from '@utils/useTranslation'
import { FollowButtons } from '@components/home/FollowButtons'
import {
  useLicencingAgreementData,
  HTMLRenderer,
  fetchData,
} from '@utils/htmlRenderer'

const LicencingAgreement = () => {
  const { t } = useTranslation()
  const { isLoading, isError, data: fetchedData } = useLicencingAgreementData()
  const [data, setData] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoading && !isError && fetchedData) {
      setData(fetchedData)
    }
  }, [isLoading, isError, fetchedData])

  return (
    <div className={style.background}>
      <Header />
      <div className={style.container}>
        <h1 className={style.title}>{t('menuLicenseAgreement')}</h1>
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

export default LicencingAgreement
