import React, { useEffect, useState } from 'react'
import style from './freeTrialPackages.module.scss'
import { useTranslation } from '@utils/useTranslation'
import { PackageData, getPackages } from '@utils/getPackages'
import Package from '../package/package'
import parrotImages from '../packageAssets/images'
import Link from 'next/link'

const FreeTrialPackages = () => {
  const [data, setData] = useState<PackageData>()
  const [isChecked, setIsChecked] = useState(false)
  const [noticeClicked, setNoticeClicked] = useState(false)
  const [packageSelected, setPackageSelected] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    getPackages('').then(response => {
      setData(response)
    })
  }, [])


  const packages = data?.packages ?? []
  const identifier = packages[0]?.currency[0]._id.symbol!
  const filteredPackages = packages.filter((_, index) => index !== 0)

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked)
    if (!isChecked) {
      setPackageSelected(false)
      setNoticeClicked(true)
    }
  }

  const handlePackageClick = (index: number) => {
    setPackageSelected(true)
    setNoticeClicked(false)
  }

  const checkboxStyle = {
    border:
      (isChecked || packageSelected) && !noticeClicked ? '2px solid red' : '',
  }

  const packageComponents = filteredPackages.map((pkg, index) => (
    <div key={pkg._id} id={`package-${index}`}>
      <Package
        duration={pkg.duration}
        recurringPrice={pkg.currency[0]?.recurringPrice}
        image={parrotImages[index].src}
        onClick={() => handlePackageClick(index)}
        identifier={identifier}
        isChecked={isChecked}
      />
    </div>
  ))

  return (
    <div className={style.trialPackagesContainer}>
      <h2 className={style.title}>{t('APP_FREE_TRIAL2_TITLE')}</h2>
      <div className={style.sliderContainer}>
        <div className={style.carousel}>{packageComponents}</div>
      </div>
      <div className={style.agreement}>
        <label className={style.checkLabel}>
          <input type="checkbox" onClick={handleCheckboxClick} />
          <div className={style.checkmark} style={checkboxStyle}></div>
        </label>
        <p>
          {t('APP_AGREE_LICENSE_1') + ' '}
          <Link href="/licensing-agreement">{t('loginFooter4')}</Link>
          {' ' + t('APP_AGREE_LICENSE_2')}
          {' ' + t('APP_AGREE_LICENSE_3')}
        </p>
      </div>
    </div>
  )
}

export default FreeTrialPackages
