import { FC, useEffect, useState } from 'react'
import style from './Pricing.module.scss'
import { getPackages, PackageData } from '../../utils/getPackages'
import { useTranslation } from '../../utils/useTranslation'
import classNames from 'classnames'
import Image from 'next/image'
import tick from '../../public/themes/images/V2/Packages/tick.svg'
import x from '../../public/themes/images/V2/Packages/x.svg'
import discountImg from '../../public/themes/images/V2/Packages/discountCircle.png'
import { PACKAGES_IMAGES } from '../../utils/const'

const Pricing: FC = () => {
  const { t } = useTranslation()
  const [packagesData, setPackagesData] = useState<PackageData>()
  const [currencyChecked, setCurrencyChecked] = useState(0)

  const Currency: FC<{ identifier: string; symbol: string; index: number }> = ({
    identifier,
    symbol,
    index,
  }) => {
    return (
      <span
        className={classNames(
          style.currency,
          index === currencyChecked && style.currencyBackground,
        )}
        onClick={() => setCurrencyChecked(index)}
      >
        {identifier + symbol}
      </span>
    )
  }

  const Duration: FC<{ duration: number }> = ({ duration }) => {
    return (
      <div className={style.duration}>
        {duration}
        <span className={style.months}>{t('APP_PACKAGE_MONTHS')}</span>
      </div>
    )
  }

  const FreePackageName: FC = () => {
    return (
      <div className={style.freePackageName}>{t('APP_PACKAGE_LIFETIME')}</div>
    )
  }

  const FreePackagePrice: FC = () => {
    return <div className={style.freePackage}>{t('APP_PACKAGE_FREE')}</div>
  }

  const ShowSymbol: FC<{ symbol: string }> = ({ symbol }) => {
    return <span className={style.symbol}>{symbol}</span>
  }

  const ReccuringPrice: FC<{
    price: number
    duration: number
    symbol: string
  }> = ({ price, duration, symbol }) => {
    return (
      <div className={style.monthPrice}>
        {(price / duration).toFixed(1)}
        <ShowSymbol symbol={symbol} />
        <span className={style.monthAndTotal}>{t('APP_PACKAGE_MONTH_ge')}</span>
      </div>
    )
  }

  const TotalPrice: FC<{ totalPrice: number; symbol: string }> = ({
    totalPrice,
    symbol,
  }) => {
    return (
      <div className={style.totalPrice}>
        {totalPrice}
        <ShowSymbol symbol={symbol} />
        <span className={style.monthAndTotal}>{t('APP_PACKAGE_TOTAL')}</span>
      </div>
    )
  }

  const PackageButton: FC<{ mostPopular: boolean }> = ({ mostPopular }) => {
    return (
      <div className={style.buttonContainer}>
        <button
          className={classNames(
            style.button,
            mostPopular && style.orangeButton,
          )}
        >
          {t('APP_PACKAGE_SELECT')}
        </button>
      </div>
    )
  }

  const FeatureDescs: FC = () => {
    return (
      <div className={style.featureDescContainer}>
        <div className={style.featureDesc}>
          {t('APP_PACKAGE_DAILY_NUMBER_OF_TASKS')}
        </div>
        <div className={style.featureDesc}>{t('APP_PACKAGE_CERTIFICATE')}</div>
        <div className={style.featureDesc}>
          {t('APP_PACKAGE_ALL_LANGS_AND_COURSES')}
        </div>
        <div className={style.featureDesc}>
          {t('APP_PACKAGE_VOICE_RECOGNITION')}
        </div>
      </div>
    )
  }

  const Features: FC<{
    feature: {
      tasks: number
      certificate: boolean
      grammarAndStatistics: boolean
      voiceRecognition: boolean
    }
  }> = ({
    feature: { tasks, certificate, grammarAndStatistics, voiceRecognition },
  }) => {
    return (
      <div className={style.featureContainer}>
        <div>{tasks === -1 ? t('APP_PACKAGE_UNLIMITED') : tasks}</div>
        <div>{<TickOrX feature={certificate} />}</div>
        <div>{<TickOrX feature={grammarAndStatistics} />}</div>
        <div>{<TickOrX feature={voiceRecognition} />}</div>
      </div>
    )
  }

  const TickOrX: FC<{ feature: boolean }> = ({ feature }) => {
    return (
      <>
        {feature ? (
          <Image src={tick} height="30" width="30" />
        ) : (
          <Image src={x} height="30" width="30" />
        )}
      </>
    )
  }

  const MostPopular: FC = () => {
    return (
      <div className={style.mostPopularText}>
        {t('APP_PACKAGE_MOST_POPULAR')}
      </div>
    )
  }

  const DiscountedTotalPrice: FC<{
    oldPrice: number
    symbol: string
    totalPrice: number
  }> = ({ oldPrice, symbol, totalPrice }) => {
    return (
      <div className={style.totalPrice}>
        <span className={style.oldTotalPrice}>{oldPrice}</span>
        <ShowSymbol symbol={symbol} />
        <span className={style.discountedTotalPrice}>
          {totalPrice}
          <ShowSymbol symbol={symbol} />
        </span>
      </div>
    )
  }

  const ShowDiscountLabel: FC<{ discount: number }> = ({ discount }) => {
    return (
      <div className={style.discount}>
        <Image src={discountImg} width="75px" height="75px" />
        <div className={style.discountAmount}>{discount}%</div>
      </div>
    )
  }

  useEffect(() => {
    getPackages().then(response => {
      setPackagesData(response)
    })
  }, [])

  if (!packagesData) return null

  const Bubbles: FC = () => {
    return (
      <div className={style.bubbles}>
        {packagesData.packages.map((item, index) => (
          <div key={index} className={style.bubbles__bubble}>
            <a className={style.bubble__link} href={'#' + index}>
              empty
            </a>
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <div className={style.packageContainer}>
        <div>
          <div className={style.currencies}>
            {packagesData.currencies.map((currency, index) => (
              <Currency
                identifier={currency.identifier}
                symbol={currency.symbol}
                index={index}
                key={currency.identifier}
              />
            ))}
          </div>
        </div>
        {packagesData.packages.map((item, index) => (
          <div
            key={item._id}
            className={classNames(
              style.packageColumn,
              item.mostPopular && style.mostPopular,
            )}
          >
            {item.mostPopular && <MostPopular />}
            {item.duration === 0 ? (
              <FreePackageName />
            ) : (
              <Duration duration={item.duration} />
            )}
            {item.sale > 0 && <ShowDiscountLabel discount={item.sale} />}
            <div className={style.scrollAnchor} id={item._id}></div>
            <Image
              src={PACKAGES_IMAGES[index]}
              width="100%"
              height="100%"
              layout="fixed"
              objectFit="contain"
              className={item.mostPopular ? '' : style.packageImage}
            />
            {item.duration === 0 ? (
              <FreePackagePrice />
            ) : (
              <ReccuringPrice
                price={item.currency[currencyChecked].recurringPrice}
                duration={item.duration}
                symbol={item.currency[currencyChecked]._id.symbol}
              />
            )}

            {item.duration !== 0 &&
              (item.sale > 0 ? (
                <DiscountedTotalPrice
                  oldPrice={item.currency[currencyChecked].oldPrice}
                  symbol={item.currency[currencyChecked]._id.symbol}
                  totalPrice={item.currency[currencyChecked].price}
                />
              ) : (
                <TotalPrice
                  totalPrice={item.currency[currencyChecked].price}
                  symbol={item.currency[currencyChecked]._id.symbol}
                />
              ))}
            {<PackageButton mostPopular={item.mostPopular} />}

            <div className={style.featuresContainer}>
              {index === 0 && <FeatureDescs />}
              <Features feature={item.feature} />
            </div>
          </div>
        ))}
      </div>
      <Bubbles />
    </>
  )
}

export default Pricing
