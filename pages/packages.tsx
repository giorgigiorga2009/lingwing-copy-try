import { FC, useEffect, useState } from 'react'
import { getPackages, PackageData } from '../utils/getPackages'
import type { NextPage } from 'next'
import { Header } from '../components/header/Header'
import style from './packages.module.scss'
import _ from 'lodash'
import { FollowButtons } from '../components/home/FollowButtons'
import { Footer } from '../components/wizard/Footer'
import { useTranslation } from '../utils/useTranslation'
import classNames from 'classnames'

// interface PackageProps {
//   package: PackageData
// }

export const Packages: FC = () => {
  const [packagesData, setPackagesData] = useState<PackageData[]>()

  useEffect(() => {
    getPackages().then(response => {
      setPackagesData(response)
    })
  }, [])

  return (
    <div className={style.packageContainer}>
      {packagesData &&
        packagesData.map(item => (
          <>
            <div
              className={classNames(
                style.packageColumn,
                item.mostPopular && style.mostPopular,
              )}
            >
              {item.mostPopular && (
                <div className={style.mostPopularText}>Most Popular</div>
              )}
              <div>{item.duration}</div>
              <div>{item.currency[0].recurringPrice}</div>
              <div>{item.currency[0].price}</div>
              <div>{item.feature.tasks}</div>
              <div>{item.feature.certificate.toString()}</div>
              <div>{item.feature.grammarAndStatistics.toString()}</div>
              <div>{item.feature.voiceRecognition.toString()}</div>
            </div>
          </>
        ))}
    </div>
  )
}

const Package: NextPage = props => {
  const { t } = useTranslation()

  return (
    <div className={style.container}>
      <Header size="s" loginClassName={style.loginModal} />
      <div className={style.content}>
        <div className={style.mainBlock}>
          <Packages />
        </div>
      </div>

      <div className={style.followButtons}>
        <FollowButtons color="grey" />
      </div>
      <div className={style.footer}>
        <Footer />
      </div>
    </div>
  )
}

export default Package
