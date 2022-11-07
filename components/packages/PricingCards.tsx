import { FC, useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import style from './PricingCards.module.scss'
import { getPackages, PackageData } from '../../utils/getPackages'
import { Currency } from './CurrencyPicker'
import { FreePackagePrice, ReccuringPrice, TotalPrice } from './Prices'
import { DiscountedTotalPrice, ShowDiscountLabel } from './PromoPrices'
import { Features, FeatureDescs } from './Features'
import { FreePackageName, Duration } from './Duration'
import { CaruselDot } from './CaruselDot'
import { PackageButton } from './PackageButton'
import { MostPopular } from './MostPopular'
import classNames from 'classnames'
import Image from 'next/image'
import { PACKAGES_IMAGES } from '../../utils/const'

interface scroll {
  scrollLeft: number
  scrollWidth: number
}

const PricingCards: FC<{ showPackages: number[]; coupon: string }> = ({
  showPackages,
  coupon,
}) => {
  const cardRef = useRef<HTMLDivElement>(null!)
  const router = useRouter()
  const getCoupon = router.query.coupon as string
  const [packagesData, setPackagesData] = useState<PackageData>()
  const [selectedCurrency, setSelectedCurrency] = useState(0)
  const [currentCard, setCurrentCard] = useState(0)

  const scrollHandler = (index: number) => {
    cardRef.current.children[index].scrollIntoView()
  }

  useEffect(() => {
    if (!router.isReady) return
    getPackages(coupon === '' ? getCoupon : coupon).then(response => {
      setPackagesData(response)
    })
  }, [router.isReady, coupon])

  if (!packagesData) return null

  const CaruselDots: FC = () => {
    return (
      <div className={style.carusel__dots__container}>
        {packagesData.packages
          .filter((item, index) => showPackages.includes(index))
          .map((item, index) => (
            <CaruselDot
              key={index}
              index={index}
              current={currentCard}
              scrollHandler={() => scrollHandler(index)}
            />
          ))}
      </div>
    )
  }

  return (
    <>
      <div className={style.package__container}>
        <div>
          <div className={style.currencies}>
            {packagesData.currencies.map((currency, index) => (
              <Currency
                identifier={currency.identifier}
                symbol={currency.symbol}
                index={index}
                key={currency.identifier}
                switchHandler={() => setSelectedCurrency(index)}
                selectedCurrency={selectedCurrency}
              />
            ))}
          </div>
        </div>
        <div
          ref={cardRef}
          className={style.cards}
          onScroll={() => {
            const { scrollLeft, scrollWidth }: scroll = cardRef.current
            setCurrentCard(
              Math.round(
                (scrollLeft / scrollWidth) * cardRef.current.children.length,
              ),
            )
          }}
        >
          {packagesData.packages
            .filter((item, index) => showPackages.includes(index))
            .map((item, index) => (
              <div
                key={index}
                id={index.toString()}
                className={classNames(
                  style.package__card,
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
                <Image
                  src={PACKAGES_IMAGES[index]}
                  width="100%"
                  height="100%"
                  layout="fixed"
                  objectFit="contain"
                  className={item.mostPopular ? '' : style.package__card__image}
                />
                {item.duration === 0 ? (
                  <FreePackagePrice />
                ) : (
                  <ReccuringPrice
                    price={item.currency[selectedCurrency].recurringPrice}
                    duration={item.duration}
                    symbol={item.currency[selectedCurrency]._id.symbol}
                  />
                )}

                {item.duration !== 0 &&
                  (item.sale > 0 ? (
                    <DiscountedTotalPrice
                      oldPrice={item.currency[selectedCurrency].oldPrice}
                      symbol={item.currency[selectedCurrency]._id.symbol}
                      totalPrice={item.currency[selectedCurrency].price}
                    />
                  ) : (
                    <TotalPrice
                      totalPrice={item.currency[selectedCurrency].price}
                      symbol={item.currency[selectedCurrency]._id.symbol}
                    />
                  ))}
                <div className={style.button__container}>
                  {
                    <PackageButton
                      type={
                        item.mostPopular
                          ? 'mostPopularBtn'
                          : 'regularPackageBtn'
                      }
                      onClick={undefined}
                    />
                  }
                </div>
                <div className={style.features__container}>
                  {index === 0 && <FeatureDescs />}
                  <Features feature={item.feature} />
                </div>
              </div>
            ))}
        </div>
      </div>
      <CaruselDots />
    </>
  )
}

export default PricingCards
