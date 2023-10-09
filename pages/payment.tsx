import React, { useEffect,useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useTranslation } from '@utils/useTranslation'
import styles from './payment.module.scss'
import rocketParrot from '@public/assets/images/rocketParrot.png'
import {
  PaymentProps,
  getPayWithList,
  PaymentMethod,
  getPackageDataById,
  PackageResponse,
  getCheckedPackageId,
} from '@utils/getPayments'
import { Header } from '@components/header/Header'
import { Footer } from '@components/wizard/Footer'
import { Reviews } from '@components/Reviews'
import CountdownTimer from '@components/payment/CountDown'
import PaymentOption from '@components/payment/PaymentOption'
import { Currency } from '@components/packages/CurrencyPicker'
import { FollowButtons } from '@components/home/FollowButtons'
import { PaymentFeatures } from '@components/payment/benefits'
import useStore from '@utils/store'
import LessonsFlowPopUps from '@components/lessons/lessonsFlowPopUps/lessonsFlowPopUps'


const Payment: React.FC<PaymentProps> = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const selectedCurrency = useStore(state => state.selectedCurrency)
  const [payWithListData, setPayWithListData] = useState<PaymentMethod[]>([])
  const [data, setData] = useState<PackageResponse>()
  const { id, coupon } = router.query

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payWithList = await getPayWithList()
        setPayWithListData(payWithList)

        if (id) {
          const checkedPackage = await getCheckedPackageId(
            id as string,
            coupon as string,
          )
          if (checkedPackage?.orderId) {
            const packageData = await getPackageDataById(checkedPackage.orderId)
            setData(packageData)
          }
        }
      } catch (err) {
        console.error('An error occurred:', err)
      }
    }

    fetchData()
  }, [id, coupon])

  useEffect(() => {
    if (data && selectedCurrency !== undefined) {
      localStorage.setItem(
        'duration',
        JSON.stringify(data.packages[0].duration),
      )
      localStorage.setItem(
        'recurringPrice',
        JSON.stringify(
          data.packages[0].currency[selectedCurrency].recurringPrice,
        ),
      )
      localStorage.setItem(
        'symbol',
        JSON.stringify(data.packages[0].currency[selectedCurrency]._id.symbol),
      )
    }
  }, [data, selectedCurrency])

  const monthlyPayment =
    data?.packages[0].currency[selectedCurrency].recurringPrice !== undefined
      ? data?.packages[0].currency[selectedCurrency].recurringPrice /
        data?.packages[0].duration
      : undefined

  return (
    <div className={styles.container}>
      <Header size="s" loginClassName={styles.loginModal} />
      <Image
        src={rocketParrot}
        className={styles.rocketParrot}
        alt=""
        width={500}
        height={500}
        priority={true}
      />
      <div className={styles.paymentInfoCard}>
        <div className={styles.currency}>
          {data?.currencies.map((currency, index) => (
            <Currency
              identifier={currency.identifier}
              symbol={currency.symbol}
              index={index}
              key={currency.identifier}
              //onClick={() => setSelectedCurrency(index)}
              // selectedCurrency={selectedCurrency}
            />
          ))}
        </div>
        <h2 className={styles.infoCardHeader}>
          <span>
            {data?.packages[0].duration}
            {t('PAYMENT_INFO_CARD_MEMBERSHIP')}
          </span>
        </h2>
        <CountdownTimer />
        <div className={styles.pHeader}>
          <p>{t('PAYMENT_CHOOSE_PAYMENT_TYPE')}</p>
        </div>
        <div>
          <PaymentOption
            currentPackage={data?.packages[0]}
            monthlyPayment={monthlyPayment}
            selectedCurrency={selectedCurrency}
            payWithOptions={payWithListData}
          />
        </div>
        {data?.packages[0].feature && (
          <PaymentFeatures feature={data?.packages[0].feature} />
        )}
      </div>
      <Reviews />
      <FollowButtons color="grey" />
      <Footer />
      {/* <div className={styles.regReminder}>
          <LessonsFlowPopUps
            popUpNumber={3}
            packetTitle={data?.packages[0].title}
          />
        </div> */}
         
    </div>
  )
}

export default Payment
