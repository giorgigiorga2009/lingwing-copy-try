import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import style from './planSelection.module.scss'
import classNames from 'classnames'
import rocketParrot from '@public/assets/images/rocketParrot.png'
import starIcon from '@public/assets/images/pr-star-icon.png'
import {
  PackagesInfoProps,
  getCheckedPackageInfo,
  getPackageDataByIdInfo,
} from '@utils/getPackagesInfo'
import { PackageResponse } from '@utils/getPayments'

const PlanSelection: React.FC<PackagesInfoProps> = ({
  header,
  paragraph,
  buttonText,
  index,
  fromGelText,
}) => {
  const [data, setData] = useState<PackageResponse | undefined>(undefined)

  useEffect(() => {
    let isMounted = true

    const fetchPackageData = async () => {
      try {
        const checkedPackage = await getCheckedPackageInfo()
        if (checkedPackage?.orderId && isMounted) {
          const packageData = await getPackageDataByIdInfo(
            checkedPackage.orderId,
          )
          setData(packageData as PackageResponse | undefined)
        }
      } catch (error) {
        console.error('An error occurred while fetching package data:', error)
      }
    }
    fetchPackageData()

    return () => {
      isMounted = false
    }
  }, [])

  const monthlyPayment =
    data?.packages[0].currency[0].recurringPrice !== undefined
      ? data?.packages[0].currency[0].recurringPrice /
        data?.packages[0].duration
      : undefined

  return (
    <div
      className={classNames(style.container, {
        [style.differentBG]: index === 1,
      })}
    >
      <div className={style.buble}/>
      <div className={classNames(style.header, {[style.premiumHeader]: index === 2,})}>
        <h3>{header}</h3>
        <p>{paragraph}</p>
      </div>
      <div>
        {index === 2 && (
          <Image
            src={rocketParrot}
            className={style.rocketParrot}
            alt=""
            width={500}
            height={500}
            priority={true}
          />
        )}
      </div>
      <div className={index === 2 ? style.premiumButtonDiv : style.buttonDiv}>
        <Link
          href={
            index === 2 ? '/packages' : '/free-trial' // needs to be changed to whatever Tornike has named the page
          }
        >
          <button
            className={classNames(style.button, {
              [style.premiumButton]: index === 2,
            })}
          >
            <div className={style.buttonWrapper}>
              {index === 2 && (
                <Image
                  src={starIcon}
                  alt=""
                  width={30}
                  height={30}
                  priority={true}
                />
              )}
              {buttonText}
            </div>
          </button>
        </Link>
        <div className={style.monthlyPayment}>
          {index === 2 && `${fromGelText} ${monthlyPayment}`}
        </div>
      </div>
    </div>
  )
}

export default PlanSelection
