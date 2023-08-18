import React from 'react'
import style from './packagesInfo.module.scss'
import { useTranslation } from '@utils/useTranslation'
import { Header } from '@components/header/Header'
import { Reviews } from '@components/Reviews'
import { FollowButtons } from '@components/home/FollowButtons'
import { Footer } from '@components/wizard/Footer'
import PlanSelection from '@components/packagesInfo/planSelection'

const packagesInfo = () => {
  const { t } = useTranslation()
  return (
    <div className={style.container}>
      <Header size="s" loginClassName={style.loginModal} />
      <div className={style.planSelectionContainer}>
        <h1 className={style.header}>{t('PACKAGES_INFO_HEADER')}</h1>

        <PlanSelection
          header={t('PACKAGES_INFO_FREE_TRIAL_HEADER')}
          paragraph={t('PACKAGES_INFO_FREE_TRIAL_PARAGRAPH')}
          buttonText={t('PACKAGES_INFO_CHOOSE')}
          index={0}
        />
        <PlanSelection
          header={t('PACKAGES_INFO_FREE_LEARNING_HEADER')}
          paragraph={t('PACKAGES_INFO_FREE_LEARNING_PARAGRAPH')}
          buttonText={t('PACKAGES_INFO_CHOOSE')}
          index={1}
        />
        <PlanSelection
          header={t('PACKAGES_INFO_PREMIUM_HEADER')}
          paragraph={t('PACKAGES_INFO_PREMIUM_PARAGRAPH')}
          buttonText={t('PREMIUM')}
          index={2}
        />
      </div>
    </div>
  )
}

export default packagesInfo

{
  /* <Reviews /> */
}
{
  /* <FollowButtons color="grey" /> */
}
{
  /* <Footer /> */
}