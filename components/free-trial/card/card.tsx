'use client'

import React, { useState } from 'react'
import style from './card.module.scss'
import Advertise from '../offer/offer'
import FreeTrialPackages from '../freeTrialPackages/freeTrialPackages'
import { useTranslation } from '@utils/useTranslation'
import Image from 'next/image'
import arrow from '@public/themes/images/v2/flow-Arrow.png'
const Card = () => {
  const [showPackages, setShowPackages] = useState(false)
  const { t } = useTranslation()

  const handleContinueBtn = () => {
    setShowPackages(true)
  }

  if (showPackages) {
    return (
      <div className={style.packagesContainer}>
        <FreeTrialPackages />
      </div>
    )
  }

  return (
    <div className={style.advertiseContainer}>
      <Advertise />
      <button className={style.continue} onClick={handleContinueBtn}>
        {t('APP_FREE_TRIAL1_CONTINUE')}
        <Image src={arrow.src} width={15} height={20} alt="arrow" />
      </button>
    </div>
  )
}

export default Card
