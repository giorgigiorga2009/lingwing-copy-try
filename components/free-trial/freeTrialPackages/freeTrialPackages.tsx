import React, { useEffect, useState } from 'react'
import style from './freeTrialPackages.module.scss'
import { useTranslation } from '@utils/useTranslation'
import { PackageData, getPackages } from '@utils/getPackages'
import Package from '../package/package'
import { parrotImages } from '@utils/const'
import Link from 'next/link'
import close from '@public/themes/images/v2/gram-clos-p.png'
import Image from 'next/image'

const FreeTrialPackages = () => {
  const [data, setData] = useState<PackageData>()
  const [isChecked, setIsChecked] = useState(false)
  const [packageClicked, setPackageClicked] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPackages('')
        setData(response)
      } catch (err) {
        console.error('An error occurred:', err)
      }
    }
    fetchData()
  }, [])

  const packages = data?.packages ?? []
  const identifier = packages[0]?.currency[0]._id.symbol
  const filteredPackages = packages.filter((_, index) => index !== 0)

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked)
  }
  const handlePackageClicked = () => {
    setPackageClicked(true)
  }

  return (
    <div className={style.trialPackagesContainer}>
      <h2 className={style.title}>{t('APP_FREE_TRIAL2_TITLE')}</h2>
      <Link href="/dashboard">
        <Image
          className={style.close}
          src={close.src}
          alt="close"
          width={20}
          height={20}
        />
      </Link>
      <div className={style.sliderContainer}>
        <div className={style.carousel}>
          {filteredPackages.map((pkg, index) => (
            <Package
              key={pkg._id}
              duration={pkg.duration}
              recurringPrice={pkg.currency[0]?.recurringPrice}
              image={parrotImages[index]}
              identifier={identifier}
              isChecked={isChecked}
              packageClicked={packageClicked}
              index={index}
              onClick={handlePackageClicked}
            />
          ))}
        </div>
      </div>
      <div className={style.agreement}>
        <label className={style.checkLabel}>
          <input type="checkbox" onClick={handleCheckboxClick} />
          <div
            className={style.checkmark}
            style={{
              border:
                (isChecked || packageClicked) && !isChecked
                  ? '2px solid red'
                  : '',
            }}
          ></div>
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
